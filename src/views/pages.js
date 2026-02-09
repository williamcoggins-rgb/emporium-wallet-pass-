/*
 * Emporium Grooming & Supply - Wallet Pass UI
 *
 * Design tokens derived from brand:
 *   Primary:    #00BFA6 (teal from spray can)
 *   Accent:     #E8475F (coral/red from clipper)
 *   Dark bg:    #0F1117
 *   Surface:    #1A1D27
 *   Surface 2:  #242836
 *   Border:     #2E3345
 *   Text:       #F0F0F5
 *   Muted:      #8B8FA3
 *   Success:    #00BFA6
 *   Danger:     #E8475F
 */

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="#00BFA6"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="20" fill="#0F1117">E</text>
</svg>`;

const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`;

function designTokens() {
  return `
    :root {
      --color-primary: #00BFA6;
      --color-primary-hover: #00D9BD;
      --color-primary-subtle: rgba(0,191,166,0.12);
      --color-accent: #E8475F;
      --color-accent-hover: #FF5A72;
      --color-bg: #0F1117;
      --color-surface: #1A1D27;
      --color-surface-2: #242836;
      --color-surface-3: #2E3345;
      --color-border: #2E3345;
      --color-text: #F0F0F5;
      --color-text-secondary: #C0C4D6;
      --color-muted: #8B8FA3;
      --color-success: #00BFA6;
      --color-danger: #E8475F;
      --color-warning: #F5A623;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --radius-xl: 24px;
      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-5: 24px;
      --space-6: 32px;
      --space-7: 48px;
      --space-8: 64px;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
      --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
      --shadow-glow: 0 0 40px rgba(0,191,166,0.15);
      --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  `;
}

function baseStyles() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    ${designTokens()}

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    html { font-size: 16px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

    body {
      font-family: var(--font-sans);
      background: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      line-height: 1.5;
    }

    a { color: var(--color-primary); text-decoration: none; transition: color var(--transition); }
    a:hover { color: var(--color-primary-hover); }

    /* --- Layout --- */
    .page-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .page-header {
      padding: var(--space-5) var(--space-5);
      display: flex;
      align-items: center;
      gap: var(--space-3);
      border-bottom: 1px solid var(--color-border);
      background: var(--color-surface);
      backdrop-filter: blur(12px);
    }
    .page-header .logo {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
    }
    .page-header .brand {
      font-weight: 800;
      font-size: 18px;
      letter-spacing: -0.3px;
      color: var(--color-text);
    }
    .page-header .brand span {
      color: var(--color-primary);
    }
    .page-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-5);
    }
    .page-footer {
      padding: var(--space-5);
      text-align: center;
      font-size: 13px;
      color: var(--color-muted);
      border-top: 1px solid var(--color-border);
    }

    /* --- Badge --- */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }
    .badge--success {
      background: rgba(0,191,166,0.12);
      color: var(--color-success);
    }
    .badge--accent {
      background: rgba(232,71,95,0.12);
      color: var(--color-accent);
    }
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: currentColor;
    }

    /* --- Button --- */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: 14px 32px;
      border: none;
      border-radius: var(--radius-md);
      font-family: var(--font-sans);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: all var(--transition);
      text-decoration: none;
      line-height: 1;
    }
    .btn-primary {
      background: var(--color-primary);
      color: var(--color-bg);
      box-shadow: 0 4px 16px rgba(0,191,166,0.3);
    }
    .btn-primary:hover {
      background: var(--color-primary-hover);
      color: var(--color-bg);
      box-shadow: 0 6px 24px rgba(0,191,166,0.4);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: var(--color-surface-2);
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }
    .btn-secondary:hover {
      background: var(--color-surface-3);
      color: var(--color-text);
      border-color: var(--color-muted);
    }
    .btn-icon {
      width: 20px;
      height: 20px;
    }

    /* --- Responsive --- */
    @media (max-width: 480px) {
      .page-content { padding: var(--space-4); }
      .btn { padding: 12px 24px; font-size: 14px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
    }
  `;
}

function walletIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>`;
}

function downloadIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
}

function shareIcon() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
}

function externalIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
}

