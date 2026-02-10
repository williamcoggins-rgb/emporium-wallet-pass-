/*
 * Emporium Grooming & Supply - Premium Barbershop Wallet Pass UI
 *
 * Design tokens (white cards, teal + red accents):
 *   Primary:    #00BFA6 (teal)
 *   Accent:     #E8475F (red — progress, badges)
 *   Page bg:    #0F1117
 *   Surface:    #1A1D27
 *   Card bg:    #FFFFFF
 *   Card text:  #1A1A2E
 *
 * Tiers:
 *   Regular:    teal (#00BFA6) — standard member
 *   VIP:        old gold metallic (#C5A55A / #E8D5A3 shimmer) — monthly VIP
 *
 * Font: Oswald (Nike-style bold condensed sans-serif)
 */

// Scissors icon SVG for barbershop branding
const SCISSORS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="#00BFA6"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="20" fill="#fff">E</text>
</svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`;

function tierColor(tier) {
  const t = String(tier).toLowerCase();
  if (t === 'vip') return {
    bg: '#C5A55A',
    text: '#fff',
    glow: 'rgba(197,165,90,0.30)',
    gradient: 'linear-gradient(135deg, #9A7B2F 0%, #C5A55A 30%, #E8D5A3 50%, #C5A55A 70%, #9A7B2F 100%)',
    isVip: true,
  };
  // Regular tier
  return {
    bg: '#00BFA6',
    text: '#fff',
    glow: 'rgba(0,191,166,0.25)',
    gradient: 'linear-gradient(135deg, #00BFA6, #009E8B)',
    isVip: false,
  };
}

function baseStyles() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Oswald:wght@500;600;700&display=swap');

    :root {
      --bg: #0F1117;
      --surface: #1A1D27;
      --border: #2E3345;
      --text: #F0F0F5;
      --text-secondary: #C0C4D6;
      --muted: #6B7085;
      --primary: #00BFA6;
      --primary-hover: #00D9BD;
      --accent: #E8475F;
      --accent-bg: rgba(232,71,95,0.10);
      --green-dot: #34D399;
      --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-display: 'Oswald', 'Impact', 'Arial Narrow', sans-serif;

      --card-bg: #FFFFFF;
      --card-text: #1A1A2E;
      --card-muted: #6B7085;
      --card-border: #E8EAF0;
      --card-label: #00BFA6;
      --card-shadow: 0 8px 40px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08);
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

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes progressGrow {
      from { width: 0; }
    }
  `;
}

