/*
 * Emporium Grooming & Supply - Wallet Pass Design Preview
 *
 * Design tokens:
 *   Primary:    #00BFA6 (teal)
 *   Accent:     #E8475F (coral)
 *   Card bg:    #FFFFFF (white)
 *   Page bg:    #0F1117 (dark)
 *   Text dark:  #1A1A1A
 *   Muted:      #999999
 *
 * Font: Anton (Nike Air Max bold condensed style)
 */

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="#00BFA6"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="20" fill="#0F1117">E</text>
</svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`;

function baseStyles() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');

    :root {
      --bg: #0F1117;
      --card: #FFFFFF;
      --border: #E5E7EB;
      --text: #F0F0F5;
      --text-dark: #1A1A1A;
      --text-secondary: #666666;
      --muted: #999999;
      --primary: #00BFA6;
      --accent: #E8475F;
      --green-dot: #34D399;
      --font-display: 'Anton', 'Impact', 'Arial Black', sans-serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { font-size: 16px; -webkit-font-smoothing: antialiased; }
    body {
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.5;
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; }
    }
  `;
}

function defaultMember() {
  return {
    memberName: 'Jane Doe',
    status: 'Active',
    memberSince: 'Feb 2026',
    memberId: 'EG-00482',
  };
}

