import { Link } from 'react-router-dom'
import { useOnboardingChecklist } from '../../hooks/useOnboardingChecklist'
import type { OnboardingStep } from '../../hooks/useOnboardingChecklist'

function StepRow({ step }: { step: OnboardingStep }) {
  const content = (
    <div className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
      !step.completed && step.action ? 'hover:bg-white/[0.02] cursor-pointer' : ''
    }`}>
      {/* Check circle */}
      <div className="mt-0.5 shrink-0">
        {step.completed ? (
          <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border border-nestui-border/50" />
        )}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className={`text-sm font-medium ${
          step.completed ? 'text-nestui-text3 line-through' : 'text-nestui-text'
        }`}>
          {step.title}
        </p>
        <p className="text-xs text-nestui-text3 mt-0.5">{step.description}</p>
      </div>

      {/* Arrow */}
      {!step.completed && step.action && (
        <div className="ml-auto shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-nestui-text3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      )}
    </div>
  )

  if (!step.completed && step.action) {
    return <Link to={step.action}>{content}</Link>
  }

  return content
}

export default function OnboardingChecklist() {
  const { steps, completedCount, totalCount, allComplete, progressPercent, dismissed, dismiss } = useOnboardingChecklist()

  if (allComplete || dismissed) return null

  return (
    <div className="rounded-xl p-px bg-gradient-to-b from-white/[0.06] to-transparent mb-6 animate-fade-in">
      <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-nestui-text">Getting Started</h3>
            <p className="text-xs text-nestui-text3 mt-0.5">
              {completedCount} of {totalCount} complete
            </p>
          </div>
          <button
            onClick={dismiss}
            className="p-1 rounded-md text-nestui-text3 hover:text-nestui-text hover:bg-white/[0.03] transition-all cursor-pointer"
            title="Dismiss checklist"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full rounded-full bg-nestui-surface/50 mb-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-nestui-blue to-blue-400 transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-0.5">
          {steps.map((step) => (
            <StepRow key={step.id} step={step} />
          ))}
        </div>
      </div>
    </div>
  )
}
