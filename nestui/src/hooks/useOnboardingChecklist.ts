import { useState, useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'

export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  action: string | null
}

export function useOnboardingChecklist() {
  const workspace = useAppStore((s) => s.workspace)
  const [dismissed, setDismissed] = useState(false)

  const steps: OnboardingStep[] = useMemo(() => [
    {
      id: 'create-workspace',
      title: 'Create workspace',
      description: 'Set up your agency workspace.',
      completed: !!workspace,
      action: null,
    },
    {
      id: 'connect-ghl',
      title: 'Connect GoHighLevel',
      description: 'Link your GHL account to enable theming.',
      completed: workspace?.ghl_connected === true,
      action: '/onboarding',
    },
    {
      id: 'install-snippet',
      title: 'Install snippet',
      description: 'Paste the script tag into your GHL custom code settings.',
      completed: workspace?.ghl_connected === true,
      action: null,
    },
    {
      id: 'apply-theme',
      title: 'Apply a theme',
      description: 'Pick a theme and make your dashboard stand out.',
      completed: workspace?.theme_applied_at != null,
      action: null,
    },
  ], [workspace])

  const completedCount = steps.filter((s) => s.completed).length
  const totalCount = steps.length
  const allComplete = completedCount === totalCount
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  return {
    steps,
    completedCount,
    totalCount,
    allComplete,
    progressPercent,
    dismissed,
    dismiss: () => setDismissed(true),
  }
}
