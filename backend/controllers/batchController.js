const { v4: uuidv4 } = require('uuid');
const { getFabricGateway } = require('../config/fabricConnection');
const BatchCache = require('../models/BatchCache');
const { getMongoStatus } = require('../config/db');

async function registerBatch(req, res) {
  try {
    const { herbName, species, harvestDate, soilType, gpsLat, gpsLng, weightKg } = req.body;

    if (!herbName || !species || !harvestDate || !soilType || weightKg === undefined || weightKg === null) {
      return res.status(400).json({
        success: false,
        error: 'Missing required batch fields (herbName, species, harvestDate, soilType, weightKg).'
      });
    }

    const batchId = `BATCH-${uuidv4().substring(0, 8).toUpperCase()}`;
    const fabric = getFabricGateway();

    // Call Fabric ledger (or Mock adapter)
    const resultJson = await fabric.submitTransaction(
      'RegisterBatch',
      batchId,
      herbName,
      gpsLat || 0,
      gpsLng || 0,
      species,
      harvestDate,
      soilType,
      weightKg
    );

    const batchData = JSON.parse(resultJson);

    // Sync to Mongo read cache asynchronously
    if (getMongoStatus()) {
      try {
        await BatchCache.create({
          ...batchData,
          createdBy: req.user ? req.user.sub : 'farmer'
        });
      } catch (cacheErr) {
        console.warn('[Mongo BatchCache Error]', cacheErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      data: batchData
    });
  } catch (err) {
    console.error('[Batch Registration Error]', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function getAllBatches(req, res) {
  try {
    const fabric = getFabricGateway();
    let batches = [];

    if (fabric.getAllBatches) {
      batches = fabric.getAllBatches();
    } else if (getMongoStatus()) {
      batches = await BatchCache.find().sort({ syncedAt: -1 });
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

async function getBatchById(req, res) {
  try {
    const { batchId } = req.params;
    const fabric = getFabricGateway();

    let batch = null;
    if (fabric.evaluateTransaction) {
      const resJson = await fabric.evaluateTransaction('VerifyProduct', batchId);
      const parsed = JSON.parse(resJson);
      batch = parsed.batch || parsed.record;
    }

    if (!batch && getMongoStatus()) {
      batch = await BatchCache.findOne({ batchId });
    }

    if (!batch) {
      return res.status(404).json({ success: false, error: `Batch '${batchId}' not found.` });
    }

    return res.json({ success: true, data: batch });
  } catch (err) {
    return res.status(404).json({ success: false, error: err.message });
  }
}

module.exports = { registerBatch, getAllBatches, getBatchById };
