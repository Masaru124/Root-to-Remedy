'use strict';
const { SPECIES_SPECS } = require('./speciesSpecs');

const KG_TO_MG = 1_000_000;
const MAX_BATCH_KG = 100_000;      // sanity cap on any single registered/verified weight
const MAX_UNITS_PER_CALL = 1_000_000_000;

// hasOwnProperty check prevents prototype pollution (e.g. constructor, __proto__, toString)
function validateSpecies(species) {
  if (typeof species !== 'string' || !Object.prototype.hasOwnProperty.call(SPECIES_SPECS, species)) {
    throw new Error(`Unrecognized botanical species: "${species}". Rejected.`);
  }
  return SPECIES_SPECS[species];
}

function parseKgToMg(kgInput) {
  if (typeof kgInput === 'string' && kgInput.trim() === '') throw new Error('Weight (kg) is required.');
  const kg = Number(kgInput);
  if (!Number.isFinite(kg) || kg <= 0 || kg > MAX_BATCH_KG) {
    throw new Error(`Weight must be a number > 0 and <= ${MAX_BATCH_KG} kg.`);
  }
  const mg = Math.round(kg * KG_TO_MG);
  if (mg < 1) throw new Error('Weight too small.');
  return mg;
}

function parseUnits(input) {
  const s = String(input).trim();
  if (!/^\d+$/.test(s)) throw new Error('unitsRequested must be a positive integer.');
  const n = Number(s);
  if (n < 1 || n > MAX_UNITS_PER_CALL) throw new Error(`unitsRequested must be between 1 and ${MAX_UNITS_PER_CALL}.`);
  return n;
}

// Garbage must not be recorded as a legitimate REJECTED result — it throws instead.
function evaluateLabResult(purity, contamination) {
  const p = Number(purity), c = Number(contamination);
  if (!Number.isFinite(p) || !Number.isFinite(c) || p < 0 || p > 100 || c < 0) {
    throw new Error('Invalid lab metrics (purity must be 0-100, contamination >= 0).');
  }
  return (p >= 95 && c === 0) ? 'APPROVED' : 'REJECTED';
}

// Exact integer math: ceil(units * dosageMg * 100 / yieldPct)
function biomassRequiredMg(spec, units) {
  const num = units * spec.dosageMg * 100;
  return Math.floor((num + spec.yieldPct - 1) / spec.yieldPct);
}

function maxUnitsFromBalance(spec, remainingMg) {
  return Math.floor((remainingMg * spec.yieldPct) / (spec.dosageMg * 100));
}

// ctx.stub.getTxTimestamp() is a protobuf Timestamp (seconds is a Long), NOT a Date.
function txTimeISO(stub) {
  const ts = stub.getTxTimestamp();
  const s = ts.seconds;
  const sec = (s && typeof s.toNumber === 'function') ? s.toNumber() : Number(s);
  return new Date(sec * 1000 + Math.floor((ts.nanos || 0) / 1e6)).toISOString();
}

module.exports = {
  SPECIES_SPECS,
  validateSpecies,
  parseKgToMg,
  parseUnits,
  evaluateLabResult,
  biomassRequiredMg,
  maxUnitsFromBalance,
  txTimeISO,
  KG_TO_MG
};
