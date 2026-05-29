/**
 * ForumX Q&A Section — External JavaScript
 * All functions prefixed with forumx_ to avoid global conflicts.
 * No inline JS. All buttons redirect to the contact page.
 */

(function () {
  'use strict';

  var FORUMX_CONTACT_URL = 'https://www.blogger.com/followers/follow/1067707381214253957?hl=en-GB';

  /**
   * Initialize all ForumX interactive elements.
   */
  function forumx_init() {
    forumx_attachRedirectHandlers();
    forumx_animateAnswersOnLoad();
  }

  /**
   * Attach click handlers to all buttons that need to redirect.
   * Covers: Ask a Question, Reply, Like, Unlike.
   */
  function forumx_attachRedirectHandlers() {
    var buttons = document.querySelectorAll(
      '.forumx-btn--ask, .forumx-btn--reply, .forumx-btn--like, .forumx-btn--unlike'
    );

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        forumx_redirectToContact();
      });
    });
  }

  /**
   * Redirect the user to the contact page.
   */
  function forumx_redirectToContact() {
    window.location.href = FORUMX_CONTACT_URL;
  }

  /**
   * Trigger staggered fade-in animation for answer cards.
   */
  function forumx_animateAnswersOnLoad() {
    var cards = document.querySelectorAll('.forumx-answer');
    cards.forEach(function (card, index) {
      card.style.animationDelay = (0.1 + index * 0.15) + 's';
    });
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forumx_init);
  } else {
    forumx_init();
  }

  // Expose init for manual re-init (e.g. after dynamic content injection)
  window.forumx_init = forumx_init;
})();









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




/* ============================================
   TMX TRENDING TOPICS WIDGET JS
   Version: 1.0.0
   IIFE Wrapped — No Global Variables
   ============================================ */

(function() {
  'use strict';

  // --- Unique Namespace ---
  const TMX_NS = 'tmxTW_';

  // --- Configuration ---
  const TMX_CONFIG = {
    widgetId: 'tmxTrendWidget_container',
    animationClass: 'tmxTW_animateIn',
    storageKey: 'tmxTW_closedTopics',
    trackClicks: true
  };

  // --- Private Helper Functions ---
  
  function tmxTW_getWidget() {
    return document.getElementById(TMX_CONFIG.widgetId);
  }

  function tmxTW_getItems() {
    const widget = tmxTW_getWidget();
    if (!widget) return [];
    return widget.querySelectorAll('.' + TMX_NS + 'item');
  }

  function tmxTW_triggerAnimation() {
    const widget = tmxTW_getWidget();
    if (!widget) return;
    
    // Use IntersectionObserver for performance
    const tmxTW_observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          widget.classList.add(TMX_CONFIG.animationClass);
          tmxTW_observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    
    tmxTW_observer.observe(widget);
  }

  function tmxTW_handleClick(event) {
    const item = event.currentTarget;
    const rank = item.getAttribute('data-tmx-rank');
    const topic = item.querySelector('.' + TMX_NS + 'topic');
    const topicName = topic ? topic.textContent.trim() : '';

    // Track interaction (console only — no external analytics)
    if (TMX_CONFIG.trackClicks && window.console) {
      console.log('[TMX Trending] Clicked: #' + rank + ' — ' + topicName);
    }

    // Optional: Store clicked topic in sessionStorage
    try {
      let clicked = JSON.parse(sessionStorage.getItem(TMX_CONFIG.storageKey) || '[]');
      if (!clicked.includes(rank)) {
        clicked.push(rank);
        sessionStorage.setItem(TMX_CONFIG.storageKey, JSON.stringify(clicked));
      }
    } catch (e) {
      // Silently fail if storage unavailable
    }
  }

  function tmxTW_attachListeners() {
    const items = tmxTW_getItems();
    items.forEach(function(item) {
      item.addEventListener('click', tmxTW_handleClick);
      
      // Accessibility: Enter key support
      item.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          item.click();
        }
      });
    });
  }

  function tmxTW_init() {
    const widget = tmxTW_getWidget();
    if (!widget) {
      console.warn('[TMX Trending] Widget container not found. ID expected: ' + TMX_CONFIG.widgetId);
      return;
    }

    // Add ARIA roles for accessibility
    widget.setAttribute('role', 'complementary');
    widget.setAttribute('aria-label', 'Trending Topics Widget');

    tmxTW_attachListeners();
    tmxTW_triggerAnimation();

    // Expose minimal API for external use (optional)
    window.tmxTrendingAPI = {
      refresh: tmxTW_triggerAnimation,
      getClicked: function() {
        try {
          return JSON.parse(sessionStorage.getItem(TMX_CONFIG.storageKey) || '[]');
        } catch (e) {
          return [];
        }
      }
    };
  }

  // --- Initialize on DOM Ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tmxTW_init);
  } else {
    tmxTW_init();
  }

})();




