import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.100.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const url = new URL(req.url)
  const key = url.searchParams.get('key')
  const locationId = url.searchParams.get('location')

  if (!key) {
    return new Response(JSON.stringify({ error: 'Missing key parameter' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Use the service role key to bypass RLS — this is a public read by workspace API key
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // 1. Look up the workspace by API key
  const { data: workspace, error: wsError } = await supabase
    .from('workspaces')
    .select('id, active_theme_id, theme_applied_at')
    .eq('api_key', key)
    .single()

  if (wsError || !workspace) {
    return new Response(JSON.stringify({ error: 'Workspace not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // 2. If a location ID was provided, check for a sub-account-specific theme
  let themeId = workspace.active_theme_id
  let source: 'sub-account' | 'workspace' = 'workspace'

  if (locationId) {
    const { data: subAccount } = await supabase
      .from('sub_accounts')
      .select('active_theme_id')
      .eq('workspace_id', workspace.id)
      .eq('ghl_account_id', locationId)
      .maybeSingle()

    if (subAccount?.active_theme_id) {
      themeId = subAccount.active_theme_id
      source = 'sub-account'
    }
  }

  return new Response(
    JSON.stringify({
      themeId,
      source,
      updatedAt: workspace.theme_applied_at,
    }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    },
  )
})
