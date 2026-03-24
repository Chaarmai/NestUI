import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.100.0'
import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno'

// Map Stripe Price IDs to Nest UI plan names
const PRICE_TO_PLAN: Record<string, string> = {
  price_pro_monthly: 'pro',
  price_pro_annual: 'pro',
  price_agency_monthly: 'agency',
  price_agency_annual: 'agency',
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16',
  })

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 })
  }

  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Signature verification failed'
    return new Response(`Webhook signature verification failed: ${message}`, { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const workspaceId = session.metadata?.workspaceId
      if (!workspaceId || !session.subscription) break

      // Retrieve subscription to get the price ID
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      )
      const priceId = subscription.items.data[0]?.price.id
      const plan = priceId ? PRICE_TO_PLAN[priceId] : undefined

      if (plan) {
        await supabase
          .from('workspaces')
          .update({
            plan,
            stripe_customer_id: session.customer as string,
          })
          .eq('id', workspaceId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const priceId = subscription.items.data[0]?.price.id
      const plan = priceId ? PRICE_TO_PLAN[priceId] : undefined

      if (plan) {
        await supabase
          .from('workspaces')
          .update({ plan })
          .eq('stripe_customer_id', customerId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      await supabase
        .from('workspaces')
        .update({ plan: 'free' })
        .eq('stripe_customer_id', customerId)
      break
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
