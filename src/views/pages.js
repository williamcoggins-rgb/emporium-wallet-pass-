/*
 * Emporium Grooming & Supply - Wallet Pass UI
 *
 * Design tokens (white cards, teal + red accents):
 *   Primary:    #00BFA6 (teal)
 *   Accent:     #E8475F (red — progress, badges, highlights)
 *   Page bg:    #0F1117
 *   Surface:    #1A1D27
 *   Card bg:    #FFFFFF (both Apple + Google)
 *   Card text:  #1A1A2E
 *   Card muted: #6B7085
 *   Text:       #F0F0F5
 *   Muted:      #8B8FA3
 */

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="#00BFA6"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="20" fill="#fff">E</text>
</svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`;

// Dark-background version of logo for use on white cards
const LOGO_DARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="#00BFA6"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="20" fill="#fff">E</text>
</svg>`;
const LOGO_DARK_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_DARK_SVG).toString('base64')}`;

function baseStyles() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    :root {
      --bg: #0F1117;
      --surface: #1A1D27;
      --border: #2E3345;
      --text: #F0F0F5;
      --text-secondary: #C0C4D6;
      --muted: #6B7085;
      --primary: #00BFA6;
      --primary-hover: #00D9BD;
      --primary-glow: rgba(0,191,166,0.15);
      --accent: #E8475F;
      --accent-bg: rgba(232,71,95,0.10);
      --green-dot: #34D399;
      --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

      /* Card tokens (white cards) */
      --card-bg: #FFFFFF;
      --card-text: #1A1A2E;
      --card-muted: #6B7085;
      --card-border: #E8EAF0;
      --card-label: #00BFA6;
      --card-shadow: 0 4px 24px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06);
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { font-size: 16px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    body {
      font-family: var(--font);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.5;
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
    }
  `;
}

function defaultMember() {
  return {
    memberName: 'Jane Doe',
    tier: 'Gold',
    points: 1250,
    pointsMax: 1500,
    status: 'Active',
    memberSince: 'Feb 2026',
    memberId: 'EG-00482',
    nextReward: 250,
    lastVisit: 'Today',
    totalVisits: 24,
    saved: '$186',
  };
}

