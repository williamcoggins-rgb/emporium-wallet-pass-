const QRCode = require('qrcode');
const config = require('../config');

async function generateQRCode(passId, options = {}) {
  const url = `${config.baseUrl}/pass/${passId}/download`;
  const qrOptions = {
    width: options.width || 300,
    margin: options.margin || 2,
    color: {
      dark: options.darkColor || '#000000',
      light: options.lightColor || '#ffffff',
    },
  };

  const dataUrl = await QRCode.toDataURL(url, qrOptions);
  return { dataUrl, downloadUrl: url };
}

async function generateQRCodeBuffer(passId, options = {}) {
  const url = `${config.baseUrl}/pass/${passId}/download`;
  const qrOptions = {
    width: options.width || 300,
    margin: options.margin || 2,
    type: 'png',
  };

  const buffer = await QRCode.toBuffer(url, qrOptions);
  return { buffer, downloadUrl: url };
}

module.exports = { generateQRCode, generateQRCodeBuffer };
