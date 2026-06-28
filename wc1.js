// ===== FIFA WORLD CUP 2026 LIVE WIDGET =====
// Combined JS + CSS — Single file
// Source: https://worldcup26.ir (free open API)

(function() {
  'use strict';

  // ===== INJECT CSS =====
  const css = `
    .wc-widget-container {
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0;
      background: #ffffff;
      border-radius: 2px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      position: relative;
    }
    .wc-widget-container * {
      box-sizing: border-box;
    }
    /* Animated top border */
    .wc-widget-container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #0066cc, #00a86b, #ff6b00, #0066cc);
      background-size: 300% 100%;
      animation: wc-gradientShift 4s ease infinite;
      z-index: 10;
    }
    @keyframes wc-gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    /* ===== HEADER ===== */
    .wc-widget-header {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      color: #212529;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: nowrap;
      min-height: 52px;
      position: relative;
      overflow: hidden;
    }
    .wc-widget-header::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0,102,204,0.3), transparent);
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
      filter: drop-shadow(0 2px 4px rgba(0,102,204,0.2));
    }
    @keyframes wc-ballSpin {
      0% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(90deg) scale(1.15); }
      50% { transform: rotate(180deg) scale(1); }
      75% { transform: rotate(270deg) scale(1.15); }
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
      color: #212529;
    }
    .wc-header-stage {
      font-size: 9px;
      font-weight: 700;
      color: #0066cc;
      background: rgba(0,102,204,0.08);
      border: 1px solid rgba(0,102,204,0.2);
      padding: 3px 8px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      flex-shrink: 0;
      white-space: nowrap;
      animation: wc-glow 2s ease-in-out infinite alternate;
    }
    @keyframes wc-glow {
      from { box-shadow: 0 0 5px rgba(0,102,204,0.1); }
      to { box-shadow: 0 0 15px rgba(0,102,204,0.2); }
    }
    
    /* ===== MATCH CARD ===== */
    .wc-match-card {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      text-decoration: none;
      color: #212529;
      background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      padding: 16px 14px;
      transition: all 0.3s ease;
      width: 100%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .wc-match-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0,102,204,0.03), transparent);
      transition: left 0.5s ease;
    }
    .wc-match-card:hover::before {
      left: 100%;
    }
    .wc-match-card:hover {
      background: linear-gradient(180deg, #ffffff 0%, #f1f3f5 50%, #ffffff 100%);
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
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      border: 1px solid rgba(0,0,0,0.08);
    }
    .wc-team-name {
      font-size: 14px;
      font-weight: 700;
      color: #212529;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
      letter-spacing: 0.3px;
    }
    .wc-vs-text {
      font-size: 11px;
      font-weight: 600;
      color: #6c757d;
      padding: 2px 8px;
      border-radius: 8px;
      background: rgba(0,0,0,0.05);
      flex-shrink: 0;
      letter-spacing: 1px;
    }
    
    /* Row 2: SCORE CENTER */
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
      background: linear-gradient(90deg, transparent, rgba(0,102,204,0.15), transparent);
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
      color: #212529;
      letter-spacing: 4px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      line-height: 1;
      animation: wc-scorePulse 2s ease-in-out infinite;
    }
    @keyframes wc-scorePulse {
      0%, 100% { text-shadow: 0 0 5px rgba(0,102,204,0.1); }
      50% { text-shadow: 0 0 15px rgba(0,102,204,0.2), 0 0 25px rgba(0,102,204,0.05); }
    }
    .wc-live-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 10px;
      border-radius: 12px;
      white-space: nowrap;
    }
    .wc-live-badge.wc-live {
      color: #fff;
      background: linear-gradient(135deg, #006219, #00a832);
      animation: wc-liveGlow 1.5s ease-in-out infinite alternate;
    }
    @keyframes wc-liveGlow {
      from { box-shadow: 0 0 5px rgba(0,168,50,0.2); }
      to { box-shadow: 0 0 15px rgba(0,168,50,0.4), 0 0 25px rgba(0,168,50,0.1); }
    }
    .wc-live-badge.wc-upcoming {
      color: #0066cc;
      background: rgba(0,102,204,0.08);
      border: 1px solid rgba(0,102,204,0.15);
    }
    .wc-live-badge.wc-finished {
      color: #6c757d;
      background: rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.08);
    }
    .wc-live-dot {
      display: block;
      animation: wc-pulse 1.5s infinite;
    }
    @keyframes wc-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }
    
    /* Row 3: Meta */
    .wc-match-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-size: 11px;
      color: #6c757d;
      font-weight: 500;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .wc-match-meta .wc-date {
      color: #0066cc;
      font-weight: 700;
      white-space: nowrap;
    }
    .wc-match-meta .wc-time {
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .wc-stage-badge {
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: linear-gradient(135deg, #0066cc, #00a86b);
      padding: 2px 8px;
      border-radius: 10px;
      text-transform: uppercase;
      white-space: nowrap;
      flex-shrink: 0;
      letter-spacing: 0.5px;
    }
    
    /* Counter */
    .wc-match-counter {
      text-align: center;
      font-size: 10px;
      color: #6c757d;
      padding: 10px 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
      background: linear-gradient(180deg, #f8f9fa, #ffffff);
      border-top: 1px solid rgba(0,0,0,0.06);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
    }
    
    /* No Match */
    .wc-no-match {
      text-align: center;
      padding: 30px 16px;
      color: #6c757d;
      font-size: 13px;
      font-weight: 500;
    }
    .wc-no-match-icon {
      font-size: 36px;
      margin-bottom: 10px;
      display: block;
      animation: wc-float 3s ease-in-out infinite;
    }
    @keyframes wc-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    
    /* Animations */
    .wc-fade-in {
      animation: wc-fadeIn 0.6s ease;
    }
    @keyframes wc-fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .wc-loading {
      text-align: center;
      padding: 30px;
      color: #6c757d;
      font-size: 13px;
      font-weight: 500;
    }
    .wc-error-msg {
      text-align: center;
      padding: 20px;
      color: #dc3545;
      font-size: 13px;
      font-weight: 600;
    }
    
    /* ===== RESPONSIVE ===== */
    @media (max-width: 320px) {
      .wc-widget-header { padding: 10px; }
      .wc-header-title { font-size: 11px; letter-spacing: 0.8px; }
      .wc-header-stage { font-size: 8px; padding: 2px 5px; }
      .wc-match-card { padding: 12px 10px; }
      .wc-team-name { font-size: 12px; }
      .wc-flag-img { width: 22px; height: 16px; }
      .wc-score-display { font-size: 26px; letter-spacing: 2px; }
      .wc-score-row { gap: 10px; }
      .wc-score-box { padding: 0 8px; }
      .wc-live-badge { font-size: 8px; padding: 3px 6px; }
      .wc-match-meta { gap: 8px; font-size: 10px; }
      .wc-match-counter { font-size: 9px; padding: 8px 10px; }
    }
    @media (min-width: 321px) and (max-width: 480px) {
      .wc-widget-header { padding: 12px; }
      .wc-header-title { font-size: 12px; }
      .wc-match-card { padding: 14px 12px; }
      .wc-team-name { font-size: 13px; }
      .wc-score-display { font-size: 28px; }
      .wc-match-meta { font-size: 10px; }
    }
    @media (min-width: 768px) {
      .wc-widget-header { padding: 16px 20px; }
      .wc-header-title { font-size: 15px; }
      .wc-match-card { padding: 20px; }
      .wc-team-name { font-size: 15px; }
      .wc-score-display { font-size: 40px; letter-spacing: 6px; }
      .wc-flag-img { width: 32px; height: 24px; }
      .wc-match-meta { font-size: 12px; }
      .wc-live-badge { font-size: 11px; padding: 5px 12px; }
      .wc-match-counter { font-size: 11px; padding: 12px 20px; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ===== CONFIG =====
  const API_BASE = "https://worldcup26.ir";
  const FLAG_BASE = "https://dmu-api.gulfnews.com/fifa-2026/flags/";
  const CYCLE_INTERVAL = 3000;
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
        <!-- Row 1: Home vs Away -->
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
        
        <!-- Row 2: SCORE CENTER -->
        <div class="wc-score-row">
          <div class="wc-score-box">
            <div class="wc-score-display">${getScoreDisplay(match, status)}</div>
            ${getStatusBadge(status)}
          </div>
        </div>
        
        <!-- Row 3: Meta -->
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
          <div style="font-size:11px;margin-top:8px;color:#6c757d;">Click to view full schedule</div>
        </div>
      </a>`;
    document.getElementById("wc-match-counter").style.display = "none";
  }

  function renderError(msg) {
    document.getElementById("wc-match-container").innerHTML = `
      <div class="wc-error-msg">⚠️ ${msg}</div>`;
    document.getElementById("wc-match-counter").style.display = "none";
  }

  async function fetchAndDisplay() {
    try {
      const response = await fetch(`${API_BASE}/get/games`);
      if (!response.ok) throw new Error("Failed to fetch matches");

      const data = await response.json();
      const allMatches = data.games || [];
      const todayStr = getTodayString();

      const todaysMatches = allMatches.filter(m => {
        const matchDate = parseMatchDateTime(m.local_date);
        return formatDate(matchDate) === todayStr;
      });

      let currentIndex = 0;
      let intervalId = null;

      if (todaysMatches.length === 0) {
        renderNoMatch(todayStr);
        document.getElementById("wc-header-title").textContent = "Match of the Day";
      } else if (todaysMatches.length === 1) {
        renderMatch(todaysMatches[0], 0, 1);
        document.getElementById("wc-header-title").textContent = "Match of the Day";
      } else {
        renderMatch(todaysMatches[0], 0, todaysMatches.length);
        document.getElementById("wc-header-title").textContent = "Matches Today";

        intervalId = setInterval(() => {
          currentIndex = (currentIndex + 1) % todaysMatches.length;
          renderMatch(todaysMatches[currentIndex], currentIndex, todaysMatches.length);
        }, CYCLE_INTERVAL);
      }

      const liveMatch = todaysMatches.find(m => getMatchStatus(m) === "live");
      if (liveMatch) {
        document.getElementById("wc-header-stage").textContent = "LIVE NOW";
        document.getElementById("wc-header-stage").style.background = "rgba(0,102,204,0.08)";
        document.getElementById("wc-header-stage").style.color = "#0066cc";
        document.getElementById("wc-header-stage").style.borderColor = "rgba(0,102,204,0.3)";
      }

      window.addEventListener("beforeunload", () => {
        if (intervalId) clearInterval(intervalId);
      });

    } catch (err) {
      renderError("Unable to load live scores. Please try again later.");
      console.error(err);
    }
  }

  // Initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchAndDisplay);
  } else {
    fetchAndDisplay();
  }
})();