const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { SPECIES_SPECS } = require('../chaincode/lib/speciesSpecs');
const {
  validateSpecies,
  parseKgToMg,
  parseUnits,
  evaluateLabResult,
  biomassRequiredMg,
  maxUnitsFromBalance
} = require('../chaincode/lib/rules');
const { MockLedgerAdapter } = require('../backend/config/mockLedgerAdapter');
const { extractMetrics } = require('../backend/utils/coaParser');

describe('1. Species Whitelist and Pharmacopoeial Rules', () => {
  test('Whitelist contains 7 canonical species and no DEFAULT', () => {
    assert.equal(Object.keys(SPECIES_SPECS).length, 7);
    assert.equal(SPECIES_SPECS['DEFAULT'], undefined);
    assert.ok(SPECIES_SPECS['Withania somnifera']);
    assert.equal(SPECIES_SPECS['Withania somnifera'].dosageMg, 500);
    assert.equal(SPECIES_SPECS['Withania somnifera'].yieldPct, 85);
  });

  test('Rejects unknown species and prototype keys', () => {
    assert.equal(Object.prototype.hasOwnProperty.call(SPECIES_SPECS, 'Unknown herb'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(SPECIES_SPECS, '__proto__'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(SPECIES_SPECS, 'toString'), false);
  });

  test('parseKgToMg converts float kg to integer mg', () => {
    assert.equal(parseKgToMg(10), 10000000);
    assert.equal(parseKgToMg('5.5'), 5500000);
    assert.throws(() => parseKgToMg(0), /> 0/);
    assert.throws(() => parseKgToMg(-5), /> 0/);
    assert.throws(() => parseKgToMg('abc'), /> 0/);
  });

  test('parseUnits validates integer unit counts', () => {
    assert.equal(parseUnits(100), 100);
    assert.equal(parseUnits('50'), 50);
    assert.throws(() => parseUnits(0), /between 1 and/);
    assert.throws(() => parseUnits(1.5), /positive integer/);
    assert.throws(() => parseUnits(-10), /positive integer/);
  });

  test('evaluateLabResult enforces P >= 95.0% and C == 0', () => {
    assert.equal(evaluateLabResult(98.5, 0), 'APPROVED');
    assert.equal(evaluateLabResult(95.0, 0), 'APPROVED');
    assert.equal(evaluateLabResult(94.99, 0), 'REJECTED');
    assert.equal(evaluateLabResult(98.0, 0.01), 'REJECTED');
    assert.equal(evaluateLabResult(98.0, 1), 'REJECTED');
  });

  test('biomassRequiredMg and maxUnitsFromBalance calculations', () => {
    const spec = validateSpecies('Withania somnifera');
    // Withania somnifera: 500mg dose, 85% yield -> ceil(100 * 500 * 100 / 85) = 58,824 mg
    const reqMg = biomassRequiredMg(spec, 100);
    assert.equal(reqMg, 58824);

    // 10kg = 10,000,000 mg -> floor(10,000,000 * 85 / 50,000) = 17,000 units
    const maxUnits = maxUnitsFromBalance(spec, 10000000);
    assert.equal(maxUnits, 17000);
  });
});

describe('2. Chaincode Core Transactions & Mass-Balance Depletion', () => {
  const dummySha256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  test('RegisterBatch registers batch with integer mg weight and rejects invalid input', async () => {
    const adapter = new MockLedgerAdapter();
    const batch = await adapter.submitTransaction(
      'RegisterBatch',
      'BATCH-101',
      'Ashwagandha Root',
      12.97,
      77.59,
      'Withania somnifera',
      '2026-10-01',
      'Sandy Loam',
      '10.0'
    );

    assert.equal(batch.batchId, 'BATCH-101');
    assert.equal(batch.initialWeightMg, 10000000);
    assert.equal(batch.remainingWeightMg, 10000000);
    assert.equal(batch.status, 'PENDING');

    // Rejects duplicate batchId
    await assert.rejects(
      () => adapter.submitTransaction('RegisterBatch', 'BATCH-101', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 5),
      /already exists/
    );

    // Rejects invalid species
    await assert.rejects(
      () => adapter.submitTransaction('RegisterBatch', 'BATCH-102', 'Fake Herb', 0, 0, 'InvalidSpecies', '2026-10-01', 'Loam', 5),
      /Unrecognized botanical species/
    );
  });

  test('UploadLabReport approves passing batch and clamps weight to min(farmer, lab)', async () => {
    const adapter = new MockLedgerAdapter();
    await adapter.submitTransaction('RegisterBatch', 'BATCH-101', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 10);

    const updated = await adapter.submitTransaction('UploadLabReport', 'BATCH-101', 'QmHash123', dummySha256, 98.2, 0, 8.5);
    assert.equal(updated.status, 'APPROVED');
    assert.equal(updated.labReport.purity, 98.2);
    assert.equal(updated.labReport.contamination, 0);
    assert.equal(updated.labReport.coaWeightMg, 8500000);
    // 8.5kg = 8,500,000 mg clamped from 10,000,000 mg
    assert.equal(updated.remainingWeightMg, 8500000);
  });

  test('UploadLabReport rejects failing batch (purity < 95% or contamination > 0)', async () => {
    const adapter = new MockLedgerAdapter();
    await adapter.submitTransaction('RegisterBatch', 'BATCH-102', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 10);

    const failed = await adapter.submitTransaction('UploadLabReport', 'BATCH-102', 'QmHashFail', dummySha256, 92.0, 0.05, 10);
    assert.equal(failed.status, 'REJECTED');
  });

  test('Write-once quality gate: Cannot upload lab report twice or overwrite REJECTED batch', async () => {
    const adapter = new MockLedgerAdapter();
    await adapter.submitTransaction('RegisterBatch', 'BATCH-103', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 10);
    await adapter.submitTransaction('UploadLabReport', 'BATCH-103', 'QmHashFail', dummySha256, 90.0, 0, 10);

    // Attempting to re-upload to launder the rejected batch MUST fail
    await assert.rejects(
      () => adapter.submitTransaction('UploadLabReport', 'BATCH-103', 'QmHashPass', dummySha256, 99.0, 0, 10),
      /already has a lab result/
    );
  });

  test('CreateProduct enforces mass-balance deduction and blocks replay dilution attacks', async () => {
    const adapter = new MockLedgerAdapter();
    await adapter.submitTransaction('RegisterBatch', 'BATCH-104', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 10);
    await adapter.submitTransaction('UploadLabReport', 'BATCH-104', 'QmHash123', dummySha256, 98.5, 0, 10);

    // Max allowed units for 10kg Withania somnifera is 17,000 units
    // 1st request: 10,000 units -> consumes 5,882,353 mg, remaining 4,117,647 mg
    const res1 = await adapter.submitTransaction('CreateProduct', 'PROD-001', 'BATCH-104', 'Ashwa Gold 500mg', 10000);
    assert.equal(res1.product.productId, 'PROD-001');
    assert.equal(res1.product.unitsProduced, 10000);
    assert.equal(res1.product.biomassConsumedMg, 5882353);
    assert.equal(res1.batch.remainingWeightMg, 4117647);

    // 2nd request: 7,000 units -> consumes 4,117,648 mg (exceeds 4,117,647 mg) -> FAILS
    await assert.rejects(
      () => adapter.submitTransaction('CreateProduct', 'PROD-002', 'BATCH-104', 'Ashwa Silver 500mg', 7000),
      /Insufficient batch balance/
    );

    // 2nd request valid: 7,000 units requires ceil(7000*500*100/85) = 4,117,648; 6,999 units requires 4,117,059 <= 4,117,647 -> SUCCEEDS
    const res2 = await adapter.submitTransaction('CreateProduct', 'PROD-002', 'BATCH-104', 'Ashwa Silver 500mg', 6999);
    assert.equal(res2.product.productId, 'PROD-002');
    assert.equal(res2.batch.remainingWeightMg, 4117647 - 4117059);
  });

  test('CreateProduct blocks productId collisions', async () => {
    const adapter = new MockLedgerAdapter();
    await adapter.submitTransaction('RegisterBatch', 'BATCH-105', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 10);
    await adapter.submitTransaction('UploadLabReport', 'BATCH-105', 'QmHash123', dummySha256, 98.5, 0, 10);

    await adapter.submitTransaction('CreateProduct', 'PROD-COLLIDE', 'BATCH-105', 'Product 1', 100);

    await assert.rejects(
      () => adapter.submitTransaction('CreateProduct', 'PROD-COLLIDE', 'BATCH-105', 'Product 2', 100),
      /already exists/
    );
  });

  test('CreateProduct rejects unapproved batches', async () => {
    const adapter = new MockLedgerAdapter();
    await adapter.submitTransaction('RegisterBatch', 'BATCH-106', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 10);

    // Status is PENDING
    await assert.rejects(
      () => adapter.submitTransaction('CreateProduct', 'PROD-PEND', 'BATCH-106', 'Product', 100),
      /must be APPROVED/
    );

    // Reject the batch
    await adapter.submitTransaction('UploadLabReport', 'BATCH-106', 'QmHashFail', dummySha256, 80.0, 0, 10);
    await assert.rejects(
      () => adapter.submitTransaction('CreateProduct', 'PROD-REJ', 'BATCH-106', 'Product', 100),
      /must be APPROVED/
    );
  });

  test('UpdateTransport works only on approved batches and appends history', async () => {
    const adapter = new MockLedgerAdapter();
    await adapter.submitTransaction('RegisterBatch', 'BATCH-107', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 10);
    await adapter.submitTransaction('UploadLabReport', 'BATCH-107', 'QmHash123', dummySha256, 98.5, 0, 10);

    await adapter.submitTransaction('UpdateTransport', 'BATCH-107', 22.5, 'Warehouse A', 'IN_TRANSIT');

    const batch = await adapter.evaluateTransaction('GetBatch', 'BATCH-107');
    assert.equal(batch.transportHistory.length, 1);
    assert.equal(batch.transportHistory[0].location, 'Warehouse A');
    assert.equal(batch.transportHistory[0].temperature, 22.5);
  });

  test('VerifyProduct returns complete provenance chain', async () => {
    const adapter = new MockLedgerAdapter();
    await adapter.submitTransaction('RegisterBatch', 'BATCH-108', 'Ashwagandha', 0, 0, 'Withania somnifera', '2026-10-01', 'Loam', 10);
    await adapter.submitTransaction('UploadLabReport', 'BATCH-108', 'QmHash123', dummySha256, 98.5, 0, 10);
    await adapter.submitTransaction('UpdateTransport', 'BATCH-108', 21.0, 'Delhi Hub', 'IN_TRANSIT');
    await adapter.submitTransaction('CreateProduct', 'PROD-VERIFY', 'BATCH-108', 'Pure Ashwagandha', 500);

    const result = await adapter.evaluateTransaction('VerifyProduct', 'PROD-VERIFY');
    assert.equal(result.product.productId, 'PROD-VERIFY');
    assert.equal(result.batch.batchId, 'BATCH-108');
    assert.equal(result.batch.transportHistory.length, 1);
  });
});

describe('3. CoA Fail-Closed Parser', () => {
  test('Parses valid CoA text with standard integers and decimals', () => {
    const text = `
      CERTIFICATE OF ANALYSIS (AYUSH TESTING LABORATORY)
      Batch ID: BATCH-1234
      Species: Withania somnifera
      Purity: 98.4%
      Contamination: 0.00
      Batch Quantity: 15.5 kg
      Moisture Content: 6.2%
    `;
    const parsed = extractMetrics(text);
    assert.equal(parsed.purity, 98.4);
    assert.equal(parsed.contamination, 0.0);
    assert.equal(parsed.coaWeightKg, 15.5);
  });

  test('Rejects CoA text missing required fields', () => {
    const textWithoutContamination = `
      CERTIFICATE OF ANALYSIS (AYUSH TESTING LABORATORY)
      Batch ID: BATCH-1234
      Purity: 98.4%
      Batch Quantity: 15.5 kg
      Status: Tested
    `;
    assert.throws(
      () => extractMetrics(textWithoutContamination),
      /Contamination/
    );

    const textWithoutPurity = `
      CERTIFICATE OF ANALYSIS (AYUSH TESTING LABORATORY)
      Batch ID: BATCH-1234
      Contamination: 0.00
      Batch Quantity: 15.5 kg
      Status: Tested
    `;
    assert.throws(
      () => extractMetrics(textWithoutPurity),
      /Purity/
    );
  });
});
