const express = require('express');
const path = require('path');
const config = require('../src/config');
const passRoutes = require('../src/routes/passRoutes');
const passStore = require('../src/services/passStore');
const passGenerator = require('../src/services/passGenerator');

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

// Ensure a default pass exists (serverless /tmp is ephemeral)
let initialized = false;
async function ensureDefaultPass() {
  if (initialized) return;
  initialized = true;
  const existing = passStore.listPasses();
  if (existing.length === 0) {
    try {
      await passGenerator.generatePass({
        description: 'Emporium Wallet Pass',
        primaryLabel: 'EMPORIUM',
        primaryValue: 'Wallet Pass',
        secondaryLabel: 'Type',
        secondaryValue: 'General Access',
        label: 'Emporium Wallet Pass',
      });
    } catch (err) {
      console.error('Failed to generate default pass:', err.message);
    }
  }
}

// Wrap with initialization middleware
const handler = async (req, res) => {
  await ensureDefaultPass();
  app(req, res);
};

module.exports = handler;
