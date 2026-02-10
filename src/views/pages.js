/*
 * Emporium Grooming & Supply - Premium Barbershop Wallet Pass UI
 *
 * Design language: tactile, textured, masculine premium
 *   - Noise grain overlay for matte material feel
 *   - 3D perspective tilt on hover
 *   - Monogram watermark for brand depth
 *   - Animated edge glow on VIP cards
 *   - Dramatic hero staging with scale contrast
 *   - Subtle barber-stripe page pattern
 *
 * Tokens:
 *   Primary:    #00BFA6 (teal)
 *   Accent:     #E8475F (red)
 *   Page bg:    #0A0C10
 *   Surface:    #14161E
 *   Card bg:    #FFFFFF
 *
 * Tiers:
 *   Regular:    teal (#00BFA6)
 *   VIP:        dark burnished gold (#8B7335 / #A08840)
 *
 * Font: Oswald (Nike-style bold condensed sans-serif)
 */

const SCISSORS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="#00BFA6"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="20" fill="#fff">E</text>
</svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`;

// Tiny 1-bit noise PNG for matte texture (4x4 repeating grain)
const NOISE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.08"/></svg>`;
const NOISE_URI = `data:image/svg+xml;base64,${Buffer.from(NOISE_SVG).toString('base64')}`;

