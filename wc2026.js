// ===== FIFA WORLD CUP 2026 LIVE WIDGET =====
// Combined JS + CSS — Single file
// Source: https://worldcup26.ir (free open API)

(function() {
  'use strict';

  // ===== INJECT CSS =====
  const css = `
    .wc-widget-container {
      width: 100%;
      margin: 0;
      padding: 0;
      background: #ffffff;
      border-radius: 2px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .wc-widget-header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #fff;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .wc-header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .wc-header-icon {
      font-size: 20px;
      animation: wc-ballBounce 1.4s ease-in-out infinite;
      display: inline-block;
      transform-origin: center bottom;
    }
    @keyframes wc-ballBounce {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      25%  { transform: translateY(-5px) rotate(20deg) scale(1.15); }
      50%  { transform: translateY(0) rotate(0deg) scale(1); }
      75%  { transform: translateY(-3px) rotate(-15deg) scale(1.08); }
    }
    .wc-header-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .wc-header-stage {
      font-size: 10px;
      font-weight: 600;
      color: #ffd700;
      background: rgba(255,215,0,0.15);
      padding: 3px 8px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .wc-match-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      color: #1a1a1a;
      background: #ffffff;
      border-bottom: 1px solid #f0f0f0;
      padding: 16px;
      transition: background 0.2s ease;
      width: 100%;
      cursor: pointer;
    }
    .wc-match-card:hover { background: #fafbfc; }
    .wc-match-card:last-child { border-bottom: none; }
    .wc-match-teams { flex: 1; min-width: 0; }
    .wc-teams-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
      flex-wrap: wrap;
    }
    .wc-flag-img {
      width: 24px;
      height: 18px;
      object-fit: cover;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .wc-team-name {
      font-size: 14px;
      font-weight: 700;
      color: #1a1a1a;
    }
    .wc-vs-text {
      font-size: 12px;
      font-weight: 600;
      color: #adb5bd;
      margin: 0 2px;
    }
    .wc-match-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: #868e96;
      font-weight: 500;
      flex-wrap: wrap;
    }
    .wc-match-meta .wc-date { color: #495057; font-weight: 600; }
    .wc-match-meta .wc-time {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .wc-stage-badge {
      font-size: 10px;
      font-weight: 700;
      color: #fff;
      background: #495057;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .wc-match-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
      flex-shrink: 0;
      margin-left: 12px;
    }
    .wc-score-display {
      font-size: 20px;
      font-weight: 800;
      color: #1a1a1a;
      letter-spacing: 1px;
      font-variant-numeric: tabular-nums;
    }
    .wc-live-badge {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 12px;
      white-space: nowrap;
    }
    .wc-live-badge.wc-live { color: #fff; background: #006219; }
    .wc-live-badge.wc-upcoming { color: #1864ab; background: #e7f5ff; }
    .wc-live-badge.wc-finished { color: #868e96; background: #f1f3f5; }
    .wc-live-dot {
      display: block;
      animation: wc-pulse 2s infinite;
    }
    @keyframes wc-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }
    .wc-match-counter {
      text-align: center;
      font-size: 11px;
      color: #adb5bd;
      padding: 10px 16px;
      font-weight: 500;
      letter-spacing: 0.3px;
      background: #fafbfc;
      border-top: 1px solid #f0f0f0;
    }
    .wc-no-match {
      text-align: center;
      padding: 30px 20px;
      color: #868e96;
      font-size: 14px;
      font-weight: 500;
    }
    .wc-no-match-icon {
      font-size: 32px;
      margin-bottom: 8px;
      display: block;
    }
    .wc-fade-in {
      animation: wc-fadeIn 0.5s ease;
    }
    @keyframes wc-fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .wc-loading {
      text-align: center;
      padding: 30px;
      color: #868e96;
      font-size: 13px;
    }
    .wc-error-msg {
      text-align: center;
      padding: 20px;
      color: #c92a2a;
      font-size: 13px;
      font-weight: 500;
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
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 8 8" fill="none" class="wc-live-dot">
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
        <div class="wc-match-teams">
          <div class="wc-teams-row">
            <img src="${FLAG_BASE}${homeCode}.png" alt="${match.home_team_name_en}" class="wc-flag-img" onerror="this.src='https://flagcdn.com/w40/${homeCode.toLowerCase()}.png';this.onerror=null">
            <span class="wc-team-name">${match.home_team_name_en}</span>
            <span class="wc-vs-text">vs</span>
            <span class="wc-team-name">${match.away_team_name_en}</span>
            <img src="${FLAG_BASE}${awayCode}.png" alt="${match.away_team_name_en}" class="wc-flag-img" onerror="this.src='https://flagcdn.com/w40/${awayCode.toLowerCase()}.png';this.onerror=null">
          </div>
          <div class="wc-match-meta">
            <span class="wc-date">${formatDate(matchDate)}</span>
            <span class="wc-time">🕐 ${formatTime(matchDate)} ET</span>
            ${getStageBadge(match.type)}
          </div>
        </div>
        <div class="wc-match-status">
          <div class="wc-score-display">${getScoreDisplay(match, status)}</div>
          ${getStatusBadge(status)}
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
          <div style="font-size:12px;margin-top:6px;color:#adb5bd;">Click to view full schedule</div>
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
        document.getElementById("wc-header-stage").style.background = "rgba(0,97,25,0.3)";
        document.getElementById("wc-header-stage").style.color = "#69db7c";
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
