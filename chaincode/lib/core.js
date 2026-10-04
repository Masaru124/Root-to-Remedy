'use strict';
// ALL business logic lives here. HerbContract (real Fabric) and MockLedgerAdapter (tests/dev)
// both call these functions, so the mock cannot drift from the chaincode.
// `store` = { get(key) -> object|null, put(key, object) }.
const R = require('./rules');

const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;
const TRANSPORT_STATUSES = ['IN_TRANSIT', 'DELIVERED', 'DELAYED'];
const bKey = id => `BATCH:${id}`;
const pKey = id => `PROD:${id}`;

function reqId(name, v) {
  if (typeof v !== 'string' || !ID_RE.test(v)) throw new Error(`${name} must match ${ID_RE}.`);
  return v;
}
function reqStr(name, v, max = 200) {
  if (typeof v !== 'string' || v.trim() === '' || v.length > max) throw new Error(`${name} is required (max ${max} chars).`);
  return v.trim();
}
function reqNum(name, v, min, max) {
  if (typeof v === 'string' && v.trim() === '') throw new Error(`${name} is required.`);
  const n = Number(v);
  if (!Number.isFinite(n) || n < min || n > max) throw new Error(`${name} must be between ${min} and ${max}.`);
  return n;
}

async function registerBatch(store, nowISO, a) {
  const batchId = reqId('batchId', a.batchId);
  R.validateSpecies(a.species);
  if (await store.get(bKey(batchId))) throw new Error(`Batch ID ${batchId} already exists.`);
  const harvestDate = reqStr('harvestDate', a.harvestDate, 40);
  if (Number.isNaN(Date.parse(harvestDate))) throw new Error('harvestDate is not a valid date.');
  const weightMg = R.parseKgToMg(a.weightKg);
  const batch = {
    docType: 'batch',
    batchId,
    herbName: reqStr('herbName', a.herbName),
    species: a.species,
    gpsLat: reqNum('gpsLat', a.gpsLat, -90, 90),
    gpsLng: reqNum('gpsLng', a.gpsLng, -180, 180),
    harvestDate,
    soilType: reqStr('soilType', a.soilType),
    initialWeightMg: weightMg,      // farmer-declared (self-reported)
    verifiedWeightMg: null,         // set from the CoA at lab upload
    remainingWeightMg: weightMg,    // ledger balance, only ever decreases
    status: 'PENDING',
    labReport: null,
    transportHistory: [],
    createdAt: nowISO
  };
  await store.put(bKey(batchId), batch);
  return batch;
}

async function uploadLabReport(store, nowISO, a) {
  const batchId = reqId('batchId', a.batchId);
  const batch = await store.get(bKey(batchId));
  if (!batch) throw new Error(`Batch ${batchId} not found.`);
  // WRITE-ONCE: prevents laundering a REJECTED batch by re-uploading, or flipping an APPROVED one.
  if (batch.status !== 'PENDING' || batch.labReport !== null) {
    throw new Error(`Batch ${batchId} already has a lab result (${batch.status}). Lab results are write-once.`);
  }
  const ipfsCid = reqStr('ipfsCid', a.ipfsCid, 120);
  if (typeof a.docSha256 !== 'string' || !/^[0-9a-f]{64}$/.test(a.docSha256)) {
    throw new Error('docSha256 must be 64 lowercase hex chars.');
  }
  const status = R.evaluateLabResult(a.purity, a.contamination);   // throws on garbage
  const verifiedMg = R.parseKgToMg(a.coaWeightKg);
  batch.status = status;
  batch.labReport = {
    ipfsCid,
    docSha256: a.docSha256,
    purity: Number(a.purity),
    contamination: Number(a.contamination),
    coaWeightMg: verifiedMg,
    uploadedAt: nowISO
  };
  batch.verifiedWeightMg = verifiedMg;
  // Two parties must agree: the usable balance is the LOWER of farmer-declared and CoA weight.
  batch.remainingWeightMg = Math.min(batch.remainingWeightMg, verifiedMg);
  await store.put(bKey(batchId), batch);
  return batch;
}

async function createProduct(store, nowISO, a) {
  const productId = reqId('productId', a.productId);
  const batchId = reqId('batchId', a.batchId);
  if (await store.get(pKey(productId))) {
    throw new Error(`Product ID ${productId} already exists. Product IDs are immutable.`);
  }
  const batch = await store.get(bKey(batchId));
  if (!batch) throw new Error(`Source batch ${batchId} does not exist.`);
  if (batch.status !== 'APPROVED') {
    throw new Error(`Batch ${batchId} is ${batch.status}; must be APPROVED.`);
  }
  const productName = reqStr('productName', a.productName);
  const units = R.parseUnits(a.unitsRequested);
  const spec = R.validateSpecies(batch.species);              // constants come from the contract, never the caller
  const needMg = R.biomassRequiredMg(spec, units);
  if (needMg > batch.remainingWeightMg) {
    throw new Error(`Insufficient batch balance. Need ${needMg} mg, have ${batch.remainingWeightMg} mg. ` +
      `Max units possible: ${R.maxUnitsFromBalance(spec, batch.remainingWeightMg)}.`);
  }
  batch.remainingWeightMg -= needMg;
  const product = {
    docType: 'product',
    productId,
    batchId,
    productName,
    species: batch.species,
    unitsProduced: units,
    biomassConsumedMg: needMg,
    qrCode: productId,
    createdAt: nowISO
  };
  await store.put(bKey(batchId), batch);
  await store.put(pKey(productId), product);                  // one Fabric tx => both writes commit atomically
  return { product, batch };
}

async function updateTransport(store, nowISO, a) {
  const batchId = reqId('batchId', a.batchId);
  const batch = await store.get(bKey(batchId));
  if (!batch) throw new Error(`Batch ${batchId} not found.`);
  if (batch.status !== 'APPROVED') throw new Error('Transport updates are only allowed for APPROVED batches.');
  if (batch.transportHistory.length >= 500) throw new Error('Transport history limit reached.');
  if (!TRANSPORT_STATUSES.includes(a.status)) throw new Error(`status must be one of ${TRANSPORT_STATUSES.join(', ')}.`);
  batch.transportHistory.push({
    temperature: reqNum('temperature', a.temperature, -80, 80),
    location: reqStr('location', a.location),
    status: a.status,
    timestamp: nowISO
  });
  await store.put(bKey(batchId), batch);
  return batch;
}

async function verifyProduct(store, qrCode) {
  const product = await store.get(pKey(reqId('qrCode', qrCode)));
  if (!product) throw new Error('Product not found.');
  const batch = await store.get(bKey(product.batchId));
  return { product, batch };
}

async function getBatch(store, batchId) {
  const batch = await store.get(bKey(reqId('batchId', batchId)));
  if (!batch) throw new Error(`Batch ${batchId} not found.`);
  return batch;
}

module.exports = { registerBatch, uploadLabReport, createProduct, updateTransport, verifyProduct, getBatch };
