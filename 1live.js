/*!
 * 1live.js - Live Sports Player for Blogger
 * Host: https://cdn.jsdelivr.net/gh/PashtunObserver/bloggercode@main/1live.js
 */

(function() {
    'use strict';
    
    const WIDGET_ID = 'live-player-widget';
    const MATCH_CLASS = 'lp-match';
    const HLS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.15/hls.min.js';
    
    let hlsInstance = null;
    let currentVideo = null;
    let isHD = false;
    
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
            .lp-container { width:100%; max-width:1100px; margin:0 auto; font-family:'Segoe UI',Arial,sans-serif; background:#0a0a0a; border-radius:12px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.6); }
            .lp-hd-btn { width:100%; padding:14px 20px; background:linear-gradient(135deg,#1a5f1a 0%,#2e8b2e 100%); color:#fff; border:none; font-size:15px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; transition:all 0.3s ease; letter-spacing:0.5px; text-transform:uppercase; }
            .lp-hd-btn:hover { background:linear-gradient(135deg,#226622 0%,#36a136 100%); }
            .lp-hd-btn.hd-on { background:linear-gradient(135deg,#c9a000 0%,#ffd700 100%); color:#1a1a1a; }
            .lp-hd-badge { background:rgba(255,255,255,0.2); padding:3px 10px; border-radius:20px; font-size:12px; font-weight:700; }
            .lp-hd-btn.hd-on .lp-hd-badge { background:rgba(0,0,0,0.15); }
            .lp-player-wrap { position:relative; background:#000; }
            .lp-player-wrap video { width:100%; height:auto; max-height:70vh; background:#000; display:block; }
            .lp-live-badge { position:absolute; top:12px; left:12px; background:#e10600; color:#fff; padding:4px 12px; border-radius:4px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; animation:lpPulse 2s infinite; z-index:10; pointer-events:none; }
            @keyframes lpPulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
            .lp-status { color:#ccc; text-align:center; padding:10px; font-size:13px; background:#111; border-top:1px solid #222; }
            .lp-matches { padding:16px; background:#0f0f0f; border-top:1px solid #222; }
            .lp-matches-title { color:#fff; font-size:14px; font-weight:600; margin-bottom:12px; text-transform:uppercase; letter-spacing:1px; display:flex; align-items:center; gap:8px; }
            .lp-matches-title::before { content:"⚽"; }
            .lp-match-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:10px; }
            .lp-match-btn { background:#1a1a1a; border:1px solid #333; color:#e0e0e0; padding:12px 16px; border-radius:8px; cursor:pointer; font-size:13px; font-weight:500; transition:all 0.2s ease; text-align:left; display:flex; align-items:center; gap:10px; width:100%; }
            .lp-match-btn:hover { background:#252525; border-color:#555; transform:translateY(-1px); }
            .lp-match-btn.active { background:#1a3a5c; border-color:#4a90d9; color:#fff; }
            .lp-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
            .lp-dot.live { background:#e10600; animation:lpPulse 2s infinite; }
            .lp-dot.upcoming { background:#555; }
            .lp-match-info { display:flex; flex-direction:column; line-height:1.3; }
            .lp-match-teams { font-weight:600; color:#fff; }
            .lp-match-time { font-size:11px; color:#888; }
            @media(max-width:600px){ .lp-hd-btn{font-size:13px;padding:12px 16px} .lp-match-grid{grid-template-columns:1fr} .lp-match-btn{font-size:12px} .lp-status{font-size:12px} }
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
        const video = createEl('video', { id: 'lp-video', controls: '', autoplay: '', playsinline: '' });
        playerWrap.appendChild(video);
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
        initPlayer(matches[0].url, video, status);
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
                initPlayer(match.url, video, status);
            };
            grid.appendChild(btn);
        });
    }
    
    function initPlayer(url, video, status) {
        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
        }
        
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
            container.innerHTML = '<div style="padding:20px;background:#111;color:#e10600;text-align:center;">Failed to load player library.</div>';
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();