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
 * CA WIDGET - CURRENT AFFAIRS ENGINE
 * Prefix: caw_ (Current Affairs Widget)
 * Version: 2.0
 * Fetches recent posts from configurable label
 */

(function() {
  'use strict';

  // Default Configuration
  var caw_config = {
    labelName: 'Current Affairs',
    maxPosts: 5,
    containerId: 'caw-widget-root',
    loadingText: 'Loading posts...',
    errorText: 'Unable to load posts. Please try again later.',
    noPostsText: 'No posts found.',
    fallbackImage: ''
  };

  // Utility: Create element with class
  function caw_createElement(tag, className, innerHTML) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
  }

  // Utility: Extract meta description from content
  function caw_extractDescription(content, maxLength) {
    maxLength = maxLength || 150;
    var text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length > maxLength) {
      text = text.substring(0, maxLength).trim() + '...';
    }
    return text;
  }

  // Utility: Format date
  function caw_formatDate(dateStr) {
    var date = new Date(dateStr);
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Render posts
  function caw_renderPosts(posts) {
    var container = document.getElementById(caw_config.containerId);
    if (!container) return;

    container.innerHTML = '';

    var widget = caw_createElement('div', 'caw-container');
    var grid = caw_createElement('div', 'caw-grid');

    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      var card = caw_createElement('div', 'caw-card');
      var content = caw_createElement('div', 'caw-content');

      // Title
      var title = caw_createElement('h2', '', post.title.$t);

      // Description
      var descText = '';
      if (post.summary && post.summary.$t) {
        descText = caw_extractDescription(post.summary.$t);
      } else if (post.content && post.content.$t) {
        descText = caw_extractDescription(post.content.$t);
      }
      var desc = caw_createElement('p', '', descText);

      // Link
      var linkHref = '#';
      if (post.link) {
        for (var j = 0; j < post.link.length; j++) {
          if (post.link[j].rel === 'alternate') {
            linkHref = post.link[j].href;
            break;
          }
        }
      }

      var btn = caw_createElement('a', 'caw-btn', '→ Read Full Story');
      btn.href = linkHref;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';

      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(btn);
      card.appendChild(content);
      grid.appendChild(card);
    }

    widget.appendChild(grid);
    container.appendChild(widget);
  }

  // Show loading
  function caw_showLoading() {
    var container = document.getElementById(caw_config.containerId);
    if (container) {
      container.innerHTML = '<div class="caw-loading">' + caw_config.loadingText + '</div>';
    }
  }

  // Show error
  function caw_showError(message) {
    var container = document.getElementById(caw_config.containerId);
    if (container) {
      container.innerHTML = '<div class="caw-error">' + (message || caw_config.errorText) + '</div>';
    }
  }

  // Fetch posts using Blogger JSON API
  function caw_fetchPosts() {
    caw_showLoading();

    var blogUrl = window.location.protocol + '//' + window.location.host;
    var feedUrl = blogUrl + '/feeds/posts/default/-/' + 
                  encodeURIComponent(caw_config.labelName) + 
                  '?alt=json-in-script&max-results=' + caw_config.maxPosts + 
                  '&callback=caw_handleFeed';

    var script = document.createElement('script');
    script.src = feedUrl;
    script.onerror = function() {
      caw_showError();
    };

    // Cleanup
    script.onload = function() {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    document.head.appendChild(script);
  }

  // Global callback for JSONP
  window.caw_handleFeed = function(data) {
    if (!data || !data.feed || !data.feed.entry || data.feed.entry.length === 0) {
      caw_showError(caw_config.noPostsText);
      return;
    }

    var posts = data.feed.entry;
    caw_renderPosts(posts);
  };

  // Read configuration from HTML data attributes
  function caw_readConfig() {
    var container = document.getElementById(caw_config.containerId);
    if (container) {
      // Read label name from data-label attribute
      var labelAttr = container.getAttribute('data-label');
      if (labelAttr && labelAttr.trim() !== '') {
        caw_config.labelName = labelAttr.trim();
      }

      // Read max posts from data-max attribute
      var maxAttr = container.getAttribute('data-max');
      if (maxAttr && !isNaN(parseInt(maxAttr))) {
        caw_config.maxPosts = parseInt(maxAttr);
      }
    }
  }

  // Initialize when DOM is ready
  function caw_init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        caw_readConfig();
        caw_fetchPosts();
      });
    } else {
      caw_readConfig();
      caw_fetchPosts();
    }
  }

  // Start
  caw_init();

})();