function renderDownloadPage(pass, baseUrl) {
  const m = (pass.member && pass.member.memberName) ? pass.member : defaultMember();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emporium Grooming &amp; Supply - Wallet Pass</title>
  <link rel="icon" href="${LOGO_DATA_URI}">
  <style>
    ${baseStyles()}

    .page { padding: 40px 24px 60px; }
    .page-title {
      text-align: center;
      font-family: var(--font-display);
      font-size: 14px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 48px;
    }

    .previews {
      display: flex;
      justify-content: center;
      gap: 48px;
      flex-wrap: wrap;
      max-width: 960px;
      margin: 0 auto;
    }
    .preview-col {
      flex: 0 1 380px;
      min-width: 300px;
    }
    .preview-label {
      text-align: center;
      font-family: var(--font-display);
      letter-spacing: 3px;
      text-transform: uppercase;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 20px;
    }

    /* ---- WHITE CARD (shared) ---- */
    .wallet-card {
      background: var(--card);
      border-radius: 20px;
      padding: 32px 28px 28px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
      color: var(--text-dark);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
    }
    .card-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-logo img { width: 34px; height: 34px; border-radius: 8px; }
    .card-logo-text {
      font-family: var(--font-display);
      font-size: 20px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-dark);
    }
    .card-logo-text span { color: var(--primary); }
    .card-type {
      font-family: var(--font-display);
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--muted);
    }

    .card-name {
      font-family: var(--font-display);
      font-size: 42px;
      line-height: 1;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-dark);
      margin-bottom: 32px;
    }

    .card-fields {
      display: flex;
      gap: 0;
      margin-bottom: 8px;
    }
    .card-field { flex: 1; }
    .card-field-label {
      font-family: var(--font-display);
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .card-field-value {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-dark);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--green-dot);
    }

    .card-divider {
      height: 1px;
      background: var(--border);
      margin: 20px 0;
    }

    .card-qr {
      text-align: center;
      padding-top: 8px;
    }
    .card-qr-frame {
      display: inline-block;
      padding: 12px;
      border: 2px solid var(--border);
      border-radius: 14px;
    }
    .card-qr-frame img {
      display: block;
      width: 140px;
      height: 140px;
    }
    .card-qr-text {
      margin-top: 10px;
      font-size: 12px;
      color: var(--muted);
    }

    /* Apple-specific accent stripe */
    .apple-card { border-top: 4px solid var(--primary); }
    /* Google-specific accent stripe */
    .google-card { border-top: 4px solid #4285F4; }

    /* ---- ACTIONS BAR ---- */
    .actions-bar {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 48px;
      flex-wrap: wrap;
      max-width: 960px;
      margin-left: auto;
      margin-right: auto;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 28px;
      border: none;
      border-radius: 12px;
      font-family: var(--font-display);
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      line-height: 1;
    }
    .btn-primary {
      background: var(--primary);
      color: var(--bg);
    }
    .btn-primary:hover {
      background: #00D9BD;
      color: var(--bg);
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(0,191,166,0.3);
    }
    .btn-outline {
      background: transparent;
      color: var(--text);
      border: 1px solid rgba(255,255,255,0.15);
    }
    .btn-outline:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    .footer {
      text-align: center;
      margin-top: 48px;
      padding: 24px;
      font-size: 12px;
      color: var(--muted);
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    @media (max-width: 720px) {
      .previews { gap: 32px; }
      .preview-col { flex: 1 1 100%; max-width: 400px; }
      .page { padding: 24px 16px 40px; }
      .page-title { margin-bottom: 32px; }
      .card-name { font-size: 34px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="page-title">Emporium &mdash; Wallet Pass</div>

    <div class="previews">
      <!-- APPLE WALLET -->
      <div class="preview-col">
        <div class="preview-label">Apple Wallet</div>
        <div class="wallet-card apple-card">
          <div class="card-header">
            <div class="card-logo">
              <img src="${LOGO_DATA_URI}" alt="Emporium">
              <div class="card-logo-text">Emporium<span>.</span></div>
            </div>
            <div class="card-type">Member</div>
          </div>
          <div class="card-name">${escapeHtml(m.memberName)}</div>
          <div class="card-fields">
            <div class="card-field">
              <div class="card-field-label">Member Since</div>
              <div class="card-field-value">${escapeHtml(m.memberSince)}</div>
            </div>
            <div class="card-field">
              <div class="card-field-label">Member ID</div>
              <div class="card-field-value">${escapeHtml(m.memberId)}</div>
            </div>
            <div class="card-field">
              <div class="card-field-label">Status</div>
              <div class="card-field-value">${escapeHtml(m.status)} <span class="status-dot"></span></div>
            </div>
          </div>
          <div class="card-divider"></div>
          <div class="card-qr">
            <div class="card-qr-frame">
              <img src="${baseUrl}/pass/${pass.id}/qr" alt="QR Code">
            </div>
            <div class="card-qr-text">Scan to earn &amp; redeem</div>
          </div>
        </div>
      </div>

      <!-- GOOGLE WALLET -->
      <div class="preview-col">
        <div class="preview-label">Google Wallet</div>
        <div class="wallet-card google-card">
          <div class="card-header">
            <div class="card-logo">
              <img src="${LOGO_DATA_URI}" alt="Emporium">
              <div class="card-logo-text">Emporium<span>.</span></div>
            </div>
            <div class="card-type">Member</div>
          </div>
          <div class="card-name">${escapeHtml(m.memberName)}</div>
          <div class="card-fields">
            <div class="card-field">
              <div class="card-field-label">Member Since</div>
              <div class="card-field-value">${escapeHtml(m.memberSince)}</div>
            </div>
            <div class="card-field">
              <div class="card-field-label">Member ID</div>
              <div class="card-field-value">${escapeHtml(m.memberId)}</div>
            </div>
            <div class="card-field">
              <div class="card-field-label">Status</div>
              <div class="card-field-value">${escapeHtml(m.status)} <span class="status-dot"></span></div>
            </div>
          </div>
          <div class="card-divider"></div>
          <div class="card-qr">
            <div class="card-qr-frame">
              <img src="${baseUrl}/pass/${pass.id}/qr" alt="QR Code">
            </div>
            <div class="card-qr-text">Scan to earn &amp; redeem</div>
          </div>
        </div>
      </div>
    </div>

    <div class="actions-bar">
      <a class="btn btn-primary" href="${baseUrl}/pass/${pass.id}/download">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>
        Add to Apple Wallet
      </a>
      <a class="btn btn-primary" href="${baseUrl}/pass/${pass.id}/download">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Add to Google Wallet
      </a>
      <button class="btn btn-outline" onclick="navigator.share ? navigator.share({title:'Emporium Wallet Pass', url:window.location.href}) : navigator.clipboard.writeText(window.location.href).then(()=>this.textContent='Link copied!')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        Share
      </button>
    </div>

    <div class="footer">
      Emporium Grooming &amp; Supply &middot; Works with Apple Wallet &amp; Google Wallet
    </div>
  </div>
</body>
</html>`;
}

function renderListPage(passes, baseUrl) {
  const passItems = passes.map(p => {
    const m = (p.member && p.member.memberName) ? p.member : defaultMember();
    return `
    <a href="${baseUrl}/pass/${p.id}" class="pass-row">
      <div class="pass-row-avatar">${escapeHtml(m.memberName).charAt(0)}</div>
      <div class="pass-row-info">
        <div class="pass-row-name">${escapeHtml(m.memberName)}</div>
        <div class="pass-row-meta">${escapeHtml(m.memberId)} &middot; ${escapeHtml(m.status)}</div>
      </div>
      <div class="pass-row-end">
        <span class="badge-active"><span class="badge-dot"></span> ${escapeHtml(m.status)}</span>
      </div>
    </a>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallet Passes - Emporium Grooming &amp; Supply</title>
  <link rel="icon" href="${LOGO_DATA_URI}">
  <style>
    ${baseStyles()}

    .page {
      max-width: 640px;
      margin: 0 auto;
      padding: 0 24px 60px;
    }
    .header-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      margin-bottom: 32px;
    }
    .header-bar img { width: 36px; height: 36px; border-radius: 8px; }
    .header-brand {
      font-family: var(--font-display);
      font-size: 20px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .header-brand span { color: var(--primary); }

    .list-title {
      font-family: var(--font-display);
      font-size: 36px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .list-subtitle {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 24px;
    }

    .pass-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      margin-bottom: 12px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.2s;
    }
    .pass-row:hover {
      background: rgba(255,255,255,0.08);
      border-color: var(--primary);
      box-shadow: 0 0 0 1px var(--primary), 0 0 30px rgba(0,191,166,0.12);
      color: var(--text);
      transform: translateY(-1px);
    }
    .pass-row-avatar {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--primary), #009E8B);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-size: 20px;
      color: var(--bg);
      flex-shrink: 0;
    }
    .pass-row-info { flex: 1; min-width: 0; }
    .pass-row-name {
      font-family: var(--font-display);
      font-size: 16px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pass-row-meta {
      font-size: 13px;
      color: var(--muted);
      margin-top: 2px;
    }
    .pass-row-end { flex-shrink: 0; }
    .badge-active {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      background: rgba(52,211,153,0.12);
      color: #34D399;
    }
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: currentColor;
    }

    .empty-state {
      text-align: center;
      padding: 64px 24px;
    }
    .empty-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.04);
      border-radius: 16px;
      color: var(--muted);
    }
    .empty-icon svg { width: 28px; height: 28px; }
    .empty-title {
      font-family: var(--font-display);
      font-size: 24px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .empty-desc {
      color: var(--muted);
      font-size: 15px;
      max-width: 300px;
      margin: 0 auto 24px;
    }
    .btn-create {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: var(--primary);
      color: var(--bg);
      border: none;
      border-radius: 10px;
      font-family: var(--font-display);
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
    }
    .btn-create:hover { background: #00D9BD; }

    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 12px;
      color: var(--muted);
    }

    @media (max-width: 480px) {
      .pass-row-end .badge-active { display: none; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header-bar">
      <img src="${LOGO_DATA_URI}" alt="Emporium">
      <div class="header-brand">Emporium <span>Grooming</span></div>
    </div>

    <div class="list-title">Wallet Passes</div>
    <div class="list-subtitle">${passes.length > 0 ? `${passes.length} pass${passes.length !== 1 ? 'es' : ''}` : ''}</div>

    ${passes.length === 0 ? `
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>
        </div>
        <div class="empty-title">No passes yet</div>
        <p class="empty-desc">Create your first pass to start distributing to customers.</p>
        <button class="btn-create" onclick="fetch('${baseUrl}/pass/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})}).then(r=>r.json()).then(()=>location.reload())">
          Create a Pass
        </button>
      </div>
    ` : passItems}

    <div class="footer">Emporium Grooming &amp; Supply</div>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, c => map[c]);
}

module.exports = { renderDownloadPage, renderListPage };
