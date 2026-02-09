const path = require('path');
const os = require('os');

const isVercel = !!process.env.VERCEL;

function getDefaultStoragePath() {
  if (isVercel) return path.join(os.tmpdir(), 'passes');
  return path.join(__dirname, '..', 'passes');
}

function getDefaultBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  baseUrl: process.env.BASE_URL || getDefaultBaseUrl(),
  passStoragePath: process.env.PASS_STORAGE_PATH || getDefaultStoragePath(),
  isVercel,
  maxFileSize: 10 * 1024 * 1024, // 10MB

  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'noreply@emporium-wallet.com',
  },
};

module.exports = config;
