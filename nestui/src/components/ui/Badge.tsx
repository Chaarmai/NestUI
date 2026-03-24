interface BadgeProps {
  variant?: 'success' | 'warning' | 'neutral'
  children: React.ReactNode
}

const variants = {
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  neutral: 'bg-nestui-surface/50 text-nestui-text2 border-nestui-border/50',
}

export default function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${variants[variant]}`}>
      {children}
    </span>
  )
}
