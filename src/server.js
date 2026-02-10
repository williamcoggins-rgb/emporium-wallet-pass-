const express = require('express');
const path = require('path');
const config = require('./config');
const passRoutes = require('./routes/passRoutes');
const passStore = require('./services/passStore');
const passGenerator = require('./services/passGenerator');

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

app.listen(config.port, config.host, async () => {
  console.log(`Emporium Wallet Pass server running at http://${config.host}:${config.port}`);
  console.log(`Base URL: ${config.baseUrl}`);
  console.log(`Pass storage: ${config.passStoragePath}`);
  console.log(`Email delivery: ${require('./services/emailDelivery').isConfigured() ? 'configured' : 'not configured (set SMTP_* env vars)'}`);

  // Auto-generate sample passes if none exist (one Regular, one VIP)
  const existing = passStore.listPasses();
  if (existing.length === 0) {
    try {
      const vip = await passGenerator.generatePass({
        memberName: 'Jane Doe',
        tier: 'VIP',
        points: 1250,
        pointsMax: 1500,
        status: 'Active',
        memberSince: 'Feb 2026',
        totalVisits: 24,
        saved: '$186',
        label: 'Emporium Grooming & Supply - VIP',
      });
      console.log(`Default VIP pass generated: ${vip.pageUrl}`);
      const regular = await passGenerator.generatePass({
        memberName: 'Mike Johnson',
        tier: 'Regular',
        points: 340,
        pointsMax: 1000,
        status: 'Active',
        memberSince: 'Jan 2026',
        totalVisits: 8,
        saved: '$52',
        label: 'Emporium Grooming & Supply - Regular',
      });
      console.log(`Default Regular pass generated: ${regular.pageUrl}`);
    } catch (err) {
      console.error('Failed to generate default passes:', err.message);
    }
  } else {
    console.log(`${existing.length} pass(es) already available`);
  }
});

module.exports = app;
