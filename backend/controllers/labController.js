const { uploadToIPFS } = require('../services/ipfsService');
const { getFabricGateway } = require('../config/fabricConnection');
const BatchCache = require('../models/BatchCache');
const { getMongoStatus } = require('../config/db');

async function uploadLabReport(req, res) {
  try {
    const { batchId, purity, contamination } = req.body;

    if (!batchId || purity === undefined || contamination === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters (batchId, purity, contamination).'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Lab test report PDF file is required.'
      });
    }

    // 1. Upload PDF to IPFS (Pinata primary / Kubo fallback)
    const ipfsHash = await uploadToIPFS(req.file.buffer, req.file.originalname);

    // 2. Call Fabric ledger (smart contract evaluates purity >= 95 && contamination == 0)
    const fabric = getFabricGateway();
    const resultJson = await fabric.submitTransaction(
      'UploadLabReport',
      batchId,
      ipfsHash,
      Number(purity),
      Number(contamination)
    );

    const updatedBatch = JSON.parse(resultJson);

    // 3. Update Mongo read cache
    if (getMongoStatus()) {
      try {
        await BatchCache.findOneAndUpdate(
          { batchId },
          {
            status: updatedBatch.status,
            labReport: updatedBatch.labReport,
            syncedAt: new Date()
          }
        );
      } catch (cacheErr) {
        console.warn('[Mongo Cache Update Warning]', cacheErr.message);
      }
    }

    return res.json({
      success: true,
      data: updatedBatch,
      message: `Lab report recorded. Status evaluated to: ${updatedBatch.status}`
    });
  } catch (err) {
    console.error('[Lab Upload Error]', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { uploadLabReport };
