// ============================================
// RSOFT SOFTWARE CARD - COMBINED JS FILE
// All font sizes in PX for precise control
// Save as: rsoft-card.min.js
// Host on: GitHub Pages / jsDelivr
// ============================================

(function() {
    'use strict';

    // ========== INJECT CSS ==========
    var rsoftStyles = document.createElement('style');
    rsoftStyles.textContent = '.rsoft-card,.rsoft-card *,.rsoft-card *::before,.rsoft-card *::after{margin:0;padding:0;box-sizing:border-box}.rsoft-card{width:100%;max-width:100%;background:#fff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,.08);overflow:hidden;transition:box-shadow .3s ease;font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;line-height:1.5}.rsoft-card:hover{box-shadow:0 8px 30px rgba(0,0,0,.12)}.rsoft-ad-header{width:100%;min-height:90px;background:#f8f9fa;border-bottom:2px dashed #dee2e6;display:flex;align-items:center;justify-content:center;padding:15px;position:relative}.rsoft-ad-placeholder{width:100%;max-width:728px;height:90px;background:#e9ecef;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#6c757d;font-size:14px;font-weight:500;gap:8px}.rsoft-ad-placeholder .fa{font-size:18px;color:#adb5bd}.rsoft-cover-wrap{width:100%;height:0;padding-bottom:56.25%;position:relative;overflow:hidden;background:#1a1a2e}.rsoft-cover-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;transition:transform .5s ease}.rsoft-card:hover .rsoft-cover-img{transform:scale(1.05)}.rsoft-content{padding:24px}.rsoft-title{font-size:28px;font-weight:700;color:#1a1a2e;margin-bottom:16px;line-height:1.3;font-family:inherit}.rsoft-title .fa{color:#0984e3;margin-right:8px}.rsoft-info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px}.rsoft-info-box{background:#f8f9fa;border-radius:12px;padding:16px 12px;text-align:center;border:1px solid #e9ecef;transition:all .3s ease}.rsoft-info-box:hover{background:#e9ecef;transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.06)}.rsoft-info-ico{font-size:22px;color:#0984e3;margin-bottom:8px;display:block}.rsoft-info-lbl{font-size:12px;font-weight:600;color:#6c757d;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.rsoft-info-val{font-size:16px;font-weight:700;color:#1a1a2e}.rsoft-countdown-box{display:none;align-items:center;justify-content:center;gap:12px;padding:20px;background:#fff3cd;border-radius:12px;border:1px solid #ffeaa7;margin-bottom:20px}.rsoft-countdown-box.rsoft-active{display:flex}.rsoft-countdown-ico{font-size:24px;color:#e17055;animation:rsoft-pulse 1s infinite}@keyframes rsoft-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:.8}}.rsoft-countdown-txt{font-size:18px;font-weight:600;color:#d63031}.rsoft-countdown-num{font-family:"Courier New",monospace;font-size:24px;font-weight:700;color:#d63031;background:#fff;padding:4px 12px;border-radius:6px;min-width:50px;text-align:center;box-shadow:0 2px 8px rgba(214,48,49,.15)}.rsoft-countdown-box.rsoft-paused{background:#e8f4f8;border-color:#74b9ff}.rsoft-countdown-box.rsoft-paused .rsoft-countdown-ico{animation:none;color:#0984e3}.rsoft-countdown-box.rsoft-paused .rsoft-countdown-txt{color:#0984e3}.rsoft-countdown-box.rsoft-paused .rsoft-countdown-num{color:#0984e3;box-shadow:0 2px 8px rgba(9,132,227,.15)}.rsoft-paused-tag{display:none;font-size:12px;font-weight:700;color:#0984e3;background:#fff;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:1px}.rsoft-countdown-box.rsoft-paused .rsoft-paused-tag{display:inline-block}.rsoft-action-wrap{width:100%}.rsoft-btn-blue{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:16px 24px;background:#0984e3;color:#fff;text-decoration:none;border-radius:12px;font-size:18px;font-weight:600;transition:all .3s ease;cursor:pointer;border:none;outline:none;font-family:inherit}.rsoft-btn-blue:hover{background:#0770c2;transform:translateY(-2px);box-shadow:0 6px 20px rgba(9,132,227,.3)}.rsoft-btn-blue:active{transform:translateY(0)}.rsoft-btn-blue .fa{font-size:19px}.rsoft-btn-green{display:none;align-items:center;justify-content:center;gap:10px;width:100%;padding:16px 24px;background:#00b894;color:#fff;text-decoration:none;border-radius:12px;font-size:18px;font-weight:600;transition:all .3s ease;cursor:pointer;border:none;outline:none;font-family:inherit}.rsoft-btn-green.rsoft-visible{display:flex;animation:rsoft-success-pop .4s ease forwards}.rsoft-btn-green:hover{background:#00a383;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,184,148,.3)}.rsoft-btn-green .fa{font-size:19px}.rsoft-spinner{display:none;width:20px;height:20px;border:3px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:rsoft-spin .8s linear infinite}.rsoft-btn-blue.rsoft-loading .rsoft-spinner{display:inline-block}.rsoft-btn-blue.rsoft-loading .rsoft-btn-txt{display:none}@keyframes rsoft-spin{to{transform:rotate(360deg)}}@keyframes rsoft-success-pop{0%{transform:scale(.9);opacity:0}50%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}@media(max-width:768px){.rsoft-content{padding:18px}.rsoft-title{font-size:22px}.rsoft-info-grid{gap:8px}.rsoft-info-box{padding:12px 8px}.rsoft-info-ico{font-size:19px}.rsoft-info-lbl{font-size:11px}.rsoft-info-val{font-size:14px}.rsoft-btn-blue,.rsoft-btn-green{padding:14px 20px;font-size:16px}.rsoft-ad-placeholder{height:60px;font-size:12px}.rsoft-countdown-txt{font-size:15px}.rsoft-countdown-num{font-size:19px;padding:3px 10px}}@media(max-width:480px){.rsoft-content{padding:14px}.rsoft-title{font-size:19px}.rsoft-info-grid{grid-template-columns:1fr;gap:8px}.rsoft-info-box{display:flex;align-items:center;justify-content:flex-start;gap:12px;text-align:left;padding:12px 16px}.rsoft-info-ico{margin-bottom:0;font-size:21px;min-width:24px}.rsoft-info-detail{display:flex;flex-direction:column}.rsoft-countdown-box{flex-direction:column;gap:8px;text-align:center}.rsoft-btn-blue,.rsoft-btn-green{padding:12px 16px;font-size:15px}}';
    document.head.appendChild(rsoftStyles);

    // ========== RSOFT JS LOGIC ==========
    var RSOFT_STORAGE = 'rsoft_countdown_state_v1';
    var RSOFT_TOTAL = 30;
    var rsoftInterval = null;
    var rsoftIsCounting = false;
    var rsoftIsPaused = false;
    var rsoftRemaining = RSOFT_TOTAL;

    function rsoftInit() {
        rsoftRestoreState();
    }

    function rsoftVisibilityHandler() {
        if (!rsoftIsCounting) return;
        if (document.hidden) {
            rsoftPause();
        } else {
            rsoftResume();
        }
    }

    function rsoftBlurHandler() {
        if (rsoftIsCounting && !document.hidden) rsoftPause();
    }

    function rsoftFocusHandler() {
        if (rsoftIsCounting && !document.hidden) rsoftResume();
    }

    window.rsoftStartCountdown = function(e) {
        e.preventDefault();
        if (rsoftIsCounting) return;
        rsoftIsCounting = true;
        rsoftIsPaused = false;
        rsoftRemaining = RSOFT_TOTAL;

        var sb = document.getElementById('rsoftStartBtn');
        var ig = document.getElementById('rsoftInfoGrid');
        var cb = document.getElementById('rsoftCountdownBox');
        var tm = document.getElementById('rsoftTimer');

        if (ig) ig.style.display = 'none';
        if (cb) {
            cb.classList.add('rsoft-active');
            cb.classList.remove('rsoft-paused');
        }
        if (sb) {
            sb.classList.add('rsoft-loading');
            sb.style.pointerEvents = 'none';
        }
        if (tm) tm.textContent = rsoftRemaining;

        rsoftSaveState();
        rsoftRun();
    };

    function rsoftRun() {
        if (rsoftInterval) clearInterval(rsoftInterval);
        rsoftInterval = setInterval(function() {
            if (rsoftIsPaused) return;
            rsoftRemaining--;
            var tm = document.getElementById('rsoftTimer');
            if (tm) tm.textContent = rsoftRemaining;
            rsoftSaveState();
            if (rsoftRemaining <= 0) {
                clearInterval(rsoftInterval);
                rsoftInterval = null;
                rsoftComplete();
            }
        }, 1000);
    }

    function rsoftPause() {
        if (!rsoftIsCounting || rsoftIsPaused) return;
        rsoftIsPaused = true;
        var cb = document.getElementById('rsoftCountdownBox');
        if (cb) cb.classList.add('rsoft-paused');
        rsoftSaveState();
    }

    function rsoftResume() {
        if (!rsoftIsCounting || !rsoftIsPaused) return;
        rsoftIsPaused = false;
        var cb = document.getElementById('rsoftCountdownBox');
        if (cb) cb.classList.remove('rsoft-paused');
        rsoftSaveState();
    }

    function rsoftComplete() {
        var sb = document.getElementById('rsoftStartBtn');
        var cb = document.getElementById('rsoftCountdownBox');
        var db = document.getElementById('rsoftDownloadBtn');

        if (cb) cb.classList.remove('rsoft-active');
        if (sb) sb.style.display = 'none';
        if (db) db.classList.add('rsoft-visible');

        rsoftIsCounting = false;
        rsoftIsPaused = false;
        try {
            localStorage.removeItem(RSOFT_STORAGE);
        } catch (e) {}
    }

    function rsoftSaveState() {
        try {
            var state = {
                counting: rsoftIsCounting,
                paused: rsoftIsPaused,
                remaining: rsoftRemaining,
                time: Date.now()
            };
            localStorage.setItem(RSOFT_STORAGE, JSON.stringify(state));
        } catch (e) {}
    }

    function rsoftRestoreState() {
        try {
            var saved = localStorage.getItem(RSOFT_STORAGE);
            if (!saved) return;

            var state = JSON.parse(saved);
            if (!state.counting || state.remaining <= 0) {
                localStorage.removeItem(RSOFT_STORAGE);
                return;
            }

            rsoftIsCounting = true;
            rsoftIsPaused = false;
            rsoftRemaining = state.remaining;

            var sb = document.getElementById('rsoftStartBtn');
            var ig = document.getElementById('rsoftInfoGrid');
            var cb = document.getElementById('rsoftCountdownBox');
            var tm = document.getElementById('rsoftTimer');

            if (ig) ig.style.display = 'none';
            if (cb) {
                cb.classList.add('rsoft-active');
                if (document.hidden) {
                    cb.classList.add('rsoft-paused');
                    rsoftIsPaused = true;
                }
            }
            if (tm) tm.textContent = rsoftRemaining;
            if (sb) {
                sb.classList.add('rsoft-loading');
                sb.style.pointerEvents = 'none';
            }

            rsoftRun();
        } catch (e) {
            try {
                localStorage.removeItem(RSOFT_STORAGE);
            } catch (err) {}
        }
    }

    window.rsoftHandleDownload = function(e) {
        try {
            localStorage.removeItem(RSOFT_STORAGE);
        } catch (e) {}
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', rsoftInit);
    } else {
        rsoftInit();
    }

    document.addEventListener('visibilitychange', rsoftVisibilityHandler);
    window.addEventListener('blur', rsoftBlurHandler);
    window.addEventListener('focus', rsoftFocusHandler);

})();