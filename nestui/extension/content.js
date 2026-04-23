/**
 * Nest UI — Chrome Extension Content Script
 *
 * Runs on every GHL page. Detects the location ID from the URL,
 * fetches the correct theme from the Nest UI API, and injects the CSS.
 */

;(async () => {
  const API_BASE = 'https://nest-ui-eight.vercel.app'

  // Get the API key from extension storage
  const { nestui_api_key: key } = await chrome.storage.sync.get('nestui_api_key')
  if (!key) return

  // Detect GHL location ID from the URL
  const locationId = detectLocationId()

  try {
    let apiUrl = `${API_BASE}/api/theme?key=${encodeURIComponent(key)}`
    if (locationId) {
      apiUrl += `&location=${encodeURIComponent(locationId)}`
    }

    const res = await fetch(apiUrl)
    if (!res.ok) return

    const { themeId } = await res.json()
    if (!themeId) return

    // Inject the theme stylesheet
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `${API_BASE}/themes/${themeId}.css`
    link.id = 'nestui-theme'
    document.head.appendChild(link)

    // Mark body for CSS scoping
    document.body.classList.add('nestui-active', `nestui-${themeId}`)

    // Remove GHL branding
    removeGHLBranding()

    // GHL is a SPA — watch for DOM changes and re-hide branding
    const observer = new MutationObserver(() => removeGHLBranding())
    observer.observe(document.body, { childList: true, subtree: true })

    // GHL is a SPA — watch for URL changes and re-fetch theme if location changes
    let lastLocation = locationId
    const urlObserver = new MutationObserver(() => {
      const newLocation = detectLocationId()
      if (newLocation !== lastLocation) {
        lastLocation = newLocation
        swapTheme(key, newLocation)
      }
    })
    urlObserver.observe(document.querySelector('head > title') || document.head, {
      childList: true,
      subtree: true,
    })

    // Also listen for popstate (back/forward navigation)
    window.addEventListener('popstate', () => {
      const newLocation = detectLocationId()
      if (newLocation !== lastLocation) {
        lastLocation = newLocation
        swapTheme(key, newLocation)
      }
    })
  } catch (e) {
    console.warn('[Nest UI] Could not load theme:', e)
  }

  /**
   * Swap the theme when the location changes (SPA navigation)
   */
  async function swapTheme(apiKey, locId) {
    try {
      let url = `${API_BASE}/api/theme?key=${encodeURIComponent(apiKey)}`
      if (locId) url += `&location=${encodeURIComponent(locId)}`

      const res = await fetch(url)
      if (!res.ok) return

      const { themeId } = await res.json()
      if (!themeId) return

      // Update the stylesheet
      const existing = document.getElementById('nestui-theme')
      if (existing) {
        existing.href = `${API_BASE}/themes/${themeId}.css`
      }

      // Update body classes
      document.body.className = document.body.className
        .replace(/nestui-\S+/g, '')
        .trim()
      document.body.classList.add('nestui-active', `nestui-${themeId}`)
    } catch (e) {
      console.warn('[Nest UI] Could not swap theme:', e)
    }
  }

  /**
   * Detect GHL location ID from URL path or query params
   */
  function detectLocationId() {
    // URL path: /location/{id} or /v2/location/{id}
    const pathMatch = window.location.pathname.match(/\/location\/([^/]+)/)
    if (pathMatch) return pathMatch[1]

    // Query params
    const params = new URLSearchParams(window.location.search)
    return params.get('locationId') || params.get('location_id') || null
  }

  function removeGHLBranding() {
    const selectors = [
      '[data-testid="ghl-logo"]',
      '.powered-by-ghl',
      '.hl-branding',
    ]
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.style.display = 'none'
      })
    })
  }
})()
