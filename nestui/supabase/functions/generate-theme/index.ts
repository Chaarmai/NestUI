import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.100.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const SYSTEM_PROMPT = `You are a UI theme color generator for a CRM dashboard. Given a user's description of a theme they want, generate a complete color palette.

Return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "name": "Theme Name",
  "mode": "dark" or "light",
  "desc": "One sentence description",
  "colors": {
    "bg": "#hex - deepest background",
    "bg1": "#hex - slightly lighter background",
    "bg2": "#hex - tertiary background",
    "surface": "#hex - card/panel surfaces",
    "border": "rgba(r,g,b,opacity) - subtle borders",
    "accent": "#hex - primary accent color",
    "accentSoft": "rgba(r,g,b,opacity) - soft accent for hover/highlights",
    "text": "#hex - primary text",
    "text2": "#hex - secondary/muted text",
    "text3": "#hex - tertiary/disabled text"
  }
}

Rules:
- For dark themes: bg should be very dark (#0a-#15 range), text should be light
- For light themes: bg should be very light (#f0-#ff range), text should be dark
- Ensure sufficient contrast between text and backgrounds (WCAG AA minimum)
- accent should be vibrant and stand out against the background
- accentSoft should be the accent color at ~8-12% opacity
- border should be very subtle (~6-8% opacity)
- bg < bg1 < bg2 in lightness for dark themes (reverse for light)
- All hex colors must be valid 6-digit hex codes
- border and accentSoft must use rgba() format`

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    // Verify auth
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { prompt, workspaceId } = await req.json()
    if (!prompt || !workspaceId) {
      return new Response(JSON.stringify({ error: 'Missing prompt or workspaceId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (typeof prompt !== 'string' || prompt.length > 500) {
      return new Response(JSON.stringify({ error: 'Prompt must be a string under 500 characters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify workspace ownership and plan
    const { data: workspace, error: wsError } = await supabase
      .from('workspaces')
      .select('id, plan')
      .eq('id', workspaceId)
      .single()

    if (wsError || !workspace) {
      return new Response(JSON.stringify({ error: 'Workspace not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (workspace.plan === 'free') {
      return new Response(JSON.stringify({ error: 'AI Theme Generator requires a Pro or Agency plan' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Call Claude API
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicKey) {
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `Generate a theme color palette for: ${prompt}` },
        ],
      }),
    })

    if (!claudeRes.ok) {
      const errText = await claudeRes.text()
      console.error('[generate-theme] Claude API error:', errText)
      return new Response(JSON.stringify({ error: 'AI generation failed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const claudeData = await claudeRes.json()
    const rawText = claudeData.content?.[0]?.text
    if (!rawText) {
      return new Response(JSON.stringify({ error: 'AI returned empty response' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Parse and validate the generated theme
    let generated
    try {
      generated = JSON.parse(rawText)
    } catch {
      console.error('[generate-theme] Failed to parse AI response:', rawText)
      return new Response(JSON.stringify({ error: 'AI returned invalid format' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Validate required fields
    const requiredColors = ['bg', 'bg1', 'bg2', 'surface', 'border', 'accent', 'accentSoft', 'text', 'text2', 'text3']
    const missingColors = requiredColors.filter(c => !generated.colors?.[c])
    if (missingColors.length > 0) {
      return new Response(JSON.stringify({ error: `AI response missing colors: ${missingColors.join(', ')}` }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!generated.name || !generated.mode || !generated.desc) {
      return new Response(JSON.stringify({ error: 'AI response missing name, mode, or desc' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({
      name: generated.name,
      mode: generated.mode,
      desc: generated.desc,
      colors: generated.colors,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    console.error('[generate-theme] Error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
