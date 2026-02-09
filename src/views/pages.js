/*
 * Emporium Grooming & Supply - Wallet Pass Design Preview
 *
 * Design tokens:
 *   Primary:    #00BFA6 (teal)
 *   Accent:     #E8475F (red for progress bar / badges)
 *   Dark bg:    #0F1117
 *   Surface:    #1A1D27
 *   Card bg:    #1E2130
 *   Text:       #F0F0F5
 *   Muted:      #8B8FA3
 */

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="#00BFA6"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="20" fill="#0F1117">E</text>
</svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`;

function baseStyles() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    :root {
      --bg: #0F1117;
      --surface: #1A1D27;
      --card: #1E2130;
      --card-google: #FFFFFF;
      --border: #2E3345;
      --text: #F0F0F5;
      --text-secondary: #C0C4D6;
      --muted: #6B7085;
      --primary: #00BFA6;
      --accent: #E8475F;
      --accent-bg: rgba(232,71,95,0.15);
      --green-dot: #34D399;
      --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { font-size: 16px; -webkit-font-smoothing: antialiased; }
    body {
      font-family: var(--font);
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
  <title>Emporium Grooming &amp; Supply - Wallet Pass Design Preview</title>
  <link rel="icon" href="${LOGO_DATA_URI}">
  <style>
    ${baseStyles()}

    .page { padding: 40px 24px 60px; }
    .page-title {
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 13px;
      font-weight: 600;
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
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      margin-bottom: 20px;
    }

    /* ---- APPLE WALLET CARD ---- */
    .apple-card {
      background: var(--card);
      border-radius: 16px;
      padding: 28px 28px 24px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .apple-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }
    .apple-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .apple-logo img { width: 32px; height: 32px; border-radius: 7px; }
    .apple-logo-text {
      font-weight: 800;
      font-size: 18px;
      letter-spacing: -0.3px;
    }
    .apple-logo-text span { color: var(--primary); }
    .badge-member {
      background: var(--accent);
      color: white;
      font-size: 11px;
      font-weight: 700;
      padding: 5px 14px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }

    .apple-member-label {
      color: var(--accent);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .apple-member-name {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 28px;
    }

    .apple-fields-row {
      display: flex;
      gap: 0;
      margin-bottom: 24px;
    }
    .apple-field {
      flex: 1;
    }
    .apple-field-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--primary);
      margin-bottom: 4px;
    }
    .apple-field-value {
      font-size: 18px;
      font-weight: 700;
      color: var(--text);
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
    .apple-aux-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--muted);
      margin-bottom: 3px;
    }
    .apple-aux-value {
      font-size: 15px;
      font-weight: 700;
      color: var(--text);
    }

    .progress-bar-wrap {
      margin-bottom: 6px;
    }
    .progress-bar-track {
      height: 4px;
      background: var(--border);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 2px;
      transition: width 0.4s ease;
    }
    .progress-label {
      font-size: 11px;
      color: var(--muted);
      margin-top: 6px;
    }

    .apple-qr {
      text-align: center;
      margin-top: 28px;
    }
    .apple-qr-frame {
      display: inline-block;
      background: white;
      padding: 14px;
      border-radius: 12px;
    }
    .apple-qr-frame img {
      display: block;
      width: 140px;
      height: 140px;
    }
    .apple-qr-text {
      margin-top: 10px;
      font-size: 12px;
      color: var(--muted);
    }

    .apple-stats {
      display: flex;
      margin-top: 24px;
      border-top: 1px solid var(--border);
      padding-top: 20px;
    }
    .apple-stat {
      flex: 1;
      text-align: center;
    }
    .apple-stat-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .apple-stat-value {
      font-size: 16px;
      font-weight: 700;
    }

    /* ---- GOOGLE WALLET CARD ---- */
    .google-card {
      background: var(--card-google);
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
      color: #1a1a1a;
    }
    .google-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .google-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .google-logo img { width: 32px; height: 32px; border-radius: 7px; }
    .google-logo-text {
      font-weight: 800;
      font-size: 18px;
      letter-spacing: -0.3px;
      color: #1a1a1a;
    }
    .google-logo-text span { color: var(--primary); }
    .google-type {
      font-size: 13px;
      color: #999;
      font-weight: 500;
    }

    .google-member-name {
      font-size: 26px;
      font-weight: 800;
      color: #1a1a1a;
      letter-spacing: -0.5px;
      margin-bottom: 2px;
    }
    .google-member-tier {
      font-size: 14px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 24px;
    }

    .google-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
      border-top: 1px solid #eee;
    }
    .google-row-label {
      font-size: 14px;
      color: #777;
      font-weight: 500;
    }
    .google-row-value {
      font-size: 14px;
      font-weight: 700;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .google-dot {
      width: 8px; height: 8px; border-radius: 50%; background: var(--green-dot);
    }

    .google-progress {
      padding: 14px 0;
      border-top: 1px solid #eee;
    }
    .google-progress-track {
      height: 4px;
      background: #e5e5e5;
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 6px;
    }
    .google-progress-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 2px;
    }
    .google-progress-label {
      font-size: 12px;
      color: #999;
    }

    .google-qr {
      text-align: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    .google-qr-frame {
      display: inline-block;
      padding: 8px;
    }
    .google-qr-frame img {
      display: block;
      width: 140px;
      height: 140px;
    }

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
      font-family: var(--font);
      font-size: 14px;
      font-weight: 700;
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
      border: 1px solid var(--border);
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
      border-top: 1px solid var(--border);
    }

    @media (max-width: 720px) {
      .previews { gap: 32px; }
      .preview-col { flex: 1 1 100%; max-width: 400px; }
      .page { padding: 24px 16px 40px; }
      .page-title { margin-bottom: 32px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="page-title">Emporium &mdash; Wallet Pass Design Preview</div>

    <div class="previews">
      <!-- APPLE WALLET -->
      <div class="preview-col">
        <div class="preview-label">Apple Wallet</div>
        <div class="apple-card">
          <div class="apple-header">
            <div class="apple-logo">
              <img src="${LOGO_DATA_URI}" alt="Emporium">
              <div class="apple-logo-text">Emporium<span>.</span></div>
            </div>
            <div class="badge-member">MEMBER</div>
          </div>
          <div class="apple-member-label">MEMBER</div>
          <div class="apple-member-name">${escapeHtml(m.memberName)}</div>
          <div class="apple-fields-row">
            <div class="apple-field">
              <div class="apple-field-label">Tier</div>
              <div class="apple-field-value">${escapeHtml(m.tier)}</div>
            </div>
            <div class="apple-field">
              <div class="apple-field-label">Points</div>
              <div class="apple-field-value">${Number(m.points).toLocaleString()}</div>
            </div>
            <div class="apple-field">
              <div class="apple-field-label">Status</div>
              <div class="apple-field-value">${escapeHtml(m.status)} <span class="status-dot"></span></div>
            </div>
          </div>
          <div class="apple-aux-row">
            <div class="apple-aux-field">
              <div class="apple-aux-label">Member Since</div>
              <div class="apple-aux-value">${escapeHtml(m.memberSince)}</div>
            </div>
            <div class="apple-aux-field">
              <div class="apple-aux-label">Member ID</div>
              <div class="apple-aux-value">${escapeHtml(m.memberId)}</div>
            </div>
            <div class="apple-aux-field">
              <div class="apple-aux-label">Next Reward</div>
              <div class="apple-aux-value">${m.nextReward} pts</div>
            </div>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: ${pct}%"></div>
            </div>
            <div class="progress-label">${Number(m.points).toLocaleString()} / ${Number(m.pointsMax).toLocaleString()} pts to next reward</div>
          </div>
          <div class="apple-qr">
            <div class="apple-qr-frame">
              <img src="${baseUrl}/pass/${pass.id}/qr" alt="QR Code">
            </div>
            <div class="apple-qr-text">Scan to earn &amp; redeem</div>
          </div>
          <div class="apple-stats">
            <div class="apple-stat">
              <div class="apple-stat-label">Last Visit</div>
              <div class="apple-stat-value">${escapeHtml(m.lastVisit)}</div>
            </div>
            <div class="apple-stat">
              <div class="apple-stat-label">Total Visits</div>
              <div class="apple-stat-value">${m.totalVisits}</div>
            </div>
            <div class="apple-stat">
              <div class="apple-stat-label">Saved</div>
              <div class="apple-stat-value">${escapeHtml(m.saved)}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- GOOGLE WALLET -->
      <div class="preview-col">
        <div class="preview-label">Google Wallet</div>
        <div class="google-card">
          <div class="google-header">
            <div class="google-logo">
              <img src="${LOGO_DATA_URI}" alt="Emporium">
              <div class="google-logo-text">Emporium<span>.</span></div>
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
            <span class="google-row-value">${escapeHtml(m.status)} <span class="google-dot"></span></span>
          </div>
          <div class="google-row">
            <span class="google-row-label">Next Reward</span>
            <span class="google-row-value">${m.nextReward} pts away</span>
          </div>
          <div class="google-progress">
            <div class="google-progress-track">
              <div class="google-progress-fill" style="width: ${pct}%"></div>
            </div>
            <div class="google-progress-label">${Number(m.points).toLocaleString()} / ${Number(m.pointsMax).toLocaleString()} pts</div>
          </div>
          <div class="google-qr">
            <div class="google-qr-frame">
              <img src="${baseUrl}/pass/${pass.id}/qr" alt="QR Code">
            </div>
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
        <div class="pass-row-meta">${escapeHtml(m.tier)} &middot; ${Number(m.points).toLocaleString()} pts &middot; ${escapeHtml(m.memberId)}</div>
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
      border-bottom: 1px solid var(--border);
      margin-bottom: 32px;
    }
    .header-bar img { width: 36px; height: 36px; border-radius: 8px; }
    .header-brand {
      font-weight: 800;
      font-size: 18px;
      letter-spacing: -0.3px;
    }
    .header-brand span { color: var(--primary); }

    .list-title {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
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
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      margin-bottom: 12px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.2s;
    }
    .pass-row:hover {
      background: var(--card);
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
      font-weight: 800;
      font-size: 18px;
      color: var(--bg);
      flex-shrink: 0;
    }
    .pass-row-info { flex: 1; min-width: 0; }
    .pass-row-name {
      font-weight: 700;
      font-size: 15px;
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
      background: var(--card);
      border-radius: 16px;
      color: var(--muted);
    }
    .empty-icon svg { width: 28px; height: 28px; }
    .empty-title {
      font-size: 20px;
      font-weight: 700;
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
      font-family: var(--font);
      font-size: 14px;
      font-weight: 700;
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
    <div class="list-subtitle">${passes.length > 0 ? `${passes.length} member pass${passes.length !== 1 ? 'es' : ''}` : ''}</div>

    ${passes.length === 0 ? `
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>
        </div>
        <div class="empty-title">No passes yet</div>
        <p class="empty-desc">Create your first member pass to start distributing to customers.</p>
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
