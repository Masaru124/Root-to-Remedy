const path = require('path');
const fs = require('fs');
const { evaluateLabResult, canCreateProduct } = require('../../chaincode/lib/rules');

/**
 * In-Memory Mock Ledger Adapter for rapid development & offline testing.
 * Strictly enforces identical business rules as chaincode.
 */
class MockLedgerAdapter {
  constructor() {
    this.ledger = new Map();
    this.seedDemoData();
    console.log('[Fabric] Initialized MockLedgerAdapter (pre-populated demo records active)');
  }

  seedDemoData() {
    const batch1 = {
      docType: 'batch',
      batchId: 'BATCH-SAMPLE1',
      herbName: 'Ashwagandha',
      species: 'Withania somnifera',
      gpsLat: 26.9124,
      gpsLng: 75.7873,
      harvestDate: '2026-08-15',
      soilType: 'Organic Black Loam',
      status: 'APPROVED',
      labReport: {
        ipfsHash: 'Qmcafb252d89703e11a02db048dd730c04785fa7822ceb',
        purity: 98.2,
        contamination: 0,
        uploadedAt: new Date().toISOString()
      },
      transportHistory: [
        { temperature: 20, location: 'Jaipur Processing Facility', status: 'In Transit', timestamp: new Date().toISOString() }
      ],
      createdAt: new Date().toISOString()
    };

    const prod1 = {
      docType: 'product',
      productId: 'PROD-SAMPLE1',
      batchId: 'BATCH-SAMPLE1',
      productName: 'Organic Ashwagandha Extract Capsules',
      qrCode: 'PROD-SAMPLE1',
      createdAt: new Date().toISOString()
    };

    // Store sample records
    this.ledger.set('BATCH-SAMPLE1', batch1);
    this.ledger.set('PROD-SAMPLE1', prod1);

    // Alias PROD-100 and BATCH-001 to sample records for instant testing
    this.ledger.set('PROD-100', { ...prod1, productId: 'PROD-100' });
    this.ledger.set('BATCH-001', { ...batch1, batchId: 'BATCH-001' });
  }

  async submitTransaction(fnName, ...args) {
    switch (fnName) {
      case 'RegisterBatch': {
        const [batchId, herbName, gpsLat, gpsLng, species, harvestDate, soilType] = args;
        if (this.ledger.has(batchId)) {
          throw new Error(`Batch ${batchId} already exists on mock ledger.`);
        }
        const batch = {
          docType: 'batch',
          batchId,
          herbName,
          species,
          gpsLat: Number(gpsLat) || 0,
          gpsLng: Number(gpsLng) || 0,
          harvestDate,
          soilType,
          status: 'PENDING',
          labReport: { ipfsHash: null, purity: null, contamination: null, uploadedAt: null },
          transportHistory: [],
          createdAt: new Date().toISOString()
        };
        this.ledger.set(batchId, batch);
        return JSON.stringify(batch);
      }

      case 'UploadLabReport': {
        const [batchId, ipfsHash, purity, contamination] = args;
        if (!this.ledger.has(batchId)) {
          throw new Error(`Batch ${batchId} not found on ledger.`);
        }
        const batch = this.ledger.get(batchId);
        // Shared business rule evaluation
        const newStatus = evaluateLabResult(purity, contamination);
        batch.status = newStatus;
        batch.labReport = {
          ipfsHash: ipfsHash || null,
          purity: Number(purity),
          contamination: Number(contamination),
          uploadedAt: new Date().toISOString()
        };
        this.ledger.set(batchId, batch);
        return JSON.stringify(batch);
      }

      case 'UpdateTransport': {
        const [batchId, temperature, location, status] = args;
        if (!this.ledger.has(batchId)) {
          throw new Error(`Batch ${batchId} not found on ledger.`);
        }
        const batch = this.ledger.get(batchId);
        if (!batch.transportHistory) batch.transportHistory = [];
        const entry = {
          temperature: Number(temperature),
          location,
          status,
          timestamp: new Date().toISOString()
        };
        batch.transportHistory.push(entry);
        this.ledger.set(batchId, batch);
        return JSON.stringify(entry);
      }

      case 'CreateProduct': {
        const [productId, batchId, productName] = args;
        if (this.ledger.has(productId)) {
          throw new Error(`Product ${productId} already exists.`);
        }
        if (!this.ledger.has(batchId)) {
          throw new Error(`Referenced batch ${batchId} not found.`);
        }
        const batch = this.ledger.get(batchId);
        // Enforce shared rule: Batch must be APPROVED
        canCreateProduct(batch.status);

        const product = {
          docType: 'product',
          productId,
          batchId,
          productName,
          qrCode: productId,
          createdAt: new Date().toISOString()
        };
        this.ledger.set(productId, product);
        return JSON.stringify(product);
      }

      default:
        throw new Error(`Unknown transaction function: ${fnName}`);
    }
  }

  async evaluateTransaction(fnName, ...args) {
    if (fnName === 'VerifyProduct') {
      const [qrCode] = args;
      if (!this.ledger.has(qrCode)) {
        throw new Error(`No record found on ledger for identifier '${qrCode}'.`);
      }
      const record = this.ledger.get(qrCode);
      if (record.docType === 'product') {
        const batch = this.ledger.get(record.batchId) || null;
        return JSON.stringify({ verified: true, product: record, batch });
      } else if (record.docType === 'batch') {
        return JSON.stringify({ verified: true, product: null, batch: record });
      }
      return JSON.stringify({ verified: false, record });
    }
    throw new Error(`Unknown evaluation function: ${fnName}`);
  }

  // Helper method for backend list queries
  getAllBatches() {
    const batches = [];
    for (const val of this.ledger.values()) {
      if (val.docType === 'batch') {
        batches.push(val);
      }
    }
    return batches;
  }
}

let mockAdapterInstance = null;

function getFabricGateway() {
  const mode = process.env.FABRIC_MODE || 'mock';

  if (mode === 'mock') {
    if (!mockAdapterInstance) {
      mockAdapterInstance = new MockLedgerAdapter();
    }
    return mockAdapterInstance;
  } else {
    // Real Gateway connection profile implementation placeholder
    console.log('[Fabric] Connecting to live Hyperledger Fabric Network Gateway...');
    // Return live Gateway wrapper
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

module.exports = { getFabricGateway };