function renderDownloadPage(pass, baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pass.label)} - Emporium Grooming &amp; Supply</title>
  <meta name="description" content="Get your ${escapeHtml(pass.label)} wallet pass from Emporium Grooming & Supply">
  <link rel="icon" href="${LOGO_DATA_URI}">
  <style>
    ${baseStyles()}

    .pass-card {
      width: 100%;
      max-width: 400px;
    }
    .pass-visual {
      background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-2) 100%);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      box-shadow: var(--shadow-lg), var(--shadow-glow);
      position: relative;
      overflow: hidden;
    }
    .pass-visual::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(0,191,166,0.06) 0%, transparent 70%);
      pointer-events: none;
    }
    .pass-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-6);
    }
    .pass-brand {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    .pass-brand img {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
    }
    .pass-brand-text {
      font-weight: 800;
      font-size: 16px;
      letter-spacing: -0.3px;
    }
    .pass-brand-text span { color: var(--color-primary); }
    .pass-label-group {
      margin-bottom: var(--space-5);
    }
    .pass-field-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--color-muted);
      margin-bottom: var(--space-1);
    }
    .pass-field-value {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--color-text);
      line-height: 1.2;
    }
    .pass-detail-row {
      display: flex;
      gap: var(--space-5);
      padding-top: var(--space-5);
      border-top: 1px solid var(--color-border);
    }
    .pass-detail {
      flex: 1;
    }
    .pass-detail .pass-field-value {
      font-size: 15px;
      font-weight: 600;
    }

    .qr-section {
      margin-top: var(--space-5);
      text-align: center;
    }
    .qr-frame {
      display: inline-block;
      background: white;
      padding: 12px;
      border-radius: var(--radius-md);
    }
    .qr-frame img {
      display: block;
      width: 160px;
      height: 160px;
    }
    .qr-hint {
      margin-top: var(--space-3);
      font-size: 13px;
      color: var(--color-muted);
    }

    .actions {
      margin-top: var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    .actions .btn { width: 100%; }

    .stats-row {
      margin-top: var(--space-5);
      display: flex;
      justify-content: center;
      gap: var(--space-5);
      font-size: 13px;
      color: var(--color-muted);
    }
    .stat {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .stat-num {
      font-weight: 700;
      color: var(--color-text-secondary);
    }
  </style>
</head>
<body>
  <div class="page-wrapper">
    <header class="page-header">
      <img class="logo" src="${LOGO_DATA_URI}" alt="Emporium">
      <div class="brand">Emporium <span>Grooming</span></div>
    </header>

    <main class="page-content">
      <div class="pass-card">
        <div class="pass-visual">
          <div class="pass-top">
            <div class="pass-brand">
              <img src="${LOGO_DATA_URI}" alt="Emporium">
              <div class="pass-brand-text">Emporium <span>Grooming</span></div>
            </div>
            <span class="badge badge--success"><span class="badge-dot"></span> Active</span>
          </div>
          <div class="pass-label-group">
            <div class="pass-field-label">Wallet Pass</div>
            <div class="pass-field-value">${escapeHtml(pass.label)}</div>
          </div>
          <div class="pass-detail-row">
            <div class="pass-detail">
              <div class="pass-field-label">Type</div>
              <div class="pass-field-value">Digital Pass</div>
            </div>
            <div class="pass-detail">
              <div class="pass-field-label">Issued</div>
              <div class="pass-field-value">${new Date(pass.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>
        </div>

        <div class="qr-section">
          <div class="qr-frame">
            <img src="${baseUrl}/pass/${pass.id}/qr" alt="Scan to add to wallet" />
          </div>
          <p class="qr-hint">Scan with your phone camera to add</p>
        </div>

        <div class="actions">
          <a class="btn btn-primary" href="${baseUrl}/pass/${pass.id}/download">
            ${walletIcon()} Add to Wallet
          </a>
          <button class="btn btn-secondary" onclick="navigator.share ? navigator.share({title:'${escapeHtml(pass.label)}', url:window.location.href}) : navigator.clipboard.writeText(window.location.href).then(()=>this.textContent='Link copied!')">
            ${shareIcon()} Share Pass
          </button>
        </div>

        <div class="stats-row">
          <div class="stat">${downloadIcon()} <span class="stat-num">${pass.downloadCount}</span> download${pass.downloadCount !== 1 ? 's' : ''}</div>
        </div>
      </div>
    </main>

    <footer class="page-footer">
      Emporium Grooming &amp; Supply &middot; Works with Apple Wallet &amp; Google Wallet
    </footer>
  </div>
</body>
</html>`;
}

function renderListPage(passes, baseUrl) {
  const passItems = passes.map(p => `
    <a href="${baseUrl}/pass/${p.id}" class="pass-row">
      <div class="pass-row-icon">
        ${walletIcon()}
      </div>
      <div class="pass-row-info">
        <div class="pass-row-title">${escapeHtml(p.label)}</div>
        <div class="pass-row-meta">
          ${new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          &middot; ${p.downloadCount} download${p.downloadCount !== 1 ? 's' : ''}
        </div>
      </div>
      <div class="pass-row-actions">
        <span class="badge badge--success"><span class="badge-dot"></span> Active</span>
        <span class="pass-row-arrow">${externalIcon()}</span>
      </div>
    </a>
  `).join('');

  const emptyState = `
    <div class="empty-state">
      <div class="empty-icon">
        ${walletIcon()}
      </div>
      <h2 class="empty-title">No passes yet</h2>
      <p class="empty-desc">Create your first wallet pass to start distributing to customers.</p>
      <div style="margin-top: var(--space-5);">
        <button class="btn btn-primary" onclick="fetch('${baseUrl}/pass/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})}).then(r=>r.json()).then(()=>location.reload())">
          Create a Pass
        </button>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallet Passes - Emporium Grooming &amp; Supply</title>
  <link rel="icon" href="${LOGO_DATA_URI}">
  <style>
    ${baseStyles()}

    body { display: block; }

    .list-container {
      max-width: 640px;
      margin: 0 auto;
      padding: var(--space-6) var(--space-5);
    }

    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-6);
    }
    .list-header h1 {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .list-count {
      font-size: 14px;
      color: var(--color-muted);
      font-weight: 500;
    }

    .pass-row {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4) var(--space-5);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-3);
      text-decoration: none;
      color: var(--color-text);
      transition: all var(--transition);
    }
    .pass-row:hover {
      background: var(--color-surface-2);
      border-color: var(--color-primary);
      box-shadow: 0 0 0 1px var(--color-primary), var(--shadow-glow);
      color: var(--color-text);
      transform: translateY(-1px);
    }
    .pass-row-icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary-subtle);
      border-radius: var(--radius-sm);
      color: var(--color-primary);
      flex-shrink: 0;
    }
    .pass-row-info { flex: 1; min-width: 0; }
    .pass-row-title {
      font-weight: 700;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pass-row-meta {
      font-size: 13px;
      color: var(--color-muted);
      margin-top: 2px;
    }
    .pass-row-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      flex-shrink: 0;
    }
    .pass-row-arrow {
      color: var(--color-muted);
      transition: color var(--transition);
    }
    .pass-row:hover .pass-row-arrow { color: var(--color-primary); }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: var(--space-8) var(--space-5);
    }
    .empty-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto var(--space-5);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-surface-2);
      border-radius: var(--radius-lg);
      color: var(--color-muted);
    }
    .empty-icon svg { width: 28px; height: 28px; }
    .empty-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: var(--space-2);
    }
    .empty-desc {
      color: var(--color-muted);
      font-size: 15px;
      max-width: 300px;
      margin: 0 auto;
    }

    @media (max-width: 480px) {
      .list-header { flex-direction: column; align-items: flex-start; gap: var(--space-2); }
      .pass-row-actions .badge { display: none; }
    }
  </style>
</head>
<body>
  <div class="page-wrapper">
    <header class="page-header">
      <img class="logo" src="${LOGO_DATA_URI}" alt="Emporium">
      <div class="brand">Emporium <span>Grooming</span></div>
    </header>

    <div class="list-container">
      <div class="list-header">
        <h1>Wallet Passes</h1>
        ${passes.length > 0 ? `<span class="list-count">${passes.length} pass${passes.length !== 1 ? 'es' : ''}</span>` : ''}
      </div>

      ${passes.length === 0 ? emptyState : passItems}
    </div>

    <footer class="page-footer">
      Emporium Grooming &amp; Supply
    </footer>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, c => map[c]);
}

module.exports = { renderDownloadPage, renderListPage };
