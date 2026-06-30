/* ============================================================
   FIFA World Cup 2026 News Timeline Widget
   Plus UI Theme — Full Width — Dynamic Data via Data Attributes
   World Cup 2026 Themed — Animated — Glassmorphism
   Host: https://cdn.jsdelivr.net/gh/PashtunObserver/bloggercode@main/tlwc26.js
   Usage: <div class="tlwc26" data-items='[...]'></div>
   ============================================================ */

(function() {
  'use strict';

  /* ── Configuration ── */
  const CONFIG = {
    flagBase: 'https://dmu-api.gulfnews.com/fifa-2026/flags/',
    defaultImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=340&fit=crop',
    pulseSpeed: '1.5s'
  };

  /* ── PNG Icon URLs (direct Flaticon CDN links) ── */
  const ICONS = {
    trophy: 'https://cdn-icons-png.flaticon.com/512/8348/8348232.png',
    football: 'https://cdn-icons-png.flaticon.com/512/37/37984.png',
    calendar: 'https://cdn-icons-png.flaticon.com/512/1243/1243536.png',
    live: 'https://cdn-icons-png.flaticon.com/512/1246/1246264.png',
    location: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
    medical: 'https://cdn-icons-png.flaticon.com/512/12137/12137299.png',
    party: 'https://cdn-icons-png.flaticon.com/512/4353/4353420.png',
    arrow: 'https://cdn-icons-png.flaticon.com/512/109/109617.png'
  };

  const TAG_ICONS = {
    'match': 'football',
    'official': 'trophy',
    'hostcity': 'location',
    'injury': 'medical',
    'opening': 'party'
  };

  /* ── CSS Injection ── */
  const CSS = `
/* ===== FIFA WC26 Timeline Widget — World Cup 2026 Theme ===== */
@keyframes tlwc26-fadeInUp{
  from{ opacity:0; transform:translateY(30px); }
  to{ opacity:1; transform:translateY(0); }
}
@keyframes tlwc26-shimmer{
  0%{ background-position:-200% 0; }
  100%{ background-position:200% 0; }
}
@keyframes tlwc26-pulse{
  0%,100%{ opacity:1; transform:scale(1); box-shadow:0 0 0 0 rgba(230,29,37,0.4); }
  50%{ opacity:0.8; transform:scale(1.05); box-shadow:0 0 0 8px rgba(230,29,37,0); }
}
@keyframes tlwc26-glowRotate{
  0%{ --glow-angle:0deg; }
  100%{ --glow-angle:360deg; }
}
@keyframes tlwc26-float{
  0%,100%{ transform:translateY(0); }
  50%{ transform:translateY(-4px); }
}
@keyframes tlwc26-scorePop{
  0%{ transform:scale(0.8); opacity:0; }
  60%{ transform:scale(1.1); }
  100%{ transform:scale(1); opacity:1; }
}
@keyframes tlwc26-borderPulse{
  0%,100%{ border-color:rgba(230,29,37,0.3); }
  50%{ border-color:rgba(230,29,37,0.8); }
}

.tlwc26-outer{
  margin:0;
  padding:0;
  width:100%;
  max-width:100%;
  box-sizing:border-box;
  font-family:var(--fontB, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  background:linear-gradient(135deg, #0a0e27 0%, #1a1f4e 50%, #0d1145 100%);
  color:#e8e8e8;
  overflow:hidden;
  line-height:1.6;
  border-radius:var(--linkR, 16px);
  position:relative;
  box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
}
.tlwc26-outer::before{
  content:'';
  position:absolute;
  top:0; left:0; right:0; bottom:0;
  background:
    repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(60,172,59,0.03) 49px, rgba(60,172,59,0.03) 50px),
    repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(60,172,59,0.03) 49px, rgba(60,172,59,0.03) 50px);
  pointer-events:none;
  z-index:0;
}
.tlwc26-outer::after{
  content:'';
  position:absolute;
  top:-50%; left:-50%;
  width:200%; height:200%;
  background:radial-gradient(circle at 30% 30%, rgba(230,29,37,0.08) 0%, transparent 50%),
             radial-gradient(circle at 70% 70%, rgba(42,57,141,0.1) 0%, transparent 50%);
  animation:tlwc26-float 8s ease-in-out infinite;
  pointer-events:none;
  z-index:0;
}

/* ── Header ── */
.tlwc26-header{
  width:100%;
  margin:0;
  padding:20px 24px;
  background:linear-gradient(135deg, rgba(230,29,37,0.9) 0%, rgba(180,20,25,0.95) 100%);
  border-bottom:2px solid rgba(255,215,0,0.3);
  display:flex;
  align-items:center;
  gap:16px;
  box-sizing:border-box;
  position:relative;
  z-index:1;
  overflow:hidden;
}
.tlwc26-header::before{
  content:'';
  position:absolute;
  top:0; left:-100%;
  width:100%; height:100%;
  background:linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  animation:tlwc26-shimmer 3s infinite;
}
.tlwc26-header-icon{
  width:48px;
  height:48px;
  background:linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  flex-shrink:0;
  box-shadow:0 4px 15px rgba(255,215,0,0.4), 0 0 0 3px rgba(255,215,0,0.2);
  position:relative;
  z-index:1;
  animation:tlwc26-float 3s ease-in-out infinite;
}
.tlwc26-header-icon img{
  width:26px;
  height:26px;
  object-fit:contain;
  filter:drop-shadow(0 1px 2px rgba(0,0,0,0.3));
}
.tlwc26-header-text h2{
  margin:0;
  padding:0;
  color:#fff;
  font-size:1.25rem;
  font-weight:800;
  font-family:var(--fontH, var(--fontB, inherit));
  letter-spacing:0.5px;
  line-height:1.3;
  text-shadow:0 2px 4px rgba(0,0,0,0.3);
  position:relative;
  z-index:1;
}

/* ── Timeline ── */
.tlwc26-tl{
  width:100%;
  margin:0;
  padding:0 24px;
  position:relative;
  box-sizing:border-box;
  z-index:1;
}
.tlwc26-tl::before{
  content:'';
  position:absolute;
  left:28px;
  top:0;
  bottom:0;
  width:3px;
  background:linear-gradient(180deg, #E61D25 0%, #2A398D 50%, #3CAC3B 100%);
  border-radius:3px;
  box-shadow:0 0 10px rgba(230,29,37,0.3);
}

/* ── Items ── */
.tlwc26-item{
  width:100%;
  margin:0;
  padding:20px 0 20px 44px;
  position:relative;
  box-sizing:border-box;
  border-bottom:1px solid rgba(255,255,255,0.06);
  transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
  animation:tlwc26-fadeInUp 0.5s ease-out both;
  opacity:0;
}
.tlwc26-item:nth-child(1){ animation-delay:0.1s; }
.tlwc26-item:nth-child(2){ animation-delay:0.2s; }
.tlwc26-item:nth-child(3){ animation-delay:0.3s; }
.tlwc26-item:nth-child(4){ animation-delay:0.4s; }
.tlwc26-item:nth-child(5){ animation-delay:0.5s; }
.tlwc26-item:nth-child(6){ animation-delay:0.6s; }
.tlwc26-item:last-child{ border-bottom:none; }
.tlwc26-item:hover{
  background:rgba(255,255,255,0.03);
  transform:translateX(4px);
}
.tlwc26-item::before{
  content:'';
  position:absolute;
  left:20px;
  top:26px;
  width:14px;
  height:14px;
  border-radius:50%;
  background:linear-gradient(135deg, #E61D25 0%, #FFD700 100%);
  border:3px solid #0a0e27;
  box-shadow:0 0 0 2px #E61D25, 0 0 12px rgba(230,29,37,0.5);
  z-index:2;
  transition:all 0.3s ease;
}
.tlwc26-item:hover::before{
  transform:scale(1.3);
  box-shadow:0 0 0 2px #E61D25, 0 0 20px rgba(230,29,37,0.8);
}

/* ── Date Badge ── */
.tlwc26-date{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:4px 14px;
  border-radius:30px;
  background:rgba(42,57,141,0.25);
  color:#7aa2f7;
  font-size:0.72rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:0.8px;
  margin-bottom:10px;
  font-family:var(--fontB, inherit);
  border:1px solid rgba(42,57,141,0.3);
  backdrop-filter:blur(10px);
}
.tlwc26-date img{
  width:13px;
  height:13px;
  object-fit:contain;
  filter:brightness(1.2);
}
.tlwc26-live{
  background:rgba(230,29,37,0.2) !important;
  color:#ff6b6b !important;
  border-color:rgba(230,29,37,0.4) !important;
  animation:tlwc26-borderPulse 2s ease-in-out infinite;
}
.tlwc26-live::after{
  content:'';
  display:inline-block;
  width:7px;
  height:7px;
  background:#E61D25;
  border-radius:50%;
  animation:tlwc26-pulse 1.5s ease-in-out infinite;
  box-shadow:0 0 8px #E61D25;
}

/* ── Title ── */
.tlwc26-title{
  margin:0 0 8px 0;
  padding:0;
  color:#fff;
  font-size:1.05rem;
  font-weight:700;
  font-family:var(--fontH, var(--fontB, inherit));
  line-height:1.4;
  text-shadow:0 1px 2px rgba(0,0,0,0.2);
}

/* ── Description ── */
.tlwc26-desc{
  margin:0;
  padding:0;
  color:rgba(200,210,230,0.75);
  font-size:0.86rem;
  font-family:var(--fontBa, var(--fontB, inherit));
  line-height:1.6;
}

/* ── Image ── */
.tlwc26-img{
  display:block;
  width:100%;
  max-width:100%;
  height:auto;
  border-radius:var(--linkR, 12px);
  margin:12px 0 0 0;
  border:1px solid rgba(255,255,255,0.08);
  object-fit:cover;
  box-shadow:0 8px 30px rgba(0,0,0,0.3);
  transition:transform 0.3s ease, box-shadow 0.3s ease;
}
.tlwc26-img:hover{
  transform:scale(1.02);
  box-shadow:0 12px 40px rgba(0,0,0,0.4);
}

/* ── Flags ── */
.tlwc26-flag{
  width:24px;
  height:18px;
  border-radius:4px;
  object-fit:cover;
  flex-shrink:0;
  display:inline-block;
  vertical-align:middle;
  border:1px solid rgba(255,255,255,0.15);
  box-shadow:0 2px 6px rgba(0,0,0,0.2);
}

/* ── Score Card ── */
.tlwc26-score{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:16px;
  margin:14px 0 0 0;
  padding:14px 18px;
  background:linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:var(--linkR, 14px);
  font-family:var(--fontB, inherit);
  backdrop-filter:blur(10px);
  box-shadow:0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05);
  animation:tlwc26-scorePop 0.4s ease-out both;
  animation-delay:0.3s;
  position:relative;
  overflow:hidden;
}
.tlwc26-score::before{
  content:'';
  position:absolute;
  top:0; left:-100%;
  width:100%; height:100%;
  background:linear-gradient(90deg, transparent, rgba(255,215,0,0.05), transparent);
  animation:tlwc26-shimmer 4s infinite;
}
.tlwc26-score-team{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:0.88rem;
  font-weight:600;
  color:#fff;
}
.tlwc26-score-num{
  display:flex;
  align-items:center;
  gap:10px;
  font-size:1.3rem;
  font-weight:800;
  color:#FFD700;
  font-family:var(--fontH, var(--fontB, inherit));
  text-shadow:0 0 10px rgba(255,215,0,0.3);
}
.tlwc26-score-sep{
  color:rgba(255,255,255,0.4);
  font-size:1rem;
}
.tlwc26-score-info{
  display:block;
  text-align:center;
  margin-top:6px;
  font-size:0.72rem;
  color:rgba(200,210,230,0.6);
}

/* ── Winner Card ── */
.tlwc26-winner{
  display:flex;
  align-items:center;
  gap:12px;
  margin:14px 0 0 0;
  padding:14px 18px;
  background:linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,215,0,0.02) 100%);
  border:1px solid rgba(255,215,0,0.15);
  border-radius:var(--linkR, 14px);
  font-family:var(--fontB, inherit);
  backdrop-filter:blur(10px);
  box-shadow:0 4px 20px rgba(0,0,0,0.2);
  animation:tlwc26-fadeInUp 0.5s ease-out both;
  animation-delay:0.2s;
}
.tlwc26-winner-icon img{
  width:24px;
  height:24px;
  object-fit:contain;
  filter:drop-shadow(0 0 6px rgba(255,215,0,0.5));
}
.tlwc26-winner-text{
  font-size:0.88rem;
  color:#fff;
  font-weight:600;
  display:flex;
  align-items:center;
  gap:8px;
  flex-wrap:wrap;
}
.tlwc26-winner-name{
  color:#FFD700;
  font-weight:800;
  display:inline-flex;
  align-items:center;
  gap:8px;
  text-shadow:0 0 8px rgba(255,215,0,0.3);
}

/* ── Tag ── */
.tlwc26-tag{
  display:inline-flex;
  align-items:center;
  gap:6px;
  margin-top:12px;
  padding:4px 12px;
  border-radius:var(--linkR, 8px);
  font-size:0.72rem;
  font-weight:700;
  font-family:var(--fontB, inherit);
  text-transform:uppercase;
  letter-spacing:0.6px;
  background:rgba(60,172,59,0.15);
  color:#3CAC3B;
  border:1px solid rgba(60,172,59,0.25);
  backdrop-filter:blur(10px);
  transition:all 0.2s ease;
}
.tlwc26-tag:hover{
  background:rgba(60,172,59,0.25);
  transform:translateY(-1px);
}
.tlwc26-tag img{
  width:13px;
  height:13px;
  object-fit:contain;
}

/* ── Footer ── */
.tlwc26-footer{
  width:100%;
  margin:0;
  padding:18px 24px;
  text-align:center;
  background:linear-gradient(135deg, rgba(42,57,141,0.3) 0%, rgba(42,57,141,0.15) 100%);
  border-top:1px solid rgba(255,255,255,0.06);
  position:relative;
  z-index:1;
}
.tlwc26-footer a{
  color:#7aa2f7;
  text-decoration:none;
  font-size:0.85rem;
  font-weight:700;
  font-family:var(--fontB, inherit);
  letter-spacing:0.6px;
  transition:all 0.3s ease;
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:8px 20px;
  border-radius:30px;
  background:rgba(42,57,141,0.2);
  border:1px solid rgba(42,57,141,0.3);
}
.tlwc26-footer a:hover{
  color:#fff;
  background:rgba(42,57,141,0.35);
  border-color:rgba(42,57,141,0.5);
  box-shadow:0 0 20px rgba(42,57,141,0.3);
  transform:translateY(-2px);
}
.tlwc26-footer a img{
  width:14px;
  height:14px;
  object-fit:contain;
  transition:transform 0.3s ease;
}
.tlwc26-footer a:hover img{
  transform:translateX(4px);
}

/* ── Mobile ── */
@media screen and (max-width: 767px){
  .tlwc26-header{ padding:16px 18px; }
  .tlwc26-tl{ padding:0 18px; }
  .tlwc26-item{ padding:16px 0 16px 38px; }
  .tlwc26-header-text h2{ font-size:1.05rem; }
  .tlwc26-title{ font-size:0.95rem; }
  .tlwc26-desc{ font-size:0.8rem; }
  .tlwc26-score{ gap:10px; padding:10px 12px; }
  .tlwc26-score-num{ font-size:1.05rem; }
  .tlwc26-score-team{ font-size:0.8rem; }
  .tlwc26-flag{ width:20px; height:14px; }
}
`;

  /* ── Helpers ── */
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
    });
  }

  function normalizeEntities(str) {
    if (!str) return '';
    return str
      .replace(/&#8212;/g, '—')
      .replace(/&mdash;/g, '—')
      .replace(/&#8211;/g, '–')
      .replace(/&ndash;/g, '–')
      .replace(/&#9917;/g, '')
      .replace(/&#9918;/g, '')
      .replace(/&#9919;/g, '')
      .replace(/&#128205;/g, '')
      .replace(/&#128196;/g, '')
      .replace(/&#127881;/g, '')
      .replace(/&#127880;/g, '')
      .replace(/&#128[0-9]{3};/g, '')
      .replace(/&#127[0-9]{3};/g, '')
      .replace(/&#129[0-9]{3};/g, '');
  }

  function getFlagUrl(code) {
    if (!code) return '';
    return CONFIG.flagBase + encodeURIComponent(code.toUpperCase().trim()) + '.png';
  }

  function getTagIcon(tag) {
    const key = (tag || '').toLowerCase().replace(/[^a-z]/g, '');
    const iconKey = TAG_ICONS[key] || 'football';
    return ICONS[iconKey] || ICONS.football;
  }

  function iconImg(url, w, h) {
    const width = w || 14;
    const height = h || 14;
    return `<img src="${url}" width="${width}" height="${height}" style="width:${width}px;height:${height}px;object-fit:contain;display:inline-block;vertical-align:middle;" alt="" loading="lazy"/>`;
  }

  /* ── Render Functions ── */
  function renderScore(item) {
    if (!item.home && !item.away) return '';
    const homeFlag = item.home ? `<img class="tlwc26-flag" src="${getFlagUrl(item.home)}" alt="${escapeHtml(item.homeName || item.home)}" loading="lazy"/>` : '';
    const awayFlag = item.away ? `<img class="tlwc26-flag" src="${getFlagUrl(item.away)}" alt="${escapeHtml(item.awayName || item.away)}" loading="lazy"/>` : '';
    const homeName = escapeHtml(normalizeEntities(item.homeName || item.home || 'Home'));
    const awayName = escapeHtml(normalizeEntities(item.awayName || item.away || 'Away'));
    const score = normalizeEntities(item.score || '0 — 0');
    const info = item.scoreInfo ? `<span class="tlwc26-score-info">${escapeHtml(normalizeEntities(item.scoreInfo))}</span>` : '';

    return `
      <div class="tlwc26-score">
        <span class="tlwc26-score-team">${homeFlag} ${homeName}</span>
        <span class="tlwc26-score-num">${escapeHtml(score).replace(/—/g, '<span class="tlwc26-score-sep">—</span>')}</span>
        <span class="tlwc26-score-team">${awayName} ${awayFlag}</span>
      </div>
      ${info}
    `;
  }

  function renderWinner(item) {
    if (!item.winner) return '';
    const flag = item.winnerFlag ? `<img class="tlwc26-flag" src="${getFlagUrl(item.winnerFlag)}" alt="${escapeHtml(item.winner)}" loading="lazy"/>` : '';
    return `
      <div class="tlwc26-winner">
        <span class="tlwc26-winner-icon">${iconImg(ICONS.trophy, 24, 24)}</span>
        <span class="tlwc26-winner-text">
          ${escapeHtml(normalizeEntities(item.winnerLabel || 'Winner'))}:
          <span class="tlwc26-winner-name">${flag} ${escapeHtml(normalizeEntities(item.winner))}</span>
        </span>
      </div>
    `;
  }

  function renderImage(item) {
    if (!item.img) return '';
    return `<img class="tlwc26-img" src="${escapeHtml(item.img)}" alt="${escapeHtml(item.title || '')}" loading="lazy"/>`;
  }

  function renderTag(item) {
    if (!item.tag) return '';
    const cleanTag = normalizeEntities(item.tag);
    return `<span class="tlwc26-tag">${iconImg(getTagIcon(item.tag), 13, 13)} ${escapeHtml(cleanTag)}</span>`;
  }

  function renderDate(item) {
    const isLive = item.live === true || item.live === 'true' || item.live === 1;
    const liveClass = isLive ? ' tlwc26-live' : '';
    const icon = isLive ? ICONS.live : ICONS.calendar;
    return `<div class="tlwc26-date${liveClass}">${iconImg(icon, 13, 13)} ${escapeHtml(normalizeEntities(item.date))}</div>`;
  }

  function renderItem(item) {
    return `
      <div class="tlwc26-item">
        ${renderDate(item)}
        <h3 class="tlwc26-title">${escapeHtml(normalizeEntities(item.title))}</h3>
        ${item.desc ? `<p class="tlwc26-desc">${escapeHtml(normalizeEntities(item.desc))}</p>` : ''}
        ${renderImage(item)}
        ${renderScore(item)}
        ${renderWinner(item)}
        ${renderTag(item)}
      </div>
    `;
  }

  function renderWidget(container, data) {
    const items = Array.isArray(data.items) ? data.items : [];
    const title = data.title || 'Live News Updates & Timeline';
    const footerText = data.footerText || 'View All World Cup 2026 Updates';
    const footerLink = data.footerLink || 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news';

    const html = `
      <div class="tlwc26-outer">
        <div class="tlwc26-header">
          <div class="tlwc26-header-icon">${iconImg(ICONS.trophy, 26, 26)}</div>
          <div class="tlwc26-header-text">
            <h2>${escapeHtml(normalizeEntities(title))}</h2>
          </div>
        </div>
        <div class="tlwc26-tl">
          ${items.map(renderItem).join('')}
        </div>
        <div class="tlwc26-footer">
          <a href="${escapeHtml(footerLink)}" target="_blank" rel="noopener">${escapeHtml(normalizeEntities(footerText))} ${iconImg(ICONS.arrow, 14, 14)}</a>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  /* ── Main Init ── */
  function init() {
    /* Inject CSS once */
    if (!document.getElementById('tlwc26-style')) {
      const style = document.createElement('style');
      style.id = 'tlwc26-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    /* Find all widgets */
    const widgets = document.querySelectorAll('.tlwc26');
    widgets.forEach(function(container) {
      let data = {};

      /* Try data-items attribute first */
      if (container.dataset.items) {
        try {
          data = JSON.parse(container.dataset.items);
        } catch (e) {
          console.error('tlwc26: Invalid JSON in data-items', e);
          data = {};
        }
      } else {
        /* Fallback: look for a <script type="application/json" data-target="ID"> */
        var jsonScript = document.querySelector('script[type="application/json"][data-target="' + container.id + '"]');
        if (jsonScript) {
          try {
            data = JSON.parse(jsonScript.textContent);
          } catch (e) {
            console.error('tlwc26: Invalid JSON in data-target script', e);
            data = {};
          }
        }
      }

      /* Override with individual data attributes */
      if (container.dataset.title) data.title = container.dataset.title;
      if (container.dataset.footerText) data.footerText = container.dataset.footerText;
      if (container.dataset.footerLink) data.footerLink = container.dataset.footerLink;

      /* Ensure items array exists */
      if (!data.items) data.items = [];

      renderWidget(container, data);
    });
  }

  /* ── Auto-init ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Expose re-init for dynamic content */
  window.tlwc26Init = init;

})();