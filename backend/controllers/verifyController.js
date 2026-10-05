const { getFabricGateway } = require('../config/fabricConnection');
const asObject = r => (Buffer.isBuffer(r) ? JSON.parse(r.toString()) : (typeof r === 'string' ? JSON.parse(r) : r));

async function verifyProduct(req, res) {
  try {
    const { qrCode } = req.params;

    if (!qrCode) {
      return res.status(400).json({ success: false, error: 'QR Code identifier is required.' });
    }

    const fabric = getFabricGateway();
    const result = await fabric.evaluateTransaction('VerifyProduct', qrCode);
    const verificationData = asObject(result);

    return res.json({
      success: true,
      data: verificationData
    });
  } catch (err) {
    console.warn(`[Public Verification Lookup Warning] '${req.params.qrCode}': ${err.message}`);
    return res.status(404).json({
      success: false,
      error: `No provenance record found for identifier '${req.params.qrCode}'.`
    });
  }
}

module.exports = { verifyProduct };
