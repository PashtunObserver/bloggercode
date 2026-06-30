/*!
 * 1live.js - Light Mode Full-Width Live Sports Player
 * Host: https://cdn.jsdelivr.net/gh/PashtunObserver/bloggercode@main/1live.js
 */

(function() {
    'use strict';
    
    const WIDGET_ID = 'live-player-widget';
    const MATCH_CLASS = 'lp-match';
    const HLS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.15/hls.min.js';
    const POPUP_LINK = 'https://www.pashtomedium.com/p/fifa-world-cup-2026.html';
    const POPUP_DELAY = 180000; // 3 minutes
    
    let hlsInstance = null;
    let currentVideo = null;
    let isHD = false;
    let popupTimer = null;
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (window.Hls) { resolve(); return; }
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }
    
    function createEl(tag, attrs, html) {
        const el = document.createElement(tag);
        if (attrs) for (let k in attrs) el.setAttribute(k, attrs[k]);
        if (html) el.innerHTML = html;
        return el;
    }
    
    function injectCSS() {
        if (document.getElementById('lp-styles')) return;
        const css = `
            .lp-container { width:100%; max-width:100%; margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif; background:#f5f7fa; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08); border:1px solid #e0e4e8; }
            .lp-hd-btn { width:100%; padding:14px 20px; background:linear-gradient(135deg,#1a5f1a 0%,#2e8b2e 100%); color:#fff; border:none; font-size:15px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; transition:all 0.3s ease; letter-spacing:0.5px; text-transform:uppercase; margin:0; }
            .lp-hd-btn:hover { background:linear-gradient(135deg,#226622 0%,#36a136 100%); }
            .lp-hd-btn.hd-on { background:linear-gradient(135deg,#c9a000 0%,#ffd700 100%); color:#1a1a1a; }
            .lp-hd-badge { background:rgba(255,255,255,0.25); padding:3px 12px; border-radius:20px; font-size:12px; font-weight:700; }
            .lp-hd-btn.hd-on .lp-hd-badge { background:rgba(0,0,0,0.15); }
            .lp-player-wrap { position:relative; background:#000; width:100%; margin:0; padding:0; }
            .lp-player-wrap video { width:100%; height:auto; max-height:75vh; background:#000; display:block; margin:0; padding:0; border:none; }
            .lp-live-badge { position:absolute; top:12px; left:12px; background:#e10600; color:#fff; padding:4px 14px; border-radius:4px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; animation:lpPulse 2s infinite; z-index:10; pointer-events:none; }
            @keyframes lpPulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
            .lp-status { color:#555; text-align:center; padding:10px; font-size:13px; background:#fff; border-top:1px solid #e0e4e8; border-bottom:1px solid #e0e4e8; margin:0; }
            .lp-matches { padding:12px; background:#f0f2f5; border-top:1px solid #e0e4e8; }
            .lp-matches-title { color:#1a1a1a; font-size:14px; font-weight:700; margin-bottom:10px; text-transform:uppercase; letter-spacing:1px; display:flex; align-items:center; gap:8px; }
            .lp-matches-title::before { content:"⚽"; }
            .lp-match-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:8px; }
            .lp-match-btn { background:#fff; border:1px solid #d0d4d8; color:#333; padding:12px 16px; border-radius:8px; cursor:pointer; font-size:13px; font-weight:500; transition:all 0.2s ease; text-align:left; display:flex; align-items:center; gap:10px; width:100%; box-shadow:0 1px 3px rgba(0,0,0,0.04); }
            .lp-match-btn:hover { background:#f8fafc; border-color:#4a90d9; transform:translateY(-1px); box-shadow:0 4px 8px rgba(0,0,0,0.08); }
            .lp-match-btn.active { background:#1a3a5c; border-color:#1a3a5c; color:#fff; }
            .lp-match-btn.active .lp-match-teams { color:#fff; }
            .lp-match-btn.active .lp-match-time { color:#b0c8e0; }
            .lp-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
            .lp-dot.live { background:#e10600; animation:lpPulse 2s infinite; }
            .lp-dot.upcoming { background:#888; }
            .lp-match-info { display:flex; flex-direction:column; line-height:1.3; }
            .lp-match-teams { font-weight:600; color:#1a1a1a; }
            .lp-match-time { font-size:11px; color:#666; }
            
            /* Popup Overlay */
            .lp-popup-overlay { position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:none; align-items:center; justify-content:center; z-index:100; flex-direction:column; gap:16px; padding:20px; box-sizing:border-box; }
            .lp-popup-overlay.show { display:flex; }
            .lp-popup-text { color:#fff; font-size:18px; font-weight:600; text-align:center; line-height:1.5; }
            .lp-popup-btn { background:linear-gradient(135deg,#e10600 0%,#ff3333 100%); color:#fff; border:none; padding:14px 36px; border-radius:50px; font-size:16px; font-weight:700; cursor:pointer; text-decoration:none; display:inline-block; transition:all 0.3s ease; box-shadow:0 4px 15px rgba(225,6,0,0.4); }
            .lp-popup-btn:hover { transform:scale(1.05); box-shadow:0 6px 20px rgba(225,6,0,0.6); }
            .lp-popup-close { color:#aaa; font-size:12px; cursor:pointer; margin-top:8px; text-decoration:underline; }
            .lp-popup-close:hover { color:#fff; }
            
            @media(max-width:600px){ .lp-hd-btn{font-size:13px;padding:12px} .lp-match-grid{grid-template-columns:1fr} .lp-match-btn{font-size:12px} .lp-status{font-size:12px} .lp-popup-text{font-size:15px} .lp-popup-btn{padding:12px 28px;font-size:14px} }
        `;
        const style = createEl('style', { id: 'lp-styles' });
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    function buildWidget(container, matches) {
        container.innerHTML = '';
        container.className = 'lp-container';
        
        const hdBtn = createEl('button', { class: 'lp-hd-btn' });
        hdBtn.innerHTML = '<span>🎥</span><span>HD Display</span><span class="lp-hd-badge">AUTO</span>';
        hdBtn.onclick = () => toggleHD(hdBtn);
        container.appendChild(hdBtn);
        
        const playerWrap = createEl('div', { class: 'lp-player-wrap' });
        playerWrap.innerHTML = '<div class="lp-live-badge">● LIVE</div>';
        const video = createEl('video', { id: 'lp-video', controls: '', autoplay: '', muted: '', playsinline: '' });
        playerWrap.appendChild(video);
        
        // Popup overlay
        const popup = createEl('div', { class: 'lp-popup-overlay', id: 'lp-popup' });
        popup.innerHTML = `
            <div class="lp-popup-text">📡 The Broadcast is disturbed<br>Watch Live Now</div>
            <a href="${POPUP_LINK}" target="_blank" class="lp-popup-btn">▶ Watch Live Now</a>
            <span class="lp-popup-close" onclick="document.getElementById('lp-popup').classList.remove('show')">Dismiss</span>
        `;
        playerWrap.appendChild(popup);
        
        container.appendChild(playerWrap);
        
        const status = createEl('div', { class: 'lp-status', id: 'lp-status' });
        status.textContent = 'Loading stream…';
        container.appendChild(status);
        
        const matchesSection = createEl('div', { class: 'lp-matches' });
        matchesSection.innerHTML = '<div class="lp-matches-title">Other FIFA World Cup Matches</div>';
        const grid = createEl('div', { class: 'lp-match-grid', id: 'lp-match-grid' });
        matchesSection.appendChild(grid);
        container.appendChild(matchesSection);
        
        currentVideo = video;
        renderMatchButtons(grid, matches, video, status);
        initPlayer(matches[0].url, video, status, popup);
    }
    
    function renderMatchButtons(grid, matches, video, status) {
        grid.innerHTML = '';
        matches.forEach((match, idx) => {
            const btn = createEl('button', { class: 'lp-match-btn' + (idx === 0 ? ' active' : '') });
            const isLive = match.time.toLowerCase().includes('live');
            btn.innerHTML = `
                <span class="lp-dot ${isLive ? 'live' : 'upcoming'}"></span>
                <span class="lp-match-info">
                    <span class="lp-match-teams">${match.teams}</span>
                    <span class="lp-match-time">${match.time}</span>
                </span>
            `;
            btn.onclick = () => {
                grid.querySelectorAll('.lp-match-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                status.textContent = 'Loading ' + match.teams + '…';
                initPlayer(match.url, video, status, document.getElementById('lp-popup'));
            };
            grid.appendChild(btn);
        });
    }
    
    function initPlayer(url, video, status, popup) {
        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
        }
        
        // Clear and restart popup timer
        if (popupTimer) clearTimeout(popupTimer);
        if (popup) popup.classList.remove('show');
        
        if (!url) {
            status.textContent = 'No stream URL provided.';
            return;
        }
        
        function setStatus(msg) { status.textContent = msg; }
        
        if (window.Hls && window.Hls.isSupported()) {
            hlsInstance = new window.Hls({ maxBufferLength: 30, liveSyncDurationCount: 3, startLevel: -1 });
            hlsInstance.loadSource(url);
            hlsInstance.attachMedia(video);
            
            hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, function() {
                setStatus('● Live');
                video.play().catch(() => setStatus('Click play to start the stream'));
                if (isHD && hlsInstance.levels.length > 0) {
                    hlsInstance.currentLevel = hlsInstance.levels.length - 1;
                }
                // Start 3-minute popup timer
                if (popup) {
                    popupTimer = setTimeout(() => {
                        popup.classList.add('show');
                    }, POPUP_DELAY);
                }
            });
            
            hlsInstance.on(window.Hls.Events.ERROR, function(event, data) {
                if (data.fatal) {
                    if (data.type === window.Hls.ErrorTypes.NETWORK_ERROR) {
                        setStatus('Network error, trying to recover…');
                        hlsInstance.startLoad();
                    } else if (data.type === window.Hls.ErrorTypes.MEDIA_ERROR) {
                        setStatus('Media error, trying to recover…');
                        hlsInstance.recoverMediaError();
                    } else {
                        setStatus('Unrecoverable error. Try another match.');
                        hlsInstance.destroy();
                        hlsInstance = null;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                setStatus('● Live');
                video.play();
                if (popup) {
                    popupTimer = setTimeout(() => {
                        popup.classList.add('show');
                    }, POPUP_DELAY);
                }
            });
        } else {
            setStatus('Your browser does not support HLS playback.');
        }
    }
    
    function toggleHD(hdBtn) {
        isHD = !isHD;
        const badge = hdBtn.querySelector('.lp-hd-badge');
        if (isHD) {
            hdBtn.classList.add('hd-on');
            badge.textContent = 'ON';
            if (hlsInstance && hlsInstance.levels.length > 0) {
                hlsInstance.currentLevel = hlsInstance.levels.length - 1;
            }
        } else {
            hdBtn.classList.remove('hd-on');
            badge.textContent = 'AUTO';
            if (hlsInstance) hlsInstance.currentLevel = -1;
        }
    }
    
    function parseMatches(container) {
        const matchEls = container.querySelectorAll('.' + MATCH_CLASS);
        const matches = [];
        matchEls.forEach(el => {
            const url = el.getAttribute('data-url') || el.getAttribute('data-stream') || '';
            const time = el.getAttribute('data-time') || el.getAttribute('data-status') || 'LIVE NOW';
            const teams = el.textContent.trim();
            if (url && teams) matches.push({ teams, time, url });
        });
        if (matches.length === 0) {
            matches.push({
                teams: 'Real Madrid TV',
                time: 'LIVE NOW',
                url: 'https://rmtv.akamaized.net/hls/live/2043154/rmtv-en-web/master.m3u8'
            });
        }
        return matches;
    }
    
    function init() {
        const container = document.getElementById(WIDGET_ID);
        if (!container) { console.warn('[1live.js] #' + WIDGET_ID + ' not found.'); return; }
        const matches = parseMatches(container);
        loadScript(HLS_URL).then(() => {
            injectCSS();
            buildWidget(container, matches);
        }).catch(err => {
            console.error('[1live.js] Failed to load HLS.js:', err);
            container.innerHTML = '<div style="padding:20px;background:#fff;color:#e10600;text-align:center;border:1px solid #e0e4e8;">Failed to load player library.</div>';
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();