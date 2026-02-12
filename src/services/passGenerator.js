const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const passStore = require('./passStore');

const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');

// 29x29 branded teal icon with "E" for Emporium (base64 PNG)
const ICON_PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAP0lEQVR4nGNg2L/sP93xqKWjlo5aSnVLSQWjlpJt6YDE6cixlKK4HFKWjpw4HXQJiWiHjVpKUzxq6ailQ9ZSALIAik3OQY/xAAAAAElFTkSuQmCC';

// 58x58 branded teal icon@2x with "E" for Emporium (base64 PNG)
const ICON_2X_PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAdElEQVR4nO3YwQkAIQwEQPsvxDYs7WxBJGckzsJ+w843rY3+PdH0AaCgoKCgFZs+ABQUFBS0YqMO/RlQUFBQ0FVo1H1QUFBQ0BXobkBBQUFDoeGDQUFBQUF9GEBBQUEPQ69v+gBQUFBQ0IpNHwAKCgr6EnQCNu02D71nGncAAAAASUVORK5CYII=';

function generateMemberId() {
  return 'EG-' + String(Math.floor(10000 + Math.random() * 90000));
}

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
    teamIdentifier = 'EMPORIUM01',
    passTypeIdentifier = 'pass.com.emporium.grooming',
    memberName = 'Jane Doe',
    status = 'Active',
    memberSince = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    memberId = generateMemberId(),
    barcodeMessage = null,
  } = options;

  const serialNumber = uuidv4();
  const barcodeMsg = barcodeMessage || `${config.baseUrl}/verify/${serialNumber}`;
  const description = `Emporium Grooming - ${memberName}`;

  // Build pass.json from template
  const templateSrc = fs.readFileSync(path.join(TEMPLATE_DIR, 'pass.json'), 'utf8');
  const passJson = renderTemplate(templateSrc, {
    serialNumber,
    teamIdentifier,
    passTypeIdentifier,
    description,
    memberName,
    status,
    memberSince,
    memberId,
    barcodeMessage: barcodeMsg,
  });

  // Prepare file buffers
  const passJsonBuf = Buffer.from(passJson, 'utf8');
  const iconBuf = Buffer.from(ICON_PNG_BASE64, 'base64');
  const icon2xBuf = Buffer.from(ICON_2X_PNG_BASE64, 'base64');

  const manifest = {
    'pass.json': sha1(passJsonBuf),
    'icon.png': sha1(iconBuf),
    'icon@2x.png': sha1(icon2xBuf),
  };
  const manifestBuf = Buffer.from(JSON.stringify(manifest), 'utf8');

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

  const fileStats = fs.statSync(outputPath);
  const tmpPath = outputPath + '.tmp';
  fs.copyFileSync(outputPath, tmpPath);

  const storedPass = passStore.storePass({
    path: tmpPath,
    originalname: filename,
    mimetype: 'application/vnd.apple.pkpass',
    size: fileStats.size,
  }, {
    label: options.label || description,
    // Store membership data alongside pass metadata
    member: { memberName, status, memberSince, memberId },
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
