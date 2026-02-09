const express = require('express');
const passStore = require('../services/passStore');
const passGenerator = require('../services/passGenerator');
const qrGenerator = require('../services/qrGenerator');
const emailDelivery = require('../services/emailDelivery');
const upload = require('../middleware/upload');
const config = require('../config');
const { renderDownloadPage, renderListPage } = require('../views/pages');

const router = express.Router();

// Generate a new wallet pass
router.post('/pass/generate', express.json(), async (req, res) => {
  const pass = await passGenerator.generatePass(req.body || {});
  res.status(201).json(pass);
});

// Upload a new wallet pass
router.post('/pass/upload', upload.single('passFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded. Use field name "passFile".' });
  }

  const pass = passStore.storePass(req.file, {
    label: req.body.label,
  });

  res.status(201).json({
    id: pass.id,
    label: pass.label,
    downloadUrl: `${config.baseUrl}/pass/${pass.id}/download`,
    qrUrl: `${config.baseUrl}/pass/${pass.id}/qr`,
    pageUrl: `${config.baseUrl}/pass/${pass.id}`,
  });
});

// Download a wallet pass file
router.get('/pass/:id/download', (req, res) => {
  const pass = passStore.getPass(req.params.id);
  if (!pass) {
    return res.status(404).json({ error: 'Pass not found' });
  }

  passStore.recordDownload(pass.id);

  const contentType = pass.originalName.endsWith('.pkpass')
    ? 'application/vnd.apple.pkpass'
    : 'application/octet-stream';

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename="${pass.originalName}"`);
  res.sendFile(pass.filePath);
});

// Get QR code for a pass (as PNG image)
router.get('/pass/:id/qr', async (req, res) => {
  const pass = passStore.getPass(req.params.id);
  if (!pass) {
    return res.status(404).json({ error: 'Pass not found' });
  }

  const { buffer } = await qrGenerator.generateQRCodeBuffer(pass.id);
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
});

// Get QR code as data URL (JSON)
router.get('/pass/:id/qr.json', async (req, res) => {
  const pass = passStore.getPass(req.params.id);
  if (!pass) {
    return res.status(404).json({ error: 'Pass not found' });
  }

  const qr = await qrGenerator.generateQRCode(pass.id);
  res.json({ passId: pass.id, ...qr });
});

// Web download page for a pass
router.get('/pass/:id', (req, res) => {
  const pass = passStore.getPass(req.params.id);
  if (!pass) {
    return res.status(404).send('<h1>Pass not found</h1>');
  }

  const html = renderDownloadPage(pass, config.baseUrl);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Send pass via email
router.post('/pass/:id/send', express.json(), async (req, res) => {
  const { email, subject, message } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  if (!emailDelivery.isConfigured()) {
    return res.status(503).json({
      error: 'Email delivery is not configured. Set SMTP environment variables.',
    });
  }

  const pass = passStore.getPass(req.params.id);
  if (!pass) {
    return res.status(404).json({ error: 'Pass not found' });
  }

  const result = await emailDelivery.sendPass(pass.id, email, { subject, message });
  res.json({ success: true, messageId: result.messageId });
});

// Get pass metadata
router.get('/pass/:id/info', (req, res) => {
  const pass = passStore.getPass(req.params.id);
  if (!pass) {
    return res.status(404).json({ error: 'Pass not found' });
  }

  const { filePath, ...info } = pass;
  res.json(info);
});

// List all passes
router.get('/passes', (req, res) => {
  if (req.accepts('html')) {
    const passes = passStore.listPasses();
    const html = renderListPage(passes, config.baseUrl);
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }

  const passes = passStore.listPasses().map(({ filePath, ...p }) => p);
  res.json({ passes });
});

// Delete a pass
router.delete('/pass/:id', (req, res) => {
  const deleted = passStore.deletePass(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Pass not found' });
  }
  res.json({ success: true });
});

module.exports = router;
