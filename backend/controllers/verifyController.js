const { getFabricGateway } = require('../config/fabricConnection');

async function verifyProduct(req, res) {
  try {
    const { qrCode } = req.params;

    if (!qrCode) {
      return res.status(400).json({ success: false, error: 'QR Code identifier is required.' });
    }

    const fabric = getFabricGateway();
    const resultJson = await fabric.evaluateTransaction('VerifyProduct', qrCode);
    const verificationData = JSON.parse(resultJson);

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
