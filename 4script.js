/**
 * ============================================
 * ROBOTS.TXT GENERATOR - JAVASCRIPT MODULE
 * Prefix: rbxGen_
 * Scope: Self-contained, conflict-free
 * ============================================
 */

(function() {
  'use strict';

  // ==========================================
  // CONFIGURATION & CONSTANTS
  // ==========================================
  
  const RBXGEN_INVALID_CHARS = /[<>\"{}|\\\\^~[\]`]/;
  const RBXGEN_URL_PATTERN = /^https?:\/\/[a-zA-Z0-9][-a-zA-Z0-9]*[a-zA-Z0-9](\.[a-zA-Z0-9][-a-zA-Z0-9]*[a-zA-Z0-9])+.*$/;
  
  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  
  /**
   * Safely get element by ID with rbxGen_ prefix
   */
  function rbxGen_getEl(id) {
    return document.getElementById('rbxGen-' + id);
  }
  
  /**
   * Show or hide an element
   */
  function rbxGen_toggle(el, show) {
    if (!el) return;
    if (show) {
      el.classList.remove('rbxGen-hidden');
    } else {
      el.classList.add('rbxGen-hidden');
    }
  }
  
  /**
   * Sanitize user input to prevent XSS and invalid chars
   */
  function rbxGen_sanitize(input) {
    if (!input) return '';
    // Remove HTML tags and trim
    return input.replace(/<[^>]*>/g, '').trim();
  }
  
  /**
   * Validate a path for robots.txt rules
   */
  function rbxGen_validatePath(path, type) {
    const errors = [];
    const sanitized = rbxGen_sanitize(path);
    
    if (!sanitized) {
      errors.push(type + ' path cannot be empty');
      return { valid: false, errors: errors, value: sanitized };
    }
    
    // Must start with /
    if (!sanitized.startsWith('/')) {
      errors.push(type + ' path must start with "/" (e.g., /path)');
    }
    
    // Check for invalid characters
    if (RBXGEN_INVALID_CHARS.test(sanitized)) {
      errors.push(type + ' path contains invalid characters: < > " { } | \\ ^ ~ [ ] `');
    }
    
    // Check for consecutive slashes
    if (sanitized.includes('//')) {
      errors.push(type + ' path contains consecutive slashes');
    }
    
    return { 
      valid: errors.length === 0, 
      errors: errors, 
      value: sanitized 
    };
  }
  
  /**
   * Validate Sitemap URL
   */
  function rbxGen_validateSitemap(url) {
    const errors = [];
    const sanitized = rbxGen_sanitize(url);
    
    if (!sanitized) {
      // Sitemap is optional
      return { valid: true, errors: [], value: '' };
    }
    
    if (!sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
      errors.push('Sitemap URL must start with http:// or https://');
    }
    
    if (!sanitized.endsWith('.xml') && !sanitized.endsWith('.txt') && !sanitized.endsWith('.gz')) {
      errors.push('Sitemap URL should end with .xml, .txt, or .gz');
    }
    
    if (RBXGEN_INVALID_CHARS.test(sanitized)) {
      errors.push('Sitemap URL contains invalid characters');
    }
    
    return { 
      valid: errors.length === 0, 
      errors: errors, 
      value: sanitized 
    };
  }
  
  /**
   * Validate Website URL (optional, reference only)
   */
  function rbxGen_validateWebsiteUrl(url) {
    const sanitized = rbxGen_sanitize(url);
    if (!sanitized) return { valid: true, value: '' };
    
    // Basic URL validation - very permissive since it's optional
    const hasProtocol = sanitized.startsWith('http://') || sanitized.startsWith('https://');
    return { 
      valid: hasProtocol || sanitized.includes('.'), 
      value: sanitized 
    };
  }

  // ==========================================
  // UI INTERACTION FUNCTIONS
  // ==========================================
  
  /**
   * Toggle custom user-agent input visibility
   */
  function rbxGen_handleUserAgentChange() {
    const select = rbxGen_getEl('userAgent');
    const customInput = rbxGen_getEl('customAgent');
    
    if (select.value === 'Custom') {
      rbxGen_toggle(customInput, true);
      customInput.focus();
    } else {
      rbxGen_toggle(customInput, false);
      customInput.value = '';
    }
  }
  
  /**
   * Add a new rule input row
   */
  window.rbxGen_addRule = function(type) {
    const container = rbxGen_getEl(type + 'Container');
    const newRow = document.createElement('div');
    newRow.className = 'rbxGen-ruleRow';
    newRow.innerHTML = 
      '<input type="text" class="rbxGen-input rbxGen-ruleInput" placeholder="/path/to/' + type + '" data-rule-type="' + type + '">' +
      '<button class="rbxGen-btn rbxGen-btnRemove" onclick="rbxGen_removeRule(this)" title="Remove Rule">✕</button>';
    
    container.appendChild(newRow);
    
    // Focus the new input
    const newInput = newRow.querySelector('.rbxGen-ruleInput');
    newInput.focus();
    
    // Add enter key support
    newInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.rbxGen_addRule(type);
      }
    });
  };
  
  /**
   * Remove a rule row
   */
  window.rbxGen_removeRule = function(btn) {
    const row = btn.parentElement;
    const container = row.parentElement;
    
    // Don't remove if it's the last row - just clear it instead
    if (container.children.length <= 1) {
      const input = row.querySelector('.rbxGen-ruleInput');
      input.value = '';
      input.focus();
      return;
    }
    
    row.remove();
  };
  
  /**
   * Collect all rules from inputs
   */
  function rbxGen_collectRules(type) {
    const container = rbxGen_getEl(type + 'Container');
    const inputs = container.querySelectorAll('.rbxGen-ruleInput');
    const rules = [];
    
    inputs.forEach(function(input) {
      const value = rbxGen_sanitize(input.value);
      if (value) {
        rules.push(value);
      }
    });
    
    return rules;
  }
  
  /**
   * Display error messages
   */
  function rbxGen_showErrors(errors) {
    const errorContainer = rbxGen_getEl('errorContainer');
    
    if (errors.length === 0) {
      rbxGen_toggle(errorContainer, false);
      return;
    }
    
    let html = '<strong>Please fix the following errors:</strong><ul>';
    errors.forEach(function(err) {
      html += '<li>' + err + '</li>';
    });
    html += '</ul>';
    
    errorContainer.innerHTML = html;
    rbxGen_toggle(errorContainer, true);
    
    // Auto-hide after 8 seconds
    setTimeout(function() {
      rbxGen_toggle(errorContainer, false);
    }, 8000);
  }
  
  /**
   * Generate the robots.txt content
   */
  window.rbxGen_generate = function() {
    const errors = [];
    const lines = [];
    
    // --- Get User-Agent ---
    const agentSelect = rbxGen_getEl('userAgent');
    let userAgent = agentSelect.value;
    
    if (userAgent === 'Custom') {
      const customAgent = rbxGen_sanitize(rbxGen_getEl('customAgent').value);
      if (!customAgent) {
        errors.push('Custom user-agent name is required');
      } else if (RBXGEN_INVALID_CHARS.test(customAgent)) {
        errors.push('Custom user-agent contains invalid characters');
      } else {
        userAgent = customAgent;
      }
    }
    
    // --- Validate Website URL (optional) ---
    const websiteUrl = rbxGen_validateWebsiteUrl(rbxGen_getEl('websiteUrl').value);
    
    // --- Collect and Validate Allow Rules ---
    const allowRules = rbxGen_collectRules('allow');
    const validAllowRules = [];
    allowRules.forEach(function(rule) {
      const result = rbxGen_validatePath(rule, 'Allow');
      if (!result.valid) {
        errors.push.apply(errors, result.errors);
      } else {
        validAllowRules.push(result.value);
      }
    });
    
    // --- Collect and Validate Disallow Rules ---
    const disallowRules = rbxGen_collectRules('disallow');
    const validDisallowRules = [];
    disallowRules.forEach(function(rule) {
      const result = rbxGen_validatePath(rule, 'Disallow');
      if (!result.valid) {
        errors.push.apply(errors, result.errors);
      } else {
        validDisallowRules.push(result.value);
      }
    });
    
    // --- Validate Sitemap ---
    const sitemapResult = rbxGen_validateSitemap(rbxGen_getEl('sitemap').value);
    if (!sitemapResult.valid) {
      errors.push.apply(errors, sitemapResult.errors);
    }
    
    // --- Show errors if any ---
    if (errors.length > 0) {
      rbxGen_showErrors(errors);
      rbxGen_toggle(rbxGen_getEl('outputSection'), false);
      return;
    }
    
    // Hide error container
    rbxGen_toggle(rbxGen_getEl('errorContainer'), false);
    
    // --- Build robots.txt Content ---
    
    // Add comment with website URL if provided
    if (websiteUrl.value) {
      lines.push('# robots.txt for ' + websiteUrl.value);
      lines.push('# Generated by Robots.txt Generator');
      lines.push('');
    }
    
    // User-agent block
    lines.push('User-agent: ' + userAgent);
    
    // Disallow rules first (convention)
    validDisallowRules.forEach(function(rule) {
      lines.push('Disallow: ' + rule);
    });
    
    // Allow rules
    validAllowRules.forEach(function(rule) {
      lines.push('Allow: ' + rule);
    });
    
    // Empty line before sitemap
    if (sitemapResult.value) {
      lines.push('');
      lines.push('Sitemap: ' + sitemapResult.value);
    }
    
    // Add trailing newline
    const output = lines.join('\n') + '\n';
    
    // --- Display Output ---
    const outputCode = rbxGen_getEl('outputCode');
    const outputSection = rbxGen_getEl('outputSection');
    
    outputCode.textContent = output;
    rbxGen_toggle(outputSection, true);
    
    // Scroll to output
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  
  /**
   * Copy generated content to clipboard
   */
  window.rbxGen_copyToClipboard = function() {
    const outputCode = rbxGen_getEl('outputCode');
    const text = outputCode.textContent;
    
    if (!text) return;
    
    // Use modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        rbxGen_showCopyFeedback();
      }).catch(function() {
        // Fallback for older browsers
        rbxGen_fallbackCopy(text);
      });
    } else {
      rbxGen_fallbackCopy(text);
    }
  };
  
  /**
   * Fallback copy method using textarea
   */
  function rbxGen_fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    
    textarea.focus();
    textarea.select();
    
    try {
      document.execCommand('copy');
      rbxGen_showCopyFeedback();
    } catch (err) {
      alert('Failed to copy. Please select and copy manually.');
    }
    
    document.body.removeChild(textarea);
  }
  
  /**
   * Show copy success feedback
   */
  function rbxGen_showCopyFeedback() {
    const feedback = rbxGen_getEl('copyFeedback');
    rbxGen_toggle(feedback, true);
    
    setTimeout(function() {
      rbxGen_toggle(feedback, false);
    }, 2500);
  }
  
  /**
   * Reset all inputs to default state
   */
  window.rbxGen_reset = function() {
    // Reset user agent
    const agentSelect = rbxGen_getEl('userAgent');
    agentSelect.value = '*';
    rbxGen_toggle(rbxGen_getEl('customAgent'), false);
    rbxGen_getEl('customAgent').value = '';
    
    // Reset website URL
    rbxGen_getEl('websiteUrl').value = '';
    
    // Reset sitemap
    rbxGen_getEl('sitemap').value = '';
    
    // Reset allow rules - keep one empty row
    const allowContainer = rbxGen_getEl('allowContainer');
    allowContainer.innerHTML = 
      '<div class="rbxGen-ruleRow">' +
      '<input type="text" class="rbxGen-input rbxGen-ruleInput" placeholder="/path/to/allow" data-rule-type="allow">' +
      '<button class="rbxGen-btn rbxGen-btnRemove" onclick="rbxGen_removeRule(this)" title="Remove Rule">✕</button>' +
      '</div>';
    
    // Reset disallow rules - keep one empty row
    const disallowContainer = rbxGen_getEl('disallowContainer');
    disallowContainer.innerHTML = 
      '<div class="rbxGen-ruleRow">' +
      '<input type="text" class="rbxGen-input rbxGen-ruleInput" placeholder="/path/to/disallow" data-rule-type="disallow">' +
      '<button class="rbxGen-btn rbxGen-btnRemove" onclick="rbxGen_removeRule(this)" title="Remove Rule">✕</button>' +
      '</div>';
    
    // Hide output and errors
    rbxGen_toggle(rbxGen_getEl('outputSection'), false);
    rbxGen_toggle(rbxGen_getEl('errorContainer'), false);
    rbxGen_toggle(rbxGen_getEl('copyFeedback'), false);
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================
  
  function rbxGen_init() {
    // Bind user-agent change event
    const agentSelect = rbxGen_getEl('userAgent');
    if (agentSelect) {
      agentSelect.addEventListener('change', rbxGen_handleUserAgentChange);
    }
    
    // Add enter key support for initial inputs
    const initialInputs = document.querySelectorAll('#rbxGen-widget .rbxGen-ruleInput');
    initialInputs.forEach(function(input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          const type = input.getAttribute('data-rule-type');
          window.rbxGen_addRule(type);
        }
      });
    });
    
    console.log('Robots.txt Generator initialized successfully');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rbxGen_init);
  } else {
    rbxGen_init();
  }

})();