function renderDownloadPage(pass, baseUrl) {
  const m = (pass.member && pass.member.memberName) ? pass.member : defaultMember();
  const pct = Math.round((m.points / m.pointsMax) * 100);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(m.memberName)} - Emporium Member Pass</title>
  <link rel="icon" href="${LOGO_DATA_URI}">
  <style>
    ${baseStyles()}

    .page {
      padding: 32px 24px 48px;
      max-width: 960px;
      margin: 0 auto;
    }

    /* -- Header -- */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
    }
    .page-header img { width: 28px; height: 28px; border-radius: 6px; }
    .page-header-text {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      color: var(--muted);
    }

    /* -- Card Previews -- */
    .previews {
      display: flex;
      justify-content: center;
      gap: 32px;
      flex-wrap: wrap;
    }
    .preview-col {
      flex: 0 1 380px;
      min-width: 300px;
    }
    .preview-label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      margin-bottom: 16px;
    }
    .preview-label svg { opacity: 0.5; }

    /* ---- SHARED CARD BASE (white) ---- */
    .wallet-card {
      background: var(--card-bg);
      border-radius: 16px;
      padding: 28px;
      box-shadow: var(--card-shadow);
      color: var(--card-text);
    }

    /* ---- APPLE WALLET CARD ---- */
    .apple-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .card-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-logo img { width: 32px; height: 32px; border-radius: 7px; }
    .card-logo-text {
      font-weight: 800;
      font-size: 18px;
      letter-spacing: -0.3px;
      color: var(--card-text);
    }
    .card-logo-text span { color: var(--primary); }

    .badge-tier {
      background: var(--accent);
      color: white;
      font-size: 11px;
      font-weight: 700;
      padding: 5px 14px;
      border-radius: 6px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .apple-member-label {
      color: var(--card-label);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .apple-member-name {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--card-text);
      margin-bottom: 24px;
    }

    .apple-fields-row {
      display: flex;
      gap: 0;
      margin-bottom: 20px;
    }
    .apple-field { flex: 1; }
    .field-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--card-label);
      margin-bottom: 4px;
    }
    .field-value {
      font-size: 17px;
      font-weight: 700;
      color: var(--card-text);
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

    .apple-aux-row {
      display: flex;
      gap: 0;
      margin-bottom: 16px;
    }
    .apple-aux-field { flex: 1; }
    .aux-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--card-muted);
      margin-bottom: 3px;
    }
    .aux-value {
      font-size: 15px;
      font-weight: 700;
      color: var(--card-text);
    }

    /* Progress bar */
    .progress-section { margin-bottom: 4px; }
    .progress-track {
      height: 4px;
      background: var(--card-border);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 2px;
      transition: width 0.4s ease;
    }
    .progress-label {
      font-size: 11px;
      color: var(--card-muted);
      margin-top: 6px;
    }

    /* QR section */
    .card-qr {
      text-align: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--card-border);
    }
    .qr-frame {
      display: inline-block;
      padding: 12px;
      border: 1px solid var(--card-border);
      border-radius: 12px;
    }
    .qr-frame img {
      display: block;
      width: 128px;
      height: 128px;
    }
    .qr-text {
      margin-top: 8px;
      font-size: 12px;
      color: var(--card-muted);
    }

    /* Stats strip */
    .card-stats {
      display: flex;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--card-border);
    }
    .stat {
      flex: 1;
      text-align: center;
    }
    .stat-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--card-muted);
      margin-bottom: 4px;
    }
    .stat-value {
      font-size: 16px;
      font-weight: 700;
      color: var(--card-text);
    }

    /* ---- GOOGLE WALLET CARD ---- */
    .google-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .google-type {
      font-size: 13px;
      color: var(--card-muted);
      font-weight: 500;
    }

    .google-member-name {
      font-size: 24px;
      font-weight: 800;
      color: var(--card-text);
      letter-spacing: -0.5px;
      margin-bottom: 2px;
    }
    .google-member-tier {
      font-size: 14px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 20px;
    }

    .google-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-top: 1px solid var(--card-border);
    }
    .google-row-label {
      font-size: 14px;
      color: var(--card-muted);
      font-weight: 500;
    }
    .google-row-value {
      font-size: 14px;
      font-weight: 700;
      color: var(--card-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .google-progress {
      padding: 12px 0;
      border-top: 1px solid var(--card-border);
    }

    /* ---- PRIMARY ACTION ---- */
    .primary-action {
      text-align: center;
      margin-top: 40px;
    }
    .btn-wallet {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px 40px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 14px;
      font-family: var(--font);
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      transition: all 0.2s;
      box-shadow: 0 2px 12px rgba(0,191,166,0.25);
    }
    .btn-wallet:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 24px rgba(0,191,166,0.35);
    }
    .btn-wallet:active { transform: translateY(0); }

    /* ---- SECONDARY ACTIONS ---- */
    .secondary-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 16px;
      flex-wrap: wrap;
    }
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      background: transparent;
      color: var(--text-secondary);
      border: 1px solid var(--border);
      border-radius: 10px;
      font-family: var(--font);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    /* ---- FOOTER ---- */
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px 24px;
      font-size: 12px;
      color: var(--muted);
      border-top: 1px solid var(--border);
    }
    .footer a { color: var(--primary); text-decoration: none; }
    .footer a:hover { text-decoration: underline; }

    @media (max-width: 720px) {
      .previews { gap: 24px; }
      .preview-col { flex: 1 1 100%; max-width: 400px; }
      .page { padding: 24px 16px 40px; }
      .btn-wallet { width: 100%; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="page-header">
      <img src="${LOGO_DATA_URI}" alt="Emporium">
      <div class="page-header-text">Member Pass Preview</div>
    </div>

    <div class="previews">
      <!-- APPLE WALLET -->
      <div class="preview-col">
        <div class="preview-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8.4 8.4 0 0 0-2.3.3 8.1 8.1 0 0 0-4.4 3.3C4 7.5 3.5 10 4.4 12.5s3 4.5 5.6 5.4c1 .3 2 .1 2 .1s1 .2 2-.1c2.6-.9 4.7-2.9 5.6-5.4s.4-5-1-6.9a8.1 8.1 0 0 0-4.3-3.3A8.4 8.4 0 0 0 12 2z"/><path d="M12 2c0 2-2 4-2 4"/></svg>
          Apple Wallet
        </div>
        <div class="wallet-card">
          <div class="apple-header">
            <div class="card-logo">
              <img src="${LOGO_DARK_DATA_URI}" alt="Emporium">
              <div class="card-logo-text">Emporium<span>.</span></div>
            </div>
            <div class="badge-tier">${escapeHtml(m.tier)}</div>
          </div>
          <div class="apple-member-label">Member</div>
          <div class="apple-member-name">${escapeHtml(m.memberName)}</div>
          <div class="apple-fields-row">
            <div class="apple-field">
              <div class="field-label">Tier</div>
              <div class="field-value">${escapeHtml(m.tier)}</div>
            </div>
            <div class="apple-field">
              <div class="field-label">Points</div>
              <div class="field-value">${Number(m.points).toLocaleString()}</div>
            </div>
            <div class="apple-field">
              <div class="field-label">Status</div>
              <div class="field-value">${escapeHtml(m.status)} <span class="status-dot"></span></div>
            </div>
          </div>
          <div class="apple-aux-row">
            <div class="apple-aux-field">
              <div class="aux-label">Member Since</div>
              <div class="aux-value">${escapeHtml(m.memberSince)}</div>
            </div>
            <div class="apple-aux-field">
              <div class="aux-label">Member ID</div>
              <div class="aux-value">${escapeHtml(m.memberId)}</div>
            </div>
            <div class="apple-aux-field">
              <div class="aux-label">Next Reward</div>
              <div class="aux-value">${m.nextReward} pts</div>
            </div>
          </div>
          <div class="progress-section">
            <div class="progress-track">
              <div class="progress-fill" style="width: ${pct}%"></div>
            </div>
            <div class="progress-label">${Number(m.points).toLocaleString()} / ${Number(m.pointsMax).toLocaleString()} pts to next reward</div>
          </div>
          <div class="card-qr">
            <div class="qr-frame">
              <img src="${baseUrl}/pass/${pass.id}/qr" alt="QR Code">
            </div>
            <div class="qr-text">Scan to earn &amp; redeem</div>
          </div>
          <div class="card-stats">
            <div class="stat">
              <div class="stat-label">Last Visit</div>
              <div class="stat-value">${escapeHtml(m.lastVisit)}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Total Visits</div>
              <div class="stat-value">${m.totalVisits}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Saved</div>
              <div class="stat-value">${escapeHtml(m.saved)}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- GOOGLE WALLET -->
      <div class="preview-col">
        <div class="preview-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>
          Google Wallet
        </div>
        <div class="wallet-card">
          <div class="google-header">
            <div class="card-logo">
              <img src="${LOGO_DARK_DATA_URI}" alt="Emporium">
              <div class="card-logo-text">Emporium<span>.</span></div>
            </div>
            <div class="google-type">Loyalty Card</div>
          </div>
          <div class="google-member-name">${escapeHtml(m.memberName)}</div>
          <div class="google-member-tier">${escapeHtml(m.tier)} Member</div>
          <div class="google-row">
            <span class="google-row-label">Points</span>
            <span class="google-row-value">${Number(m.points).toLocaleString()}</span>
          </div>
          <div class="google-row">
            <span class="google-row-label">Member Since</span>
            <span class="google-row-value">${escapeHtml(m.memberSince)}</span>
          </div>
          <div class="google-row">
            <span class="google-row-label">Member ID</span>
            <span class="google-row-value">${escapeHtml(m.memberId)}</span>
          </div>
          <div class="google-row">
            <span class="google-row-label">Status</span>
            <span class="google-row-value">${escapeHtml(m.status)} <span class="status-dot"></span></span>
          </div>
          <div class="google-row">
            <span class="google-row-label">Next Reward</span>
            <span class="google-row-value">${m.nextReward} pts away</span>
          </div>
          <div class="google-progress">
            <div class="progress-track">
              <div class="progress-fill" style="width: ${pct}%"></div>
            </div>
            <div class="progress-label">${Number(m.points).toLocaleString()} / ${Number(m.pointsMax).toLocaleString()} pts</div>
          </div>
          <div class="card-qr">
            <div class="qr-frame">
              <img src="${baseUrl}/pass/${pass.id}/qr" alt="QR Code">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Single dominant CTA, then secondary actions (reduced cognitive load) -->
    <div class="primary-action">
      <a class="btn-wallet" href="${baseUrl}/pass/${pass.id}/download">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download Wallet Pass
      </a>
    </div>
    <div class="secondary-actions">
      <button class="btn-secondary" onclick="navigator.share ? navigator.share({title:'Emporium Member Pass', url:window.location.href}) : navigator.clipboard.writeText(window.location.href).then(()=>{this.innerHTML='<svg width=\\'14\\' height=\\'14\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2.5\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><polyline points=\\'20 6 9 17 4 12\\'/></svg> Copied!'})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        Share Link
      </button>
      <a class="btn-secondary" href="${baseUrl}/pass/${pass.id}/qr" target="_blank">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        QR Code
      </a>
    </div>

    <div class="footer">
      Emporium Grooming &amp; Supply &middot; <a href="${baseUrl}/passes">View all passes</a>
    </div>
  </div>
</body>
</html>`;
}

function renderListPage(passes, baseUrl) {
  const passItems = passes.map(p => {
    const m = (p.member && p.member.memberName) ? p.member : defaultMember();
    const isActive = String(m.status).toLowerCase() === 'active';
    return `
    <a href="${baseUrl}/pass/${p.id}" class="pass-row">
      <div class="pass-avatar">${escapeHtml(m.memberName).charAt(0)}</div>
      <div class="pass-info">
        <div class="pass-name">${escapeHtml(m.memberName)}</div>
        <div class="pass-meta">${escapeHtml(m.tier)} &middot; ${Number(m.points).toLocaleString()} pts &middot; ${escapeHtml(m.memberId)}</div>
      </div>
      <div class="pass-end">
        <span class="badge-status ${isActive ? 'badge-active' : 'badge-inactive'}"><span class="badge-dot"></span> ${escapeHtml(m.status)}</span>
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

    /* Header */
    .header-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 32px;
    }
    .header-bar img { width: 36px; height: 36px; border-radius: 8px; }
    .header-brand {
      font-weight: 800;
      font-size: 18px;
      letter-spacing: -0.3px;
      flex: 1;
    }
    .header-brand span { color: var(--primary); }

    /* Title area */
    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .list-title {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .list-count {
      font-size: 13px;
      color: var(--muted);
      margin-top: 2px;
    }
    .btn-new-pass {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-family: var(--font);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      transition: all 0.2s;
    }
    .btn-new-pass:hover { background: var(--primary-hover); }

    /* Pass list */
    .pass-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      margin-bottom: 8px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.15s ease;
    }
    .pass-row:hover {
      background: #1E2130;
      border-color: var(--primary);
      box-shadow: 0 0 0 1px var(--primary);
      transform: translateY(-1px);
    }
    .pass-avatar {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--primary), #009E8B);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 18px;
      color: #fff;
      flex-shrink: 0;
    }
    .pass-info { flex: 1; min-width: 0; }
    .pass-name {
      font-weight: 700;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pass-meta {
      font-size: 13px;
      color: var(--muted);
      margin-top: 2px;
    }
    .pass-end { flex-shrink: 0; }
    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
    }
    .badge-active {
      background: rgba(52,211,153,0.12);
      color: #34D399;
    }
    .badge-inactive {
      background: rgba(232,71,95,0.10);
      color: var(--accent);
    }
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: currentColor;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 64px 24px;
    }
    .empty-icon {
      width: 72px;
      height: 72px;
      margin: 0 auto 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      color: var(--muted);
    }
    .empty-icon svg { width: 32px; height: 32px; }
    .empty-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .empty-desc {
      color: var(--muted);
      font-size: 15px;
      max-width: 320px;
      margin: 0 auto 28px;
      line-height: 1.6;
    }
    .btn-create {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 32px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 12px;
      font-family: var(--font);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 2px 12px rgba(0,191,166,0.2);
    }
    .btn-create:hover { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,191,166,0.3); }

    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 12px;
      color: var(--muted);
    }

    @media (max-width: 480px) {
      .pass-end .badge-status { display: none; }
      .list-header { flex-direction: column; align-items: flex-start; gap: 16px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header-bar">
      <img src="${LOGO_DATA_URI}" alt="Emporium">
      <div class="header-brand">Emporium <span>Grooming</span></div>
    </div>

    ${passes.length > 0 ? `
    <div class="list-header">
      <div>
        <div class="list-title">Wallet Passes</div>
        <div class="list-count">${passes.length} member pass${passes.length !== 1 ? 'es' : ''}</div>
      </div>
      <button class="btn-new-pass" onclick="fetch('${baseUrl}/pass/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})}).then(r=>r.json()).then(d=>{if(d.id)window.location.href='${baseUrl}/pass/'+d.id;else location.reload()})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        New Pass
      </button>
    </div>
    ${passItems}
    ` : `
    <div class="list-title" style="margin-bottom: 0;">Wallet Passes</div>
    <div class="empty-state">
      <div class="empty-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>
      </div>
      <div class="empty-title">No passes yet</div>
      <p class="empty-desc">Create your first membership pass to start distributing to customers via link, QR code, or email.</p>
      <button class="btn-create" onclick="fetch('${baseUrl}/pass/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})}).then(r=>r.json()).then(d=>{if(d.id)window.location.href='${baseUrl}/pass/'+d.id;else location.reload()})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Create First Pass
      </button>
    </div>
    `}

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
