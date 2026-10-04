'use strict';
const { MockLedgerAdapter } = require('./mockLedgerAdapter');

let adapterInstance = null;

async function seedDemoData(adapter) {
  try {
    // 1. Register Batch BATCH-SAMPLE1 (10 kg Withania somnifera)
    await adapter.submitTransaction(
      'RegisterBatch',
      'BATCH-SAMPLE1',
      'Ashwagandha',
      '26.9124',
      '75.7873',
      'Withania somnifera',
      '2026-08-15',
      'Organic Black Loam',
      '10'
    );

    // 2. Upload Lab Report for BATCH-SAMPLE1 (Purity 98.2%, Contamination 0, 10 kg verified)
    await adapter.submitTransaction(
      'UploadLabReport',
      'BATCH-SAMPLE1',
      'Qmcafb252d89703e11a02db048dd730c04785fa7822ceb',
      'a'.repeat(64),
      '98.2',
      '0',
      '10'
    );

    // 3. Update Transport for BATCH-SAMPLE1
    await adapter.submitTransaction(
      'UpdateTransport',
      'BATCH-SAMPLE1',
      '20',
      'Jaipur Processing Facility',
      'IN_TRANSIT'
    );

    // 4. Create Product PROD-SAMPLE1 (500 units)
    await adapter.submitTransaction(
      'CreateProduct',
      'PROD-SAMPLE1',
      'BATCH-SAMPLE1',
      'Organic Ashwagandha Extract Capsules',
      '500'
    );

    console.log('[Fabric] Initialized MockLedgerAdapter (pre-populated demo records active)');
  } catch (err) {
    console.error('[Fabric Seed Error]', err);
  }
}

function getFabricGateway() {
  const mode = process.env.FABRIC_MODE || 'mock';

  if (mode === 'mock') {
    if (!adapterInstance) {
      adapterInstance = new MockLedgerAdapter();
      seedDemoData(adapterInstance);
    }
    return adapterInstance;
  } else {
    console.log('[Fabric] Live Hyperledger Fabric Network Gateway');
    return {
      submitTransaction: async (fnName, ...args) => {
        throw new Error('Live Fabric network profile not configured. Set FABRIC_MODE=mock for local dev.');
      },
      evaluateTransaction: async (fnName, ...args) => {
        throw new Error('Live Fabric network profile not configured. Set FABRIC_MODE=mock for local dev.');
      }
    };
  }
}

module.exports = { getFabricGateway, getLedgerGateway: getFabricGateway };
