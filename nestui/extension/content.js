/**
 * Nest UI — Chrome Extension Content Script
 *
 * Injects theme CSS and actively overrides GHL's inline teal styles
 * using a MutationObserver, since CSS alone can't beat inline styles.
 */

(function() {
  var CDN_BASE = 'https://nest-ui-eight.vercel.app';

  // Theme color maps — accent color per theme
  var THEME_COLORS = {
    aurora:   { accent: '#7c5cfc', accentRgb: '124,92,252',  bg: '#f5f4f0', bg1: '#f8f7f4', bg2: '#ffffff', text: '#111110', text2: '#6b6b67', mode: 'light' },
    obsidian: { accent: '#00d4ff', accentRgb: '0,212,255',   bg: '#030508', bg1: '#080c12', bg2: '#0d1420', text: '#e8f4ff', text2: '#7a9bbf', mode: 'dark' },
    forge:    { accent: '#f59e0b', accentRgb: '245,158,11',  bg: '#0f0d0a', bg1: '#151210', bg2: '#1c1814', text: '#fdf4e7', text2: '#a89070', mode: 'dark' },
    phantom:  { accent: '#f0ede8', accentRgb: '240,237,232', bg: '#0a0a0a', bg1: '#111111', bg2: '#181818', text: '#f0ede8', text2: '#888888', mode: 'dark' },
    nova:     { accent: '#a78bfa', accentRgb: '167,139,250', bg: '#0e0b1a', bg1: '#130f22', bg2: '#18132e', text: '#f1eeff', text2: '#8b82b0', mode: 'dark' },
    ember:    { accent: '#e05252', accentRgb: '224,82,82',   bg: '#0c0808', bg1: '#120a0a', bg2: '#1a0e0e', text: '#f5e6d8', text2: '#8a6a5a', mode: 'dark' },
    prism:    { accent: '#6478f0', accentRgb: '100,120,240', bg: '#08090f', bg1: '#0d0f1a', bg2: '#111422', text: '#e2e8f8', text2: '#6b7aaa', mode: 'dark' },
    void:     { accent: '#00ff88', accentRgb: '0,255,136',   bg: '#050505', bg1: '#0a0a0a', bg2: '#0f0f0f', text: '#ffffff', text2: '#666666', mode: 'dark' },
    silk:     { accent: '#3d6b4f', accentRgb: '61,107,79',   bg: '#f7f5f0', bg1: '#f2efe9', bg2: '#fefefe', text: '#1a1a16', text2: '#6b6757', mode: 'light' }
  };

  // Known GHL teal color values to detect and replace
  var TEAL_PATTERNS = [
    /rgb\(\s*0\s*,\s*19[0-9]\s*,/i,
    /rgb\(\s*0\s*,\s*18[0-9]\s*,/i,
    /rgb\(\s*0\s*,\s*15[0-9]\s*,/i,
    /rgb\(\s*23\s*,\s*19[0-9]\s*,/i,
    /rgb\(\s*29\s*,\s*20[0-9]\s*,/i,
    /rgb\(\s*0\s*,\s*20[0-9]\s*,/i,
    /#00bf/i,
    /#17bf/i,
    /#1dc9/i,
    /#36b3/i,
    /#0096/i,
    /#26a6/i,
    /#04cfc/i,
    /#009688/i,
    /#00bfa5/i,
    /#4db6ac/i,
    /#80cbc4/i
  ];

  console.log('[Nest UI] Content script loaded on', window.location.href);

  chrome.storage.sync.get('nestui_api_key', function(result) {
    var key = result.nestui_api_key;
    if (!key) {
      console.log('[Nest UI] No API key configured');
      return;
    }

    console.log('[Nest UI] API key found, detecting location...');

    var locationId = detectLocationId();
    console.log('[Nest UI] Location ID:', locationId);

    chrome.runtime.sendMessage(
      { type: 'FETCH_THEME', key: key, locationId: locationId },
      function(data) {
        if (chrome.runtime.lastError) {
          console.warn('[Nest UI] Message error:', chrome.runtime.lastError.message);
          return;
        }

        if (!data || data.error || !data.themeId) {
          console.warn('[Nest UI] No theme returned:', data);
          return;
        }

        var themeId = data.themeId;
        var colors = THEME_COLORS[themeId];
        if (!colors) {
          console.warn('[Nest UI] Unknown theme:', themeId);
          return;
        }

        console.log('[Nest UI] Applying theme:', themeId, 'source:', data.source);

        // 1. Inject the theme CSS stylesheet
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CDN_BASE + '/themes/' + themeId + '.css';
        link.id = 'nestui-theme';
        document.head.appendChild(link);

        // 2. Add body classes
        document.body.classList.add('nestui-active', 'nestui-' + themeId);

        // 3. Do initial pass to override inline teal styles
        overrideTealStyles(colors);
        removeGHLBranding();

        // 4. Watch for DOM changes — GHL is a SPA, elements get added/changed constantly
        var debounceTimer = null;
        var observer = new MutationObserver(function() {
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(function() {
            overrideTealStyles(colors);
            removeGHLBranding();
          }, 100);
        });
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });

        console.log('[Nest UI] Theme applied and observer active');
      }
    );
  });

  /**
   * Scans all elements for inline teal styles and replaces with theme accent color.
   */
  function overrideTealStyles(colors) {
    var allElements = document.querySelectorAll('[style]');
    var count = 0;

    allElements.forEach(function(el) {
      var style = el.getAttribute('style') || '';
      if (!style) return;

      var isTeal = TEAL_PATTERNS.some(function(pattern) {
        return pattern.test(style);
      });

      if (!isTeal) return;

      // Check what properties have teal values and override them
      var computed = window.getComputedStyle(el);

      // Background color
      var bg = el.style.backgroundColor || '';
      if (bg && isTealColor(bg)) {
        el.style.setProperty('background-color', colors.accent, 'important');
        count++;
      }

      // Background shorthand
      var bgFull = el.style.background || '';
      if (bgFull && isTealColor(bgFull)) {
        el.style.setProperty('background', colors.accent, 'important');
        count++;
      }

      // Text color
      var color = el.style.color || '';
      if (color && isTealColor(color)) {
        el.style.setProperty('color', colors.accent, 'important');
        count++;
      }

      // Border color
      var borderColor = el.style.borderColor || '';
      if (borderColor && isTealColor(borderColor)) {
        el.style.setProperty('border-color', colors.accent, 'important');
        count++;
      }

      // Border shorthand parts
      var borderTop = el.style.borderTopColor || '';
      var borderBottom = el.style.borderBottomColor || '';
      var borderLeft = el.style.borderLeftColor || '';
      var borderRight = el.style.borderRightColor || '';
      [borderTop, borderBottom, borderLeft, borderRight].forEach(function(bc, i) {
        if (bc && isTealColor(bc)) {
          var prop = ['border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color'][i];
          el.style.setProperty(prop, colors.accent, 'important');
          count++;
        }
      });
    });

    if (count > 0) {
      console.log('[Nest UI] Overrode', count, 'teal inline styles');
    }
  }

  /**
   * Checks if a CSS color value is a GHL teal/cyan shade.
   */
  function isTealColor(value) {
    if (!value) return false;
    return TEAL_PATTERNS.some(function(pattern) {
      return pattern.test(value);
    });
  }

  function detectLocationId() {
    var pathMatch = window.location.pathname.match(/\/location\/([^/]+)/);
    if (pathMatch) return pathMatch[1];

    var params = new URLSearchParams(window.location.search);
    return params.get('locationId') || params.get('location_id') || null;
  }

  function removeGHLBranding() {
    var selectors = [
      '[data-testid="ghl-logo"]',
      '.powered-by-ghl',
      '.hl-branding'
    ];
    selectors.forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        el.style.display = 'none';
      });
    });
  }
})();
