/* ============================================================
   FIFA World Cup 2026 News Timeline Widget
   Plus UI Theme — Full Width — Dynamic Data via Data Attributes
   Host: https://cdn.jsdelivr.net/gh/PashtunObserver/bloggercode@main/tlwc26.js
   Usage: <div class="tlwc26" data-items='[...]'></div>
   ============================================================ */

(function() {
  'use strict';

  /* ── Configuration ── */
  const CONFIG = {
    flagBase: 'https://dmu-api.gulfnews.com/fifa-2026/flags/',
    defaultImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=340&fit=crop'
  };

  /* ── PNG Icon URLs (direct Flaticon CDN links) — one icon per concept, no duplicates ── */
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
/* ===== FIFA WC26 Timeline Widget — Plus UI themed ===== */
.tlwc26-outer{
  --wc-gold:#e8b923;
  --wc-gold-soft:rgba(232,185,35,.14);
  margin:0;
  padding:0;
  width:100%;
  max-width:100%;
  box-sizing:border-box;
  font-family:var(--fontB, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  background:var(--contentB, #ffffff);
  color:var(--bodyC, #333333);
  overflow:hidden;
  line-height:1.6;
  border:1px solid var(--contentL, #e5e7eb);
  border-radius:var(--linkR, 8px);
  box-shadow:0 1px 3px rgba(0,0,0,.04);
}

/* ---- Header ---- */
.tlwc26-header{
  width:100%;
  margin:0;
  padding:18px 20px;
  background:
    radial-gradient(120% 220% at 0% 0%, var(--linkB,#2563eb) 0%, transparent 55%),
    linear-gradient(120deg, var(--linkB, #2563eb) 0%, color-mix(in srgb, var(--linkB,#2563eb) 70%, #0a1a3a) 100%);
  position:relative;
  display:flex;
  align-items:center;
  gap:14px;
  box-sizing:border-box;
  overflow:hidden;
}
.tlwc26-header::before{
  content:'';
  position:absolute;
  inset:0;
  background-image:repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 2px, transparent 2px 14px);
  pointer-events:none;
}
.tlwc26-header::after{
  content:'';
  position:absolute;
  right:-30px;
  top:50%;
  width:130px;
  height:130px;
  margin-top:-65px;
  background:radial-gradient(circle, rgba(255,255,255,.10) 0%, transparent 70%);
  border-radius:50%;
  pointer-events:none;
}
.tlwc26-header-icon{
  width:42px;
  height:42px;
  background:var(--wc-gold);
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  position:relative;
  z-index:1;
  box-shadow:0 0 0 4px rgba(255,255,255,.18);
  animation:tlwc26-trophy-glow 2.6s ease-in-out infinite;
}
.tlwc26-header-icon img{
  width:22px;
  height:22px;
  object-fit:contain;
  filter:brightness(0) saturate(100%);
}
@keyframes tlwc26-trophy-glow{
  0%,100%{ box-shadow:0 0 0 4px rgba(255,255,255,.18); }
  50%{ box-shadow:0 0 0 7px rgba(255,255,255,.06); }
}
.tlwc26-header-text{ position:relative; z-index:1; }
.tlwc26-header-text h2{
  margin:0;
  padding:0;
  color:#ffffff;
  font-size:1.12rem;
  font-weight:800;
  font-family:var(--fontH, var(--fontB, inherit));
  letter-spacing:0.3px;
  line-height:1.3;
}
.tlwc26-header-text span{
  display:block;
  margin-top:3px;
  color:rgba(255,255,255,.78);
  font-size:0.72rem;
  font-weight:600;
  letter-spacing:1px;
  text-transform:uppercase;
}

/* ---- Timeline ---- */
.tlwc26-tl{
  width:100%;
  margin:0;
  padding:4px 20px 0;
  position:relative;
  background:var(--contentB, #ffffff);
  box-sizing:border-box;
}
.tlwc26-tl::before{
  content:'';
  position:absolute;
  left:25px;
  top:0;
  bottom:0;
  width:2px;
  background:linear-gradient(to bottom, var(--wc-gold) 0%, var(--contentL, #e5e7eb) 12%, var(--contentL, #e5e7eb) 88%, var(--wc-gold) 100%);
  opacity:.6;
}
.tlwc26-item{
  width:100%;
  margin:0;
  padding:20px 0 20px 38px;
  position:relative;
  box-sizing:border-box;
  border-bottom:1px solid var(--contentL, #e5e7eb);
  transition:background .25s ease;
  opacity:0;
  transform:translateY(10px);
  animation:tlwc26-rise .5s ease forwards;
}
.tlwc26-item:last-child{ border-bottom:none; }
.tlwc26-item:hover{ background:var(--transB, rgba(0,0,0,0.02)); }
@keyframes tlwc26-rise{
  to{ opacity:1; transform:translateY(0); }
}
.tlwc26-item::before{
  content:'';
  position:absolute;
  left:18px;
  top:25px;
  width:13px;
  height:13px;
  border-radius:50%;
  background:var(--contentB,#fff);
  border:3px solid var(--linkB, #2563eb);
  box-shadow:0 0 0 3px var(--contentB,#fff), 0 0 0 4px var(--contentL,#e5e7eb);
  z-index:2;
  transition:transform .2s ease;
}
.tlwc26-item:hover::before{ transform:scale(1.15); }
.tlwc26-item.tlwc26-is-live::before{
  border-color:#dc2626;
  box-shadow:0 0 0 3px var(--contentB,#fff), 0 0 0 4px rgba(220,38,38,.35);
}

/* ---- Date / live badge ---- */
.tlwc26-date{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:4px 11px;
  border-radius:20px;
  background:var(--transB, rgba(0,0,0,0.02));
  color:var(--linkC, #2563eb);
  font-size:0.7rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:0.6px;
  margin-bottom:9px;
  font-family:var(--fontB, inherit);
  border:1px solid var(--contentL, #e5e7eb);
}
.tlwc26-date img{
  width:12px;
  height:12px;
  object-fit:contain;
}
.tlwc26-live{
  background:rgba(220,38,38,.08);
  color:#dc2626;
  border-color:rgba(220,38,38,.25);
}
.tlwc26-live::after{
  content:'';
  display:inline-block;
  width:6px;
  height:6px;
  background:#dc2626;
  border-radius:50%;
  margin-left:1px;
  animation:tlwc26-pulse 1.4s ease-in-out infinite;
}
@keyframes tlwc26-pulse{
  0%,100%{ opacity:1; transform:scale(1); box-shadow:0 0 0 0 rgba(220,38,38,.45); }
  50%{ opacity:0.5; transform:scale(0.85); box-shadow:0 0 0 4px rgba(220,38,38,0); }
}

.tlwc26-title{
  margin:0 0 6px 0;
  padding:0;
  color:var(--headC, #111827);
  font-size:1rem;
  font-weight:700;
  font-family:var(--fontH, var(--fontB, inherit));
  line-height:1.35;
}
.tlwc26-desc{
  margin:0;
  padding:0;
  color:var(--bodyCa, #6b7280);
  font-size:0.85rem;
  font-family:var(--fontBa, var(--fontB, inherit));
  line-height:1.5;
}
.tlwc26-img{
  display:block;
  width:100%;
  max-width:100%;
  height:auto;
  border-radius:var(--linkR, 8px);
  margin:10px 0 0 0;
  border:1px solid var(--contentL, #e5e7eb);
  object-fit:cover;
  transition:transform .35s ease;
}
.tlwc26-img-wrap{
  overflow:hidden;
  border-radius:var(--linkR, 8px);
  margin:10px 0 0 0;
}
.tlwc26-img-wrap:hover .tlwc26-img{ transform:scale(1.04); }
.tlwc26-img-wrap .tlwc26-img{ margin:0; }

.tlwc26-flag{
  width:22px;
  height:16px;
  border-radius:3px;
  object-fit:cover;
  flex-shrink:0;
  display:inline-block;
  vertical-align:middle;
  border:1px solid var(--contentL, #e5e7eb);
}

/* ---- Score panel ---- */
.tlwc26-score{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:14px;
  margin:12px 0 0 0;
  padding:12px 14px;
  background:
    linear-gradient(180deg, var(--contentBs,#f9fafb) 0%, var(--contentB,#fff) 100%);
  border:1px solid var(--contentL, #e5e7eb);
  border-radius:var(--linkR, 8px);
  font-family:var(--fontB, inherit);
  position:relative;
}
.tlwc26-score-team{
  display:flex;
  align-items:center;
  gap:7px;
  font-size:0.85rem;
  font-weight:600;
  color:var(--headC, #111827);
  flex:1;
  min-width:0;
}
.tlwc26-score-team span{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.tlwc26-score-team.tlwc26-away{ justify-content:flex-end; text-align:right; }
.tlwc26-score-num{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:1.15rem;
  font-weight:800;
  color:var(--headC, #111827);
  font-family:var(--fontH, var(--fontB, inherit));
  flex-shrink:0;
  padding:2px 10px;
  border-radius:6px;
  background:var(--wc-gold-soft);
}
.tlwc26-score-sep{
  color:var(--bodyCa, #6b7280);
  font-size:0.9rem;
  margin:0 1px;
}
.tlwc26-score-info{
  display:block;
  text-align:center;
  margin-top:6px;
  font-size:0.7rem;
  color:var(--bodyCa, #6b7280);
  opacity:0.85;
}

/* ---- Winner panel ---- */
.tlwc26-winner{
  display:flex;
  align-items:center;
  gap:10px;
  margin:12px 0 0 0;
  padding:11px 14px;
  background:var(--wc-gold-soft);
  border:1px solid color-mix(in srgb, var(--wc-gold) 35%, var(--contentL, #e5e7eb));
  border-radius:var(--linkR, 8px);
  font-family:var(--fontB, inherit);
}
.tlwc26-winner-icon img{
  width:22px;
  height:22px;
  object-fit:contain;
}
.tlwc26-winner-text{
  font-size:0.85rem;
  color:var(--headC, #111827);
  font-weight:600;
  display:flex;
  align-items:center;
  gap:6px;
  flex-wrap:wrap;
}
.tlwc26-winner-name{
  color:var(--linkC, #2563eb);
  font-weight:800;
  display:inline-flex;
  align-items:center;
  gap:6px;
}

/* ---- Tag ---- */
.tlwc26-tag{
  display:inline-flex;
  align-items:center;
  gap:5px;
  margin-top:11px;
  padding:4px 11px;
  border-radius:var(--linkR, 8px);
  font-size:0.68rem;
  font-weight:700;
  font-family:var(--fontB, inherit);
  text-transform:uppercase;
  letter-spacing:0.5px;
  background:var(--transB, rgba(0,0,0,0.02));
  color:var(--linkC, #2563eb);
  border:1px solid var(--contentL, #e5e7eb);
}
.tlwc26-tag img{
  width:11px;
  height:11px;
  object-fit:contain;
}

/* ---- Footer ---- */
.tlwc26-footer{
  width:100%;
  margin:0;
  padding:15px 18px;
  text-align:center;
  background:var(--contentBs, #f9fafb);
  border-top:1px solid var(--contentL, #e5e7eb);
}
.tlwc26-footer a{
  color:var(--linkC, #2563eb);
  text-decoration:none;
  font-size:0.82rem;
  font-weight:700;
  font-family:var(--fontB, inherit);
  letter-spacing:0.5px;
  transition:color .2s ease, gap .2s ease;
  display:inline-flex;
  align-items:center;
  gap:4px;
}
.tlwc26-footer a:hover{ color:var(--headC, #111827); gap:8px; }
.tlwc26-footer a img{
  width:13px;
  height:13px;
  object-fit:contain;
  transition:transform .2s ease;
}
.tlwc26-footer a:hover img{ transform:translateX(2px); }

/* ---- Responsive ---- */
@media screen and (max-width: 767px){
  .tlwc26-header{ padding:15px 16px; gap:12px; }
  .tlwc26-header-icon{ width:38px; height:38px; }
  .tlwc26-tl{ padding:4px 16px 0; }
  .tlwc26-tl::before{ left:21px; }
  .tlwc26-item{ padding:17px 0 17px 33px; }
  .tlwc26-item::before{ left:14px; }
  .tlwc26-header-text h2{ font-size:1rem; }
  .tlwc26-title{ font-size:0.93rem; }
  .tlwc26-desc{ font-size:0.8rem; }
  .tlwc26-score{ gap:8px; padding:9px 10px; }
  .tlwc26-score-num{ font-size:1rem; padding:2px 7px; }
  .tlwc26-score-team{ font-size:0.78rem; }
  .tlwc26-flag{ width:20px; height:14px; }
}

@media (prefers-reduced-motion: reduce){
  .tlwc26-item, .tlwc26-header-icon, .tlwc26-live::after{ animation:none !important; }
  .tlwc26-item{ opacity:1; transform:none; }
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
      .replace(/&#[0-9]{4,6};/g, '')   // strip any emoji-range numeric entities
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, ''); // strip literal emoji
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
        <span class="tlwc26-score-team">${homeFlag}<span>${homeName}</span></span>
        <span class="tlwc26-score-num">${escapeHtml(score).replace(/—/g, '<span class="tlwc26-score-sep">—</span>')}</span>
        <span class="tlwc26-score-team tlwc26-away"><span>${awayName}</span>${awayFlag}</span>
      </div>
      ${info}
    `;
  }

  function renderWinner(item) {
    if (!item.winner) return '';
    const flag = item.winnerFlag ? `<img class="tlwc26-flag" src="${getFlagUrl(item.winnerFlag)}" alt="${escapeHtml(item.winner)}" loading="lazy"/>` : '';
    return `
      <div class="tlwc26-winner">
        <span class="tlwc26-winner-icon">${iconImg(ICONS.trophy, 22, 22)}</span>
        <span class="tlwc26-winner-text">
          ${escapeHtml(normalizeEntities(item.winnerLabel || 'Winner'))}:
          <span class="tlwc26-winner-name">${flag} ${escapeHtml(normalizeEntities(item.winner))}</span>
        </span>
      </div>
    `;
  }

  function renderImage(item) {
    if (!item.img) return '';
    return `<div class="tlwc26-img-wrap"><img class="tlwc26-img" src="${escapeHtml(item.img)}" alt="${escapeHtml(item.title || '')}" loading="lazy"/></div>`;
  }

  function renderTag(item) {
    if (!item.tag) return '';
    const cleanTag = normalizeEntities(item.tag);
    return `<span class="tlwc26-tag">${iconImg(getTagIcon(item.tag), 11, 11)} ${escapeHtml(cleanTag)}</span>`;
  }

  function renderDate(item) {
    const isLive = item.live === true || item.live === 'true' || item.live === 1;
    const liveClass = isLive ? ' tlwc26-live' : '';
    const icon = isLive ? ICONS.live : ICONS.calendar;
    return `<div class="tlwc26-date${liveClass}">${iconImg(icon, 12, 12)} ${escapeHtml(normalizeEntities(item.date))}</div>`;
  }

  function renderItem(item, index) {
    const isLive = item.live === true || item.live === 'true' || item.live === 1;
    /* Avoid duplicate visual: only render score panel image OR provided image, never both stacked redundantly */
    const hasScore = !!(item.home || item.away);
    const image = hasScore ? '' : renderImage(item);

    return `
      <div class="tlwc26-item${isLive ? ' tlwc26-is-live' : ''}" style="animation-delay:${Math.min(index * 70, 560)}ms">
        ${renderDate(item)}
        <h3 class="tlwc26-title">${escapeHtml(normalizeEntities(item.title))}</h3>
        ${item.desc ? `<p class="tlwc26-desc">${escapeHtml(normalizeEntities(item.desc))}</p>` : ''}
        ${image}
        ${renderScore(item)}
        ${renderWinner(item)}
        ${renderTag(item)}
      </div>
    `;
  }

  function renderWidget(container, data) {
    const items = Array.isArray(data.items) ? data.items : [];
    const title = data.title || 'Live News Updates & Timeline';
    const subtitle = data.subtitle || 'FIFA World Cup 2026 — Canada · Mexico · USA';
    const footerText = data.footerText || 'View All World Cup 2026 Updates';
    const footerLink = data.footerLink || 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news';

    const html = `
      <div class="tlwc26-outer">
        <div class="tlwc26-header">
          <div class="tlwc26-header-icon">${iconImg(ICONS.trophy, 22, 22)}</div>
          <div class="tlwc26-header-text">
            <h2>${escapeHtml(normalizeEntities(title))}</h2>
            <span>${escapeHtml(normalizeEntities(subtitle))}</span>
          </div>
        </div>
        <div class="tlwc26-tl">
          ${items.map(renderItem).join('')}
        </div>
        <div class="tlwc26-footer">
          <a href="${escapeHtml(footerLink)}" target="_blank" rel="noopener">${escapeHtml(normalizeEntities(footerText))} ${iconImg(ICONS.arrow, 13, 13)}</a>
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
      if (container.dataset.subtitle) data.subtitle = container.dataset.subtitle;
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