function tierColor(tier) {
  const t = String(tier).toLowerCase();
  if (t === 'vip' || t === 'gold') return {
    bg: '#8B7335',
    text: '#fff',
    glow: 'rgba(107,90,40,0.35)',
    gradient: 'linear-gradient(135deg, #5C4A1E 0%, #8B7335 30%, #A08840 50%, #8B7335 70%, #5C4A1E 100%)',
    isVip: true,
  };
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
      --bg: #0A0C10;
      --surface: #14161E;
      --surface-raised: #1A1D27;
      --border: #2A2D3A;
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
      --card-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.1);
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
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes progressGrow {
      from { width: 0; }
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes borderRotate {
      0% { --border-angle: 0deg; }
      100% { --border-angle: 360deg; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
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
        repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 40px,
          rgba(255,255,255,0.008) 40px,
          rgba(255,255,255,0.008) 41px
        ),
        radial-gradient(ellipse at 25% 0%, ${tc.isVip ? 'rgba(139,115,53,0.08)' : 'rgba(0,191,166,0.06)'} 0%, transparent 55%),
        radial-gradient(ellipse at 75% 100%, rgba(232,71,95,0.04) 0%, transparent 55%);
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
      animation: fadeIn 0.4s ease both;
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
      padding: 56px 0 48px;
      animation: fadeUp 0.6s ease both;
    }
    .hero-icon-row {
      display: inline-flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }
    .hero-rule {
      width: 48px;
      height: 1px;
      background: ${tc.isVip ? 'linear-gradient(90deg, transparent, #A08840, transparent)' : 'linear-gradient(90deg, transparent, var(--primary), transparent)'};
    }
    .hero-scissors {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      color: ${tc.isVip ? '#A08840' : 'var(--primary)'};
    }
    .hero-scissors svg { width: 24px; height: 24px; }
    .hero-greeting {
      font-family: var(--font-display);
      font-size: clamp(32px, 6vw, 52px);
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 6px;
      color: var(--text);
      line-height: 1.1;
    }
    .hero-name {
      display: block;
      color: ${tc.isVip ? '#A08840' : 'var(--primary)'};
    }
    ${tc.isVip ? `
    .hero-name {
      background: linear-gradient(90deg, #5C4A1E, #A08840, #C5A55A, #A08840, #5C4A1E);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerGold 4s linear infinite;
    }
    @keyframes shimmerGold {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    ` : ''}
    .hero-sub {
      font-size: 14px;
      color: var(--muted);
      max-width: 360px;
      margin: 12px auto 0;
      letter-spacing: 0.3px;
    }
    .hero-tier-tag {
      display: inline-block;
      font-family: var(--font-display);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 4px 16px;
      border-radius: 4px;
      margin-top: 16px;
      ${tc.isVip
        ? 'background: rgba(160,136,64,0.12); color: #A08840; border: 1px solid rgba(160,136,64,0.2);'
        : 'background: rgba(0,191,166,0.08); color: var(--primary); border: 1px solid rgba(0,191,166,0.15);'}
    }

    /* ---- CARD GRID ---- */
    .cards {
      display: flex;
      justify-content: center;
      gap: 28px;
      flex-wrap: wrap;
      perspective: 1200px;
      animation: fadeUp 0.7s ease 0.15s both;
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

    /* ---- CARD BASE ---- */
    .wallet-card {
      position: relative;
      background: var(--card-bg);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--card-shadow);
      color: var(--card-text);
      transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
      transform-style: preserve-3d;
    }
    .wallet-card:hover {
      transform: translateY(-6px) rotateX(2deg);
      box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.12);
    }

    /* Noise texture overlay for matte material feel */
    .wallet-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("${NOISE_URI}");
      background-repeat: repeat;
      opacity: 0.35;
      pointer-events: none;
      z-index: 1;
      border-radius: 20px;
      mix-blend-mode: overlay;
    }

    /* Monogram watermark */
    .wallet-card::after {
      content: 'E';
      position: absolute;
      bottom: -20px;
      right: -10px;
      font-family: var(--font-display);
      font-size: 180px;
      font-weight: 700;
      line-height: 1;
      opacity: 0.03;
      pointer-events: none;
      z-index: 1;
      color: ${tc.isVip ? '#f0e6cc' : 'var(--card-text)'};
    }

    .card-body { position: relative; z-index: 2; padding: 24px 28px 28px; }

    /* Barbershop stripe at top of card */
    .card-stripe {
      position: relative;
      z-index: 2;
      height: 4px;
      background: ${tc.isVip ? 'linear-gradient(90deg, #3C3118, #A08840, #C5A55A, #A08840, #3C3118)' : 'linear-gradient(90deg, var(--primary), var(--accent), var(--primary))'};
      background-size: 200% 100%;
      animation: shimmer 4s linear infinite;
    }

    ${tc.isVip ? `
    /* ---- VIP DARK GOLD CARD OVERRIDES ---- */
    .wallet-card {
      background: linear-gradient(155deg, #3C3118 0%, #5C4A1E 15%, #7A6530 30%, #8B7335 45%, #A08840 55%, #8B7335 65%, #6B5828 80%, #4A3C1A 100%);
      background-size: 300% 300%;
      animation: goldShift 10s ease infinite;
      box-shadow:
        0 8px 40px rgba(40,32,12,0.5),
        0 2px 8px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(160,136,64,0.15);
      color: #f0e6cc;
    }
    .wallet-card:hover {
      transform: translateY(-6px) rotateX(2deg);
      box-shadow:
        0 24px 64px rgba(40,32,12,0.6),
        0 4px 12px rgba(0,0,0,0.35),
        inset 0 1px 0 rgba(160,136,64,0.2),
        0 0 80px -20px rgba(160,136,64,0.15);
    }
    .wallet-card::after { color: #f0e6cc; opacity: 0.06; }
    .wallet-card::before { opacity: 0.3; mix-blend-mode: soft-light; }
    @keyframes goldShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* VIP inner edge light */
    .card-body::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 18px;
      padding: 1px;
      background: linear-gradient(160deg, rgba(192,168,80,0.25) 0%, transparent 40%, transparent 60%, rgba(192,168,80,0.1) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 0;
    }

    .card-logo-name, .card-logo-name b { color: #f0e6cc; }
    .member-label { color: rgba(240,230,204,0.4); }
    .member-name { color: #f0e6cc; }
    .field-label { color: rgba(240,230,204,0.4); }
    .field-value { color: #f0e6cc; }
    .aux-label { color: rgba(240,230,204,0.35); }
    .aux-value { color: #f0e6cc; }
    .progress-title { color: rgba(240,230,204,0.35); }
    .progress-pct { color: #C5A55A; }
    .progress-track { background: rgba(0,0,0,0.3); }
    .progress-fill { background: linear-gradient(90deg, #8B7335, #C5A55A); box-shadow: 0 0 12px rgba(160,136,64,0.3); }
    .progress-label { color: rgba(240,230,204,0.35); }
    .card-qr { border-top-color: rgba(240,230,204,0.1); }
    .qr-frame { border-color: rgba(240,230,204,0.12); background: rgba(255,255,255,0.92); }
    .qr-text { color: rgba(240,230,204,0.4); }
    .card-stats { border-top-color: rgba(240,230,204,0.1); }
    .stat-icon { color: rgba(240,230,204,0.35); }
    .stat-value { color: #f0e6cc; }
    .stat-label { color: rgba(240,230,204,0.35); }
    .status-dot { background: #A08840; box-shadow: 0 0 6px rgba(160,136,64,0.4); }
    .tier-badge {
      background: rgba(0,0,0,0.5);
      color: #C5A55A;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(160,136,64,0.2);
      animation: none;
    }
    .google-member-name { color: #f0e6cc; }
    .google-member-tier { color: #A08840; }
    .google-row { border-top-color: rgba(240,230,204,0.08); }
    .google-row-label { color: rgba(240,230,204,0.4); }
    .google-row-value { color: #f0e6cc; }
    .google-progress { border-top-color: rgba(240,230,204,0.08); }
    ` : `
    /* Regular card inner edge light */
    .card-body::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 18px;
      padding: 1px;
      background: linear-gradient(160deg, rgba(0,191,166,0.12) 0%, transparent 40%, transparent 60%, rgba(232,71,95,0.08) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 0;
    }
    `}

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
      background: ${tc.bg};
      color: ${tc.text};
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

    /* Member identity */
    .member-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--card-label);
      margin-bottom: 3px;
    }
    .member-name {
      font-family: var(--font-display);
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
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
      letter-spacing: 1.2px;
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
      letter-spacing: 1px;
      color: var(--card-muted);
      margin-bottom: 2px;
    }
    .aux-value {
      font-size: 14px;
      font-weight: 700;
      color: var(--card-text);
    }

    /* Progress */
    .progress-section { margin-bottom: 4px; }
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
      letter-spacing: 1px;
      color: var(--card-muted);
    }
    .progress-pct {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
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
      animation: progressGrow 1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s both;
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
    .stat-icon svg { width: 15px; height: 15px; }
    .stat-value {
      font-family: var(--font-display);
      font-size: 17px;
      font-weight: 700;
      color: var(--card-text);
      letter-spacing: 0.5px;
    }
    .stat-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--card-muted);
      margin-top: 1px;
    }

    /* ---- GOOGLE CARD ---- */
    .google-member-name {
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 700;
      color: var(--card-text);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 2px;
    }
    .google-member-tier {
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 500;
      color: ${tc.bg};
      text-transform: uppercase;
      letter-spacing: 2.5px;
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
      margin-top: 48px;
      animation: fadeUp 0.7s ease 0.3s both;
    }
    .cta-label {
      font-family: var(--font-display);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: var(--muted);
      margin-bottom: 16px;
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
      padding: 16px 36px;
      border: none;
      border-radius: 14px;
      font-family: var(--font);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .btn-apple {
      background: #000;
      color: #fff;
      box-shadow: 0 4px 16px rgba(0,0,0,0.35);
    }
    .btn-apple:hover { background: #1a1a1a; transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.5); }
    .btn-apple svg { width: 18px; height: 18px; }
    .btn-google {
      background: var(--primary);
      color: #fff;
      box-shadow: 0 4px 16px rgba(0,191,166,0.25);
    }
    .btn-google:hover { background: var(--primary-hover); transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,191,166,0.4); }
    .btn-google svg { width: 18px; height: 18px; }

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
      transition: all 0.2s;
    }
    .btn-ghost:hover {
      border-color: var(--primary);
      color: var(--primary);
      box-shadow: 0 0 0 1px var(--primary);
    }

    /* ---- PERKS STRIP ---- */
    .perks {
      display: flex;
      justify-content: center;
      gap: 48px;
      margin-top: 48px;
      padding: 32px 0;
      border-top: 1px solid var(--border);
      animation: fadeUp 0.7s ease 0.4s both;
    }
    .perk {
      text-align: center;
      max-width: 140px;
    }
    .perk-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      margin: 0 auto 10px;
      background: var(--surface-raised);
      border: 1px solid var(--border);
      border-radius: 14px;
      color: var(--primary);
      transition: all 0.25s ease;
    }
    .perk:hover .perk-icon {
      border-color: var(--primary);
      box-shadow: 0 0 20px rgba(0,191,166,0.1);
      transform: translateY(-2px);
    }
    .perk-icon svg { width: 20px; height: 20px; }
    .perk-title {
      font-family: var(--font-display);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text);
      margin-bottom: 4px;
    }
    .perk-desc {
      font-size: 11px;
      color: var(--muted);
      line-height: 1.5;
    }

    /* ---- FOOTER ---- */
    .footer {
      text-align: center;
      margin-top: 32px;
      padding: 20px 24px;
      font-size: 11px;
      color: var(--muted);
      border-top: 1px solid var(--border);
    }
    .footer a { color: var(--primary); text-decoration: none; }
    .footer a:hover { text-decoration: underline; }

    @media (max-width: 720px) {
      .cards { gap: 20px; }
      .card-col { flex: 1 1 100%; max-width: 400px; }
      .hero { padding: 40px 0 32px; }
      .hero-greeting { font-size: 28px; letter-spacing: 2px; }
      .cta-wallets { flex-direction: column; align-items: center; }
      .btn-apple, .btn-google { width: 100%; max-width: 320px; justify-content: center; }
      .perks { flex-wrap: wrap; gap: 24px; }
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
      <div class="hero-icon-row">
        <div class="hero-rule"></div>
        <div class="hero-scissors">${SCISSORS_SVG}</div>
        <div class="hero-rule"></div>
      </div>
      <div class="hero-greeting">
        Welcome Back
        <span class="hero-name">${firstName}</span>
      </div>
      <div class="hero-sub">Your pass is ready. Add it to your wallet and start earning on every visit.</div>
      <div class="hero-tier-tag">${tc.isVip ? 'VIP Member' : 'Member'}</div>
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

    <!-- CTA -->
    <div class="cta-section">
      <div class="cta-label">Add to your wallet</div>
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

    <!-- Perks -->
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
    <a href="${baseUrl}/pass/${p.id}" class="pass-card${tc.isVip ? ' pass-card-vip' : ''}" style="animation-delay: ${i * 0.06}s; --tier-color: ${tc.bg};">
      <div class="pass-card-stripe" style="background: ${tc.isVip ? 'linear-gradient(90deg, #3C3118, #A08840, #C5A55A, #A08840, #3C3118)' : 'linear-gradient(90deg, var(--primary), var(--accent), var(--primary))'};"></div>
      <div class="pass-card-body">
        <div class="pass-card-top">
          <div class="pass-avatar" style="background: ${tc.isVip ? 'linear-gradient(145deg, #5C4A1E, #3C3118)' : `linear-gradient(145deg, ${tc.bg}, #009E8B)`}; ${tc.isVip ? 'color: #A08840;' : ''}">${escapeHtml(m.memberName).charAt(0)}</div>
          <div class="pass-card-info">
            <div class="pass-card-name">${escapeHtml(m.memberName)}</div>
            <div class="pass-card-meta">${escapeHtml(m.memberId)} &middot; Since ${escapeHtml(m.memberSince)}</div>
          </div>
          <div class="pass-card-right">
            <span class="tier-pill${tc.isVip ? ' tier-pill-vip' : ''}" style="background: ${tc.isVip ? 'rgba(0,0,0,0.5)' : tc.bg}; color: ${tc.isVip ? '#C5A55A' : tc.text};">${escapeHtml(m.tier)}</span>
            <span class="status-pill ${isActive ? 'status-active' : 'status-inactive'}"><span class="status-pip"></span>${escapeHtml(m.status)}</span>
          </div>
        </div>
        <div class="pass-card-bottom">
          <div class="pass-card-points">
            <span class="points-num">${Number(m.points).toLocaleString()}</span>
            <span class="points-label">pts</span>
          </div>
          <div class="pass-card-progress">
            <div class="mini-track"><div class="mini-fill" style="width:${pct}%;background:${tc.isVip ? 'linear-gradient(90deg, #8B7335, #C5A55A)' : tc.bg};"></div></div>
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

    body {
      background-image:
        repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 40px,
          rgba(255,255,255,0.008) 40px,
          rgba(255,255,255,0.008) 41px
        );
    }

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
      animation: fadeIn 0.4s ease both;
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
      animation: fadeUp 0.5s ease both;
    }
    .list-hero-left {}
    .list-title {
      font-family: var(--font-display);
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 3px;
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
      padding: 12px 24px;
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
      transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 4px 12px rgba(0,191,166,0.2);
    }
    .btn-new-pass:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,191,166,0.3); }

    /* Pass cards */
    .pass-card {
      display: block;
      position: relative;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 10px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
      animation: fadeUp 0.4s ease both;
    }
    .pass-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("${NOISE_URI}");
      background-repeat: repeat;
      opacity: 0.2;
      pointer-events: none;
      z-index: 1;
      mix-blend-mode: overlay;
    }
    .pass-card:hover {
      border-color: var(--tier-color, var(--primary));
      box-shadow: 0 0 0 1px var(--tier-color, var(--primary)), 0 8px 28px rgba(0,0,0,0.2);
      transform: translateY(-3px);
    }

    /* VIP dark gold card in list */
    .pass-card-vip {
      background: linear-gradient(155deg, #3C3118 0%, #5C4A1E 15%, #7A6530 35%, #8B7335 50%, #7A6530 65%, #5C4A1E 85%, #3C3118 100%);
      background-size: 300% 300%;
      animation: fadeUp 0.4s ease both, goldListShift 10s ease infinite;
      border-color: rgba(160,136,64,0.2);
      color: #f0e6cc;
      box-shadow: 0 4px 20px rgba(40,32,12,0.3), inset 0 1px 0 rgba(160,136,64,0.1);
    }
    .pass-card-vip:hover {
      border-color: #8B7335;
      box-shadow: 0 0 0 1px #8B7335, 0 12px 40px rgba(40,32,12,0.5), 0 0 60px -15px rgba(160,136,64,0.12);
    }
    .pass-card-vip .pass-card-name { color: #f0e6cc; }
    .pass-card-vip .pass-card-meta { color: rgba(240,230,204,0.45); }
    .pass-card-vip .pass-card-bottom { border-top-color: rgba(240,230,204,0.1); }
    .pass-card-vip .points-num { color: #f0e6cc; }
    .pass-card-vip .points-label { color: rgba(240,230,204,0.45); }
    .pass-card-vip .mini-track { background: rgba(0,0,0,0.25); }
    .pass-card-vip .pass-card-visits { color: rgba(240,230,204,0.45); }
    .pass-card-vip .status-active { color: #A08840; }
    @keyframes goldListShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .pass-card-stripe { height: 3px; position: relative; z-index: 2; }
    .pass-card-body { padding: 16px 20px; position: relative; z-index: 2; }
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
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 18px;
      color: #fff;
      flex-shrink: 0;
      letter-spacing: 1px;
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
      padding: 4px 12px;
      border-radius: 5px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .tier-pill-vip {
      box-shadow: inset 0 0 0 1px rgba(160,136,64,0.25);
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
    .pass-card-points { flex-shrink: 0; }
    .points-num {
      font-family: var(--font-display);
      font-size: 17px;
      font-weight: 700;
      color: var(--text);
      letter-spacing: 0.5px;
    }
    .points-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      margin-left: 2px;
    }
    .pass-card-progress { flex: 1; }
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
      background: var(--surface-raised);
      border: 1px solid var(--border);
      border-radius: 24px;
      color: var(--primary);
    }
    .empty-icon svg { width: 36px; height: 36px; }
    .empty-title {
      font-family: var(--font-display);
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
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
      transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 4px 16px rgba(0,191,166,0.25);
    }
    .btn-create:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,191,166,0.35); }

    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
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
