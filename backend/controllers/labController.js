'use strict';
const crypto = require('crypto');
const { parseCoAPdf } = require('../utils/coaParser');
const { uploadToIPFS } = require('../services/ipfsService');
const { getFabricGateway } = require('../config/fabricConnection');
const BatchCache = require('../models/BatchCache');
const { getMongoStatus } = require('../config/db');

const GATEWAY = process.env.IPFS_GATEWAY_URL || 'https://gateway.pinata.cloud/ipfs/';
const asObject = r => (Buffer.isBuffer(r) ? JSON.parse(r.toString()) : (typeof r === 'string' ? JSON.parse(r) : r));

async function uploadLabReport(req, res) {
  try {
    const { batchId } = req.body;
    if (!batchId) {
      return res.status(400).json({ success: false, error: 'batchId is required.' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'CoA PDF is required.' });
    }

    // 1. Server-side fail-closed extraction (ignores any client-submitted numbers)
    const m = await parseCoAPdf(req.file.buffer);
    const docSha256 = crypto.createHash('sha256').update(req.file.buffer).digest('hex');

    // 2. Real IPFS Pinning (Pinata / Kubo)
    const cid = await uploadToIPFS(req.file.buffer, `CoA_${batchId}.pdf`);

    // 3. Ledger write-once transaction
    const fabric = getFabricGateway();
    const batch = asObject(await fabric.submitTransaction(
      'UploadLabReport',
      batchId,
      cid,
      docSha256,
      String(m.purity),
      String(m.contamination),
      String(m.coaWeightKg)
    ));

    // 4. Update MongoDB cache (best-effort)
    let cacheStale = false;
    if (getMongoStatus()) {
      try {
        await BatchCache.findOneAndUpdate(
          { batchId },
          {
            status: batch.status,
            labReport: batch.labReport,
            verifiedWeightMg: batch.verifiedWeightMg,
            remainingWeightMg: batch.remainingWeightMg,
            syncedAt: new Date()
          },
          { upsert: true }
        );
      } catch (cacheErr) {
        cacheStale = true;
        console.warn('[Mongo Cache Warning]', cacheErr.message);
      }
    }

    return res.json({
      success: true,
      data: {
        batchId,
        status: batch.status,
        purity: m.purity,
        contamination: m.contamination,
        coaWeightKg: m.coaWeightKg,
        ipfsCid: cid,
        docSha256,
        gatewayUrl: `${GATEWAY}${cid}`,
        cacheStale
      },
      message: `CoA processed successfully. Batch status evaluated to: ${batch.status}`
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = { uploadLabReport };
