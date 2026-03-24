/**
 * Nest UI — GHL Injection Script
 *
 * Agencies paste this into GHL's custom code settings:
 *   <script src="https://nestui.io/inject.js" data-key="WORKSPACE_KEY"></script>
 *
 * On every GHL page load it:
 *   1. Reads the workspace key from the script tag
 *   2. Fetches the active theme from the Nest UI API
 *   3. Injects the theme CSS into <head>
 *   4. Hides default GHL branding via a MutationObserver
 */

;(async () => {
  const scriptEl = document.currentScript as HTMLScriptElement | null
  const key = scriptEl?.getAttribute('data-key')
  if (!key) return

  const API_BASE = scriptEl?.getAttribute('data-api') ?? 'https://nestui.io'

  try {
    const res = await fetch(`${API_BASE}/api/theme?key=${encodeURIComponent(key)}`)
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
