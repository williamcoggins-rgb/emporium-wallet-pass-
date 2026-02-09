const path = require('path');

const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  passStoragePath: process.env.PASS_STORAGE_PATH || path.join(__dirname, '..', 'passes'),
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
