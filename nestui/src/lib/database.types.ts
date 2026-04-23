export interface Workspace {
  id: string
  created_at: string
  owner_id: string
  name: string
  ghl_subdomain: string | null
  ghl_connected: boolean
  api_key: string | null
  active_theme_id: string
  theme_applied_at: string | null
  plan: 'free' | 'pro' | 'agency'
  stripe_customer_id: string | null
  ghl_access_token: string | null
  ghl_refresh_token: string | null
  ghl_token_expires_at: string | null
  ghl_location_id: string | null
}

export interface ThemeApplication {
  id: string
  workspace_id: string
  theme_id: string
  applied_at: string
  applied_by: string
}

export interface SubAccount {
  id: string
  workspace_id: string
  ghl_account_id: string
  name: string | null
  active_theme_id: string | null
  created_at: string
}
