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
    defaultImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=340&fit=crop',
    pulseSpeed: '1.5s',
    iconBase: 'https://cdn-icons-png.flaticon.com/512/'
  };

  /* ── PNG Icon URLs (no SVG, no emoji) ── */
  const ICONS = {
    trophy: CONFIG.iconBase + '16853146/16853146.png',
    football: 'https://www.citypng.com/public/uploads/preview/classic-football-ball-icon-png-701751694974816ybq9t9vbtl.png',
    calendar: 'https://www.citypng.com/public/uploads/preview/download-calendar-date-black-icon-png-701751694974816ybq9t9vbtl.png',
    live: 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
    location: CONFIG.iconBase + '9356230/9356230.png',
    medical: CONFIG.iconBase + '3359167/3359167.png',
    party: CONFIG.iconBase + '7657766/7657766.png',
    arrow: 'https://www.freeiconspng.com/thumbs/right-arrow-icon/right-arrow-icon-7580.png'
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
/* ===== FIFA WC26 Timeline Widget ===== */
.tlwc26-outer{
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
}
.tlwc26-header{
  width:100%;
  margin:0;
  padding:16px 18px;
  background:var(--contentBs, #f9fafb);
  border-bottom:1px solid var(--contentL, #e5e7eb);
  display:flex;
  align-items:center;
  gap:12px;
  box-sizing:border-box;
}
.tlwc26-header-icon{
  width:40px;
  height:40px;
  background:var(--linkB, #2563eb);
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  flex-shrink:0;
}
.tlwc26-header-icon img{
  width:22px;
  height:22px;
  object-fit:contain;
  filter:brightness(0) invert(1);
}
.tlwc26-header-text h2{
  margin:0;
  padding:0;
  color:var(--headC, #111827);
  font-size:1.1rem;
  font-weight:700;
  font-family:var(--fontH, var(--fontB, inherit));
  letter-spacing:0.3px;
  line-height:1.3;
}
.tlwc26-tl{
  width:100%;
  margin:0;
  padding:0 18px;
  position:relative;
  background:var(--contentB, #ffffff);
  box-sizing:border-box;
}
.tlwc26-tl::before{
  content:'';
  position:absolute;
  left:24px;
  top:0;
  bottom:0;
  width:2px;
  background:var(--contentL, #e5e7eb);
}
.tlwc26-item{
  width:100%;
  margin:0;
  padding:18px 0 18px 36px;
  position:relative;
  box-sizing:border-box;
  border-bottom:1px solid var(--contentL, #e5e7eb);
  transition:background 0.2s ease;
}
.tlwc26-item:last-child{ border-bottom:none; }
.tlwc26-item:hover{ background:var(--transB, rgba(0,0,0,0.02)); }
.tlwc26-item::before{
  content:'';
  position:absolute;
  left:18px;
  top:24px;
  width:12px;
  height:12px;
  border-radius:50%;
  background:var(--linkB, #2563eb);
  border:3px solid var(--contentB, #ffffff);
  box-shadow:0 0 0 2px var(--linkB, #2563eb);
  z-index:2;
}
.tlwc26-date{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:3px 10px;
  border-radius:20px;
  background:var(--transB, rgba(0,0,0,0.02));
  color:var(--linkC, #2563eb);
  font-size:0.7rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:0.6px;
  margin-bottom:8px;
  font-family:var(--fontB, inherit);
}
.tlwc26-date img{
  width:12px;
  height:12px;
  object-fit:contain;
}
.tlwc26-live::after{
  content:'';
  display:inline-block;
  width:6px;
  height:6px;
  background:var(--linkC, #2563eb);
  border-radius:50%;
  animation:tlwc26-pulse 1.5s ease-in-out infinite;
}
@keyframes tlwc26-pulse{
  0%,100%{ opacity:1; transform:scale(1); }
  50%{ opacity:0.4; transform:scale(0.8); }
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
}
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
.tlwc26-score{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  margin:10px 0 0 0;
  padding:10px 14px;
  background:var(--contentBs, #f9fafb);
  border:1px solid var(--contentL, #e5e7eb);
  border-radius:var(--linkR, 8px);
  font-family:var(--fontB, inherit);
}
.tlwc26-score-team{
  display:flex;
  align-items:center;
  gap:6px;
  font-size:0.85rem;
  font-weight:600;
  color:var(--headC, #111827);
}
.tlwc26-score-num{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:1.1rem;
  font-weight:800;
  color:var(--headC, #111827);
  font-family:var(--fontH, var(--fontB, inherit));
}
.tlwc26-score-sep{
  color:var(--bodyCa, #6b7280);
  font-size:0.9rem;
}
.tlwc26-score-info{
  display:block;
  text-align:center;
  margin-top:4px;
  font-size:0.7rem;
  color:var(--bodyCa, #6b7280);
  opacity:0.8;
}
.tlwc26-winner{
  display:flex;
  align-items:center;
  gap:10px;
  margin:10px 0 0 0;
  padding:10px 14px;
  background:var(--transB, rgba(0,0,0,0.02));
  border:1px solid var(--contentL, #e5e7eb);
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
.tlwc26-tag{
  display:inline-flex;
  align-items:center;
  gap:4px;
  margin-top:10px;
  padding:3px 10px;
  border-radius:var(--linkR, 8px);
  font-size:0.7rem;
  font-weight:700;
  font-family:var(--fontB, inherit);
  text-transform:uppercase;
  letter-spacing:0.5px;
  background:var(--transB, rgba(0,0,0,0.02));
  color:var(--linkC, #2563eb);
  border:1px solid var(--contentL, #e5e7eb);
}
.tlwc26-tag img{
  width:12px;
  height:12px;
  object-fit:contain;
}
.tlwc26-footer{
  width:100%;
  margin:0;
  padding:14px 18px;
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
  transition:color 0.2s ease;
  display:inline-flex;
  align-items:center;
  gap:4px;
}
.tlwc26-footer a:hover{ color:var(--headC, #111827); }
.tlwc26-footer a img{
  width:14px;
  height:14px;
  object-fit:contain;
}
@media screen and (max-width: 767px){
  .tlwc26-header{ padding:14px 16px; }
  .tlwc26-tl{ padding:0 16px; }
  .tlwc26-item{ padding:16px 0 16px 32px; }
  .tlwc26-header-text h2{ font-size:1rem; }
  .tlwc26-title{ font-size:0.93rem; }
  .tlwc26-desc{ font-size:0.8rem; }
  .tlwc26-score{ gap:8px; padding:8px 10px; }
  .tlwc26-score-num{ font-size:0.95rem; }
  .tlwc26-score-team{ font-size:0.78rem; }
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
      .replace(/&#9917;/g, '')
      .replace(/&#128205;/g, '')
      .replace(/&#128196;/g, '')
      .replace(/&#127881;/g, '')
      .replace(/&#9917;|&#9918;|&#9919;|&#9920;|&#9921;|&#9922;|&#9923;|&#9924;|&#9925;/g, '')
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
    return `<img class="tlwc26-img" src="${escapeHtml(item.img)}" alt="${escapeHtml(item.title || '')}" loading="lazy"/>`;
  }

  function renderTag(item) {
    if (!item.tag) return '';
    const cleanTag = normalizeEntities(item.tag);
    return `<span class="tlwc26-tag">${iconImg(getTagIcon(item.tag), 12, 12)} ${escapeHtml(cleanTag)}</span>`;
  }

  function renderDate(item) {
    const isLive = item.live === true || item.live === 'true' || item.live === 1;
    const liveClass = isLive ? ' tlwc26-live' : '';
    const icon = isLive ? ICONS.live : ICONS.calendar;
    return `<div class="tlwc26-date${liveClass}">${iconImg(icon, 12, 12)} ${escapeHtml(normalizeEntities(item.date))}</div>`;
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
          <div class="tlwc26-header-icon">${iconImg(ICONS.trophy, 22, 22)}</div>
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