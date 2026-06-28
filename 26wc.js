// ===== FIFA WORLD CUP 2026 LIVE WIDGET =====
// Combined JS + CSS + HTML — Single file for GitHub / Blogger
// Source: https://worldcup26.ir (free open API)

(function() {
  'use strict';

  // ===== INJECT CSS =====
  const css = `/* ===== WC2026 WIDGET — Styled with Plus UI Theme Variables ===== */

.wc-widget-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: var(--contentB);
  border-radius: 5px;
  border: 1px solid var(--contentL);
  overflow: hidden;
  font-family: var(--fontB);
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 5px 35px rgba(0,0,0,.07);
}
.wc-widget-container * {
  box-sizing: border-box;
}
/* Animated top border using theme link color */
.wc-widget-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--linkB), var(--linkC), var(--linkB));
  background-size: 300% 100%;
  animation: wc-gradientShift 4s ease infinite;
  z-index: 10;
}
@keyframes wc-gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ===== HEADER ===== */
.wc-widget-header {
  background: var(--contentBs);
  color: var(--bodyC);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  min-height: 52px;
  position: relative;
  border-bottom: 1px solid var(--contentL);
}
.wc-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}
.wc-header-icon {
  font-size: 22px;
  animation: wc-ballSpin 2s ease-in-out infinite;
  display: inline-block;
}
@keyframes wc-ballSpin {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(90deg) scale(1.15); }
  50%  { transform: rotate(180deg) scale(1); }
  75%  { transform: rotate(270deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}
.wc-header-title {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--headC);
  font-family: var(--fontH);
}
.wc-header-stage {
  font-size: 9px;
  font-weight: 700;
  color: var(--linkC);
  background: var(--transB);
  border: 1px solid var(--contentL);
  padding: 3px 8px;
  border-radius: var(--linkR, 12px);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  flex-shrink: 0;
  white-space: nowrap;
}

/* ===== MATCH CARD ===== */
.wc-match-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-decoration: none;
  color: var(--bodyC);
  background: var(--contentB);
  border-bottom: 1px solid var(--contentL);
  padding: 16px 14px;
  transition: background 0.3s ease;
  width: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.wc-match-card:hover {
  background: var(--contentBs);
  opacity: 1;
}
.wc-match-card:last-child { border-bottom: none; }

/* Row 1: Teams */
.wc-teams-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}
.wc-team-block {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.wc-team-block.wc-away {
  justify-content: flex-end;
  text-align: right;
}
.wc-flag-img {
  width: 28px;
  height: 20px;
  object-fit: cover;
  border-radius: 3px;
  flex-shrink: 0;
  display: block;
  border: 1px solid var(--contentL);
}
.wc-team-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--headC);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  font-family: var(--fontH);
}
.wc-vs-text {
  font-size: 11px;
  font-weight: 600;
  color: var(--bodyCa, var(--bodyC));
  padding: 2px 8px;
  border-radius: var(--linkR, 8px);
  background: var(--transB);
  border: 1px solid var(--contentL);
  flex-shrink: 0;
  letter-spacing: 1px;
}

/* Row 2: Score Center */
.wc-score-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 10px 0;
  position: relative;
}
.wc-score-row::before,
.wc-score-row::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--contentL);
}
.wc-score-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 0 12px;
}
.wc-score-display {
  font-size: 32px;
  font-weight: 900;
  color: var(--headC);
  letter-spacing: 4px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  line-height: 1;
  font-family: var(--fontH);
}
.wc-live-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: var(--linkR, 12px);
  white-space: nowrap;
  font-family: var(--fontB);
}
.wc-live-badge.wc-live {
  color: #fff;
  background: var(--linkB);
  animation: wc-liveGlow 1.5s ease-in-out infinite alternate;
}
@keyframes wc-liveGlow {
  from { box-shadow: 0 0 5px rgba(0,0,0,.1); }
  to   { box-shadow: 0 0 15px rgba(0,0,0,.25); }
}
.wc-live-badge.wc-upcoming {
  color: var(--linkC);
  background: var(--transB);
  border: 1px solid var(--contentL);
}
.wc-live-badge.wc-finished {
  color: var(--bodyCa, var(--bodyC));
  background: var(--transB);
  border: 1px solid var(--contentL);
  opacity: 0.8;
}
.wc-live-dot {
  display: block;
  animation: wc-pulse 1.5s infinite;
}
@keyframes wc-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.8); }
}

/* Row 3: Meta */
.wc-match-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 11px;
  color: var(--bodyCa, var(--bodyC));
  font-weight: 500;
  flex-wrap: wrap;
  margin-top: 6px;
  font-family: var(--fontBa, var(--fontB));
}
.wc-match-meta .wc-date {
  color: var(--linkC);
  font-weight: 700;
  white-space: nowrap;
}
.wc-match-meta .wc-time {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  opacity: 0.8;
}
.wc-stage-badge {
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: var(--linkB);
  padding: 2px 8px;
  border-radius: var(--linkR, 10px);
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

/* Counter */
.wc-match-counter {
  text-align: center;
  font-size: 10px;
  color: var(--bodyCa, var(--bodyC));
  padding: 10px 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: var(--contentBs);
  border-top: 1px solid var(--contentL);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  font-family: var(--fontB);
  opacity: 0.8;
}

/* No Match */
.wc-no-match {
  text-align: center;
  padding: 30px 16px;
  color: var(--bodyCa, var(--bodyC));
  font-size: 13px;
  font-weight: 500;
  font-family: var(--fontB);
  opacity: 0.8;
}
.wc-no-match-icon {
  font-size: 36px;
  margin-bottom: 10px;
  display: block;
  animation: wc-float 3s ease-in-out infinite;
}
@keyframes wc-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* Animations */
.wc-fade-in {
  animation: wc-fadeIn 0.6s ease;
}
@keyframes wc-fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.wc-loading {
  text-align: center;
  padding: 30px;
  color: var(--bodyCa, var(--bodyC));
  font-size: 13px;
  font-weight: 500;
  font-family: var(--fontB);
  opacity: 0.7;
}
.wc-error-msg {
  text-align: center;
  padding: 20px;
  color: #dc3545;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--fontB);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 320px) {
  .wc-widget-header      { padding: 10px; }
  .wc-header-title       { font-size: 11px; letter-spacing: 0.8px; }
  .wc-header-stage       { font-size: 8px; padding: 2px 5px; }
  .wc-match-card         { padding: 12px 10px; }
  .wc-team-name          { font-size: 12px; }
  .wc-flag-img           { width: 22px; height: 16px; }
  .wc-score-display      { font-size: 26px; letter-spacing: 2px; }
  .wc-score-row          { gap: 10px; }
  .wc-score-box          { padding: 0 8px; }
  .wc-live-badge         { font-size: 8px; padding: 3px 6px; }
  .wc-match-meta         { gap: 8px; font-size: 10px; }
  .wc-match-counter      { font-size: 9px; padding: 8px 10px; }
}
@media (min-width: 321px) and (max-width: 480px) {
  .wc-widget-header      { padding: 12px; }
  .wc-header-title       { font-size: 12px; }
  .wc-match-card         { padding: 14px 12px; }
  .wc-team-name          { font-size: 13px; }
  .wc-score-display      { font-size: 28px; }
  .wc-match-meta         { font-size: 10px; }
}
@media (min-width: 768px) {
  .wc-widget-header      { padding: 16px 20px; }
  .wc-header-title       { font-size: 15px; }
  .wc-match-card         { padding: 20px; }
  .wc-team-name          { font-size: 15px; }
  .wc-score-display      { font-size: 40px; letter-spacing: 6px; }
  .wc-flag-img           { width: 32px; height: 24px; }
  .wc-match-meta         { font-size: 12px; }
  .wc-live-badge         { font-size: 11px; padding: 5px 12px; }
  .wc-match-counter      { font-size: 11px; padding: 12px 20px; }
}`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ===== INJECT HTML =====
  const WIDGET_ID = 'wc-widget';
  let container = document.getElementById(WIDGET_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = WIDGET_ID;
    if (document.currentScript) {
      document.currentScript.parentNode.insertBefore(container, document.currentScript.nextSibling);
    } else {
      document.body.appendChild(container);
    }
  }

  const html = `<div class="wc-widget-container">
  <div class="wc-widget-header">
    <div class="wc-header-left">
      <span class="wc-header-icon">⚽</span>
      <span class="wc-header-title" id="wc-header-title">Match of the Day</span>
    </div>
    <span class="wc-header-stage" id="wc-header-stage">WC 2026</span>
  </div>

  <div id="wc-match-container">
    <div class="wc-loading">Loading matches...</div>
  </div>

  <div id="wc-match-counter" class="wc-match-counter" style="display:none;"></div>
</div>`;
  container.innerHTML = html;

  // ===== WIDGET LOGIC =====
// ===== CONFIG =====
  const API_BASE = "https://worldcup26.ir";
  const FLAG_BASE = "https://dmu-api.gulfnews.com/fifa-2026/flags/";
  const CYCLE_INTERVAL = 5000;
  const REFRESH_INTERVAL = 30000;
  const MATCH_LINK = "https://www.pashtomedium.com/p/fifaworldcup2026.html";

  const stageNames = {
    group: "Group Stage",
    r32: "Round of 32",
    r16: "Round of 16",
    qf: "Quarter-Final",
    sf: "Semi-Final",
    third: "3rd Place",
    final: "Final"
  };

  const countryCodes = {
    "Mexico": "MEX", "South Africa": "RSA", "South Korea": "KOR", "Czech Republic": "CZE",
    "Canada": "CAN", "Bosnia and Herzegovina": "BIH", "Qatar": "QAT", "Switzerland": "SUI",
    "Brazil": "BRA", "Morocco": "MAR", "Haiti": "HTI", "Scotland": "SCO",
    "Germany": "GER", "Curaçao": "CUW", "Ivory Coast": "CIV", "Ecuador": "ECU",
    "Sweden": "SWE", "Tunisia": "TUN", "Netherlands": "NED", "Japan": "JPN",
    "United States": "USA", "Paraguay": "PAR", "Australia": "AUS", "Turkey": "TUR",
    "Iran": "IRN", "New Zealand": "NZL", "Belgium": "BEL", "Egypt": "EGY",
    "France": "FRA", "Senegal": "SEN", "Iraq": "IRQ", "Norway": "NOR",
    "Spain": "ESP", "Saudi Arabia": "KSA", "Uruguay": "URU", "Cape Verde": "CPV",
    "Argentina": "ARG", "Algeria": "ALG", "Austria": "AUT", "Jordan": "JOR",
    "Portugal": "POR", "Uzbekistan": "UZB", "Colombia": "COL",
    "Democratic Republic of the Congo": "COD", "Panama": "PAN", "Ghana": "GHA",
    "England": "ENG", "Croatia": "CRO"
  };

  let todaysMatches = [];
  let currentIndex = 0;
  let cycleIntervalId = null;
  let refreshIntervalId = null;

  function getCountryCode(name) {
    return countryCodes[name] || name.substring(0, 3).toUpperCase();
  }

  function getTodayString() {
    const now = new Date();
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return monthNames[now.getMonth()] + " " + now.getDate();
  }

  function parseMatchDateTime(localDate) {
    const [datePart, timePart] = localDate.split(" ");
    const [month, day, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  function formatTime(dateObj) {
    return dateObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }

  function formatDate(dateObj) {
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return monthNames[dateObj.getMonth()] + " " + dateObj.getDate();
  }

  function getMatchStatus(match) {
    const now = new Date();
    const matchDate = parseMatchDateTime(match.local_date);
    const matchEnd = new Date(matchDate.getTime() + 2 * 60 * 60 * 1000);
    if (match.finished === "TRUE" || match.time_elapsed === "finished") return "finished";
    if (now >= matchDate && now <= matchEnd) return "live";
    return "upcoming";
  }

  function getStatusBadge(status) {
    if (status === "live") {
      return `<span class="wc-live-badge wc-live">
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 8 8" fill="none" class="wc-live-dot">
          <circle cx="4" cy="4" r="4" fill="#fff"></circle>
        </svg>Live</span>`;
    } else if (status === "upcoming") {
      return `<span class="wc-live-badge wc-upcoming">Upcoming</span>`;
    } else {
      return `<span class="wc-live-badge wc-finished">FT</span>`;
    }
  }

  function getScoreDisplay(match, status) {
    if (status === "upcoming") return "—";
    return `${match.home_score} - ${match.away_score}`;
  }

  function getStageBadge(type) {
    const label = stageNames[type] || type.toUpperCase();
    return `<span class="wc-stage-badge">${label}</span>`;
  }

  function renderMatch(match, index, total) {
    const container = document.getElementById("wc-match-container");
    const status = getMatchStatus(match);
    const matchDate = parseMatchDateTime(match.local_date);
    const homeCode = getCountryCode(match.home_team_name_en);
    const awayCode = getCountryCode(match.away_team_name_en);

    container.innerHTML = `
      <a class="wc-match-card wc-fade-in" href="${MATCH_LINK}" target="_blank">
        <div class="wc-teams-row">
          <div class="wc-team-block">
            <img src="${FLAG_BASE}${homeCode}.png" alt="${match.home_team_name_en}" class="wc-flag-img" onerror="this.src='https://flagcdn.com/w40/${homeCode.toLowerCase()}.png';this.onerror=null">
            <span class="wc-team-name">${match.home_team_name_en}</span>
          </div>
          <span class="wc-vs-text">VS</span>
          <div class="wc-team-block wc-away">
            <span class="wc-team-name">${match.away_team_name_en}</span>
            <img src="${FLAG_BASE}${awayCode}.png" alt="${match.away_team_name_en}" class="wc-flag-img" onerror="this.src='https://flagcdn.com/w40/${awayCode.toLowerCase()}.png';this.onerror=null">
          </div>
        </div>

        <div class="wc-score-row">
          <div class="wc-score-box">
            <div class="wc-score-display">${getScoreDisplay(match, status)}</div>
            ${getStatusBadge(status)}
          </div>
        </div>

        <div class="wc-match-meta">
          <span class="wc-date">${formatDate(matchDate)}</span>
          <span class="wc-time">🕐 ${formatTime(matchDate)} ET</span>
          ${getStageBadge(match.type)}
        </div>
      </a>`;

    const counter = document.getElementById("wc-match-counter");
    if (total > 1) {
      counter.style.display = "block";
      counter.textContent = `${index + 1} of ${total} matches on ${getTodayString()}`;
    } else {
      counter.style.display = total === 1 ? "block" : "none";
      counter.textContent = total === 1 ? `1 match on ${getTodayString()}` : "";
    }
  }

  function renderNoMatch(todayStr) {
    document.getElementById("wc-match-container").innerHTML = `
      <a class="wc-match-card wc-fade-in" href="${MATCH_LINK}" target="_blank">
        <div class="wc-no-match">
          <span class="wc-no-match-icon">📅</span>
          <div>No matches scheduled for ${todayStr}</div>
          <div style="font-size:11px;margin-top:8px;opacity:.6;">Click to view full schedule</div>
        </div>
      </a>`;
    document.getElementById("wc-match-counter").style.display = "none";
  }

  function renderError(msg) {
    document.getElementById("wc-match-container").innerHTML = `
      <div class="wc-error-msg">⚠️ ${msg}</div>`;
    document.getElementById("wc-match-counter").style.display = "none";
  }

  async function fetchData() {
    const response = await fetch(`${API_BASE}/get/games`);
    if (!response.ok) throw new Error("Failed to fetch matches");
    const data = await response.json();
    const allMatches = data.games || [];
    const todayStr = getTodayString();

    todaysMatches = allMatches.filter(m => {
      const matchDate = parseMatchDateTime(m.local_date);
      return formatDate(matchDate) === todayStr;
    });

    return todaysMatches;
  }

  function displayCurrent() {
    const todayStr = getTodayString();

    if (todaysMatches.length === 0) {
      renderNoMatch(todayStr);
      document.getElementById("wc-header-title").textContent = "Match of the Day";
      document.getElementById("wc-header-stage").textContent = "WC 2026";
      return;
    }

    if (todaysMatches.length === 1) {
      renderMatch(todaysMatches[0], 0, 1);
      document.getElementById("wc-header-title").textContent = "Match of the Day";
    } else {
      renderMatch(todaysMatches[currentIndex], currentIndex, todaysMatches.length);
      document.getElementById("wc-header-title").textContent = "Matches Today";
    }

    const liveMatch = todaysMatches.find(m => getMatchStatus(m) === "live");
    const headerStage = document.getElementById("wc-header-stage");
    if (liveMatch) {
      headerStage.textContent = "LIVE NOW";
    } else {
      headerStage.textContent = "WC 2026";
    }
  }

  async function init() {
    try {
      await fetchData();
      displayCurrent();

      if (todaysMatches.length > 1) {
        cycleIntervalId = setInterval(() => {
          currentIndex = (currentIndex + 1) % todaysMatches.length;
          displayCurrent();
        }, CYCLE_INTERVAL);
      }

      refreshIntervalId = setInterval(async () => {
        try {
          await fetchData();
          displayCurrent();
        } catch (e) {
          console.error("Refresh error:", e);
        }
      }, REFRESH_INTERVAL);

    } catch (err) {
      renderError("Unable to load live scores. Please try again later.");
      console.error(err);
    }
  }

  window.addEventListener("beforeunload", () => {
    if (cycleIntervalId) clearInterval(cycleIntervalId);
    if (refreshIntervalId) clearInterval(refreshIntervalId);
  });

  init();
})();
