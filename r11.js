
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