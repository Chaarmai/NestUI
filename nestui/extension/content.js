/**
 * Nest UI — Chrome Extension Content Script
 */

(function() {
  const CDN_BASE = 'https://nest-ui-eight.vercel.app';

  console.log('[Nest UI] Content script loaded on', window.location.href);

  chrome.storage.sync.get('nestui_api_key', function(result) {
    const key = result.nestui_api_key;
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

        console.log('[Nest UI] Applying theme:', data.themeId, 'source:', data.source);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CDN_BASE + '/themes/' + data.themeId + '.css';
        link.id = 'nestui-theme';
        document.head.appendChild(link);

        document.body.classList.add('nestui-active', 'nestui-' + data.themeId);

        removeGHLBranding();

        var observer = new MutationObserver(function() { removeGHLBranding(); });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    );
  });

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
