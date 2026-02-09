const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Set up test config before requiring app
process.env.PORT = '0';
process.env.PASS_STORAGE_PATH = path.join(__dirname, '..', 'test-passes');

const app = require('./server');

let server;
let baseUrl;

function request(method, urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, baseUrl);
    const req = http.request(url, { method, headers: options.headers || {} }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body.toString(),
          json() { return JSON.parse(body.toString()); },
        });
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

describe('Wallet Pass Server', () => {
  before((_, done) => {
    server = app.listen(0, () => {
      const addr = server.address();
      baseUrl = `http://127.0.0.1:${addr.port}`;
      done();
    });
  });

  after((_, done) => {
    // Cleanup test passes directory
    const testDir = path.join(__dirname, '..', 'test-passes');
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    server.close(done);
  });

  it('redirects / to /passes', async () => {
    const res = await request('GET', '/');
    assert.strictEqual(res.status, 302);
    assert.ok(res.headers.location.includes('/passes'));
  });

  it('returns empty passes list as JSON', async () => {
    const res = await request('GET', '/passes', {
      headers: { Accept: 'application/json' },
    });
    assert.strictEqual(res.status, 200);
    const data = res.json();
    assert.ok(Array.isArray(data.passes));
    assert.strictEqual(data.passes.length, 0);
  });

  it('returns 404 for non-existent pass', async () => {
    const res = await request('GET', '/pass/nonexistent/download');
    assert.strictEqual(res.status, 404);
  });

  it('returns 404 for non-existent pass info', async () => {
    const res = await request('GET', '/pass/nonexistent/info');
    assert.strictEqual(res.status, 404);
  });

  it('returns 400 when uploading without file', async () => {
    const boundary = '----TestBoundary' + Date.now();
    const body = `--${boundary}--\r\n`;
    const res = await request('POST', '/pass/upload', {
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
      body,
    });
    assert.strictEqual(res.status, 400);
  });

  it('generates a wallet pass via POST /pass/generate', async () => {
    const body = JSON.stringify({
      description: 'Test Pass',
      primaryLabel: 'EVENT',
      primaryValue: 'Test Event',
      secondaryLabel: 'Seat',
      secondaryValue: 'A1',
    });
    const res = await request('POST', '/pass/generate', {
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    assert.strictEqual(res.status, 201);
    const data = res.json();
    assert.ok(data.id);
    assert.ok(data.downloadUrl);
    assert.ok(data.qrUrl);
    assert.ok(data.pageUrl);
    assert.ok(data.serialNumber);

    // Verify the pass can be downloaded
    const dlRes = await request('GET', `/pass/${data.id}/download`);
    assert.strictEqual(dlRes.status, 200);
    assert.ok(dlRes.headers['content-type'].includes('application/vnd.apple.pkpass'));
  });

  it('shows generated pass on the web page', async () => {
    const body = JSON.stringify({ memberName: 'Test Member' });
    const genRes = await request('POST', '/pass/generate', {
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const data = genRes.json();

    const pageRes = await request('GET', `/pass/${data.id}`);
    assert.strictEqual(pageRes.status, 200);
    assert.ok(pageRes.body.includes('Test Member'));
    assert.ok(pageRes.body.includes('Apple Wallet'));
    assert.ok(pageRes.body.includes('Google Wallet'));
  });

  it('lists generated passes', async () => {
    const res = await request('GET', '/passes', {
      headers: { Accept: 'application/json' },
    });
    assert.strictEqual(res.status, 200);
    const data = res.json();
    assert.ok(data.passes.length >= 1);
  });
});