/* ============================================
   Author Profile Widget JavaScript
   Namespaced as APW to avoid conflicts
   ============================================ */

(function() {
    'use strict';

    // Namespace
    window.APW = window.APW || {};

    // Initialize widget
    APW.init = function() {
        var widgets = document.querySelectorAll('.apw-widget');

        widgets.forEach(function(widget) {
            var followBtn = widget.querySelector('.apw-follow-btn');

            if (followBtn) {
                followBtn.addEventListener('click', function(e) {
                    // Custom event for tracking
                    var event = new CustomEvent('apw:followClick', {
                        detail: { widget: widget }
                    });
                    document.dispatchEvent(event);
                });
            }

            // Social icon hover effects (optional enhancement)
            var socialIcons = widget.querySelectorAll('.apw-social-icon');
            socialIcons.forEach(function(icon) {
                icon.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                });
                icon.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        });
    };

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', APW.init);
    } else {
        APW.init();
    }

})();


/* ============================================
WEATHER WIDGET - BLOGGER SAFE JS
   ============================================ */
(function() {
    'use strict';

    // Scoped variables - no globals
    const weatherApiKey = 'b56d79dc3aa5418699182727262705';
    const weatherApiUrl = 'https://api.weatherapi.com/v1/current.json?key=';

    // Find all widget containers on the page
    const containers = document.querySelectorAll('.kw-weather-widget-container');

    if (containers.length === 0) {
        console.warn('Kimi Weather Widget: No .kw-weather-widget-container found on page.');
        return;
    }

    // Initialize each widget instance
    containers.forEach(function(container) {
        initWidget(container);
    });

    function initWidget(container) {
        const card = container.querySelector('.kw-weather-card');
        if (!card) {
            console.warn('Kimi Weather Widget: .kw-weather-card not found inside container.');
            return;
        }

        // Read default city from data attribute, fallback to 'Shangla'
        const defaultCity = container.getAttribute('data-city') || 'Shangla';

        // Show loading state
        card.innerHTML = `
            <div class="kw-loading">
                <div class="kw-spinner"></div>
                <p>Loading weather...</p>
            </div>
        `;

        loadWeather(defaultCity, card);
    }

    async function loadWeather(city, card) {
        card.innerHTML = `
            <div class="kw-loading">
                <div class="kw-spinner"></div>
                <p>Loading ${city}...</p>
            </div>
        `;

        try {
            const currentUrl = `${weatherApiUrl}${weatherApiKey}&q=${encodeURIComponent(city)}&aqi=no`;
            const response = await fetch(currentUrl);

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'Weather fetch failed');
            }

            const data = await response.json();
            render(data, card);

        } catch (error) {
            console.error('Kimi Weather Widget API Error:', error);
            card.innerHTML = `
                <div class="kw-error-msg">
                    ⚠️ ${error.message}<br><br>
                    <small>Click city name to try another location</small>
                </div>
            `;
        }
    }

    function render(data, card) {
        const { location, current } = data;
        const currentCity = location.name;

        card.innerHTML = `
            <div class="kw-weather-badge">Weather</div>

            <div class="kw-main-weather">
                <div class="kw-weather-icon-main">
                    <img src="https:${current.condition.icon}" alt="${current.condition.text}">
                </div>
                <div class="kw-temperature">
                    <span>${Math.round(current.temp_c)}</span><span class="kw-degree"><sup>°C</sup></span>
                </div>
            </div>

            <div class="kw-location-details">
                <div class="kw-location-info">
                    <div class="kw-city-input" contenteditable="true">${location.name}</div>
                    <div class="kw-condition-text">${current.condition.text}</div>
                </div>
                <div class="kw-details-col">
                    <div class="kw-temp-range-row">
                        <span class="kw-arrow-up">↑</span>
                        <span class="kw-temp-high">${Math.round(current.temp_c + 2)}°</span>
                        <span class="kw-temp-separator">_</span>
                        <span class="kw-arrow-down">↓</span>
                        <span class="kw-temp-low">${Math.round(current.temp_c - 2)}°</span>
                    </div>
                    <div class="kw-detail-row">
                        <span class="kw-detail-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#42a5f5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                            </svg>
                        </span>
                        <span>${current.humidity}%</span>
                    </div>
                    <div class="kw-detail-row">
                        <span class="kw-detail-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
                            </svg>
                        </span>
                        <span>${Math.round(current.wind_kph)} km/h</span>
                    </div>
                </div>
            </div>
        `;

        // Attach event listeners to the editable city name
        const cityInput = card.querySelector('.kw-city-input');

        cityInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                cityInput.blur();
                const newCity = cityInput.textContent.trim();
                if (newCity && newCity !== currentCity) {
                    loadWeather(newCity, card);
                }
            }
        });

        cityInput.addEventListener('blur', function() {
            const newCity = cityInput.textContent.trim();
            if (newCity && newCity !== currentCity) {
                loadWeather(newCity, card);
            } else {
                cityInput.textContent = currentCity;
            }
        });
    }
})();




