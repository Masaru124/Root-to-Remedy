const QRCode = require('qrcode');

/**
 * Generates a base64 PNG Data URL for a given product payload.
 * @param {string} payload - Product ID or verification URL
 * @returns {Promise<string>} Base64 Data URL (e.g. data:image/png;base64,...)
 */
async function generateQR(payload) {
  try {
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      scale: 8,
      color: {
        dark: '#0d1117',  // Dark primary theme match
        light: '#ffffff'
      }
    };
    const qrDataUrl = await QRCode.toDataURL(payload, opts);
    return qrDataUrl;
  } catch (err) {
    throw new Error(`Failed to generate QR code: ${err.message}`);
  }
}

module.exports = { generateQR };
