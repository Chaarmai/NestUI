import { Link } from 'react-router-dom'

interface PlanFeature {
  text: string
  included: boolean
}

interface Plan {
  name: string
  price: string
  period: string
  features: PlanFeature[]
  highlighted?: boolean
  badge?: string
}

const PLANS: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    features: [
      { text: '3 themes', included: true },
      { text: '1 sub-account', included: true },
      { text: 'Community support', included: true },
      { text: 'AI Theme Generator', included: false },
      { text: 'Custom themes', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$97',
    period: '/mo',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { text: 'All 9 themes', included: true },
      { text: '5 sub-accounts', included: true },
      { text: 'Priority support', included: true },
      { text: 'AI Theme Generator', included: true },
      { text: 'Custom themes', included: false },
    ],
  },
  {
    name: 'Agency',
    price: '$399',
    period: '/mo',
    features: [
      { text: 'All 9 + custom themes', included: true },
      { text: 'Unlimited sub-accounts', included: true },
      { text: 'Priority support', included: true },
      { text: 'AI Theme Generator', included: true },
      { text: 'White-label branding', included: true },
    ],
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #5b8fff, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-nestui-blue text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-nestui-text mb-5 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-nestui-text2 text-lg max-w-xl mx-auto leading-relaxed">
            Start free. Upgrade when you're ready to unlock every theme and feature.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-px animate-fade-in ${
                plan.highlighted ? 'md:-mt-4 md:mb-4' : ''
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Gradient border for highlighted */}
              {plan.highlighted && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-nestui-blue/50 via-nestui-blue/20 to-transparent" />
              )}

              <div
                className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-nestui-bg1 shadow-[0_0_60px_rgba(91,143,255,0.1)]'
                    : 'glass-card glass-card-hover'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-nestui-blue to-blue-500 text-white text-[11px] font-semibold rounded-full shadow-[0_0_20px_rgba(91,143,255,0.3)]">
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-lg font-semibold text-nestui-text mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-nestui-text tracking-tight">{plan.price}</span>
                  <span className="text-nestui-text2 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-nestui-blue/10">
                          <svg className="w-3 h-3 text-nestui-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.03]">
                          <svg className="w-3 h-3 text-nestui-text3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-nestui-text2' : 'text-nestui-text3'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/login"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-nestui-blue to-blue-500 text-white hover:shadow-[0_0_30px_rgba(91,143,255,0.3)] hover:scale-[1.02]'
                      : 'border border-nestui-border/50 text-nestui-text2 hover:text-nestui-text hover:border-nestui-text3/30 hover:bg-white/[0.02]'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