/**
 * RP WIDGET - RELATED POST ENGINE
 * Prefix: rpw_ (Related Post Widget)
 * Version: 2.0
 * Auto-fetches post title & thumbnail from Blogger URL
 */

(function() {
  'use strict';

  // Configuration
  var rpw_config = {
    headingText: 'Related Post',
    errorText: 'Unable to load related post.',
    fallbackImage: 'https://via.placeholder.com/200x150/e2e8f0/94a3b8?text=No+Image',
    maxTitleLength: 80
  };

  // Generate unique callback name
  var rpw_callbackCounter = 0;
  function rpw_generateCallbackName() {
    rpw_callbackCounter++;
    return 'rpw_cb_' + Date.now() + '_' + rpw_callbackCounter;
  }

  // Utility: Create element
  function rpw_createElement(tag, className, innerHTML) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML !== undefined) el.innerHTML = innerHTML;
    return el;
  }

  // Utility: Extract blog info from URL
  function rpw_parseBloggerUrl(url) {
    try {
      var urlObj = new URL(url);
      var pathMatch = urlObj.pathname.match(/(\/\d{4}\/\d{2}\/[^\/]+\.html)$/);
      if (!pathMatch) return null;
      return {
        domain: urlObj.hostname,
        path: pathMatch[1],
        protocol: urlObj.protocol
      };
    } catch (e) {
      return null;
    }
  }

  // Utility: Extract thumbnail from post entry
  function rpw_extractThumbnail(entry) {
    // Try media:thumbnail first
    if (entry.media$thumbnail && entry.media$thumbnail.url) {
      return entry.media$thumbnail.url.replace(/\/s\d+-c\//, '/s320-c/');
    }
    
    // Try to find image in content
    if (entry.content && entry.content.$t) {
      var imgMatch = entry.content.$t.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) return imgMatch[1];
    }
    
    // Try summary
    if (entry.summary && entry.summary.$t) {
      var imgMatch2 = entry.summary.$t.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch2) return imgMatch2[1];
    }
    
    return rpw_config.fallbackImage;
  }

  // Utility: Estimate read time
  function rpw_estimateReadTime(content) {
    if (!content) return '3 min';
    var text = content.replace(/<[^>]+>/g, ' ');
    var wordCount = text.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;
    var minutes = Math.max(1, Math.ceil(wordCount / 200));
    return minutes + ' min read';
  }

  // Utility: Truncate title
  function rpw_truncateTitle(title, maxLen) {
    maxLen = maxLen || rpw_config.maxTitleLength;
    if (!title || title.length <= maxLen) return title || 'Untitled Post';
    return title.substring(0, maxLen).trim() + '...';
  }

  // Utility: Strip HTML tags
  function rpw_stripHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // Show loading skeleton
  function rpw_showLoading(container, heading) {
    container.innerHTML = 
      '<div class="rpw-container">' +
        '<div class="rpw-heading">' + (heading || rpw_config.headingText) + '</div>' +
        '<div class="rpw-loading">' +
          '<div class="rpw-loading-img"></div>' +
          '<div class="rpw-loading-text">' +
            '<div class="rpw-loading-line" style="width:85%"></div>' +
            '<div class="rpw-loading-line" style="width:45%"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Show error
  function rpw_showError(container, message, heading) {
    container.innerHTML = 
      '<div class="rpw-container">' +
        '<div class="rpw-heading">' + (heading || rpw_config.headingText) + '</div>' +
        '<div class="rpw-error">' + (message || rpw_config.errorText) + '</div>' +
      '</div>';
  }

  // Render the widget
  function rpw_renderWidget(container, entry, postUrl, heading) {
    var thumbnail = rpw_extractThumbnail(entry);
    var title = rpw_truncateTitle(entry.title ? entry.title.$t : '');
    
    var contentText = '';
    if (entry.content && entry.content.$t) {
      contentText = entry.content.$t;
    } else if (entry.summary && entry.summary.$t) {
      contentText = entry.summary.$t;
    }
    
    var readTime = rpw_estimateReadTime(contentText);
    
    // Get label/category if available
    var category = '';
    if (entry.category && entry.category.length > 0) {
      category = ' • ' + entry.category[0].term;
    }

    container.innerHTML = 
      '<div class="rpw-container">' +
        '<div class="rpw-heading">' + (heading || rpw_config.headingText) + '</div>' +
        '<a href="' + postUrl + '" class="rpw-card" target="_blank" rel="noopener noreferrer">' +
          '<img class="rpw-thumbnail" src="' + thumbnail + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy" onerror="this.src=\'' + rpw_config.fallbackImage + '\'">' +
          '<div class="rpw-content">' +
            '<div class="rpw-post-title">' + title + '</div>' +
            '<div class="rpw-meta">' + readTime + category + '</div>' +
          '</div>' +
        '</a>' +
      '</div>';
  }

  // Fetch single post data using search by path
  function rpw_fetchPost(container, postUrl) {
    var customHeading = container.getAttribute('data-rpw-heading') || rpw_config.headingText;
    rpw_showLoading(container, customHeading);

    var parsed = rpw_parseBloggerUrl(postUrl);
    if (!parsed) {
      rpw_showError(container, 'Invalid Blogger URL format. URL must end with /YYYY/MM/post-title.html', customHeading);
      return;
    }

    var callbackName = rpw_generateCallbackName();
    
    // Use the posts feed with max-results to search for the post
    // We use the path as a search term or fetch recent posts and filter
    var feedUrl = parsed.protocol + '//' + parsed.domain + 
                  '/feeds/posts/default?alt=json-in-script&max-results=150&callback=' + callbackName;

    // Create global callback
    window[callbackName] = function(data) {
      // Cleanup
      try { delete window[callbackName]; } catch(e) {}
      if (script && script.parentNode) script.parentNode.removeChild(script);

      if (!data || !data.feed || !data.feed.entry || data.feed.entry.length === 0) {
        rpw_showError(container, 'No posts found on this blog.', customHeading);
        return;
      }

      // Find the post by matching URL
      var entries = data.feed.entry;
      var foundEntry = null;
      
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (!entry.link) continue;
        
        for (var j = 0; j < entry.link.length; j++) {
          var link = entry.link[j];
          if (link.rel === 'alternate' && link.href) {
            // Normalize URLs for comparison
            var entryPath = link.href.replace(/^https?:\/\/[^\/]+/, '');
            var targetPath = parsed.path;
            
            if (entryPath === targetPath || link.href === postUrl) {
              foundEntry = entry;
              break;
            }
          }
        }
        if (foundEntry) break;
      }

      if (!foundEntry) {
        rpw_showError(container, 'Post not found. Make sure the URL is correct and the post is published.', customHeading);
        return;
      }

      rpw_renderWidget(container, foundEntry, postUrl, customHeading);
    };

    var script = document.createElement('script');
    script.src = feedUrl;
    script.async = true;
    script.onerror = function() {
      try { delete window[callbackName]; } catch(e) {}
      if (script.parentNode) script.parentNode.removeChild(script);
      rpw_showError(container, 'Network error. Check your internet connection.', customHeading);
    };

    // Set timeout
    var timeoutId = setTimeout(function() {
      try { delete window[callbackName]; } catch(e) {}
      if (script.parentNode) script.parentNode.removeChild(script);
      rpw_showError(container, 'Request timed out. Please refresh the page.', customHeading);
    }, 15000);

    // Override callback to clear timeout
    var originalCallback = window[callbackName];
    window[callbackName] = function(data) {
      clearTimeout(timeoutId);
      originalCallback(data);
    };

    document.head.appendChild(script);
  }

  // Initialize all widgets on page
  function rpw_init() {
    var widgets = document.querySelectorAll('[data-rpw-url]');
    
    if (widgets.length === 0) return;
    
    for (var i = 0; i < widgets.length; i++) {
      (function(widget, index) {
        var postUrl = widget.getAttribute('data-rpw-url');
        
        if (postUrl && postUrl.trim() !== '') {
          // Stagger requests to avoid rate limiting
          setTimeout(function() {
            rpw_fetchPost(widget, postUrl.trim());
          }, index * 300);
        }
      })(widgets[i], i);
    }
  }

  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rpw_init);
  } else {
    rpw_init();
  }

})();




