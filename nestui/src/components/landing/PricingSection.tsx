import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'

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

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Animated gradient border for highlighted */}
      {plan.highlighted && (
        <div className="absolute -inset-px rounded-2xl animated-border-glow" />
      )}

      {/* Glow effect for highlighted */}
      {plan.highlighted && (
        <div className="absolute -inset-4 rounded-3xl opacity-20 blur-xl bg-gradient-to-b from-nestui-blue/30 to-transparent pointer-events-none" />
      )}

      <div
        className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-500 group ${
          plan.highlighted
            ? 'bg-nestui-bg1/90 backdrop-blur-xl shadow-[0_0_80px_rgba(91,143,255,0.12)]'
            : 'glass-card backdrop-blur-xl hover:bg-[rgba(15,17,35,0.8)] hover:border-nestui-blue/15 hover:shadow-[0_0_40px_rgba(91,143,255,0.08)]'
        }`}
      >
        {plan.badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-nestui-blue via-blue-400 to-purple-500 text-white text-[11px] font-semibold rounded-full shadow-[0_0_25px_rgba(91,143,255,0.4)] animate-gradient-shift">
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
              ? 'bg-gradient-to-r from-nestui-blue via-blue-500 to-purple-500 text-white hover:shadow-[0_0_40px_rgba(91,143,255,0.35)] hover:scale-[1.02] animate-gradient-shift'
              : 'border border-nestui-border/50 text-nestui-text2 hover:text-nestui-text hover:border-nestui-blue/30 hover:bg-nestui-blue/[0.03]'
          }`}
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default function PricingSection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal()

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full opacity-10 blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, #5b8fff, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`text-center mb-20 transition-all duration-700 ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-nestui-blue text-xs font-semibold uppercase tracking-[0.2em] mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-nestui-text mb-5 tracking-tight">
            Scale Your Brand, Not Your Costs
          </h2>
          <p className="text-nestui-text2 text-lg max-w-2xl mx-auto leading-relaxed">
            Start free. Upgrade when your clients start asking how you built such a clean CRM.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
