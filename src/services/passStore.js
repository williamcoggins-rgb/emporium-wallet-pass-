const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

const metadataFile = path.join(config.passStoragePath, 'metadata.json');

function ensureStorageDir() {
  if (!fs.existsSync(config.passStoragePath)) {
    fs.mkdirSync(config.passStoragePath, { recursive: true });
  }
}

function loadMetadata() {
  ensureStorageDir();
  if (!fs.existsSync(metadataFile)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
}

function saveMetadata(metadata) {
  ensureStorageDir();
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
}

function storePass(file, options = {}) {
  const id = uuidv4();
  const ext = path.extname(file.originalname) || '.pkpass';
  const filename = `${id}${ext}`;
  const destPath = path.join(config.passStoragePath, filename);

  fs.copyFileSync(file.path, destPath);
  fs.unlinkSync(file.path);

  const metadata = loadMetadata();
  metadata[id] = {
    id,
    filename,
    originalName: file.originalname,
    mimeType: file.mimetype || 'application/vnd.apple.pkpass',
    size: file.size,
    label: options.label || file.originalname,
    member: options.member || null,
    createdAt: new Date().toISOString(),
    downloadCount: 0,
  };
  saveMetadata(metadata);

  return metadata[id];
}

function getPass(id) {
  const metadata = loadMetadata();
  const entry = metadata[id];
  if (!entry) return null;

  const filePath = path.join(config.passStoragePath, entry.filename);
  if (!fs.existsSync(filePath)) return null;

  return { ...entry, filePath };
}

function recordDownload(id) {
  const metadata = loadMetadata();
  if (metadata[id]) {
    metadata[id].downloadCount = (metadata[id].downloadCount || 0) + 1;
    metadata[id].lastDownloadAt = new Date().toISOString();
    saveMetadata(metadata);
  }
}

function listPasses() {
  const metadata = loadMetadata();
  return Object.values(metadata).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

function deletePass(id) {
  const metadata = loadMetadata();
  const entry = metadata[id];
  if (!entry) return false;

  const filePath = path.join(config.passStoragePath, entry.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  delete metadata[id];
  saveMetadata(metadata);
  return true;
}

module.exports = { storePass, getPass, recordDownload, listPasses, deletePass };