/**
 * TOC WIDGET - MINIMALIST TABLE OF CONTENTS
 * Version: 4.0 - Lightweight & Simple
 */

(function() {
  'use strict';

  var toc_config = {
    containerId: 'toc-widget-root',
    headingText: 'Table of Contents',
    minHeadings: 2,
    headingSelectors: 'h2, h3, h4',
    scrollOffset: 90
  };

  var toc_headings = [];
  var toc_activeId = null;
  var toc_container = null;
  var toc_isClickScrolling = false;
  var toc_clickTimer = null;

  function toc_slug(text, index) {
    return 'toc-' + text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 40) + '-' + index;
  }

  function toc_scrollTo(el) {
    var top = window.pageYOffset + el.getBoundingClientRect().top - toc_config.scrollOffset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function toc_throttle(fn, ms) {
    var t;
    return function() {
      if (!t) {
        fn.apply(this, arguments);
        t = setTimeout(function() { t = null; }, ms);
      }
    };
  }

  function toc_build() {
    toc_container = document.getElementById(toc_config.containerId);
    if (!toc_container) return false;

    var body = toc_container.closest('.post-body, .entry-content, article') ||
               document.querySelector('.post-body, .entry-content') ||
               document.body;

    var all = body.querySelectorAll(toc_config.headingSelectors);
    toc_headings = [];

    for (var i = 0; i < all.length; i++) {
      if (!all[i].closest('#' + toc_config.containerId)) {
        toc_headings.push(all[i]);
      }
    }

    if (toc_headings.length < toc_config.minHeadings) {
      toc_container.style.display = 'none';
      return false;
    }

    for (var j = 0; j < toc_headings.length; j++) {
      if (!toc_headings[j].id) {
        toc_headings[j].id = toc_slug(toc_headings[j].textContent, j);
      }
    }

    return true;
  }

  function toc_render() {
    var title = toc_container.getAttribute('data-toc-heading') || toc_config.headingText;
    var html = '';
    var h2Count = 0;

    for (var i = 0; i < toc_headings.length; i++) {
      var h = toc_headings[i];
      var tag = h.tagName.toLowerCase();
      var num = '';

      if (tag === 'h2') {
        h2Count++;
        num = h2Count;
      }

      html += '<li class="toc-item toc-item-' + tag + '">' +
        '<a href="#' + h.id + '" class="toc-link" data-target="' + h.id + '" data-number="' + num + '">' +
        '<span class="toc-text">' + h.textContent.trim() + '</span></a></li>';
    }

    toc_container.innerHTML =
      '<div class="toc-container">' +
        '<div class="toc-header">' +
          '<span class="toc-icon">☰</span>' +
          '<span class="toc-title">' + title + '</span>' +
          '<span class="toc-badge">' + toc_headings.length + '</span>' +
        '</div>' +
        '<div class="toc-body">' +
          '<ul class="toc-list">' + html + '</ul>' +
        '</div>' +
      '</div>';

    var links = toc_container.querySelectorAll('.toc-link');
    for (var k = 0; k < links.length; k++) {
      links[k].addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.getElementById(this.getAttribute('data-target'));
        if (!target) return;

        toc_isClickScrolling = true;
        if (toc_clickTimer) clearTimeout(toc_clickTimer);

        var prev = toc_container.querySelector('.toc-active');
        if (prev) prev.classList.remove('toc-active');
        this.classList.add('toc-active');
        toc_activeId = this.getAttribute('data-target');

        toc_scrollTo(target);
        if (history.pushState) history.pushState(null, null, '#' + target.id);

        toc_clickTimer = setTimeout(function() { toc_isClickScrolling = false; }, 600);
      });
    }
  }

  function toc_update() {
    if (toc_isClickScrolling) return;

    var pos = window.pageYOffset + toc_config.scrollOffset + 40;
    var found = null;

    for (var i = toc_headings.length - 1; i >= 0; i--) {
      if (toc_headings[i].offsetTop <= pos) {
        found = toc_headings[i];
        break;
      }
    }

    if (found && found.id !== toc_activeId) {
      var prev = toc_container.querySelector('.toc-active');
      if (prev) prev.classList.remove('toc-active');

      var curr = toc_container.querySelector('[data-target="' + found.id + '"]');
      if (curr) curr.classList.add('toc-active');

      toc_activeId = found.id;
    }
  }

  function toc_init() {
    if (!toc_build()) return;
    toc_render();
    window.addEventListener('scroll', toc_throttle(toc_update, 150));
    setTimeout(toc_update, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', toc_init);
  } else {
    toc_init();
  }

})();