(function() {
  'use strict';

  // ==========================================
  // CONFIGURATION & STATE
  // ==========================================

  const ttTutor_STATE = {
    isRunning: false,
    isFinished: false,
    startTime: null,
    endTime: null,
    timerInterval: null,
    timeLeft: 60,
    totalTime: 60,
    currentText: '',
    userInput: '',
    correctChars: 0,
    incorrectChars: 0,
    correctWords: 0,
    incorrectWords: 0,
    streak: 0,
    maxStreak: 0,
    soundEnabled: true,
    darkMode: false,
    difficulty: 'beginner',
    customText: null
  };

  // Text samples for different difficulties
  const ttTutor_TEXTS = {
    beginner: [
      "The quick brown fox jumps over the lazy dog. This is a simple sentence to help you practice typing. Keep your fingers on the home row and type slowly at first.",
      "A cat sat on a mat and looked at the rat. The sun is bright and the sky is blue. Practice makes perfect when you learn to type.",
      "She sells seashells by the seashore. Peter Piper picked a peck of pickled peppers. These tongue twisters help with finger coordination."
    ],
    intermediate: [
      "Technology has transformed the way we communicate and work. From smartphones to artificial intelligence, innovation continues to shape our daily lives in profound ways.",
      "The scientific method involves observation, hypothesis formation, experimentation, and conclusion. Researchers must maintain objectivity and rigor throughout their investigations.",
      "Climate change represents one of the most pressing challenges facing humanity. Rising temperatures, melting ice caps, and extreme weather events demand immediate global action."
    ],
    advanced: [
      "Quantum mechanics describes nature at the smallest scales of energy levels of atoms and subatomic particles. The mathematical formulations include wave functions, operators, and Hilbert spaces that challenge classical intuition.",
      "Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. This remarkable adaptability allows neurons to compensate for injury and disease and to adjust their activities in response to new situations or changes in their environment.",
      "The Dunning-Kruger effect is a cognitive bias wherein people with low ability at a task overestimate their ability. This metacognitive failure arises because the skills needed to be competent are often the same skills required to recognize competence in others."
    ]
  };

  // DOM Element References
  const ttTutor_ELS = {};

  // ==========================================
  // INITIALIZATION
  // ==========================================

  function ttTutor_init() {
    ttTutor_cacheElements();
    ttTutor_bindEvents();
    ttTutor_loadSettings();
    ttTutor_generateText();
    ttTutor_updateDisplay();
    ttTutor_renderLeaderboard();
  }

  function ttTutor_cacheElements() {
    const ids = [
      'container', 'themeToggle', 'themeIcon', 'soundToggle', 'soundIcon',
      'fullscreenToggle', 'fullscreenIcon',
      'difficulty', 'timer', 'customTimerGroup', 'customTime', 'startBtn',
      'progressBar', 'wpm', 'accuracy', 'timeLeft', 'streak',
      'textDisplay', 'inputArea', 'customTextSection', 'customTextInput', 'useCustomText',
      'keyboard', 'results', 'resultWpm', 'resultAccuracy', 'resultErrors',
      'resultCorrectChars', 'resultIncorrectChars', 'resultTimeUsed',
      'restartBtn', 'newTextBtn', 'leaderboard', 'leaderboardList', 'feedback'
    ];
    ids.forEach(id => {
      ttTutor_ELS[id] = document.getElementById('ttTutor_' + id);
    });
  }

  function ttTutor_bindEvents() {
    // Theme toggle
    ttTutor_ELS.themeToggle.addEventListener('click', ttTutor_toggleTheme);

    // Sound toggle
    ttTutor_ELS.soundToggle.addEventListener('click', ttTutor_toggleSound);

    // Fullscreen toggle
    ttTutor_ELS.fullscreenToggle.addEventListener('click', ttTutor_toggleFullscreen);

    // Listen for native fullscreen changes (ESC key, etc.)
    document.addEventListener('fullscreenchange', ttTutor_handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', ttTutor_handleFullscreenChange);
    document.addEventListener('msfullscreenchange', ttTutor_handleFullscreenChange);

    // Timer selection
    ttTutor_ELS.timer.addEventListener('change', ttTutor_handleTimerChange);

    // Start button
    ttTutor_ELS.startBtn.addEventListener('click', ttTutor_startTest);

    // Input area
    ttTutor_ELS.inputArea.addEventListener('input', ttTutor_handleInput);
    ttTutor_ELS.inputArea.addEventListener('keydown', ttTutor_handleKeydown);
    ttTutor_ELS.inputArea.addEventListener('paste', e => e.preventDefault());

    // Custom text
    ttTutor_ELS.useCustomText.addEventListener('click', ttTutor_useCustomText);

    // Result buttons
    ttTutor_ELS.restartBtn.addEventListener('click', ttTutor_restartTest);
    ttTutor_ELS.newTextBtn.addEventListener('click', ttTutor_newParagraph);

    // Keyboard highlighting
    document.addEventListener('keydown', ttTutor_highlightKey);
    document.addEventListener('keyup', ttTutor_unhighlightKey);
  }

  // ==========================================
  // SETTINGS & STORAGE
  // ==========================================

  function ttTutor_loadSettings() {
    try {
      const saved = localStorage.getItem('ttTutor_settings');
      if (saved) {
        const settings = JSON.parse(saved);
        ttTutor_STATE.darkMode = settings.darkMode || false;
        ttTutor_STATE.soundEnabled = settings.soundEnabled !== false;
        if (ttTutor_STATE.darkMode) ttTutor_ELS.container.classList.add('ttTutor_dark');
        ttTutor_updateThemeIcon();
        ttTutor_updateSoundIcon();
      }
    } catch (e) {
      console.warn('ttTutor: Could not load settings', e);
    }
  }

  function ttTutor_saveSettings() {
    try {
      localStorage.setItem('ttTutor_settings', JSON.stringify({
        darkMode: ttTutor_STATE.darkMode,
        soundEnabled: ttTutor_STATE.soundEnabled
      }));
    } catch (e) {
      console.warn('ttTutor: Could not save settings', e);
    }
  }

  function ttTutor_toggleTheme() {
    ttTutor_STATE.darkMode = !ttTutor_STATE.darkMode;
    ttTutor_ELS.container.classList.toggle('ttTutor_dark', ttTutor_STATE.darkMode);
    ttTutor_updateThemeIcon();
    ttTutor_saveSettings();
  }

  function ttTutor_updateThemeIcon() {
    ttTutor_ELS.themeIcon.textContent = ttTutor_STATE.darkMode ? '☀️' : '🌙';
  }

  function ttTutor_toggleSound() {
    ttTutor_STATE.soundEnabled = !ttTutor_STATE.soundEnabled;
    ttTutor_updateSoundIcon();
    ttTutor_saveSettings();
    ttTutor_showFeedback(ttTutor_STATE.soundEnabled ? 'Sound enabled' : 'Sound disabled', 'info');
  }

  function ttTutor_updateSoundIcon() {
    ttTutor_ELS.soundIcon.textContent = ttTutor_STATE.soundEnabled ? '🔊' : '🔇';
  }

  function ttTutor_handleTimerChange() {
    const val = ttTutor_ELS.timer.value;
    ttTutor_ELS.customTimerGroup.classList.toggle('ttTutor_visible', val === 'custom');
  }

  // ==========================================
  // TEXT GENERATION
  // ==========================================

  function ttTutor_generateText() {
    if (ttTutor_STATE.customText) {
      ttTutor_STATE.currentText = ttTutor_STATE.customText;
      return;
    }

    const difficulty = ttTutor_ELS.difficulty.value;
    const texts = ttTutor_TEXTS[difficulty] || ttTutor_TEXTS.beginner;
    const randomIndex = Math.floor(Math.random() * texts.length);
    ttTutor_STATE.currentText = texts[randomIndex];
  }

  function ttTutor_useCustomText() {
    const text = ttTutor_ELS.customTextInput.value.trim();
    if (!text) {
      ttTutor_showFeedback('Please enter some text first', 'error');
      return;
    }
    ttTutor_STATE.customText = text;
    ttTutor_generateText();
    ttTutor_updateDisplay();
    ttTutor_showFeedback('Custom text loaded! Click Start Test to begin.', 'success');
  }

  // ==========================================
  // DISPLAY UPDATE
  // ==========================================

  function ttTutor_updateDisplay() {
    const text = ttTutor_STATE.currentText;
    const input = ttTutor_STATE.userInput;
    let html = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      let className = 'ttTutor_char';

      if (i < input.length) {
        if (input[i] === char) {
          className += ' ttTutor_correct';
        } else {
          className += ' ttTutor_incorrect';
        }
      } else if (i === input.length) {
        className += ' ttTutor_current';
      }

      // Handle spaces visually
      const displayChar = char === ' ' ? '\u00A0' : char;
      html += `<span class="${className}">${displayChar}</span>`;
    }

    ttTutor_ELS.textDisplay.innerHTML = html;

    // Auto-scroll to current character
    const currentChar = ttTutor_ELS.textDisplay.querySelector('.ttTutor_current');
    if (currentChar) {
      currentChar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ==========================================
  // TEST LOGIC
  // ==========================================

  function ttTutor_startTest() {
    if (ttTutor_STATE.isRunning) return;

    // Get timer duration
    let duration = parseInt(ttTutor_ELS.timer.value);
    if (ttTutor_ELS.timer.value === 'custom') {
      duration = parseInt(ttTutor_ELS.customTime.value) || 60;
    }

    // Reset state
    ttTutor_STATE.isRunning = true;
    ttTutor_STATE.isFinished = false;
    ttTutor_STATE.startTime = null;
    ttTutor_STATE.endTime = null;
    ttTutor_STATE.timeLeft = duration;
    ttTutor_STATE.totalTime = duration;
    ttTutor_STATE.userInput = '';
    ttTutor_STATE.correctChars = 0;
    ttTutor_STATE.incorrectChars = 0;
    ttTutor_STATE.correctWords = 0;
    ttTutor_STATE.incorrectWords = 0;
    ttTutor_STATE.streak = 0;
    ttTutor_STATE.maxStreak = 0;

    // Reset UI
    ttTutor_ELS.inputArea.value = '';
    ttTutor_ELS.inputArea.disabled = false;
    ttTutor_ELS.inputArea.focus();
    ttTutor_ELS.results.classList.remove('ttTutor_visible');
    ttTutor_ELS.progressBar.style.width = '0%';
    ttTutor_ELS.startBtn.textContent = 'Test Running...';
    ttTutor_ELS.startBtn.disabled = true;

    ttTutor_updateStats();
    ttTutor_updateDisplay();
    ttTutor_showFeedback('Type the text shown above!', 'info');
  }

  function ttTutor_handleInput(e) {
    if (!ttTutor_STATE.isRunning || ttTutor_STATE.isFinished) {
      // Prevent input if not running
      if (!ttTutor_STATE.isRunning) {
        ttTutor_ELS.inputArea.value = '';
        ttTutor_showFeedback('Click "Start Test" first!', 'error');
        return;
      }
      return;
    }

    // Start timer on first input
    if (!ttTutor_STATE.startTime) {
      ttTutor_STATE.startTime = Date.now();
      ttTutor_startTimer();
    }

    const text = ttTutor_STATE.currentText;
    let input = ttTutor_ELS.inputArea.value;

    // Prevent typing beyond text length
    if (input.length > text.length) {
      input = input.substring(0, text.length);
      ttTutor_ELS.inputArea.value = input;
    }

    ttTutor_STATE.userInput = input;

    // Calculate stats
    ttTutor_calculateStats();
    ttTutor_updateDisplay();
    ttTutor_updateStats();
    ttTutor_updateProgress();

    // Check for completion
    if (input.length >= text.length) {
      ttTutor_finishTest();
    }
  }

  function ttTutor_handleKeydown(e) {
    if (!ttTutor_STATE.isRunning) return;

    // Handle backspace
    if (e.key === 'Backspace') {
      ttTutor_playSound('backspace');
      return;
    }

    // Prevent extra spaces at word boundaries
    const text = ttTutor_STATE.currentText;
    const input = ttTutor_ELS.inputArea.value;

    if (e.key === ' ' && input.length < text.length) {
      // Check if current position should be a space
      if (text[input.length] !== ' ') {
        e.preventDefault();
        ttTutor_showFeedback('Keep typing the shown text!', 'error');
        return;
      }
    }

    // Play typing sound
    ttTutor_playSound('type');
  }

  function ttTutor_calculateStats() {
    const text = ttTutor_STATE.currentText;
    const input = ttTutor_STATE.userInput;

    let correct = 0;
    let incorrect = 0;
    let currentStreak = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) {
        correct++;
        currentStreak++;
        if (currentStreak > ttTutor_STATE.maxStreak) {
          ttTutor_STATE.maxStreak = currentStreak;
        }
      } else {
        incorrect++;
        currentStreak = 0;
      }
    }

    ttTutor_STATE.correctChars = correct;
    ttTutor_STATE.incorrectChars = incorrect;
    ttTutor_STATE.streak = currentStreak;

    // Calculate words
    const inputWords = input.trim().split(/\s+/);
    const textWords = text.trim().split(/\s+/);

    let correctWords = 0;
    let incorrectWords = 0;

    for (let i = 0; i < inputWords.length && i < textWords.length; i++) {
      if (inputWords[i] === textWords[i]) {
        correctWords++;
      } else {
        incorrectWords++;
      }
    }

    ttTutor_STATE.correctWords = correctWords;
    ttTutor_STATE.incorrectWords = incorrectWords;
  }

  function ttTutor_updateStats() {
    const elapsed = ttTutor_STATE.startTime ? (Date.now() - ttTutor_STATE.startTime) / 60000 : 0;
    const wpm = elapsed > 0 ? Math.round((ttTutor_STATE.correctChars / 5) / elapsed) : 0;
    const totalTyped = ttTutor_STATE.correctChars + ttTutor_STATE.incorrectChars;
    const accuracy = totalTyped > 0 ? Math.round((ttTutor_STATE.correctChars / totalTyped) * 100) : 100;

    ttTutor_ELS.wpm.textContent = Math.max(0, wpm);
    ttTutor_ELS.accuracy.textContent = accuracy + '%';
    ttTutor_ELS.timeLeft.textContent = ttTutor_STATE.timeLeft;
    ttTutor_ELS.streak.textContent = ttTutor_STATE.streak;
  }

  function ttTutor_updateProgress() {
    const progress = ((ttTutor_STATE.totalTime - ttTutor_STATE.timeLeft) / ttTutor_STATE.totalTime) * 100;
    ttTutor_ELS.progressBar.style.width = progress + '%';
  }

  // ==========================================
  // TIMER
  // ==========================================

  function ttTutor_startTimer() {
    ttTutor_STATE.timerInterval = setInterval(() => {
      ttTutor_STATE.timeLeft--;
      ttTutor_updateStats();
      ttTutor_updateProgress();

      if (ttTutor_STATE.timeLeft <= 0) {
        ttTutor_finishTest();
      }
    }, 1000);
  }

  function ttTutor_stopTimer() {
    if (ttTutor_STATE.timerInterval) {
      clearInterval(ttTutor_STATE.timerInterval);
      ttTutor_STATE.timerInterval = null;
    }
  }

  // ==========================================
  // TEST COMPLETION
  // ==========================================

  function ttTutor_finishTest() {
    if (ttTutor_STATE.isFinished) return;

    ttTutor_STATE.isRunning = false;
    ttTutor_STATE.isFinished = true;
    ttTutor_STATE.endTime = Date.now();
    ttTutor_stopTimer();

    const elapsed = (ttTutor_STATE.endTime - ttTutor_STATE.startTime) / 1000;
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round((ttTutor_STATE.correctChars / 5) / minutes) : 0;
    const totalTyped = ttTutor_STATE.correctChars + ttTutor_STATE.incorrectChars;
    const accuracy = totalTyped > 0 ? Math.round((ttTutor_STATE.correctChars / totalTyped) * 100) : 100;

    // Update result panel
    ttTutor_ELS.resultWpm.textContent = wpm;
    ttTutor_ELS.resultAccuracy.textContent = accuracy + '%';
    ttTutor_ELS.resultErrors.textContent = ttTutor_STATE.incorrectChars;
    ttTutor_ELS.resultCorrectChars.textContent = ttTutor_STATE.correctChars;
    ttTutor_ELS.resultIncorrectChars.textContent = ttTutor_STATE.incorrectChars;
    ttTutor_ELS.resultTimeUsed.textContent = Math.round(elapsed) + 's';

    // Show results
    ttTutor_ELS.results.classList.add('ttTutor_visible');
    ttTutor_ELS.inputArea.disabled = true;
    ttTutor_ELS.startBtn.textContent = 'Start Test';
    ttTutor_ELS.startBtn.disabled = false;

    // Save score
    ttTutor_saveScore(wpm, accuracy);
    ttTutor_renderLeaderboard();

    // Feedback
    if (accuracy >= 95) {
      ttTutor_showFeedback('Excellent! Amazing accuracy!', 'success');
    } else if (accuracy >= 80) {
      ttTutor_showFeedback('Great job! Keep practicing!', 'success');
    } else {
      ttTutor_showFeedback('Good effort! Practice makes perfect!', 'info');
    }

    ttTutor_playSound('complete');
  }

  function ttTutor_restartTest() {
    ttTutor_STATE.customText = null;
    ttTutor_ELS.customTextInput.value = '';
    ttTutor_generateText();
    ttTutor_startTest();
  }

  function ttTutor_newParagraph() {
    ttTutor_STATE.customText = null;
    ttTutor_ELS.customTextInput.value = '';
    ttTutor_generateText();
    ttTutor_updateDisplay();
    ttTutor_ELS.results.classList.remove('ttTutor_visible');
    ttTutor_ELS.inputArea.value = '';
    ttTutor_ELS.inputArea.disabled = false;
    ttTutor_STATE.isRunning = false;
    ttTutor_STATE.isFinished = false;
    ttTutor_ELS.startBtn.textContent = 'Start Test';
    ttTutor_ELS.startBtn.disabled = false;
    ttTutor_updateStats();
    ttTutor_ELS.progressBar.style.width = '0%';
    ttTutor_showFeedback('New text loaded! Click Start Test to begin.', 'info');
  }

  // ==========================================
  // KEYBOARD HIGHLIGHTING
  // ==========================================

  function ttTutor_highlightKey(e) {
    const key = e.key.toLowerCase();
    const keyEl = document.querySelector(`.ttTutor_key[data-key="${key}"], .ttTutor_key[data-key="${e.key}"]`);

    if (keyEl) {
      keyEl.classList.add('ttTutor_active');
    }

    // Special keys
    if (e.key === ' ') {
      const spaceKey = document.querySelector('.ttTutor_key[data-key=" "]');
      if (spaceKey) spaceKey.classList.add('ttTutor_active');
    }
    if (e.key === 'Backspace') {
      const bsKey = document.querySelector('.ttTutor_key[data-key="Backspace"]');
      if (bsKey) bsKey.classList.add('ttTutor_active');
    }
    if (e.shiftKey) {
      const shiftKeys = document.querySelectorAll('.ttTutor_key[data-key="Shift"]');
      shiftKeys.forEach(k => k.classList.add('ttTutor_active'));
    }
  }

  function ttTutor_unhighlightKey(e) {
    const keys = document.querySelectorAll('.ttTutor_key.ttTutor_active');
    keys.forEach(k => k.classList.remove('ttTutor_active'));
  }

  // ==========================================
  // SOUND EFFECTS
  // ==========================================

  function ttTutor_playSound(type) {
    if (!ttTutor_STATE.soundEnabled) return;

    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      switch (type) {
        case 'type':
          oscillator.frequency.value = 800;
          gainNode.gain.value = 0.05;
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.05);
          break;
        case 'backspace':
          oscillator.frequency.value = 400;
          gainNode.gain.value = 0.05;
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.05);
          break;
        case 'error':
          oscillator.frequency.value = 200;
          gainNode.gain.value = 0.1;
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.1);
          break;
        case 'complete':
          oscillator.frequency.value = 600;
          gainNode.gain.value = 0.1;
          oscillator.start();
          oscillator.frequency.setValueAtTime(800, audioCtx.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime + 0.2);
          oscillator.stop(audioCtx.currentTime + 0.3);
          break;
      }
    } catch (e) {
      // Audio not supported, silently fail
    }
  }

  // ==========================================

  // ==========================================
  // FULLSCREEN MODE
  // ==========================================

  function ttTutor_toggleFullscreen() {
    const container = ttTutor_ELS.container;
    const isFullscreen = container.classList.contains('ttTutor_fullscreen');

    if (!isFullscreen) {
      // Enter fullscreen
      container.classList.add('ttTutor_fullscreen');
      document.body.classList.add('ttTutor_fullscreenActive');
      ttTutor_ELS.fullscreenIcon.textContent = '⛶';
      ttTutor_ELS.fullscreenToggle.title = 'Exit Fullscreen';

      // Try native fullscreen API for better experience
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(err => {
          console.warn('ttTutor: Fullscreen API error', err);
        });
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }

      ttTutor_showFeedback('Fullscreen mode enabled', 'info');
    } else {
      // Exit fullscreen
      container.classList.remove('ttTutor_fullscreen');
      document.body.classList.remove('ttTutor_fullscreenActive');
      ttTutor_ELS.fullscreenIcon.textContent = '⛶';
      ttTutor_ELS.fullscreenToggle.title = 'Toggle Fullscreen';

      // Exit native fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.warn('ttTutor: Exit fullscreen error', err);
        });
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      ttTutor_showFeedback('Fullscreen mode disabled', 'info');
    }

    // Refocus input area if test is running
    if (ttTutor_STATE.isRunning && !ttTutor_STATE.isFinished) {
      setTimeout(() => ttTutor_ELS.inputArea.focus(), 100);
    }
  }

  function ttTutor_handleFullscreenChange() {
    // Handle native fullscreen change events (ESC key, etc.)
    const isNativeFullscreen = !!(document.fullscreenElement || 
                                   document.webkitFullscreenElement || 
                                   document.msFullscreenElement);
    const container = ttTutor_ELS.container;

    if (!isNativeFullscreen && container.classList.contains('ttTutor_fullscreen')) {
      // Native fullscreen exited, also exit widget fullscreen
      container.classList.remove('ttTutor_fullscreen');
      document.body.classList.remove('ttTutor_fullscreenActive');
      ttTutor_ELS.fullscreenIcon.textContent = '⛶';
      ttTutor_ELS.fullscreenToggle.title = 'Toggle Fullscreen';
    }
  }

  // LEADERBOARD
  // ==========================================

  function ttTutor_saveScore(wpm, accuracy) {
    try {
      let scores = JSON.parse(localStorage.getItem('ttTutor_scores') || '[]');
      scores.push({
        wpm: wpm,
        accuracy: accuracy,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
      });
      // Keep top 10
      scores.sort((a, b) => b.wpm - a.wpm);
      scores = scores.slice(0, 10);
      localStorage.setItem('ttTutor_scores', JSON.stringify(scores));
    } catch (e) {
      console.warn('ttTutor: Could not save score', e);
    }
  }

  function ttTutor_renderLeaderboard() {
    try {
      const scores = JSON.parse(localStorage.getItem('ttTutor_scores') || '[]');

      if (scores.length === 0) {
        ttTutor_ELS.leaderboardList.innerHTML = '<div class="ttTutor_leaderboardEmpty">No scores yet. Complete a test to see your high scores!</div>';
        return;
      }

      let html = '';
      scores.forEach((score, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '•';
        html += `
          <div class="ttTutor_leaderboardItem">
            <span class="ttTutor_leaderboardRank">${medal} #${index + 1}</span>
            <span class="ttTutor_leaderboardWpm">${score.wpm} WPM</span>
            <span class="ttTutor_leaderboardDate">${score.accuracy}% · ${score.date}</span>
          </div>
        `;
      });

      ttTutor_ELS.leaderboardList.innerHTML = html;
    } catch (e) {
      console.warn('ttTutor: Could not render leaderboard', e);
    }
  }

  // ==========================================
  // FEEDBACK MESSAGES
  // ==========================================

  let ttTutor_feedbackTimeout;

  function ttTutor_showFeedback(message, type) {
    const fb = ttTutor_ELS.feedback;
    fb.textContent = message;
    fb.className = 'ttTutor_feedback ttTutor_show ttTutor_' + type;

    clearTimeout(ttTutor_feedbackTimeout);
    ttTutor_feedbackTimeout = setTimeout(() => {
      fb.classList.remove('ttTutor_show');
    }, 3000);
  }

  // ==========================================
  // INITIALIZE ON DOM READY
  // ==========================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ttTutor_init);
  } else {
    ttTutor_init();
  }

})();