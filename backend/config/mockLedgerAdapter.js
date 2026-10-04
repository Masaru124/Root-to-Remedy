'use strict';
// Dev/test adapter. Zero business logic here — it calls the SAME core.js the chaincode uses.
// (Monorepo path assumed. If chaincode lives in a separate repo, copy core/rules/speciesSpecs via a sync script.)
const core = require('../../chaincode/lib/core');

class MockLedgerAdapter {
  constructor() {
    this.db = new Map();
    this.clock = () => new Date().toISOString();
    // JSON round-trip on every get/put simulates serialization and catches mutate-without-put bugs.
    this.store = {
      get: async k => (this.db.has(k) ? JSON.parse(this.db.get(k)) : null),
      put: async (k, o) => { this.db.set(k, JSON.stringify(o)); },
    };
  }

  async submitTransaction(fn, ...a) {
    const snap = new Map(this.db);                 // emulate per-transaction atomicity
    const now = this.clock();
    try {
      switch (fn) {
        case 'RegisterBatch': {
          const [batchId, herbName, gpsLat, gpsLng, species, harvestDate, soilType, weightKg] = a;
          return await core.registerBatch(this.store, now, { batchId, herbName, gpsLat, gpsLng, species, harvestDate, soilType, weightKg });
        }
        case 'UploadLabReport': {
          const [batchId, ipfsCid, docSha256, purity, contamination, coaWeightKg] = a;
          return await core.uploadLabReport(this.store, now, { batchId, ipfsCid, docSha256, purity, contamination, coaWeightKg });
        }
        case 'CreateProduct': {
          const [productId, batchId, productName, unitsRequested] = a;
          return await core.createProduct(this.store, now, { productId, batchId, productName, unitsRequested });
        }
        case 'UpdateTransport': {
          const [batchId, temperature, location, status] = a;
          return await core.updateTransport(this.store, now, { batchId, temperature, location, status });
        }
        default: throw new Error(`Unknown function ${fn}`);
      }
    } catch (e) {
      this.db = snap;
      throw e;
    }
  }

  async evaluateTransaction(fn, ...a) {
    if (fn === 'VerifyProduct') return core.verifyProduct(this.store, a[0]);
    if (fn === 'GetBatch') return core.getBatch(this.store, a[0]);
    throw new Error(`Unknown query ${fn}`);
  }

  // Helper for UI demo listing: return array of all batches
  getAllBatches() {
    const list = [];
    for (const [k, v] of this.db.entries()) {
      if (k.startsWith('BATCH:')) {
        list.push(JSON.parse(v));
      }
    }
    return list;
  }
}

module.exports = { MockLedgerAdapter };
