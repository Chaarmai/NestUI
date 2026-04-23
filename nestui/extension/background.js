/**
 * Nest UI — Background Service Worker
 *
 * Handles API calls from content scripts to bypass CORS restrictions.
 * Content scripts send messages, this worker makes the fetch and returns results.
 */

const SUPABASE_URL = 'https://waqimvlocmrmzidysoqa.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhcWltdmxvY21ybXppZHlzb3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTI3NjksImV4cCI6MjA4OTkyODc2OX0.qNfMwW_q0bS2AmPHMYQL9jy0plIVddpAi7ZczCgKfAs'

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'FETCH_THEME') {
    fetchTheme(msg.key, msg.locationId)
      .then(sendResponse)
      .catch((err) => sendResponse({ error: err.message }))
    return true // keep the message channel open for async response
  }
})

async function fetchTheme(key, locationId) {
  let url = `${SUPABASE_URL}/functions/v1/get-theme?key=${encodeURIComponent(key)}`
  if (locationId) {
    url += `&location=${encodeURIComponent(locationId)}`
  }

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'apikey': SUPABASE_ANON_KEY,
    },
  })
  if (!res.ok) {
    throw new Error(`API returned ${res.status}`)
  }

  return await res.json()
}