function defaultMember() {
  return {
    memberName: 'Jane Doe',
    tier: 'Regular',
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
  const tc = tierColor(m.tier);
  const firstName = escapeHtml(m.memberName).split(' ')[0];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(m.memberName)} - Emporium Grooming &amp; Supply</title>
  <link rel="icon" href="${LOGO_DATA_URI}">
  <style>
    ${baseStyles()}

    body {
      background: var(--bg);
      background-image:
        radial-gradient(ellipse at 20% 0%, rgba(0,191,166,0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 100%, rgba(232,71,95,0.04) 0%, transparent 60%);
    }

    .page {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 24px 48px;
    }

    /* ---- TOP BAR ---- */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 0;
    }
    .topbar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .topbar-brand img { width: 32px; height: 32px; border-radius: 8px; }
    .topbar-brand-text {
      font-weight: 800;
      font-size: 17px;
      letter-spacing: -0.3px;
    }
    .topbar-brand-text b { color: var(--primary); font-weight: 800; }
    .topbar-nav a {
      color: var(--muted);
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: color 0.15s;
    }
    .topbar-nav a:hover { color: var(--primary); }

    /* ---- HERO ---- */
    .hero {
      text-align: center;
      padding: 48px 0 40px;
      animation: fadeUp 0.5s ease both;
    }
    .hero-scissors {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      color: var(--primary);
      margin-bottom: 16px;
      opacity: 0.7;
    }
    .hero-scissors svg { width: 28px; height: 28px; }
    .hero-greeting {
      font-family: var(--font-display);
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 8px;
      color: var(--text);
    }
    .hero-sub {
      font-size: 15px;
      color: var(--muted);
      max-width: 400px;
      margin: 0 auto;
    }
    .hero-sub strong { color: ${tc.bg}; font-weight: 700; }
    ${tc.isVip ? `
    .hero-sub strong {
      background: linear-gradient(90deg, #9A7B2F, #E8D5A3, #C5A55A, #E8D5A3, #9A7B2F);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerGold 3s linear infinite;
    }
    @keyframes shimmerGold {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    ` : ''}

    /* ---- CARD GRID ---- */
    .cards {
      display: flex;
      justify-content: center;
      gap: 28px;
      flex-wrap: wrap;
      animation: fadeUp 0.6s ease 0.1s both;
    }
    .card-col {
      flex: 0 1 380px;
      min-width: 300px;
    }
    .card-platform {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-size: 10px;
      font-weight: 700;
      color: var(--muted);
      margin-bottom: 12px;
    }
    .card-platform svg { width: 13px; height: 13px; opacity: 0.5; }

    /* ---- WHITE CARD ---- */
    .wallet-card {
      background: var(--card-bg);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--card-shadow);
      color: var(--card-text);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .wallet-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 48px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1);
    }

    /* Barbershop stripe at top of each card */
    .card-stripe {
      height: 4px;
      background: ${tc.isVip ? tc.gradient : `linear-gradient(90deg, var(--primary), var(--accent))`};
      ${tc.isVip ? 'background-size: 200% auto; animation: shimmerGold 3s linear infinite;' : ''}
    }

    .card-body { padding: 24px 28px 28px; }

    /* Card header */
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .card-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-logo img { width: 30px; height: 30px; border-radius: 7px; }
    .card-logo-name {
      font-weight: 800;
      font-size: 16px;
      letter-spacing: -0.3px;
      color: var(--card-text);
    }
    .card-logo-name b { color: var(--primary); font-weight: 800; }

    .tier-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: ${tc.isVip ? tc.gradient : tc.bg};
      ${tc.isVip ? 'background-size: 200% auto; animation: shimmerGold 3s linear infinite;' : ''}
      color: ${tc.isVip ? '#1a1a1a' : tc.text};
      font-family: var(--font-display);
      font-size: 11px;
      font-weight: 700;
      padding: 5px 14px;
      border-radius: 6px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      box-shadow: 0 2px 8px ${tc.glow};
    }
    .tier-badge svg { width: 11px; height: 11px; }
    ${tc.isVip ? `
    @keyframes shimmerGold {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    ` : ''}

    /* Member identity */
    .member-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--card-label);
      margin-bottom: 3px;
    }
    .member-name {
      font-family: var(--font-display);
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--card-text);
      margin-bottom: 20px;
    }

    /* Fields */
    .fields-row {
      display: flex;
      gap: 0;
      margin-bottom: 16px;
    }
    .field { flex: 1; }
    .field-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--card-label);
      margin-bottom: 3px;
    }
    .field-value {
      font-size: 16px;
      font-weight: 700;
      color: var(--card-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .status-dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green-dot);
    }
    .aux-row {
      display: flex;
      gap: 0;
      margin-bottom: 16px;
    }
    .aux-field { flex: 1; }
    .aux-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--card-muted);
      margin-bottom: 2px;
    }
    .aux-value {
      font-size: 14px;
      font-weight: 700;
      color: var(--card-text);
    }

    /* Progress */
    .progress-section {
      margin-bottom: 4px;
    }
    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 8px;
    }
    .progress-title {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--card-muted);
    }
    .progress-pct {
      font-size: 13px;
      font-weight: 800;
      color: var(--accent);
    }
    .progress-track {
      height: 6px;
      background: #F0F1F5;
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), #FF6B81);
      border-radius: 3px;
      animation: progressGrow 0.8s ease 0.3s both;
    }
    .progress-label {
      font-size: 11px;
      color: var(--card-muted);
      margin-top: 6px;
    }

    /* QR */
    .card-qr {
      text-align: center;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--card-border);
    }
    .qr-frame {
      display: inline-block;
      padding: 10px;
      border: 2px solid #F0F1F5;
      border-radius: 14px;
      background: #fff;
    }
    .qr-frame img {
      display: block;
      width: 120px;
      height: 120px;
    }
    .qr-text {
      margin-top: 8px;
      font-size: 11px;
      color: var(--card-muted);
    }

    /* Stats */
    .card-stats {
      display: flex;
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px solid var(--card-border);
    }
    .stat {
      flex: 1;
      text-align: center;
    }
    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 4px;
      color: var(--card-label);
    }
    .stat-icon svg { width: 14px; height: 14px; }
    .stat-value {
      font-size: 16px;
      font-weight: 800;
      color: var(--card-text);
    }
    .stat-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: var(--card-muted);
      margin-top: 1px;
    }

    /* ---- GOOGLE CARD SPECIFICS ---- */
    .google-member-name {
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 700;
      color: var(--card-text);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 2px;
    }
    .google-member-tier {
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 500;
      color: ${tc.bg};
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 16px;
    }
    .google-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 0;
      border-top: 1px solid var(--card-border);
    }
    .google-row-label {
      font-size: 13px;
      color: var(--card-muted);
      font-weight: 500;
    }
    .google-row-value {
      font-size: 13px;
      font-weight: 700;
      color: var(--card-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .google-progress {
      padding: 11px 0;
      border-top: 1px solid var(--card-border);
    }

    /* ---- CTA SECTION ---- */
    .cta-section {
      text-align: center;
      margin-top: 40px;
      animation: fadeUp 0.6s ease 0.2s both;
    }
    .cta-wallets {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn-apple, .btn-google {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 32px;
      border: none;
      border-radius: 14px;
      font-family: var(--font);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      transition: all 0.2s;
    }
    .btn-apple {
      background: #000;
      color: #fff;
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
    }
    .btn-apple:hover { background: #1a1a1a; transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
    .btn-google {
      background: var(--primary);
      color: #fff;
      box-shadow: 0 2px 12px rgba(0,191,166,0.25);
    }
    .btn-google:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,191,166,0.35); }

    .btn-apple svg, .btn-google svg { width: 18px; height: 18px; }

    .secondary-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 16px;
    }
    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 18px;
      background: transparent;
      color: var(--muted);
      border: 1px solid var(--border);
      border-radius: 10px;
      font-family: var(--font);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      transition: all 0.15s;
    }
    .btn-ghost:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    /* ---- PERKS STRIP ---- */
    .perks {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-top: 40px;
      padding: 24px 0;
      border-top: 1px solid var(--border);
      animation: fadeUp 0.6s ease 0.3s both;
    }
    .perk {
      text-align: center;
      max-width: 140px;
    }
    .perk-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin: 0 auto 8px;
      background: var(--surface);
      border-radius: 10px;
      color: var(--primary);
    }
    .perk-icon svg { width: 18px; height: 18px; }
    .perk-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 2px;
    }
    .perk-desc {
      font-size: 11px;
      color: var(--muted);
      line-height: 1.4;
    }

    /* ---- FOOTER ---- */
    .footer {
      text-align: center;
      margin-top: 32px;
      padding: 16px 24px;
      font-size: 11px;
      color: var(--muted);
    }
    .footer a { color: var(--primary); text-decoration: none; }
    .footer a:hover { text-decoration: underline; }

    @media (max-width: 720px) {
      .cards { gap: 20px; }
      .card-col { flex: 1 1 100%; max-width: 400px; }
      .hero { padding: 32px 0 28px; }
      .hero-greeting { font-size: 26px; }
      .cta-wallets { flex-direction: column; align-items: center; }
      .btn-apple, .btn-google { width: 100%; max-width: 320px; justify-content: center; }
      .perks { flex-wrap: wrap; gap: 20px; }
      .perk { flex: 0 1 120px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="topbar">
      <div class="topbar-brand">
        <img src="${LOGO_DATA_URI}" alt="Emporium">
        <div class="topbar-brand-text">Emporium <b>Grooming &amp; Supply</b></div>
      </div>
      <nav class="topbar-nav">
        <a href="${baseUrl}/passes">All Passes</a>
      </nav>
    </div>

    <div class="hero">
      <div class="hero-scissors">${SCISSORS_SVG}</div>
      <div class="hero-greeting">Welcome, ${firstName}</div>
      <div class="hero-sub">Your <strong>${tc.isVip ? 'VIP' : 'Member'}</strong> pass is ready. Add it to your wallet to earn points on every visit.</div>
    </div>

    <div class="cards">
      <!-- APPLE WALLET CARD -->
      <div class="card-col">
        <div class="card-platform">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8.4 8.4 0 0 0-2.3.3 8.1 8.1 0 0 0-4.4 3.3C4 7.5 3.5 10 4.4 12.5s3 4.5 5.6 5.4c1 .3 2 .1 2 .1s1 .2 2-.1c2.6-.9 4.7-2.9 5.6-5.4s.4-5-1-6.9a8.1 8.1 0 0 0-4.3-3.3A8.4 8.4 0 0 0 12 2z"/><path d="M12 2c0 2-2 4-2 4"/></svg>
          Apple Wallet
        </div>
        <div class="wallet-card">
          <div class="card-stripe"></div>
          <div class="card-body">
            <div class="card-header">
              <div class="card-logo">
                <img src="${LOGO_DATA_URI}" alt="">
                <div class="card-logo-name">Emporium<b>.</b></div>
              </div>
              <div class="tier-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
                ${escapeHtml(m.tier)}
              </div>
            </div>
            <div class="member-label">Member</div>
            <div class="member-name">${escapeHtml(m.memberName)}</div>
            <div class="fields-row">
              <div class="field">
                <div class="field-label">Points</div>
                <div class="field-value">${Number(m.points).toLocaleString()}</div>
              </div>
              <div class="field">
                <div class="field-label">Status</div>
                <div class="field-value">${escapeHtml(m.status)} <span class="status-dot"></span></div>
              </div>
              <div class="field">
                <div class="field-label">Member ID</div>
                <div class="field-value">${escapeHtml(m.memberId)}</div>
              </div>
            </div>
            <div class="aux-row">
              <div class="aux-field">
                <div class="aux-label">Member Since</div>
                <div class="aux-value">${escapeHtml(m.memberSince)}</div>
              </div>
              <div class="aux-field">
                <div class="aux-label">Next Reward In</div>
                <div class="aux-value">${m.nextReward} pts</div>
              </div>
            </div>
            <div class="progress-section">
              <div class="progress-header">
                <span class="progress-title">Rewards Progress</span>
                <span class="progress-pct">${pct}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${pct}%"></div>
              </div>
              <div class="progress-label">${Number(m.points).toLocaleString()} / ${Number(m.pointsMax).toLocaleString()} pts to next reward</div>
            </div>
            <div class="card-qr">
              <div class="qr-frame">
                <img src="${baseUrl}/pass/${pass.id}/qr" alt="QR Code">
              </div>
              <div class="qr-text">Show at checkout to earn &amp; redeem</div>
            </div>
            <div class="card-stats">
              <div class="stat">
                <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <div class="stat-value">${escapeHtml(m.lastVisit)}</div>
                <div class="stat-label">Last Visit</div>
              </div>
              <div class="stat">
                <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg></div>
                <div class="stat-value">${m.totalVisits}</div>
                <div class="stat-label">Visits</div>
              </div>
              <div class="stat">
                <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                <div class="stat-value">${escapeHtml(m.saved)}</div>
                <div class="stat-label">Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GOOGLE WALLET CARD -->
      <div class="card-col">
        <div class="card-platform">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>
          Google Wallet
        </div>
        <div class="wallet-card">
          <div class="card-stripe"></div>
          <div class="card-body">
            <div class="card-header">
              <div class="card-logo">
                <img src="${LOGO_DATA_URI}" alt="">
                <div class="card-logo-name">Emporium<b>.</b></div>
              </div>
              <span style="font-size:12px;color:var(--card-muted);font-weight:500;">Loyalty Card</span>
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
              <div class="progress-header">
                <span class="progress-title">Rewards Progress</span>
                <span class="progress-pct">${pct}%</span>
              </div>
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
    </div>

    <!-- CTA: platform-specific wallet buttons -->
    <div class="cta-section">
      <div class="cta-wallets">
        <a class="btn-apple" href="${baseUrl}/pass/${pass.id}/download">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83"/><path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Add to Apple Wallet
        </a>
        <a class="btn-google" href="${baseUrl}/pass/${pass.id}/download">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>
          Add to Google Wallet
        </a>
      </div>
      <div class="secondary-actions">
        <button class="btn-ghost" onclick="navigator.share ? navigator.share({title:'Emporium Member Pass', url:window.location.href}) : navigator.clipboard.writeText(window.location.href).then(()=>{this.textContent='Copied!'})">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Share
        </button>
        <a class="btn-ghost" href="${baseUrl}/pass/${pass.id}/qr" target="_blank">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          QR Code
        </a>
      </div>
    </div>

    <!-- Barbershop Perks -->
    <div class="perks">
      <div class="perk">
        <div class="perk-icon">${SCISSORS_SVG}</div>
        <div class="perk-title">Earn Points</div>
        <div class="perk-desc">Every haircut &amp; product earns you rewards</div>
      </div>
      <div class="perk">
        <div class="perk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
        <div class="perk-title">VIP Access</div>
        <div class="perk-desc">Priority booking &amp; member-only deals</div>
      </div>
      <div class="perk">
        <div class="perk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg></div>
        <div class="perk-title">Unlock Rewards</div>
        <div class="perk-desc">Free cuts, products &amp; exclusive perks</div>
      </div>
    </div>

    <div class="footer">
      Emporium Grooming &amp; Supply &middot; <a href="${baseUrl}/passes">View all passes</a>
    </div>
  </div>
</body>
</html>`;
}

function renderListPage(passes, baseUrl) {
  const passItems = passes.map((p, i) => {
    const m = (p.member && p.member.memberName) ? p.member : defaultMember();
    const isActive = String(m.status).toLowerCase() === 'active';
    const tc = tierColor(m.tier);
    const pct = Math.round((Number(m.points) / Number(m.pointsMax || 1500)) * 100);
    return `
    <a href="${baseUrl}/pass/${p.id}" class="pass-card" style="animation-delay: ${i * 0.05}s; --tier-color: ${tc.bg};">
      <div class="pass-card-stripe" style="background: linear-gradient(90deg, var(--primary), ${tc.bg}, var(--accent));"></div>
      <div class="pass-card-body">
        <div class="pass-card-top">
          <div class="pass-avatar" style="background: linear-gradient(135deg, ${tc.bg}, var(--primary));">${escapeHtml(m.memberName).charAt(0)}</div>
          <div class="pass-card-info">
            <div class="pass-card-name">${escapeHtml(m.memberName)}</div>
            <div class="pass-card-meta">${escapeHtml(m.memberId)} &middot; Since ${escapeHtml(m.memberSince)}</div>
          </div>
          <div class="pass-card-right">
            <span class="tier-pill${tc.isVip ? ' tier-pill-vip' : ''}" style="background: ${tc.bg}; color: ${tc.text};">${escapeHtml(m.tier)}</span>
            <span class="status-pill ${isActive ? 'status-active' : 'status-inactive'}"><span class="status-pip"></span>${escapeHtml(m.status)}</span>
          </div>
        </div>
        <div class="pass-card-bottom">
          <div class="pass-card-points">
            <span class="points-num">${Number(m.points).toLocaleString()}</span>
            <span class="points-label">pts</span>
          </div>
          <div class="pass-card-progress">
            <div class="mini-track"><div class="mini-fill" style="width:${pct}%;background:${tc.bg};"></div></div>
          </div>
          <div class="pass-card-visits">${m.totalVisits || 0} visits</div>
        </div>
      </div>
    </a>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Members - Emporium Grooming &amp; Supply</title>
  <link rel="icon" href="${LOGO_DATA_URI}">
  <style>
    ${baseStyles()}

    .page {
      max-width: 720px;
      margin: 0 auto;
      padding: 0 24px 60px;
    }

    /* Header */
    .header-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 32px;
    }
    .header-bar img { width: 36px; height: 36px; border-radius: 8px; }
    .header-brand {
      font-weight: 800;
      font-size: 17px;
      letter-spacing: -0.3px;
      flex: 1;
    }
    .header-brand b { color: var(--primary); font-weight: 800; }

    /* Title area */
    .list-hero {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 28px;
    }
    .list-hero-left {}
    .list-title {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .list-count {
      font-size: 13px;
      color: var(--muted);
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
      box-shadow: 0 2px 8px rgba(0,191,166,0.2);
    }
    .btn-new-pass:hover { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,191,166,0.3); }

    /* Pass cards */
    .pass-card {
      display: block;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 10px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.15s ease;
      animation: fadeUp 0.4s ease both;
    }
    .pass-card:hover {
      border-color: var(--tier-color, var(--primary));
      box-shadow: 0 0 0 1px var(--tier-color, var(--primary)), 0 4px 20px rgba(0,0,0,0.15);
      transform: translateY(-2px);
    }
    .pass-card-stripe { height: 3px; }
    .pass-card-body { padding: 16px 20px; }
    .pass-card-top {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .pass-avatar {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 18px;
      color: #fff;
      flex-shrink: 0;
    }
    .pass-card-info { flex: 1; min-width: 0; }
    .pass-card-name {
      font-weight: 700;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pass-card-meta {
      font-size: 12px;
      color: var(--muted);
      margin-top: 1px;
    }
    .pass-card-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      flex-shrink: 0;
    }
    .tier-pill {
      font-family: var(--font-display);
      font-size: 10px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 5px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .tier-pill-vip {
      background-image: linear-gradient(135deg, #9A7B2F 0%, #C5A55A 30%, #E8D5A3 50%, #C5A55A 70%, #9A7B2F 100%) !important;
      background-size: 200% auto;
      color: #1a1a1a !important;
      animation: shimmerGoldList 3s linear infinite;
    }
    @keyframes shimmerGoldList {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 600;
    }
    .status-active { color: var(--green-dot); }
    .status-inactive { color: var(--accent); }
    .status-pip {
      width: 6px; height: 6px; border-radius: 50%;
      background: currentColor;
    }

    .pass-card-bottom {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border);
    }
    .pass-card-points {
      flex-shrink: 0;
    }
    .points-num {
      font-size: 16px;
      font-weight: 800;
      color: var(--text);
    }
    .points-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      margin-left: 2px;
    }
    .pass-card-progress {
      flex: 1;
    }
    .mini-track {
      height: 4px;
      background: var(--border);
      border-radius: 2px;
      overflow: hidden;
    }
    .mini-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.4s ease;
    }
    .pass-card-visits {
      font-size: 12px;
      font-weight: 600;
      color: var(--muted);
      flex-shrink: 0;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 80px 24px;
      animation: fadeUp 0.5s ease both;
    }
    .empty-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 24px;
      color: var(--primary);
    }
    .empty-icon svg { width: 36px; height: 36px; }
    .empty-title {
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .empty-desc {
      color: var(--muted);
      font-size: 15px;
      max-width: 340px;
      margin: 0 auto 32px;
      line-height: 1.6;
    }
    .btn-create {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 36px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 14px;
      font-family: var(--font);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 2px 12px rgba(0,191,166,0.25);
    }
    .btn-create:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 4px 24px rgba(0,191,166,0.35); }

    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 11px;
      color: var(--muted);
    }

    @media (max-width: 480px) {
      .pass-card-right { display: none; }
      .list-hero { flex-direction: column; align-items: flex-start; gap: 16px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header-bar">
      <img src="${LOGO_DATA_URI}" alt="Emporium">
      <div class="header-brand">Emporium <b>Grooming &amp; Supply</b></div>
    </div>

    ${passes.length > 0 ? `
    <div class="list-hero">
      <div class="list-hero-left">
        <div class="list-title">Members</div>
        <div class="list-count">${passes.length} active pass${passes.length !== 1 ? 'es' : ''}</div>
      </div>
      <button class="btn-new-pass" onclick="fetch('${baseUrl}/pass/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})}).then(r=>r.json()).then(d=>{if(d.id)window.location.href='${baseUrl}/pass/'+d.id;else location.reload()})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        New Member
      </button>
    </div>
    ${passItems}
    ` : `
    <div class="empty-state">
      <div class="empty-icon">${SCISSORS_SVG}</div>
      <div class="empty-title">Ready to reward your clients</div>
      <p class="empty-desc">Create your first membership pass and share it with clients. They'll earn points on every haircut, product, and service.</p>
      <button class="btn-create" onclick="fetch('${baseUrl}/pass/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})}).then(r=>r.json()).then(d=>{if(d.id)window.location.href='${baseUrl}/pass/'+d.id;else location.reload()})">
        ${SCISSORS_SVG.replace('width="24"', 'width="16"').replace('height="24"', 'height="16"')}
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
