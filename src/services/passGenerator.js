const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const passStore = require('./passStore');

const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');

// Minimal 29x29 white PNG icon (base64-encoded)
const ICON_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAJklEQVRIS+3BAQ' +
  'EAAACCIP+vbkhAAQAAAAAAAAAAAAAAAADcGwodAAH/dGkLAAAAAElFTkSuQmCC';

// Minimal 58x58 white PNG icon@2x
const ICON_2X_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAKElEQVRoQ+3BAQ' +
  'EAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAB8GToaAAGfKQMRAAAAAElFTkSuQmCC';

function renderTemplate(template, vars) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }
  return result;
}

function sha1(buffer) {
  return crypto.createHash('sha1').update(buffer).digest('hex');
}

async function generatePass(options = {}) {
  const {
    description = 'Emporium Wallet Pass',
    primaryLabel = 'PASS',
    primaryValue = 'Emporium',
    secondaryLabel = 'Member',
    secondaryValue = 'General Admission',
    barcodeMessage = null,
    teamIdentifier = 'EMPORIUM01',
    passTypeIdentifier = 'pass.com.emporium.wallet',
  } = options;

  const serialNumber = uuidv4();
  const barcodeMsg = barcodeMessage || `${config.baseUrl}/verify/${serialNumber}`;

  // Render pass.json from template
  const templateSrc = fs.readFileSync(path.join(TEMPLATE_DIR, 'pass.json'), 'utf8');
  const passJson = renderTemplate(templateSrc, {
    serialNumber,
    teamIdentifier,
    passTypeIdentifier,
    description,
    primaryLabel,
    primaryValue,
    secondaryLabel,
    secondaryValue,
    barcodeMessage: barcodeMsg,
  });

  // Prepare file buffers
  const passJsonBuf = Buffer.from(passJson, 'utf8');
  const iconBuf = Buffer.from(ICON_PNG_BASE64, 'base64');
  const icon2xBuf = Buffer.from(ICON_2X_PNG_BASE64, 'base64');

  // Build manifest.json (SHA1 hashes of all files)
  const manifest = {
    'pass.json': sha1(passJsonBuf),
    'icon.png': sha1(iconBuf),
    'icon@2x.png': sha1(icon2xBuf),
  };
  const manifestBuf = Buffer.from(JSON.stringify(manifest), 'utf8');

  // Create .pkpass archive (ZIP)
  const filename = `emporium-${serialNumber.slice(0, 8)}.pkpass`;
  const outputPath = path.join(config.passStoragePath, filename);

  if (!fs.existsSync(config.passStoragePath)) {
    fs.mkdirSync(config.passStoragePath, { recursive: true });
  }

  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);

    archive.append(passJsonBuf, { name: 'pass.json' });
    archive.append(iconBuf, { name: 'icon.png' });
    archive.append(icon2xBuf, { name: 'icon@2x.png' });
    archive.append(manifestBuf, { name: 'manifest.json' });

    archive.finalize();
  });

  // Register in the pass store
  const fileStats = fs.statSync(outputPath);
  const fakeFile = {
    path: outputPath,
    originalname: filename,
    mimetype: 'application/vnd.apple.pkpass',
    size: fileStats.size,
  };

  // storePass copies then deletes, so we need a temp copy
  const tmpPath = outputPath + '.tmp';
  fs.copyFileSync(outputPath, tmpPath);
  fakeFile.path = tmpPath;

  const storedPass = passStore.storePass(fakeFile, {
    label: options.label || description,
  });

  return {
    ...storedPass,
    serialNumber,
    downloadUrl: `${config.baseUrl}/pass/${storedPass.id}/download`,
    qrUrl: `${config.baseUrl}/pass/${storedPass.id}/qr`,
    pageUrl: `${config.baseUrl}/pass/${storedPass.id}`,
  };
}

module.exports = { generatePass };
