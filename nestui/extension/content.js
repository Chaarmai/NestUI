/**
 * Nest UI — Chrome Extension Content Script
 *
 * 1. Neutralizes competing theme engines (ThemeBuilder, etc.)
 * 2. Injects Nest UI theme CSS with maximum cascade priority
 * 3. Actively overrides remaining teal via computed style scanning
 */

(function() {
  var CDN_BASE = 'https://nest-ui-eight.vercel.app';

  var THEME_COLORS = {
    aurora:   { accent: '#7c5cfc', bg: '#f5f4f0', bg1: '#f8f7f4', bg2: '#ffffff', text: '#111110', text2: '#6b6b67', mode: 'light' },
    obsidian: { accent: '#00d4ff', bg: '#030508', bg1: '#080c12', bg2: '#0d1420', text: '#e8f4ff', text2: '#7a9bbf', mode: 'dark' },
    forge:    { accent: '#f59e0b', bg: '#0f0d0a', bg1: '#151210', bg2: '#1c1814', text: '#fdf4e7', text2: '#a89070', mode: 'dark' },
    phantom:  { accent: '#f0ede8', bg: '#0a0a0a', bg1: '#111111', bg2: '#181818', text: '#f0ede8', text2: '#888888', mode: 'dark' },
    nova:     { accent: '#a78bfa', bg: '#0e0b1a', bg1: '#130f22', bg2: '#18132e', text: '#f1eeff', text2: '#8b82b0', mode: 'dark' },
    ember:    { accent: '#e05252', bg: '#0c0808', bg1: '#120a0a', bg2: '#1a0e0e', text: '#f5e6d8', text2: '#8a6a5a', mode: 'dark' },
    prism:    { accent: '#6478f0', bg: '#08090f', bg1: '#0d0f1a', bg2: '#111422', text: '#e2e8f8', text2: '#6b7aaa', mode: 'dark' },
    void:     { accent: '#00ff88', bg: '#050505', bg1: '#0a0a0a', bg2: '#0f0f0f', text: '#ffffff', text2: '#666666', mode: 'dark' },
    silk:     { accent: '#3d6b4f', bg: '#f7f5f0', bg1: '#f2efe9', bg2: '#fefefe', text: '#1a1a16', text2: '#6b6757', mode: 'light' }
  };

  console.log('[Nest UI] Content script loaded on', window.location.href);

  chrome.storage.sync.get('nestui_api_key', function(result) {
    var key = result.nestui_api_key;
    if (!key) {
      console.log('[Nest UI] No API key configured');
      return;
    }

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
          console.warn('[Nest UI] No theme returned:', JSON.stringify(data));
          return;
        }

        var themeId = data.themeId;
        var colors = THEME_COLORS[themeId];
        if (!colors) {
          console.warn('[Nest UI] Unknown theme:', themeId);
          return;
        }

        console.log('[Nest UI] Applying theme:', themeId, 'source:', data.source);

        // ═══ STEP 1: Neutralize competing theme engines ═══
        neutralizeCompetingThemes();

        // ═══ STEP 2: Add body classes and force light/dark mode ═══
        document.body.classList.add('nestui-active', 'nestui-' + themeId);

        // Override GHL's data-theme attribute (forces light or dark base)
        if (colors.mode === 'light') {
          document.body.setAttribute('data-theme', 'default-light-v1');
          document.body.style.setProperty('background-color', colors.bg, 'important');
          document.body.style.setProperty('color', colors.text, 'important');
        }

        // Force sidebar and main content colors via inline styles
        setTimeout(function() {
          // Sidebar
          var sidebarEls = document.querySelectorAll('aside, [class*="sidebar"], [class*="Sidebar"], [class*="side-nav"], [class*="SideNav"], [class*="sidenav"], nav');
          sidebarEls.forEach(function(el) {
            el.style.setProperty('background-color', colors.bg1, 'important');
            el.style.setProperty('color', colors.text2, 'important');
          });

          // Main content area
          var mainEls = document.querySelectorAll('main, [class*="main-content"], [class*="content-area"], [class*="page-content"], [role="main"]');
          mainEls.forEach(function(el) {
            el.style.setProperty('background-color', colors.bg, 'important');
          });

          console.log('[Nest UI] Forced sidebar/content colors');
        }, 300);

        // ═══ STEP 3: Inject theme CSS as <link> in head ═══
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CDN_BASE + '/themes/' + themeId + '.css';
        link.id = 'nestui-theme';
        document.head.appendChild(link);

        // ═══ STEP 4: Also inject as <style> at end of body for max cascade priority ═══
        fetch(CDN_BASE + '/themes/' + themeId + '.css')
          .then(function(res) { return res.text(); })
          .then(function(css) {
            var style = document.createElement('style');
            style.id = 'nestui-theme-inline';
            style.textContent = css;
            document.body.appendChild(style);
            console.log('[Nest UI] Injected inline <style> at end of body');
          })
          .catch(function(e) { console.warn('[Nest UI] CSS fetch failed:', e); });

        // ═══ STEP 5: Teal override passes ═══
        [800, 2000, 4000, 8000].forEach(function(delay) {
          setTimeout(function() {
            neutralizeCompetingThemes();
            overrideComputedTeal(colors);
            removeGHLBranding();
          }, delay);
        });

        // ═══ STEP 6: MutationObserver for SPA navigation ═══
        var debounceTimer = null;
        var observer = new MutationObserver(function() {
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(function() {
            overrideComputedTeal(colors);
            removeGHLBranding();
          }, 300);
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        console.log('[Nest UI] Theme applied and observer active');
      }
    );
  });

  /**
   * Remove ThemeBuilder and other competing theme scripts/styles.
   * This only affects the current user's browser (Chrome extension context).
   */
  function neutralizeCompetingThemes() {
    var removed = 0;

    // Remove ThemeBuilder script
    var tbScript = document.getElementById('themebuilder-script');
    if (tbScript) {
      tbScript.remove();
      removed++;
      console.log('[Nest UI] Removed ThemeBuilder script');
    }

    // Remove any stylesheets from themarketerstoolkit.com
    document.querySelectorAll('link[href*="themarketerstoolkit"], link[href*="themes.toolkit"]').forEach(function(el) {
      el.remove();
      removed++;
    });

    // Remove any <style> tags that contain ThemeBuilder CSS
    document.querySelectorAll('style').forEach(function(el) {
      if (el.id === 'nestui-theme-inline') return; // don't remove our own
      var text = el.textContent || '';
      if (text.indexOf('themarketerstoolkit') !== -1 || text.indexOf('ThemeBuilder') !== -1) {
        el.remove();
        removed++;
        console.log('[Nest UI] Removed ThemeBuilder <style> tag');
      }
    });

    // Neutralize the @import from ThemeBuilder in GHL's custom CSS
    // GHL injects custom CSS into a <style> tag — find it and strip the @import
    document.querySelectorAll('style').forEach(function(el) {
      if (el.id === 'nestui-theme-inline') return;
      var text = el.textContent || '';
      if (text.indexOf('@import') !== -1 && text.indexOf('themarketerstoolkit') !== -1) {
        // Remove the @import line but keep other custom CSS
        el.textContent = text.replace(/@import\s+url\([^)]*themarketerstoolkit[^)]*\)\s*;?/g, '/* [Nest UI] removed competing @import */');
        removed++;
        console.log('[Nest UI] Stripped ThemeBuilder @import from custom CSS');
      }
    });

    // Also disable the dynamically loaded ThemeBuilder stylesheet
    for (var i = 0; i < document.styleSheets.length; i++) {
      try {
        var sheet = document.styleSheets[i];
        var href = sheet.href || '';
        if (href.indexOf('themarketerstoolkit') !== -1 || href.indexOf('themes.toolkit') !== -1) {
          sheet.disabled = true;
          removed++;
          console.log('[Nest UI] Disabled ThemeBuilder stylesheet:', href);
        }
      } catch(e) {
        // Cross-origin stylesheets throw — skip them
      }
    }

    if (removed > 0) {
      console.log('[Nest UI] Neutralized ' + removed + ' competing theme elements');
    }
  }

  /**
   * Parse rgb/rgba string to {r, g, b}
   */
  function parseRgb(str) {
    if (!str) return null;
    var m = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!m) return null;
    return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]) };
  }

  /**
   * Is this RGB in the teal/cyan family? (low R, high G, moderate+ B)
   */
  function isTealRgb(rgb) {
    if (!rgb) return false;
    // Skip transparent/black (rgba(0,0,0,0) computes as r=0,g=0,b=0)
    if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0) return false;
    return rgb.r <= 50 && rgb.g >= 140 && rgb.g <= 220 && rgb.b >= 80;
  }

  /**
   * Scan all elements, check computed bg/text/border colors, override teal.
   */
  function overrideComputedTeal(colors) {
    var all = document.querySelectorAll('*');
    var bgCount = 0, textCount = 0, borderCount = 0;

    all.forEach(function(el) {
      if (el.id === 'nestui-theme' || el.id === 'nestui-theme-inline') return;

      var computed;
      try { computed = window.getComputedStyle(el); } catch(e) { return; }

      var bgRgb = parseRgb(computed.backgroundColor);
      if (isTealRgb(bgRgb)) {
        el.style.setProperty('background-color', colors.accent, 'important');
        bgCount++;
      }

      var textRgb = parseRgb(computed.color);
      if (isTealRgb(textRgb)) {
        el.style.setProperty('color', colors.accent, 'important');
        textCount++;
      }

      var borderRgb = parseRgb(computed.borderTopColor);
      if (isTealRgb(borderRgb)) {
        el.style.setProperty('border-color', colors.accent, 'important');
        borderCount++;
      }
    });

    if (bgCount + textCount + borderCount > 0) {
      console.log('[Nest UI] Overrode teal — bg:' + bgCount + ' text:' + textCount + ' border:' + borderCount);
    }
  }

  function detectLocationId() {
    var pathMatch = window.location.pathname.match(/\/location\/([^/]+)/);
    if (pathMatch) return pathMatch[1];
    var params = new URLSearchParams(window.location.search);
    return params.get('locationId') || params.get('location_id') || null;
  }

  function removeGHLBranding() {
    ['[data-testid="ghl-logo"]', '.powered-by-ghl', '.hl-branding'].forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        el.style.display = 'none';
      });
    });
  }
})();
