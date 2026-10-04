const { v4: uuidv4 } = require('uuid');
const { getFabricGateway } = require('../config/fabricConnection');
const { generateQR } = require('../services/qrService');
const BatchCache = require('../models/BatchCache');
const { getMongoStatus } = require('../config/db');

async function getApprovedBatches(req, res) {
  try {
    const fabric = getFabricGateway();
    let batches = [];

    if (fabric.getAllBatches) {
      batches = fabric.getAllBatches().filter(b => b.status === 'APPROVED');
    } else if (getMongoStatus()) {
      batches = await BatchCache.find({ status: 'APPROVED' }).sort({ syncedAt: -1 });
    }

    return res.json({
      success: true,
      count: batches.length,
      data: batches
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function createProduct(req, res) {
  try {
    const { batchId, productName, unitsRequested, productId: clientProductId } = req.body;

    if (!batchId || !productName || unitsRequested === undefined || unitsRequested === null) {
      return res.status(400).json({
        success: false,
        error: 'batchId, productName, and unitsRequested are required.'
      });
    }

    const productId = clientProductId || `PROD-${uuidv4().substring(0, 8).toUpperCase()}`;
    const fabric = getFabricGateway();

    // 1. Submit CreateProduct to Fabric ledger (chaincode checks batch.status === 'APPROVED' and depletes mass balance)
    const resultJson = await fabric.submitTransaction('CreateProduct', productId, batchId, productName, unitsRequested);
    const productData = JSON.parse(resultJson);

    // Sync updated batch balance to Mongo cache if available
    if (getMongoStatus()) {
      try {
        await BatchCache.findOneAndUpdate(
          { batchId },
          {
            remainingWeightMg: productData.remainingBatchWeightMg,
            remainingWeightKg: productData.remainingBatchWeightMg / 1000000
          }
        );
      } catch (cacheErr) {
        console.warn('[Mongo BatchCache Update Error]', cacheErr.message);
      }
    }

    // 2. Generate Base64 PNG QR code
    const qrCodeDataUrl = await generateQR(productId);

    return res.status(201).json({
      success: true,
      data: {
        ...productData,
        qrCodeDataUrl
      }
    });
  } catch (err) {
    console.error('[Create Product Error]', err);
    return res.status(400).json({ success: false, error: err.message });
  }
}

async function updateTransport(req, res) {
  try {
    const { batchId, temperature, location, status } = req.body;

    if (!batchId || !location || !status) {
      return res.status(400).json({
        success: false,
        error: 'batchId, location, and status are required.'
      });
    }

    const fabric = getFabricGateway();
    const resultJson = await fabric.submitTransaction('UpdateTransport', batchId, temperature || 20, location, status);
    const entry = JSON.parse(resultJson);

    return res.json({
      success: true,
      data: entry
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { getApprovedBatches, createProduct, updateTransport };
