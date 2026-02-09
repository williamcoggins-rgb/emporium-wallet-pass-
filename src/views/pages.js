function renderDownloadPage(pass, baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pass.label)} - Wallet Pass</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f7;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.1);
      padding: 40px;
      max-width: 420px;
      width: 100%;
      text-align: center;
    }
    .card h1 {
      font-size: 22px;
      color: #1d1d1f;
      margin-bottom: 8px;
    }
    .card p {
      color: #86868b;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .qr-container {
      margin: 24px auto;
    }
    .qr-container img {
      width: 200px;
      height: 200px;
      border-radius: 8px;
    }
    .download-btn {
      display: inline-block;
      background: #0071e3;
      color: white;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      transition: background 0.2s;
      margin-top: 16px;
    }
    .download-btn:hover { background: #0077ed; }
    .info {
      margin-top: 24px;
      font-size: 12px;
      color: #86868b;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>${escapeHtml(pass.label)}</h1>
    <p>Scan the QR code or tap the button below to add this pass to your wallet.</p>
    <div class="qr-container">
      <img src="${baseUrl}/pass/${pass.id}/qr" alt="QR Code" />
    </div>
    <a class="download-btn" href="${baseUrl}/pass/${pass.id}/download">
      Add to Wallet
    </a>
    <p class="info">
      Works with Apple Wallet and compatible wallet apps.<br>
      Downloaded ${pass.downloadCount} time${pass.downloadCount !== 1 ? 's' : ''}.
    </p>
  </div>
</body>
</html>`;
}

function renderListPage(passes, baseUrl) {
  const passItems = passes.map(p => `
    <div class="pass-item">
      <div class="pass-info">
        <strong>${escapeHtml(p.label)}</strong>
        <span class="meta">Uploaded ${new Date(p.createdAt).toLocaleDateString()} &middot; ${p.downloadCount} downloads</span>
      </div>
      <div class="pass-actions">
        <a href="${baseUrl}/pass/${p.id}">View</a>
        <a href="${baseUrl}/pass/${p.id}/download">Download</a>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallet Passes - Emporium</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f7;
      padding: 40px 20px;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
    }
    h1 { color: #1d1d1f; margin-bottom: 24px; }
    .pass-item {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .pass-info strong { display: block; color: #1d1d1f; }
    .pass-info .meta { font-size: 13px; color: #86868b; }
    .pass-actions a {
      color: #0071e3;
      text-decoration: none;
      margin-left: 16px;
      font-size: 14px;
      font-weight: 500;
    }
    .pass-actions a:hover { text-decoration: underline; }
    .empty { text-align: center; color: #86868b; padding: 60px 0; }
    .upload-hint {
      text-align: center;
      margin-top: 24px;
      color: #86868b;
      font-size: 14px;
    }
    code {
      background: #e8e8ed;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Wallet Passes</h1>
    ${passes.length === 0 ? '<p class="empty">No passes uploaded yet.</p>' : passItems}
    <p class="upload-hint">
      Upload a pass: <code>curl -F passFile=@yourpass.pkpass ${baseUrl}/pass/upload</code>
    </p>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, c => map[c]);
}

module.exports = { renderDownloadPage, renderListPage };
