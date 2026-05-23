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

<script>
// ============================================
// PORTFOLIO WIDGET JAVASCRIPT
// Prefix: portUI_
// Fully scoped, no global namespace pollution
// ============================================

(function() {
  'use strict';

  // --- Project Data Array ---
  // Easy to extend: just add more objects to this array
  var portUI_projects = [
    {
      title: "E-Commerce Dashboard",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      demo: "https://example.com/demo1",
      contact: "mailto:youremail@example.com?subject=Interested%20in%20E-Commerce%20Dashboard",
      category: "web",
      overlay: "React + Node.js Dashboard"
    },
    {
      title: "Fitness Tracker App",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop",
      demo: "https://example.com/demo2",
      contact: "https://wa.me/1234567890?text=Hi,%20I%20am%20interested%20in%20your%20Fitness%20Tracker%20App",
      category: "app",
      overlay: "React Native Mobile App"
    },
    {
      title: "Travel Booking UI",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
      demo: "https://example.com/demo3",
      contact: "mailto:youremail@example.com?subject=Interested%20in%20Travel%20Booking%20UI",
      category: "uiux",
      overlay: "Figma + Prototype"
    },
    {
      title: "Crypto Portfolio",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      demo: "https://example.com/demo4",
      contact: "https://wa.me/1234567890?text=Hi,%20I%20am%20interested%20in%20your%20Crypto%20Portfolio",
      category: "web",
      overlay: "Vue.js + Web3 Integration"
    },
    {
      title: "Food Delivery App",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      demo: "https://example.com/demo5",
      contact: "mailto:youremail@example.com?subject=Interested%20in%20Food%20Delivery%20App",
      category: "app",
      overlay: "Flutter Cross-Platform"
    },
    {
      title: "SaaS Landing Page",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      demo: "https://example.com/demo6",
      contact: "https://wa.me/1234567890?text=Hi,%20I%20am%20interested%20in%20your%20SaaS%20Landing%20Page",
      category: "uiux",
      overlay: "HTML/CSS + Animations"
    }
  ];

  // --- State Variables ---
  var portUI_currentFilter = 'all';
  var portUI_visibleCount = 6; // Show all initially
  var portUI_totalProjects = portUI_projects.length;

  // --- DOM Element References ---
  var portUI_grid = document.getElementById('portUI_projectsGrid');
  var portUI_filterBtns = document.querySelectorAll('.portUI_filterBtn');
  var portUI_loadMoreBtn = document.getElementById('portUI_loadMoreBtn');
  var portUI_toast = document.getElementById('portUI_toast');
  var portUI_toastMsg = document.getElementById('portUI_toastMsg');
  var portUI_toastTimer = null;

  // ============================================
  // FUNCTION: Render Projects to Grid
  // ============================================
  function portUI_renderProjects() {
    // Clear existing content
    portUI_grid.innerHTML = '';

    // Filter projects based on active category
    var portUI_filtered = portUI_projects.filter(function(proj) {
      return portUI_currentFilter === 'all' || proj.category === portUI_currentFilter;
    });

    // Limit to visible count
    var portUI_display = portUI_filtered.slice(0, portUI_visibleCount);

    // Generate HTML for each project card
    portUI_display.forEach(function(proj, index) {
      var portUI_card = document.createElement('div');
      portUI_card.className = 'portUI_card';
      portUI_card.setAttribute('data-category', proj.category);

      // Determine contact button behavior
      var portUI_isMailto = proj.contact.indexOf('mailto:') === 0;
      var portUI_contactTarget = portUI_isMailto ? '_self' : '_blank';

      portUI_card.innerHTML = 
        '<div class="portUI_badge">' + proj.category + '</div>' +
        '<div class="portUI_imgWrap">' +
          '<img src="' + proj.image + '" alt="' + proj.title + '" loading="lazy">' +
          '<div class="portUI_overlay">' +
            '<p class="portUI_overlayText">' + proj.overlay + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="portUI_content">' +
          '<h3 class="portUI_cardTitle">' + proj.title + '</h3>' +
          '<div class="portUI_btnWrap">' +
            '<a href="' + proj.demo + '" target="_blank" class="portUI_btn portUI_btnDemo" onclick="portUI_showToast(\'Opening demo in new tab...\')">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>' +
              'View Demo' +
            '</a>' +
            '<a href="' + proj.contact + '" target="' + portUI_contactTarget + '" class="portUI_btn portUI_btnContact" onclick="portUI_showToast(\'Opening contact link...\')">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>' +
              'Contact' +
            '</a>' +
          '</div>' +
        '</div>';

      portUI_grid.appendChild(portUI_card);
    });

    // Update Load More button visibility
    portUI_updateLoadMoreBtn(portUI_filtered.length);

    // Trigger scroll animations
    setTimeout(portUI_animateOnScroll, 50);
  }

  // ============================================
  // FUNCTION: Update Load More Button State
  // ============================================
  function portUI_updateLoadMoreBtn(totalFiltered) {
    if (portUI_visibleCount >= totalFiltered) {
      portUI_loadMoreBtn.classList.add('portUI_disabled');
      portUI_loadMoreBtn.textContent = 'No More Projects';
    } else {
      portUI_loadMoreBtn.classList.remove('portUI_disabled');
      portUI_loadMoreBtn.textContent = 'Load More Projects';
    }
  }

  // ============================================
  // FUNCTION: Filter Button Click Handler
  // ============================================
  function portUI_handleFilterClick(e) {
    var portUI_btn = e.target;
    var portUI_filter = portUI_btn.getAttribute('data-filter');

    // Update active state
    portUI_filterBtns.forEach(function(b) {
      b.classList.remove('portUI_active');
    });
    portUI_btn.classList.add('portUI_active');

    // Update filter and reset visible count
    portUI_currentFilter = portUI_filter;
    portUI_visibleCount = 6;

    // Re-render with animation
    portUI_renderProjects();

    // Show toast
    var portUI_categoryName = portUI_filter === 'all' ? 'All' : portUI_filter.toUpperCase();
    portUI_showToast('Showing ' + portUI_categoryName + ' projects');
  }

  // ============================================
  // FUNCTION: Load More Button Handler
  // ============================================
  function portUI_handleLoadMore() {
    if (portUI_loadMoreBtn.classList.contains('portUI_disabled')) return;

    portUI_visibleCount += 3;
    portUI_renderProjects();
    portUI_showToast('Loading more projects...');
  }

  // ============================================
  // FUNCTION: Show Toast Notification
  // ============================================
  window.portUI_showToast = function(message) {
    portUI_toastMsg.textContent = message;
    portUI_toast.classList.add('portUI_show');

    // Clear existing timer
    if (portUI_toastTimer) {
      clearTimeout(portUI_toastTimer);
    }

    // Hide after 2.5 seconds
    portUI_toastTimer = setTimeout(function() {
      portUI_toast.classList.remove('portUI_show');
    }, 2500);
  };

  // ============================================
  // FUNCTION: Scroll Animation Observer
  // ============================================
  function portUI_animateOnScroll() {
    var portUI_cards = document.querySelectorAll('.portUI_card');
    var portUI_observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, idx) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.classList.add('portUI_visible');
          }, idx * 100); // Staggered animation
          portUI_observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    portUI_cards.forEach(function(card) {
      portUI_observer.observe(card);
    });
  }

  // ============================================
  // FUNCTION: Initialize Widget
  // ============================================
  function portUI_init() {
    // Render initial projects
    portUI_renderProjects();

    // Attach filter button listeners
    portUI_filterBtns.forEach(function(btn) {
      btn.addEventListener('click', portUI_handleFilterClick);
    });

    // Attach load more listener
    portUI_loadMoreBtn.addEventListener('click', portUI_handleLoadMore);

    // Re-trigger scroll animation on window scroll
    window.addEventListener('scroll', function() {
      portUI_animateOnScroll();
    });
  }

  // ============================================
  // RUN: Start the widget when DOM is ready
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', portUI_init);
  } else {
    portUI_init();
  }

})();
</script>