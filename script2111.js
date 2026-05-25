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

            // --- Read Configuration from HTML Data Attributes ---
            const tmxRootElement = document.getElementById('tmx_root_wrapper');
            
            const tmxConfig = {
                tmxTargetUrl: tmxRootElement.getAttribute('data-tmx-target-url') || 'https://www.pashtomedium.com',
                tmxFirstTimerDuration: parseInt(tmxRootElement.getAttribute('data-tmx-first-timer'), 10) || 30,
                tmxSecondTimerDuration: 10
            };

            // --- State Variables ---
            let tmxFirstIntervalId = null;
            let tmxSecondIntervalId = null;
            let tmxIsFirstCountdownActive = false;
            let tmxIsSecondCountdownActive = false;

            // --- DOM Element References ---
            const tmxElBtnStepOne = document.getElementById('tmx_btn_step_one');
            const tmxElBtnStepTwo = document.getElementById('tmx_btn_step_two');
            const tmxElLabelStepOne = document.getElementById('tmx_btn_label_step_one');
            const tmxElLabelStepTwo = document.getElementById('tmx_btn_label_step_two');
            const tmxElBannerStepOne = document.getElementById('tmx_banner_step_one');
            const tmxElBannerStepTwo = document.getElementById('tmx_banner_step_two');
            const tmxElTextStepOne = document.getElementById('tmx_text_step_one');
            const tmxElTextStepTwo = document.getElementById('tmx_text_step_two');
            const tmxElNotificationSuccess = document.getElementById('tmx_notification_success');
            const tmxElStepTwoContainer = document.getElementById('tmx_step_two_container');

            // --- Utility Functions ---

            function tmxUpdateProgressBar(tmxBannerElement, tmxRemainingSeconds, tmxTotalSeconds) {
                const tmxProgressPercentage = (tmxRemainingSeconds / tmxTotalSeconds) * 100;
                tmxBannerElement.style.setProperty('--tmx-progress-width', tmxProgressPercentage + '%');
            }

            function tmxScrollToStepTwo() {
                if (tmxElStepTwoContainer && typeof tmxElStepTwoContainer.scrollIntoView === 'function') {
                    tmxElStepTwoContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }

            function tmxOpenTargetLink() {
                const tmxAnchorElement = document.createElement('a');
                tmxAnchorElement.href = tmxConfig.tmxTargetUrl;
                tmxAnchorElement.target = '_self'';
                tmxAnchorElement.rel = 'nofollow noopener noreferrer';
                tmxAnchorElement.style.display = 'none';
                
                document.body.appendChild(tmxAnchorElement);
                tmxAnchorElement.click();
                
                setTimeout(function() {
                    if (tmxAnchorElement.parentNode) {
                        tmxAnchorElement.parentNode.removeChild(tmxAnchorElement);
                    }
                }, 100);
            }

            // --- Step One Handler ---

            window.tmxHandleStepOneClick = function() {
                if (tmxIsFirstCountdownActive) {
                    return;
                }

                tmxIsFirstCountdownActive = true;
                tmxElBtnStepOne.disabled = true;
                tmxElLabelStepOne.textContent = 'Processing...';
                tmxElBannerStepOne.classList.add('tmx-is-visible');

                let tmxRemainingTime = tmxConfig.tmxFirstTimerDuration;
                tmxUpdateProgressBar(tmxElBannerStepOne, tmxRemainingTime, tmxConfig.tmxFirstTimerDuration);
                tmxElTextStepOne.textContent = 'Please wait: ' + tmxRemainingTime + ' seconds remaining';

                tmxFirstIntervalId = setInterval(function() {
                    tmxRemainingTime--;
                    tmxUpdateProgressBar(tmxElBannerStepOne, tmxRemainingTime, tmxConfig.tmxFirstTimerDuration);

                    if (tmxRemainingTime > 0) {
                        const tmxPluralSuffix = tmxRemainingTime !== 1 ? 's' : '';
                        tmxElTextStepOne.textContent = 'Please wait: ' + tmxRemainingTime + ' second' + tmxPluralSuffix + ' remaining';
                    } else {
                        clearInterval(tmxFirstIntervalId);
                        tmxFirstIntervalId = null;
                        tmxCompleteStepOne();
                    }
                }, 1000);
            };

            function tmxCompleteStepOne() {
                tmxElTextStepOne.textContent = '✅ Verification complete!';
                tmxElBannerStepOne.classList.remove('tmx-state-primary');
                tmxElBannerStepOne.classList.add('tmx-state-success');

                tmxElBtnStepOne.classList.remove('tmx-variant-primary');
                tmxElBtnStepOne.classList.add('tmx-variant-completed');
                tmxElLabelStepOne.textContent = 'Completed';

                setTimeout(function() {
                    tmxElBtnStepTwo.disabled = false;
                    tmxScrollToStepTwo();
                }, 600);
            }

            // --- Step Two Handler ---

            window.tmxHandleStepTwoClick = function() {
                if (tmxIsSecondCountdownActive) {
                    return;
                }

                tmxIsSecondCountdownActive = true;
                tmxElBtnStepTwo.disabled = true;
                tmxElLabelStepTwo.textContent = 'Opening link...';
                tmxElBannerStepTwo.classList.add('tmx-is-visible');

                let tmxRemainingTime = tmxConfig.tmxSecondTimerDuration;
                tmxUpdateProgressBar(tmxElBannerStepTwo, tmxRemainingTime, tmxConfig.tmxSecondTimerDuration);
                tmxElTextStepTwo.textContent = 'Please wait, opening link in ' + tmxRemainingTime + ' seconds…';

                tmxSecondIntervalId = setInterval(function() {
                    tmxRemainingTime--;
                    tmxUpdateProgressBar(tmxElBannerStepTwo, tmxRemainingTime, tmxConfig.tmxSecondTimerDuration);

                    if (tmxRemainingTime > 0) {
                        const tmxPluralSuffix = tmxRemainingTime !== 1 ? 's' : '';
                        tmxElTextStepTwo.textContent = 'Please wait, opening link in ' + tmxRemainingTime + ' second' + tmxPluralSuffix + '…';
                    } else {
                        clearInterval(tmxSecondIntervalId);
                        tmxSecondIntervalId = null;
                        tmxCompleteStepTwo();
                    }
                }, 1000);
            };

            function tmxCompleteStepTwo() {
                tmxElBannerStepTwo.classList.remove('tmx-is-visible');
                tmxElNotificationSuccess.classList.add('tmx-is-visible');

                tmxOpenTargetLink();

                tmxElLabelStepTwo.textContent = 'Link Opened!';

                setTimeout(function() {
                    tmxElNotificationSuccess.classList.remove('tmx-is-visible');
                    tmxElLabelStepTwo.textContent = 'Open Link Again';
                    tmxElBtnStepTwo.disabled = false;
                    tmxIsSecondCountdownActive = false;
                }, 4000);
            }

            // --- Event Safety ---

            if (tmxElBtnStepOne) {
                tmxElBtnStepOne.addEventListener('dblclick', function(tmxEvent) {
                    tmxEvent.preventDefault();
                    tmxEvent.stopPropagation();
                });
            }

            if (tmxElBtnStepTwo) {
                tmxElBtnStepTwo.addEventListener('dblclick', function(tmxEvent) {
                    tmxEvent.preventDefault();
                    tmxEvent.stopPropagation();
                });
            }

        })();
