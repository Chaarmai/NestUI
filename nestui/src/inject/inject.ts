/**
 * Nest UI — GHL Injection Script
 *
 * Agencies paste this into GHL's custom code settings:
 *   <script src="https://nestui.io/inject.js" data-key="WORKSPACE_KEY"></script>
 *
 * On every GHL page load it:
 *   1. Reads the workspace key from the script tag
 *   2. Detects the current GHL location ID (sub-account)
 *   3. Fetches the active theme from the Nest UI API (sub-account theme or workspace fallback)
 *   4. Injects the theme CSS into <head>
 *   5. Hides default GHL branding via a MutationObserver
 */

;(async () => {
  const scriptEl = document.currentScript as HTMLScriptElement | null
  const key = scriptEl?.getAttribute('data-key')
  if (!key) return

  const API_BASE = scriptEl?.getAttribute('data-api') ?? 'https://nestui.io'

  // Detect the GHL location ID from the current page
  const locationId = detectGHLLocationId()

  try {
    let apiUrl = `${API_BASE}/api/theme?key=${encodeURIComponent(key)}`
    if (locationId) {
      apiUrl += `&location=${encodeURIComponent(locationId)}`
    }

    const res = await fetch(apiUrl)
    if (!res.ok) return

    const { themeId } = (await res.json()) as { themeId?: string }
    if (!themeId) return

    // Inject the theme stylesheet
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `${API_BASE}/themes/${themeId}.css`
    link.id = 'nestui-theme'
    document.head.appendChild(link)

    // Mark body so CSS selectors can scope to the active theme
    document.body.classList.add('nestui-active', `nestui-${themeId}`)

    // Remove GHL branding elements
    removeGHLBranding()

    // GHL is a SPA — watch for DOM changes and re-hide branding
    const observer = new MutationObserver(() => removeGHLBranding())
    observer.observe(document.body, { childList: true, subtree: true })
  } catch (e) {
    console.warn('[Nest UI] Could not load theme:', e)
  }

  /**
   * Try to detect the GHL location/sub-account ID from:
   *   1. Explicit data-location attribute on the script tag
   *   2. URL path: /location/{id}/... or /v2/location/{id}/...
   *   3. URL query param: ?locationId=...
   */
  function detectGHLLocationId(): string | null {
    // 1. Explicit override via script attribute
    const explicit = scriptEl?.getAttribute('data-location')
    if (explicit) return explicit

    // 2. URL path pattern: /location/{id} or /v2/location/{id}
    const pathMatch = window.location.pathname.match(/\/location\/([^/]+)/)
    if (pathMatch) return pathMatch[1]

    // 3. URL query parameter
    const params = new URLSearchParams(window.location.search)
    const fromQuery = params.get('locationId') || params.get('location_id')
    if (fromQuery) return fromQuery

    return null
  }

  function removeGHLBranding() {
    const selectors = [
      '[data-testid="ghl-logo"]',
      '.powered-by-ghl',
      '.hl-branding',
    ]
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        ;(el as HTMLElement).style.display = 'none'
      })
    })
  }
})()
