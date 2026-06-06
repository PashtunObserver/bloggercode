// ═══════════════════════════════════════════════════════════════
// PMCODE SYNTAX HIGHLIGHTER WIDGET - JAVASCRIPT
// Version: 2.0
// Description: Parser and renderer for PMCODE Blogger Widget
// Host this on GitHub and link in your Blogger theme
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // Prevent double initialization
  if (window.__pmcode_initialized) return;
  window.__pmcode_initialized = true;

  // ─── Configuration ───
  var PMCODE_CONFIG = {
    shortcodeOpen: '[PMCODE',
    shortcodeClose: '[/PMCODE]',
    supportedLangs: ['js', 'javascript', 'css', 'html', 'htm'],
    jsKeywords: ['async','await','break','case','catch','class','const','continue','debugger','default','delete','do','else','export','extends','finally','for','function','if','import','in','instanceof','let','new','return','super','switch','this','throw','try','typeof','var','void','while','with','yield','static','get','set','of','from'],
    cssKeywords: ['@media','@import','@keyframes','@font-face','@supports','@layer'],
    htmlKeywords: ['DOCTYPE'],
    commonKeywords: ['true','false','null','undefined','NaN','Infinity'],
    jsFunctions: ['console','log','error','warn','info','alert','prompt','confirm','setTimeout','setInterval','clearTimeout','clearInterval','fetch','JSON','parse','stringify','Math','Array','Object','String','Number','Boolean','Date','RegExp','Promise','Map','Set','WeakMap','WeakSet','Symbol','parseInt','parseFloat','isNaN','isFinite','encodeURI','decodeURI','encodeURIComponent','decodeURIComponent','eval','escape','unescape'],
    cssFunctions: ['rgb','rgba','hsl','hsla','url','calc','min','max','clamp','var','env','repeat','minmax','fit-content','cubic-bezier','steps','linear-gradient','radial-gradient','conic-gradient','translate','translateX','translateY','translateZ','rotate','rotateX','rotateY','rotateZ','scale','scaleX','scaleY','scaleZ','skew','skewX','skewY','matrix','perspective'],
    htmlFunctions: [],
  };

  // ─── Escape HTML ───
  function pmcode_escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ─── Detect Language ───
  function pmcode_detectLanguage(code) {
    var trimmed = code.trim().toLowerCase();

    // Check for HTML doctype or tags
    if (trimmed.indexOf('<!doctype') === 0 || 
        (trimmed.indexOf('<') === 0 && trimmed.indexOf('>') > 0 && 
         trimmed.indexOf('function') !== 0 && trimmed.indexOf('var') !== 0 &&
         trimmed.indexOf('const') !== 0 && trimmed.indexOf('let') !== 0)) {
      return 'html';
    }

    // Check for CSS selectors/properties
    if (/^[\s]*[.#@*:\[]/.test(trimmed) || 
        (/\{[\s\S]*?\}/.test(trimmed) && 
         /:\s*[^;]+;/.test(trimmed))) {
      return 'css';
    }

    // Check for JS patterns
    if (/\b(function|const|let|var|async|await|=>)\b/.test(trimmed) ||
        /console\.\w+\(/.test(trimmed) ||
        /document\./.test(trimmed) ||
        /window\./.test(trimmed)) {
      return 'js';
    }

    return 'general';
  }

  // ─── Tokenize Code ───
  function pmcode_tokenize(code, lang) {
    var escaped = pmcode_escapeHtml(code);
    var tokens = [];
    var i = 0;
    var len = escaped.length;

    while (i < len) {
      var ch = escaped[i];
      var matched = false;

      // Comments
      if (lang === 'js' || lang === 'general') {
        if (ch === '/' && i + 1 < len) {
          if (escaped[i + 1] === '/') {
            var end = escaped.indexOf('\n', i);
            if (end === -1) end = len;
            tokens.push({type: 'cmt', text: escaped.substring(i, end)});
            i = end;
            matched = true;
          } else if (escaped[i + 1] === '*') {
            var end = escaped.indexOf('*/', i + 2);
            if (end === -1) end = len;
            tokens.push({type: 'cmt', text: escaped.substring(i, end + 2)});
            i = end + 2;
            matched = true;
          }
        }
      }

      if (lang === 'css' || lang === 'html') {
        if (ch === '/' && i + 1 < len && escaped[i + 1] === '*') {
          var end = escaped.indexOf('*/', i + 2);
          if (end === -1) end = len;
          tokens.push({type: 'cmt', text: escaped.substring(i, end + 2)});
          i = end + 2;
          matched = true;
        }
      }

      if (lang === 'html') {
        if (ch === '<' && i + 3 < len && escaped.substring(i, i + 4) === '&lt;!') {
          var end = escaped.indexOf('--&gt;', i);
          if (end !== -1) {
            tokens.push({type: 'cmt', text: escaped.substring(i, end + 6)});
            i = end + 6;
            matched = true;
          }
        }
      }

      // Strings
      if (!matched && (ch === '"' || ch === "'" || ch === '`')) {
        var quote = ch;
        var j = i + 1;
        while (j < len) {
          if (escaped[j] === '\\') {
            j += 2;
          } else if (escaped[j] === quote) {
            break;
          } else {
            j++;
          }
        }
        tokens.push({type: 'str', text: escaped.substring(i, j + 1)});
        i = j + 1;
        matched = true;
      }

      // Numbers
      if (!matched && /[0-9]/.test(ch)) {
        var j = i;
        while (j < len && (/[0-9.]/.test(escaped[j]) || 
               (j === i + 1 && escaped[j] === 'x') ||
               (j > i && /[a-fA-F0-9]/.test(escaped[j]) && /0x/i.test(escaped.substring(i, i+2))))) {
          j++;
        }
        if (j > i && !/[a-zA-Z_]/.test(escaped[j] || '')) {
          tokens.push({type: 'num', text: escaped.substring(i, j)});
          i = j;
          matched = true;
        }
      }

      // Words (keywords, functions, variables)
      if (!matched && /[a-zA-Z_]/.test(ch)) {
        var j = i;
        while (j < len && /[a-zA-Z0-9_]/.test(escaped[j])) j++;
        var word = escaped.substring(i, j);
        var wordLower = word.toLowerCase();

        if (lang === 'js') {
          if (PMCODE_CONFIG.jsKeywords.indexOf(wordLower) !== -1 || 
              PMCODE_CONFIG.commonKeywords.indexOf(wordLower) !== -1) {
            tokens.push({type: 'kw', text: word});
          } else if (PMCODE_CONFIG.jsFunctions.indexOf(wordLower) !== -1 ||
                     (j < len && escaped[j] === '(')) {
            tokens.push({type: 'func', text: word});
          } else if (/^[A-Z]/.test(word) && word.length > 1) {
            tokens.push({type: 'cls', text: word});
          } else {
            tokens.push({type: 'var', text: word});
          }
        } else if (lang === 'css') {
          if (PMCODE_CONFIG.cssKeywords.some(function(k) { return wordLower.indexOf(k.replace('@','')) !== -1; }) ||
              wordLower === 'important') {
            tokens.push({type: 'kw', text: word});
          } else if (PMCODE_CONFIG.cssFunctions.indexOf(wordLower) !== -1 ||
                     (j < len && escaped[j] === '(')) {
            tokens.push({type: 'func', text: word});
          } else if (escaped.substring(j).trim().indexOf(':') === 0) {
            tokens.push({type: 'prop', text: word});
          } else {
            tokens.push({type: 'var', text: word});
          }
        } else if (lang === 'html') {
          if (PMCODE_CONFIG.htmlKeywords.indexOf(wordLower) !== -1) {
            tokens.push({type: 'kw', text: word});
          } else if (/^[A-Z]/.test(word)) {
            tokens.push({type: 'cls', text: word});
          } else {
            tokens.push({type: 'var', text: word});
          }
        } else {
          tokens.push({type: 'var', text: word});
        }
        i = j;
        matched = true;
      }

      // Operators and punctuation
      if (!matched) {
        if (/[+\-*/%=<>!&|^~?:]/.test(ch)) {
          var j = i;
          while (j < len && /[+\-*/%=<>!&|^~?:]/.test(escaped[j])) j++;
          tokens.push({type: 'op', text: escaped.substring(i, j)});
          i = j;
          matched = true;
        } else if (/[{}()\[\];,.]/.test(ch)) {
          tokens.push({type: 'punc', text: ch});
          i++;
          matched = true;
        } else {
          tokens.push({type: 'text', text: ch});
          i++;
          matched = true;
        }
      }
    }

    return tokens;
  }

  // ─── Render Highlighted Code ───
  function pmcode_highlight(code, lang) {
    var tokens = pmcode_tokenize(code, lang);
    var html = '';
    for (var t = 0; t < tokens.length; t++) {
      var token = tokens[t];
      if (token.type === 'text') {
        html += token.text;
      } else {
        html += '<span class="pmcode-' + token.type + '">' + token.text + '</span>';
      }
    }
    return html;
  }

  // ─── Generate Line Numbers ───
  function pmcode_generateLineNumbers(code) {
    var lines = code.split('\n');
    var html = '';
    for (var i = 0; i < lines.length; i++) {
      html += '<span>' + (i + 1) + '</span>';
    }
    return html;
  }

  // ─── Generate Unique ID ───
  function pmcode_generateId() {
    return 'pmcode-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // ─── Copy to Clipboard ───
  function pmcode_copyToClipboard(btn, codeText) {
    var id = btn.getAttribute('data-pmcode-id');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(codeText).then(function() {
        pmcode_showCopied(btn);
      }).catch(function() {
        pmcode_fallbackCopy(btn, codeText);
      });
    } else {
      pmcode_fallbackCopy(btn, codeText);
    }
  }

  function pmcode_fallbackCopy(btn, text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      pmcode_showCopied(btn);
    } catch (e) {
      console.error('PMCODE: Copy failed', e);
    }
    document.body.removeChild(textarea);
  }

  function pmcode_showCopied(btn) {
    var originalHTML = btn.innerHTML;
    btn.classList.add('pmcode-copied');
    btn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';

    setTimeout(function() {
      btn.classList.remove('pmcode-copied');
      btn.innerHTML = originalHTML;
    }, 2000);
  }

  // ─── Parse Shortcodes ───
  function pmcode_parseShortcodes() {
    var posts = document.querySelectorAll('.post-body, .entry-content, .post-content, article, .blog-posts');

    posts.forEach(function(post) {
      var html = post.innerHTML;
      var regex = /\[PMCODE\s*([^\]]*)\]([\s\S]*?)\[\/PMCODE\]/gi;
      var match;
      var replacements = [];

      while ((match = regex.exec(html)) !== null) {
        var attrs = match[1].trim();
        var code = match[2];
        var lang = 'general';
        var filename = '';

        // Parse attributes
        var langMatch = attrs.match(/lang\s*=\s*["']?([^"'\s]+)["']?/i);
        if (langMatch) {
          lang = langMatch[1].toLowerCase();
          if (lang === 'javascript' || lang === 'js') lang = 'js';
          if (lang === 'htm') lang = 'html';
        }

        var fileMatch = attrs.match(/file\s*=\s*["']?([^"']+)["']?/i);
        if (fileMatch) {
          filename = fileMatch[1];
        }

        // Auto-detect if no lang specified
        if (!langMatch && lang === 'general') {
          lang = pmcode_detectLanguage(code);
        }

        // Validate lang
        if (PMCODE_CONFIG.supportedLangs.indexOf(lang) === -1) {
          lang = 'general';
        }

        var id = pmcode_generateId();
        var lineNumbers = pmcode_generateLineNumbers(code);
        var highlighted = pmcode_highlight(code, lang);
        var badgeClass = 'pmcode-badge-' + lang;
        var badgeText = lang === 'js' ? 'JS' : (lang === 'css' ? 'CSS' : (lang === 'html' ? 'HTML' : 'CODE'));
        var displayFilename = filename || (lang === 'js' ? 'script.js' : (lang === 'css' ? 'styles.css' : (lang === 'html' ? 'index.html' : 'code.txt')));

        var widgetHTML = 
          '<div class="pmcode-block">' +
            '<div class="pmcode-card">' +
              '<div class="pmcode-header">' +
                '<div class="pmcode-header-left">' +
                  '<div class="pmcode-dots">' +
                    '<span class="pmcode-dot pmcode-dot-red"></span>' +
                    '<span class="pmcode-dot pmcode-dot-yellow"></span>' +
                    '<span class="pmcode-dot pmcode-dot-green"></span>' +
                  '</div>' +
                  '<span class="pmcode-badge ' + badgeClass + '">' + badgeText + '</span>' +
                  '<span class="pmcode-filename">' + displayFilename + '</span>' +
                '</div>' +
                '<button class="pmcode-copy-btn" data-pmcode-id="' + id + '" title="Copy to clipboard">' +
                  '<i class="far fa-copy"></i><span>Copy</span>' +
                '</button>' +
              '</div>' +
              '<div class="pmcode-body">' +
                '<div class="pmcode-linenumbers">' + lineNumbers + '</div>' +
                '<div class="pmcode-content pmcode-' + lang + '">' +
                  '<pre><code>' + highlighted + '</code></pre>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';

        replacements.push({
          original: match[0],
          html: widgetHTML,
          code: code,
          id: id
        });
      }

      // Apply replacements
      var newHTML = html;
      replacements.forEach(function(rep) {
        newHTML = newHTML.replace(rep.original, rep.html);
      });

      if (newHTML !== html) {
        post.innerHTML = newHTML;

        // Attach copy handlers
        replacements.forEach(function(rep) {
          var btn = document.querySelector('[data-pmcode-id="' + rep.id + '"]');
          if (btn) {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              pmcode_copyToClipboard(btn, rep.code);
            });
          }
        });
      }
    });
  }

  // ─── Initialize ───
  function pmcode_init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', pmcode_parseShortcodes);
    } else {
      pmcode_parseShortcodes();
    }
  }

  // Run initialization
  pmcode_init();

})();