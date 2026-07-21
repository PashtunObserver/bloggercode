/* ============================================
   CANVA TEAM INVITE WIDGET
   Host this file on GitHub (e.g., via jsDelivr or raw.githack)
   Then use only the <div> in your Blogger post
   ============================================ */

(function() {
    'use strict';

    /* ---------- 1. INJECT CSS ---------- */
    const css = `
    /* global reset – 0 margins/paddings, full width */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* ============================================
       ROOT VARIABLES – Turquoise ➔ Purple
       ============================================ */
    :root {
        --cv-card: #ffffff;
        --cv-text: #0b1120;
        --cv-text-sec: #475569;
        --cv-border: #e2e8f0;
        --cv-font: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        --cv-gradient: linear-gradient(135deg, #00C4CC 0%, #7D2AE8 100%);
        --cv-gradient-hover: linear-gradient(135deg, #00d4dc 0%, #8a3af0 100%);
        --cv-accent: #00C4CC;
        --cv-accent-dark: #7D2AE8;
    }

    [data-theme="dark"],
    .darkMode {
        --cv-card: #1e293b;
        --cv-text: #f1f5f9;
        --cv-text-sec: #94a3b8;
        --cv-border: #334155;
    }

    /* full‑width wrapper – no margins, no paddings */
    .cv-wrap {
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
        font-family: var(--cv-font);
        color: var(--cv-text);
        background: transparent;
    }

    /* card – full width, clean borders */
    .cv-card {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--cv-border);
        padding: 18px 20px 24px;
        text-align: center;
        position: relative;
        color: var(--cv-text);
        transition: background 0.2s;
    }
    .cv-card:first-child {
        border-top: 1px solid var(--cv-border);
    }

    /* SVG logo with Turquoise ➔ Purple gradient */
    .cv-logo-svg {
        width: 140px;
        height: auto;
        margin: 0 auto 8px;
        display: block;
        filter: drop-shadow(0 2px 8px rgba(0, 196, 204, 0.15));
        transition: transform 0.2s ease;
    }
    .cv-logo-svg:hover {
        transform: scale(1.02);
    }

    .cv-title {
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0 0 2px 0;
        letter-spacing: -0.3px;
        color: var(--cv-text);
    }
    .cv-subtitle {
        font-size: 0.9rem;
        color: var(--cv-text-sec);
        margin: 0 0 12px 0;
        line-height: 1.4;
    }

    /* Timer */
    .cv-timer-wrap {
        display: none;
        margin: 12px 0 16px;
    }
    .cv-timer-wrap.active {
        display: block;
    }
    .cv-timer {
        font-size: 2.8rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        background: var(--cv-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.1;
        margin-bottom: 4px;
        letter-spacing: 1px;
    }
    .cv-timer-sub {
        font-size: 0.8rem;
        color: var(--cv-text-sec);
        margin-bottom: 10px;
    }
    .cv-paused {
        display: none;
        font-size: 0.75rem;
        color: #eab308;
        font-weight: 500;
        background: rgba(234, 179, 8, 0.06);
        padding: 4px 12px;
        border-radius: 30px;
        width: fit-content;
        margin: 0 auto 10px;
    }
    .cv-paused.show {
        display: block;
    }

    .cv-progress {
        width: 100%;
        height: 3px;
        background: var(--cv-border);
        border-radius: 6px;
        overflow: hidden;
        margin-top: 14px;
    }
    .cv-progress-bar {
        height: 100%;
        width: 100%;
        background: var(--cv-gradient);
        transition: width 0.1s linear;
        border-radius: 6px;
    }

    /* Join button – Turquoise ➔ Purple */
    .cv-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 380px;
        padding: 14px 0;
        font-size: 1rem;
        font-weight: 600;
        color: #fff;
        background: var(--cv-gradient);
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.25s ease;
        font-family: var(--cv-font);
        box-shadow: 0 4px 12px rgba(0, 196, 204, 0.25);
        margin: 0 auto;
    }
    .cv-btn:hover:not(:disabled) {
        background: var(--cv-gradient-hover);
        transform: scale(0.98);
        box-shadow: 0 6px 16px rgba(0, 196, 204, 0.35);
    }
    .cv-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    /* Link area – full width */
    .cv-link-wrap {
        display: none;
        margin-top: 24px;
        padding: 0;
        text-align: left;
        width: 100%;
    }
    .cv-link-wrap.show {
        display: block;
    }
    .cv-link-label {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--cv-text-sec);
        margin-bottom: 10px;
        text-align: center;
        letter-spacing: 0.3px;
        text-transform: uppercase;
    }

    /* Input full width */
    .cv-link-input {
        width: 100%;
        padding: 12px 14px;
        background: var(--cv-card);
        border: 1px solid var(--cv-border);
        border-radius: 10px;
        color: var(--cv-text);
        font-size: 0.85rem;
        font-family: 'SF Mono', 'Menlo', monospace;
        outline: none;
        margin-bottom: 12px;
        transition: border 0.15s;
    }
    .cv-link-input:focus {
        border-color: var(--cv-accent);
        box-shadow: 0 0 0 3px rgba(0, 196, 204, 0.12);
    }

    /* Copy button – Turquoise ➔ Purple */
    .cv-copy-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 13px 0;
        background: var(--cv-gradient);
        color: #fff;
        border: none;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s;
        font-family: var(--cv-font);
        box-shadow: 0 2px 8px rgba(0, 196, 204, 0.2);
    }
    .cv-copy-btn:hover {
        background: var(--cv-gradient-hover);
        transform: scale(0.98);
        box-shadow: 0 4px 12px rgba(0, 196, 204, 0.3);
    }
    .cv-copy-btn.copied {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        pointer-events: none;
        box-shadow: 0 2px 8px rgba(34, 197, 94, 0.25);
    }
    .cv-copy-btn svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }

    /* open button */
    .cv-open-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-top: 14px;
        padding: 10px 22px;
        background: transparent;
        border: 1px solid var(--cv-border);
        color: var(--cv-text-sec);
        border-radius: 30px;
        font-size: 0.8rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        font-family: var(--cv-font);
    }
    .cv-open-btn:hover {
        border-color: var(--cv-accent);
        color: var(--cv-accent);
        background: rgba(0, 196, 204, 0.04);
    }
    .cv-open-btn svg {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
    }

    /* Notes */
    .cv-note {
        font-size: 0.8rem;
        color: var(--cv-text-sec);
        margin-top: 16px;
        padding: 14px 16px;
        background: rgba(0, 0, 0, 0.02);
        border-radius: 10px;
        line-height: 1.5;
        text-align: center;
        border: 1px solid var(--cv-border);
    }
    .cv-note-red {
        font-size: 0.75rem;
        color: #b91c1c;
        margin-top: 12px;
        padding: 12px 16px;
        background: rgba(185, 28, 28, 0.05);
        border: 1px solid rgba(185, 28, 28, 0.12);
        border-radius: 10px;
        line-height: 1.5;
        text-align: center;
        font-weight: 500;
    }

    /* Success / done */
    .cv-success {
        display: none;
        font-size: 2.8rem;
        margin-bottom: 4px;
        background: var(--cv-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .cv-success.show {
        display: block;
    }
    .cv-done {
        display: none;
        font-size: 1.2rem;
        font-weight: 700;
        background: var(--cv-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px;
    }
    .cv-done.show {
        display: block;
    }

    .cv-card .cv-btn {
        margin-top: 4px;
    }
    .cv-link-wrap .cv-open-btn {
        margin-top: 12px;
    }

    .cv-card {
        padding: 20px 16px 28px;
    }

    @media (min-width: 640px) {
        .cv-card {
            padding: 28px 32px 32px;
        }
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --cv-card: #1e293b;
            --cv-text: #f1f5f9;
            --cv-text-sec: #94a3b8;
            --cv-border: #334155;
        }
        .cv-note {
            background: rgba(255, 255, 255, 0.03);
        }
        .cv-note-red {
            background: rgba(185, 28, 28, 0.08);
            border-color: rgba(185, 28, 28, 0.2);
            color: #f87171;
        }
    }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ---------- 2. INJECT HTML ---------- */
    const html = `
    <div class="cv-wrap">
        <div class="cv-card" id="cvCard">
            <svg class="cv-logo-svg" id="logo-svg" width="140" height="140" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00C4CC;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#7D2AE8;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M95.2 170c-11.6 0-22-3.1-30.9-9.1-8.8-6-15.4-14.6-19.7-25.6-2.5-6.4-4-13.4-4.7-21.4-.8-9.5-.2-19.2 1.9-28.7 3.3-15.3 10-28.5 19.8-39.5 9.7-10.8 21.2-18.1 34.3-21.5 5.6-1.5 11.2-2.2 16.5-2.2 6.4 0 12.7 1.1 18.7 3.3 8.9 3.3 15 9 17.9 17 1.4 3.7 1.8 7.6 1.4 12-.6 6.2-2.6 11.7-6 16.4-3.9 5.4-8.6 8.7-14.3 10.1-1 .3-2.1.4-3.3.4-.5 0-.9 0-1.4-.1-1.7-.2-3.2-.9-4.2-2.2-1-1.3-1.4-3-1.2-4.7.3-2 1.1-3.7 1.9-5.1l.3-.6c1.6-3.2 3.1-6.2 3.9-9.4 1.3-5.4 1.3-9.5-.1-13.3-1.5-4-4.3-6.5-8.5-7.5-1.6-.4-3.2-.6-4.8-.6-3.6 0-7.4.9-11.4 2.7C93.4 44 86.7 50 81 58.7c-3.9 6-6.9 12.7-9.1 20.5-1.6 5.6-2.6 11.5-3.2 17.6-.3 2.9-.5 6.3-.5 9.6.1 9.7 1.5 17.4 4.5 24.2 3.3 7.6 7.8 12.9 13.9 16.3 4.1 2.3 8.7 3.5 13.6 3.5.8 0 1.7 0 2.6-.1 10.4-.8 19.6-5.5 28-14.3 4.3-4.5 7.9-9.7 11-15.9.5-.9 1-1.9 1.8-2.7 1-1.1 2.3-1.7 3.7-1.7 1.7 0 3.2.9 4.2 2.5 1.2 2 1.1 4.2.9 5.6-.6 4.1-2.1 8.1-4.6 12.8-7.2 12.9-17.1 22.4-29.4 28.3-6.3 3-13.1 4.7-20.1 5-1.1.1-2.1.1-3.1.1z"
                    style="fill:none; stroke:url(#logoGrad); stroke-width:12; stroke-linejoin:round; stroke-miterlimit:10" />
            </svg>

            <h2 class="cv-title" id="cvTitle">Join the Canva Team</h2>
            <p class="cv-subtitle" id="cvSubtitle">Click below to generate your team invitation link.</p>

            <div class="cv-success" id="cvSuccess">✓</div>
            <div class="cv-done" id="cvDone">Ready!</div>

            <div class="cv-timer-wrap" id="cvTimerWrap">
                <div class="cv-timer" id="cvTimer">01:00</div>
                <div class="cv-timer-sub">Generating secure invite...</div>
                <div class="cv-paused" id="cvPaused">⏸ Paused — tab inactive</div>
                <div class="cv-progress">
                    <div class="cv-progress-bar" id="cvProgress"></div>
                </div>
            </div>

            <button class="cv-btn" id="cvJoinBtn">Join Canva Team</button>

            <div class="cv-link-wrap" id="cvLinkWrap">
                <div class="cv-link-label">Your invite link</div>

                <input class="cv-link-input" id="cvLinkInput" type="text" value="https://www.canva.com/brand/join?token=l5WFIkyNGPnlgHGyULCY3A&referrer=team-invite" readonly />

                <button class="cv-copy-btn" id="cvCopyBtn">
                    <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 486.465 486.465" xml:space="preserve">
                        <g><g>
                            <path d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143
              L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94
              c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503
              c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384
              c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342
              c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104
              c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308
              l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"/>
                            <path d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043
              l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974
              c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463
              c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151
              L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582
              c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819
              c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"/>
                        </g></g>
                    </svg>
                    Copy Link
                </button>

                <div style="text-align:center;">
                    <a class="cv-open-btn" href="https://www.canva.com/brand/join?token=ABC123XYZ" target="_blank" rel="noopener">
                        <svg fill="currentColor" width="14px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"/>
                            <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"/>
                        </svg>
                        Open in New Tab
                    </a>
                </div>

                <div class="cv-note">
                    If the link is not working, the team may be full or the invite has expired. Try again later or check for a new link.
                </div>
                <div class="cv-note-red">
                    ⚠️ Disclaimer: These Canva Team links are not ours — they are publicly available links shared by the community. We do not own or manage these teams.
                </div>
            </div>
        </div>
    </div>
    `;

    // Find the placeholder div and replace it with the full widget
    const placeholder = document.getElementById('canva-team-widget');
    if (placeholder) {
        placeholder.outerHTML = html;
    } else {
        // Fallback: append to body if no placeholder found
        const wrap = document.createElement('div');
        wrap.innerHTML = html;
        document.body.appendChild(wrap.firstElementChild);
    }

    /* ---------- 3. JAVASCRIPT LOGIC ---------- */
    const TOTAL = 60;
    let remaining = TOTAL;
    let interval = null;
    let paused = false;
    let running = false;

    const $ = id => document.getElementById(id);

    function fmt(s) {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return m + ':' + sec;
    }

    function update() {
        $('cvTimer').textContent = fmt(remaining);
        $('cvProgress').style.width = (remaining / TOTAL * 100) + '%';
    }

    function done() {
        clearInterval(interval);
        running = false;
        $('cvJoinBtn').style.display = 'none';
        $('cvTimerWrap').style.display = 'none';
        $('cvTitle').style.display = 'none';
        $('cvSubtitle').style.display = 'none';
        $('cvSuccess').classList.add('show');
        $('cvDone').classList.add('show');
        $('cvLinkWrap').classList.add('show');
    }

    function tick() {
        if (paused) return;
        remaining--;
        update();
        if (remaining <= 0) done();
    }

    function startCountdown() {
        if (running) return;
        running = true;
        $('cvJoinBtn').disabled = true;
        $('cvJoinBtn').textContent = 'Generating...';
        $('cvTimerWrap').classList.add('active');
        update();
        interval = setInterval(tick, 1000);
    }

    function copyLink() {
        const input = $('cvLinkInput');
        const linkText = input.value;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(linkText)
                .then(() => {
                    handleCopySuccess();
                })
                .catch(() => {
                    fallbackCopy(linkText);
                });
        } else {
            fallbackCopy(linkText);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999);

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                handleCopySuccess();
            } else {
                alert('Unable to copy link. Please select and copy manually.');
            }
        } catch (err) {
            alert('Unable to copy link. Please select and copy manually.');
        }
        document.body.removeChild(textarea);
    }

    function handleCopySuccess() {
        const btn = $('cvCopyBtn');
        btn.innerHTML = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z" fill="#ffffff"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#ffffff"/>
      </svg> Copied!`;
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = `<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 486.465 486.465" xml:space="preserve">
          <g><g>
            <path d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143
              L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94
              c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503
              c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384
              c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342
              c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104
              c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308
              l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"/>
            <path d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043
              l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974
              c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463
              c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151
              L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582
              c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819
              c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"/>
          </g></g>
        </svg> Copy Link`;
            btn.classList.remove('copied');
        }, 2000);
    }

    // Event listeners
    $('cvJoinBtn').addEventListener('click', startCountdown);
    $('cvCopyBtn').addEventListener('click', copyLink);

    document.addEventListener('visibilitychange', () => {
        if (!running || remaining <= 0) return;
        paused = document.hidden;
        $('cvPaused').classList.toggle('show', paused);
    });

    window.addEventListener('blur', () => {
        if (running && remaining > 0) { paused = true;
            $('cvPaused').classList.add('show'); }
    });
    window.addEventListener('focus', () => {
        if (running && remaining > 0) { paused = false;
            $('cvPaused').classList.remove('show'); }
    });

})();
