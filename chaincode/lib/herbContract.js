'use strict';

const { Contract } = require('fabric-contract-api');
const { evaluateLabResult, canCreateProduct } = require('./rules');

class HerbContract extends Contract {

  async initLedger(ctx) {
    console.info('HerbContract initialized');
  }

  /**
   * Register a new harvest batch on the ledger (Farmer)
   */
  async RegisterBatch(ctx, batchId, herbName, gpsLat, gpsLng, species, harvestDate, soilType) {
    if (!batchId || !herbName || !species || !harvestDate || !soilType) {
      throw new Error('Missing required fields for batch registration.');
    }

    const exists = await this.batchExists(ctx, batchId);
    if (exists) {
      throw new Error(`Batch ${batchId} already exists.`);
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
      labReport: {
        ipfsHash: null,
        purity: null,
        contamination: null,
        uploadedAt: null
      },
      transportHistory: [],
      createdAt: new Date().toISOString()
    };

    await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
    return JSON.stringify(batch);
  }

  /**
   * Upload Lab Test Report & evaluate batch status (Lab)
   */
  async UploadLabReport(ctx, batchId, ipfsHash, purity, contamination) {
    const batchBytes = await ctx.stub.getState(batchId);
    if (!batchBytes || batchBytes.length === 0) {
      throw new Error(`Batch ${batchId} does not exist.`);
    }

    const batch = JSON.parse(batchBytes.toString());

    // Deterministically evaluate status using shared rules
    const newStatus = evaluateLabResult(purity, contamination);

    batch.status = newStatus;
    batch.labReport = {
      ipfsHash: ipfsHash || null,
      purity: Number(purity),
      contamination: Number(contamination),
      uploadedAt: new Date().toISOString()
    };

    await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
    return JSON.stringify(batch);
  }

  /**
   * Record transport telemetry / update location (Logistics)
   */
  async UpdateTransport(ctx, batchId, temperature, location, status) {
    const batchBytes = await ctx.stub.getState(batchId);
    if (!batchBytes || batchBytes.length === 0) {
      throw new Error(`Batch ${batchId} does not exist.`);
    }

    const batch = JSON.parse(batchBytes.toString());
    if (!batch.transportHistory) {
      batch.transportHistory = [];
    }

    const entry = {
      temperature: Number(temperature),
      location,
      status,
      timestamp: new Date().toISOString()
    };

    batch.transportHistory.push(entry);

    await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
    return JSON.stringify(entry);
  }

  /**
   * Create a finished retail product linked to an APPROVED batch (Manufacturer)
   */
  async CreateProduct(ctx, productId, batchId, productName) {
    if (!productId || !batchId || !productName) {
      throw new Error('Missing required fields for product creation.');
    }

    const productExists = await this.productExists(ctx, productId);
    if (productExists) {
      throw new Error(`Product ${productId} already exists.`);
    }

    // Verify batch exists
    const batchBytes = await ctx.stub.getState(batchId);
    if (!batchBytes || batchBytes.length === 0) {
      throw new Error(`Referenced batch ${batchId} does not exist.`);
    }

    const batch = JSON.parse(batchBytes.toString());

    // Enforce business rule: Batch MUST be APPROVED
    canCreateProduct(batch.status);

    const product = {
      docType: 'product',
      productId,
      batchId,
      productName,
      qrCode: productId,
      createdAt: new Date().toISOString()
    };

    await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
    return JSON.stringify(product);
  }

  /**
   * Public read-only provenance verification (Consumer)
   * Evaluates lookup by QR code / productId or batchId
   */
  async VerifyProduct(ctx, qrCode) {
    if (!qrCode) {
      throw new Error('QR code / Identifier is required for verification.');
    }

    // Try finding direct product by ID / QR
    const itemBytes = await ctx.stub.getState(qrCode);
    if (!itemBytes || itemBytes.length === 0) {
      throw new Error(`No record found for identifier '${qrCode}'.`);
    }

    const record = JSON.parse(itemBytes.toString());

    if (record.docType === 'product') {
      // Lookup linked batch
      const batchBytes = await ctx.stub.getState(record.batchId);
      const batch = batchBytes && batchBytes.length > 0 ? JSON.parse(batchBytes.toString()) : null;
      return JSON.stringify({
        verified: true,
        product: record,
        batch: batch
      });
    } else if (record.docType === 'batch') {
      return JSON.stringify({
        verified: true,
        product: null,
        batch: record
      });
    }

    return JSON.stringify({ verified: false, record });
  }

  async batchExists(ctx, batchId) {
    const batchBytes = await ctx.stub.getState(batchId);
    return batchBytes && batchBytes.length > 0;
  }

  async productExists(ctx, productId) {
    const productBytes = await ctx.stub.getState(productId);
    return productBytes && productBytes.length > 0;
  }
}

module.exports = HerbContract;
