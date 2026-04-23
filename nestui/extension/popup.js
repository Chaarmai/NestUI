const keyInput = document.getElementById('api-key')
const domainInput = document.getElementById('custom-domain')
const saveBtn = document.getElementById('save')
const statusEl = document.getElementById('status')
const toggleBtn = document.getElementById('toggle-domain')
const domainSection = document.getElementById('domain-section')

// Load saved values
chrome.storage.sync.get(['nestui_api_key', 'nestui_custom_domain'], (data) => {
  if (data.nestui_api_key) {
    keyInput.value = data.nestui_api_key
    statusEl.textContent = 'Connected'
    statusEl.className = 'status success'
  }
  if (data.nestui_custom_domain) {
    domainInput.value = data.nestui_custom_domain
    domainSection.classList.add('visible')
    toggleBtn.textContent = '− Custom GHL domain'
  }
})

// Toggle custom domain section
toggleBtn.addEventListener('click', () => {
  const visible = domainSection.classList.toggle('visible')
  toggleBtn.textContent = visible ? '− Custom GHL domain' : '+ Add custom GHL domain'
})

// Save
saveBtn.addEventListener('click', async () => {
  const key = keyInput.value.trim()
  const domain = domainInput.value.trim()

  if (!key) {
    statusEl.textContent = 'Please enter an API key'
    statusEl.className = 'status info'
    return
  }

  // Save to chrome storage
  await chrome.storage.sync.set({
    nestui_api_key: key,
    nestui_custom_domain: domain || null,
  })

  // If custom domain provided, register it as a content script
  if (domain) {
    try {
      // Remove any existing dynamic script registration
      await chrome.scripting.unregisterContentScripts({ ids: ['nestui-custom-domain'] }).catch(() => {})

      await chrome.scripting.registerContentScripts([{
        id: 'nestui-custom-domain',
        matches: [`*://${domain}/*`],
        js: ['content.js'],
        runAt: 'document_idle',
      }])
    } catch (e) {
      console.warn('[Nest UI] Could not register custom domain:', e)
    }
  }

  statusEl.textContent = 'Saved! Reload your GHL tab.'
  statusEl.className = 'status success'
})
