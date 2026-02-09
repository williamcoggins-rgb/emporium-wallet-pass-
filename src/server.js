const express = require('express');
const path = require('path');
const config = require('./config');
const passRoutes = require('./routes/passRoutes');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.redirect('/passes');
});

app.use(passRoutes);

// Error handler
app.use((err, req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum size is 10MB.' });
  }
  if (err.message && err.message.includes('File type not allowed')) {
    return res.status(400).json({ error: err.message });
  }
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.port, config.host, () => {
  console.log(`Emporium Wallet Pass server running at http://${config.host}:${config.port}`);
  console.log(`Base URL: ${config.baseUrl}`);
  console.log(`Pass storage: ${config.passStoragePath}`);
  console.log(`Email delivery: ${require('./services/emailDelivery').isConfigured() ? 'configured' : 'not configured (set SMTP_* env vars)'}`);
});

module.exports = app;
