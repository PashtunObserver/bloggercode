(function() {
  function initTeamWidget() {
    var container = document.getElementById('team');
    if (!container) return;
    container.innerHTML = `<style>
  :host {
    --cv-bg: var(--bodyB, #ffffff);
    --cv-card: var(--contentB, #ffffff);
    --cv-text: var(--bodyC, #1a1a2e);
    --cv-text-sec: var(--bodyCa, #6b7280);
    --cv-accent: var(--linkC, #00c4cc);
    --cv-border: var(--contentL, #e5e7eb);
    --cv-font: var(--fontB, system-ui, -apple-system, sans-serif);
    display: block;
    font-family: var(--cv-font);
    margin: 0;
    padding: 0;
  }

  [data-theme="dark"], .darkMode {
    --cv-card: var(--contentB, #111827);
    --cv-text: var(--bodyC, #f3f4f6);
    --cv-text-sec: var(--bodyCa, #9ca3af);
    --cv-border: var(--contentL, #374151);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .cv-wrap {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  .cv-card {
    width: 100%;
    background: var(--cv-card);
    border: none;
    border-bottom: 1px solid var(--cv-border);
    padding: 0;
    text-align: center;
    position: relative;
    color: var(--cv-text);
  }
  .cv-card:first-child { border-top: 1px solid var(--cv-border); }

  .cv-logo-img {
    width: 140px;
    height: auto;
    margin: 0 auto 16px;
    display: block;
  }

  .cv-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 6px 0;
    letter-spacing: -0.2px;
  }
  .cv-subtitle {
    font-size: 0.85rem;
    color: var(--cv-text-sec);
    margin: 0 0 24px 0;
    line-height: 1.5;
  }

  .cv-timer-wrap { display: none; margin-bottom: 20px; }
  .cv-timer-wrap.active { display: block; }
  .cv-timer {
    font-size: 2.5rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--cv-accent);
    line-height: 1;
    margin-bottom: 4px;
  }
  .cv-timer-sub {
    font-size: 0.75rem;
    color: var(--cv-text-sec);
    margin-bottom: 8px;
  }
  .cv-paused {
    display: none;
    font-size: 0.7rem;
    color: #f59e0b;
    font-weight: 500;
  }
  .cv-paused.show { display: block; }

  .cv-progress {
    width: 100%;
    height: 2px;
    background: var(--cv-border);
    overflow: hidden;
    margin-top: 12px;
  }
  .cv-progress-bar {
    height: 100%;
    width: 100%;
    background: var(--cv-accent);
    transition: width 0.1s linear;
  }

  .cv-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 320px;
    padding: 12px 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    background: var(--cv-accent);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.2s ease;
    font-family: var(--cv-font);
  }
  .cv-btn:hover:not(:disabled) { opacity: 0.9; }
  .cv-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .cv-link-wrap {
    display: none;
    margin-top: 16px;
    padding: 16px;
    background: rgba(0,196,204,0.04);
    border: 1px solid var(--cv-border);
    border-radius: 8px;
    text-align: left;
  }
  .cv-link-wrap.show { display: block; }
  .cv-link-label {
    font-size: 0.75rem;
    color: var(--cv-text-sec);
    margin-bottom: 8px;
    text-align: center;
  }
  .cv-link-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
  .cv-link-input {
    width: 100%;
    padding: 10px 12px;
    background: var(--cv-card);
    border: 1px solid var(--cv-border);
    border-radius: 6px;
    color: var(--cv-text);
    font-size: 0.8rem;
    font-family: monospace;
    outline: none;
  }
  .cv-copy-btn {
    width: 100%;
    padding: 10px 16px;
    background: var(--cv-accent);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    font-family: var(--cv-font);
  }
  .cv-copy-btn:hover { opacity: 0.9; }
  .cv-copy-btn.copied { background: #22c55e; pointer-events: none; }
  .cv-open-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 10px;
    padding: 8px 16px;
    background: transparent;
    border: 1px solid var(--cv-border);
    color: var(--cv-text-sec);
    border-radius: 6px;
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
  }

  .cv-note {
    font-size: 0.75rem;
    color: var(--cv-text-sec);
    margin-top: 12px;
    padding: 10px 12px;
    background: rgba(0,0,0,0.03);
    border-radius: 6px;
    line-height: 1.5;
    text-align: center;
  }
  .cv-note-red {
    font-size: 0.7rem;
    color: #dc2626;
    margin-top: 10px;
    padding: 8px 12px;
    background: rgba(220,38,38,0.06);
    border: 1px solid rgba(220,38,38,0.15);
    border-radius: 6px;
    line-height: 1.5;
    text-align: center;
    font-weight: 500;
  }

  .cv-success {
    display: none;
    font-size: 2rem;
    margin-bottom: 8px;
  }
  .cv-success.show { display: block; }
  .cv-done {
    display: none;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--cv-accent);
    margin-bottom: 4px;
  }
  .cv-done.show { display: block; }
</style>

<div class="cv-wrap">
  <div class="cv-card" id="cvCard">
    <img class="cv-logo-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Canva_logo.svg/3840px-Canva_logo.svg.png" alt="Canva Logo">
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
      <div class="cv-link-row">
        <input class="cv-link-input" id="cvLinkInput" type="text" value="https://www.canva.com/brand/join?token=ABC123XYZ" readonly>
        <button class="cv-copy-btn" id="cvCopyBtn">Copy</button>
      </div>
      <div style="text-align:center;">
        <a class="cv-open-btn" id="cvOpenBtn" href="https://www.canva.com/brand/join?token=ABC123XYZ" target="_blank" rel="noopener">Open in New Tab</a>
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

<script>
(function() {
  const TOTAL = 60;
  let remaining = TOTAL;
  let interval = null;
  let paused = false;
  let running = false;

  const $ = id => document.getElementById(id);

  function fmt(s) {
    const m = Math.floor(s/60).toString().padStart(2,'0');
    const sec = (s%60).toString().padStart(2,'0');
    return m+':'+sec;
  }

  function update() {
    $('cvTimer').textContent = fmt(remaining);
    $('cvProgress').style.width = (remaining/TOTAL*100)+'%';
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
    $('cvLinkInput').select();
    navigator.clipboard.writeText($('cvLinkInput').value).then(() => {
      $('cvCopyBtn').textContent = 'Copied';
      $('cvCopyBtn').classList.add('copied');
      setTimeout(() => {
        $('cvCopyBtn').textContent = 'Copy';
        $('cvCopyBtn').classList.remove('copied');
      }, 2000);
    });
  }

  $('cvJoinBtn').addEventListener('click', startCountdown);
  $('cvCopyBtn').addEventListener('click', copyLink);

  document.addEventListener('visibilitychange', () => {
    if (!running || remaining <= 0) return;
    paused = document.hidden;
    $('cvPaused').classList.toggle('show', paused);
  });

  window.addEventListener('blur', () => {
    if (running && remaining > 0) { paused = true; $('cvPaused').classList.add('show'); }
  });
  window.addEventListener('focus', () => {
    if (running && remaining > 0) { paused = false; $('cvPaused').classList.remove('show'); }
  });
})();
</script>`;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamWidget);
  } else {
    initTeamWidget();
  }
})();