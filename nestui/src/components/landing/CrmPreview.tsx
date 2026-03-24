import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ── Silk theme tokens (extended) ────────────── */
const s = {
  bg: '#f7f5f0',
  bg1: '#f0ede6',
  bg2: '#fefefe',
  surface: '#ffffff',
  surfaceHover: '#faf9f6',
  border: 'rgba(0,0,0,0.06)',
  borderStrong: 'rgba(0,0,0,0.10)',
  accent: '#3d6b4f',
  accentSoft: 'rgba(61,107,79,0.07)',
  accentMedium: 'rgba(61,107,79,0.14)',
  text: '#1a1a16',
  text2: '#6b6757',
  text3: '#aba898',
  text4: '#ccc5b8',
  shadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
  shadowMd: '0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)',
  shadowLg: '0 4px 12px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.08)',
}

/* ── Icon helper (Lucide-style thin strokes) ─── */
function SvgIcon({ children, size = 15, color = s.text3, strokeWidth = 1.5 }: {
  children: React.ReactNode
  size?: number
  color?: string
  strokeWidth?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

/* ── Nav items ────────────────────────────────── */
const navItems: { label: string; icon: React.ReactNode; active?: boolean }[] = [
  {
    label: 'Dashboard',
    active: true,
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="4" rx="1" />
        <rect x="14" y="11" width="7" height="10" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    label: 'Contacts',
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </>
    ),
  },
  {
    label: 'Pipeline',
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 5 4-10" />
      </>
    ),
  },
  {
    label: 'Campaigns',
    icon: (
      <>
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4z" />
      </>
    ),
  },
  {
    label: 'Automation',
    icon: (
      <>
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </>
    ),
  },
  {
    label: 'Analytics',
    icon: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </>
    ),
  },
]

/* ── Sparkline (tiny inline trend) ───────────── */
function Sparkline({ data, color = s.accent }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 48
  const h = 16
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * h * 0.8 - h * 0.1,
  }))

  // Build smooth bezier path
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const cp1x = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * 0.4
    const cp2x = pts[i].x - (pts[i].x - pts[i - 1].x) * 0.4
    d += ` C${cp1x},${pts[i - 1].y} ${cp2x},${pts[i].y} ${pts[i].x},${pts[i].y}`
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Stat card icon ──────────────────────────── */
function StatIcon({ type }: { type: 'contacts' | 'deals' | 'pipeline' | 'reply' }) {
  const iconMap = {
    contacts: <><circle cx="9" cy="7" r="4" /><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /></>,
    deals: <><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0020 0h-3" /><circle cx="12" cy="8" r="2" /></>,
    pipeline: <><path d="M12 2v20M2 12h20" /><path d="M2 7l5 5-5 5" /></>,
    reply: <><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></>,
  }
  return (
    <div
      className="flex items-center justify-center w-6 h-6 rounded-md shrink-0"
      style={{ backgroundColor: s.accentSoft }}
    >
      <SvgIcon size={12} color={s.accent} strokeWidth={1.8}>
        {iconMap[type]}
      </SvgIcon>
    </div>
  )
}

/* ── Stat card ───────────────────────────────── */
function StatCard({ label, value, change, positive = true, icon, sparkData }: {
  label: string
  value: string
  change: string
  positive?: boolean
  icon: 'contacts' | 'deals' | 'pipeline' | 'reply'
  sparkData: number[]
}) {
  const changeColor = positive ? '#16a34a' : '#dc2626'
  const changeBg = positive ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.08)'

  return (
    <div
      className="rounded-xl p-3.5 flex-1 min-w-0 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${s.surface} 0%, ${s.bg} 100%)`,
        boxShadow: `${s.shadow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
        border: `1px solid ${s.border}`,
      }}
    >
      {/* Subtle inner glow */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-30 blur-xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${s.accent}15, transparent 70%)` }}
      />

      <div className="relative flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <StatIcon type={icon} />
            <p className="text-[8px] font-medium uppercase tracking-wider" style={{ color: s.text3 }}>
              {label}
            </p>
          </div>
          <p className="text-[15px] font-bold tracking-tight" style={{ color: s.text }}>
            {value}
          </p>
          <div
            className="inline-flex items-center gap-1 mt-1.5 px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: changeBg }}
          >
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path
                d={positive ? 'M6 9V3M3 5l3-3 3 3' : 'M6 3v6M3 7l3 3 3-3'}
                stroke={changeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[8px] font-semibold" style={{ color: changeColor }}>
              {change}
            </span>
          </div>
        </div>
        <div className="pt-5">
          <Sparkline data={sparkData} />
        </div>
      </div>
    </div>
  )
}

/* ── Revenue chart (smooth bezier + gradient) ── */
function RevenueChart() {
  const data = [
    [0, 38], [12, 33], [24, 36], [36, 28], [48, 31],
    [60, 22], [72, 26], [84, 18], [96, 20], [108, 14],
    [120, 16], [132, 10], [144, 12], [156, 6],
  ]

  // Build smooth bezier path
  let d = `M${data[0][0]},${data[0][1]}`
  for (let i = 1; i < data.length; i++) {
    const cp1x = data[i - 1][0] + (data[i][0] - data[i - 1][0]) * 0.4
    const cp2x = data[i][0] - (data[i][0] - data[i - 1][0]) * 0.4
    d += ` C${cp1x},${data[i - 1][1]} ${cp2x},${data[i][1]} ${data[i][0]},${data[i][1]}`
  }

  const areaD = `${d} L156,46 L0,46 Z`
  const lastPt = data[data.length - 1]

  return (
    <svg width="100%" viewBox="0 0 156 46" fill="none" className="mt-3">
      <defs>
        <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={s.accent} stopOpacity="0.18" />
          <stop offset="80%" stopColor={s.accent} stopOpacity="0.02" />
          <stop offset="100%" stopColor={s.accent} stopOpacity="0" />
        </linearGradient>
        <filter id="glow-dot">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Grid lines */}
      {[12, 24, 36].map(y => (
        <line key={y} x1="0" y1={y} x2="156" y2={y} stroke={s.border} strokeWidth="0.5" />
      ))}
      <path d={areaD} fill="url(#rev-fill)" />
      <path d={d} stroke={s.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Animated glow dot */}
      <circle cx={lastPt[0]} cy={lastPt[1]} r="5" fill={s.accent} opacity="0.15" filter="url(#glow-dot)">
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.08;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={lastPt[0]} cy={lastPt[1]} r="3" fill={s.surface} stroke={s.accent} strokeWidth="1.5" />
    </svg>
  )
}

/* ── Deals bar chart ─────────────────────────── */
function DealsBarChart() {
  const bars = [22, 35, 28, 45, 38, 52, 48]
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const maxH = 52
  const highlighted = 5

  return (
    <svg width="100%" viewBox="0 0 140 62" fill="none" className="mt-3">
      <defs>
        <linearGradient id="bar-active" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={s.accent} />
          <stop offset="100%" stopColor="#2d5039" />
        </linearGradient>
        <linearGradient id="bar-inactive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${s.accent}25`} />
          <stop offset="100%" stopColor={`${s.accent}10`} />
        </linearGradient>
      </defs>
      {bars.map((h, i) => {
        const x = i * 20 + 2
        const barH = (h / maxH) * 44
        const isActive = i === highlighted
        return (
          <g key={i}>
            <rect
              x={x}
              y={48 - barH}
              width="14"
              height={barH}
              rx="4"
              fill={isActive ? 'url(#bar-active)' : 'url(#bar-inactive)'}
            />
            {isActive && (
              <rect
                x={x - 1}
                y={48 - barH - 1}
                width="16"
                height={barH + 2}
                rx="5"
                fill="none"
                stroke={s.accent}
                strokeWidth="0.5"
                opacity="0.3"
              />
            )}
            <text
              x={x + 7}
              y={58}
              textAnchor="middle"
              fill={isActive ? s.text2 : s.text4}
              fontSize="7"
              fontWeight={isActive ? 600 : 400}
              fontFamily="Inter, system-ui, sans-serif"
            >
              {labels[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ── Pipeline kanban card ────────────────────── */
function KanbanCard({ name, amount, tag, tagDot, borderColor, initials, avatarBg }: {
  name: string
  amount: string
  tag: string
  tagDot: string
  borderColor: string
  initials: string
  avatarBg: string
}) {
  return (
    <div
      className="rounded-lg p-2 mb-1.5 last:mb-0 relative overflow-hidden"
      style={{
        backgroundColor: s.bg2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        border: `1px solid ${s.border}`,
        borderLeft: `3px solid ${borderColor}`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-bold text-white shrink-0"
          style={{ backgroundColor: avatarBg }}
        >
          {initials}
        </div>
        <p className="text-[9px] font-semibold truncate" style={{ color: s.text }}>
          {name}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold" style={{ color: s.text }}>
          {amount}
        </span>
        <span className="flex items-center gap-1">
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: tagDot }}
          />
          <span className="text-[7px] font-medium" style={{ color: s.text3 }}>
            {tag}
          </span>
        </span>
      </div>
    </div>
  )
}

/* ── Pipeline column ─────────────────────────── */
function KanbanColumn({ title, count, color, children }: {
  title: string
  count: number
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <p className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: s.text2 }}>
          {title}
        </p>
        <span
          className="text-[7px] font-bold ml-auto w-3.5 h-3.5 rounded-md flex items-center justify-center"
          style={{ backgroundColor: s.bg1, color: s.text3 }}
        >
          {count}
        </span>
      </div>
      {children}
    </div>
  )
}

/* ── Activity item ───────────────────────────── */
function ActivityItem({ text, time, dot }: { text: string; time: string; dot: string }) {
  return (
    <div
      className="flex items-start gap-2.5 px-2 py-2 -mx-2 rounded-md transition-colors"
      style={{ cursor: 'default' }}
    >
      <div className="relative mt-1.5 shrink-0">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: dot }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-[2px]"
          style={{ backgroundColor: dot }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] leading-snug" style={{ color: s.text2 }}>
          {text}
        </p>
      </div>
      <span className="text-[8px] shrink-0 font-medium tabular-nums" style={{ color: s.text4 }}>
        {time}
      </span>
    </div>
  )
}

/* ── Floating notification toast ─────────────── */
function FloatingToast() {
  return (
    <div
      className="absolute -right-3 sm:-right-5 top-[60px] sm:top-[72px] z-20 animate-fade-in"
      style={{ animationDelay: '0.8s' }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          backgroundColor: s.surface,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          border: `1px solid ${s.border}`,
        }}
      >
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
          style={{ backgroundColor: s.accent }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="text-[9px] font-semibold" style={{ color: s.text }}>New deal won!</p>
          <p className="text-[7px]" style={{ color: s.text3 }}>Johnson Corp — $34,000</p>
        </div>
      </div>
    </div>
  )
}

/* ── Floating AI chat bubble ─────────────────── */
function FloatingAiBubble() {
  return (
    <div
      className="absolute -left-2 sm:-left-4 bottom-[40px] sm:bottom-[50px] z-20 animate-fade-in"
      style={{ animationDelay: '1.2s' }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          backgroundColor: s.surface,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          border: `1px solid ${s.border}`,
        }}
      >
        <div
          className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c5cfc, #5b8fff)' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a8 8 0 018 8c0 6-8 12-8 12S4 16 4 10a8 8 0 018-8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div>
          <p className="text-[9px] font-semibold" style={{ color: s.text }}>AI Assistant</p>
          <p className="text-[7px]" style={{ color: s.text3 }}>3 follow-ups suggested</p>
        </div>
      </div>
    </div>
  )
}

/* ── Card wrapper (reusable for chart/activity) ─ */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl p-4 relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(180deg, ${s.surface} 0%, ${s.bg2} 100%)`,
        boxShadow: `${s.shadow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
        border: `1px solid ${s.border}`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Main CRM Preview ────────────────────────── */
export default function CrmPreview() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <section className="relative py-8 sm:py-20 px-4 sm:px-6 overflow-visible">
      <div
        ref={ref}
        className={`relative max-w-[1100px] mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        {/* Outer ambient glow */}
        <div
          className="absolute -inset-16 sm:-inset-24 rounded-[40px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(61,107,79,0.08) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Hover scale wrapper */}
        <div className="relative transition-transform duration-700 ease-out hover:scale-[1.015]">
          {/* Floating elements */}
          <FloatingToast />
          <FloatingAiBubble />

          {/* 3D perspective wrapper */}
          <div style={{ perspective: '2400px' }}>
            <div
              className="relative rounded-2xl sm:rounded-[20px] overflow-hidden"
              style={{
                transform: 'rotateX(2deg)',
                transformOrigin: '50% 0%',
                boxShadow:
                  '0 4px 8px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.1), 0 64px 100px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              {/* ── Browser chrome ──────────────── */}
              <div
                className="relative flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3"
                style={{
                  background: 'linear-gradient(180deg, #efece6 0%, #e6e3dc 100%)',
                  borderBottom: `1px solid rgba(0,0,0,0.08)`,
                }}
              >
                {/* Gloss reflection */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)',
                  }}
                />
                {/* Traffic lights */}
                <div className="relative flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: '#ff5f57', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.1)' }} />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: '#febc2e', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.1)' }} />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: '#28c840', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.1)' }} />
                </div>
                {/* URL bar */}
                <div
                  className="relative flex-1 mx-3 sm:mx-12 rounded-lg px-3 py-1.5 text-center"
                  style={{
                    background: `linear-gradient(180deg, ${s.bg} 0%, #f4f1eb 100%)`,
                    border: `1px solid rgba(0,0,0,0.06)`,
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                  }}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={s.text3} strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span className="text-[10px] sm:text-[11px] font-mono" style={{ color: s.text3 }}>
                      <span className="hidden sm:inline" style={{ color: s.text4 }}>https://</span>
                      <span style={{ color: s.text2 }}>app.apexdigital.com</span>
                      <span className="hidden sm:inline" style={{ color: s.text4 }}>/dashboard</span>
                    </span>
                  </div>
                </div>
                <div className="w-4 sm:w-8" />
              </div>

              {/* Top shadow inside content */}
              <div
                className="absolute left-0 right-0 h-4 pointer-events-none z-10"
                style={{
                  top: 40,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.02), transparent)',
                }}
              />

              {/* ── CRM body ────────────────────── */}
              <div className="flex" style={{ backgroundColor: s.bg, minHeight: 420 }}>
                {/* ── Left sidebar ─────────────── */}
                <div
                  className="hidden sm:flex flex-col shrink-0"
                  style={{
                    width: 192,
                    backgroundColor: s.bg1,
                    borderRight: `1px solid ${s.border}`,
                  }}
                >
                  {/* Sidebar header */}
                  <div
                    className="flex items-center gap-2.5 px-4 py-3.5"
                    style={{ borderBottom: `1px solid ${s.border}` }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${s.accent}, #2d5039)`,
                        boxShadow: `0 2px 6px ${s.accent}30`,
                      }}
                    >
                      A
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold block leading-tight" style={{ color: s.text }}>
                        Apex Digital
                      </span>
                      <span className="text-[8px] font-medium" style={{ color: s.text3 }}>
                        Pro Plan
                      </span>
                    </div>
                  </div>

                  {/* Nav items */}
                  <nav className="flex-1 py-3 px-2.5 space-y-0.5">
                    {navItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg transition-colors"
                        style={{
                          backgroundColor: item.active ? s.accentMedium : 'transparent',
                        }}
                      >
                        <SvgIcon
                          size={15}
                          color={item.active ? s.accent : s.text3}
                          strokeWidth={item.active ? 1.8 : 1.5}
                        >
                          {item.icon}
                        </SvgIcon>
                        <span
                          className="text-[11px]"
                          style={{
                            color: item.active ? s.accent : s.text2,
                            fontWeight: item.active ? 600 : 500,
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </nav>

                  {/* Upgrade badge */}
                  <div className="px-3 pb-2">
                    <div
                      className="rounded-lg px-3 py-2 text-center"
                      style={{
                        background: `linear-gradient(135deg, ${s.accentSoft}, rgba(61,107,79,0.03))`,
                        border: `1px solid ${s.accent}15`,
                      }}
                    >
                      <p className="text-[8px] font-semibold" style={{ color: s.accent }}>
                        Upgrade to Agency
                      </p>
                      <p className="text-[7px] mt-0.5" style={{ color: s.text3 }}>
                        Unlock custom themes
                      </p>
                    </div>
                  </div>

                  {/* Sidebar footer */}
                  <div
                    className="px-3 py-3 flex items-center gap-2.5"
                    style={{ borderTop: `1px solid ${s.border}` }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-white/60"
                      style={{ background: 'linear-gradient(135deg, #b8a088, #96816a)' }}
                    >
                      JD
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold truncate" style={{ color: s.text }}>
                        James Donovan
                      </p>
                      <p className="text-[8px]" style={{ color: s.text3 }}>
                        james@apexdigital.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Main content ─────────────── */}
                <div className="flex-1 min-w-0 flex flex-col">
                  {/* Top bar */}
                  <div
                    className="flex items-center justify-between px-4 sm:px-6 py-3"
                    style={{
                      borderBottom: `1px solid ${s.border}`,
                      backgroundColor: s.surface,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div className="flex items-center gap-2 sm:hidden">
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ backgroundColor: s.accent }}
                      >
                        A
                      </div>
                      <span className="text-[11px] font-semibold" style={{ color: s.text }}>
                        Apex Digital
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      <h2 className="text-[14px] font-semibold" style={{ color: s.text }}>
                        Dashboard
                      </h2>
                      <span
                        className="text-[8px] font-medium px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: s.bg1, color: s.text3 }}
                      >
                        Last 30 days
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Search */}
                      <div
                        className="hidden md:flex items-center gap-2 rounded-lg px-3 py-1.5"
                        style={{
                          backgroundColor: s.bg,
                          border: `1px solid ${s.border}`,
                          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={s.text4} strokeWidth="2" strokeLinecap="round">
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <span className="text-[10px]" style={{ color: s.text4 }}>
                          Search contacts...
                        </span>
                        <span
                          className="text-[8px] font-mono px-1 py-0.5 rounded"
                          style={{ backgroundColor: s.bg1, color: s.text4, border: `1px solid ${s.border}` }}
                        >
                          /
                        </span>
                      </div>
                      {/* Bell */}
                      <div
                        className="relative w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={s.text3} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                        </svg>
                        <div
                          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center text-[6px] font-bold text-white"
                          style={{ backgroundColor: '#ef4444', boxShadow: '0 0 0 2px white' }}
                        >
                          3
                        </div>
                      </div>
                      {/* Avatar */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-white/60"
                        style={{ background: 'linear-gradient(135deg, #b8a088, #96816a)' }}
                      >
                        JD
                      </div>
                    </div>
                  </div>

                  {/* ── Horizontal tab nav ────────── */}
                  <div
                    className="flex items-center gap-0 px-4 sm:px-6 overflow-x-auto"
                    style={{
                      backgroundColor: s.surface,
                      borderBottom: `1px solid ${s.border}`,
                    }}
                  >
                    {navItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-1.5 px-3 py-2.5 relative shrink-0"
                        style={{ cursor: 'default' }}
                      >
                        <SvgIcon
                          size={12}
                          color={item.active ? s.accent : s.text4}
                          strokeWidth={item.active ? 1.8 : 1.4}
                        >
                          {item.icon}
                        </SvgIcon>
                        <span
                          className="text-[10px]"
                          style={{
                            color: item.active ? s.accent : s.text3,
                            fontWeight: item.active ? 600 : 450,
                          }}
                        >
                          {item.label}
                        </span>
                        {/* Active underline indicator */}
                        {item.active && (
                          <div
                            className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                            style={{ backgroundColor: s.accent }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dashboard content */}
                  <div
                    className="flex-1 p-4 sm:p-5 space-y-4 overflow-hidden relative"
                    style={{ backgroundColor: s.bg }}
                  >
                    {/* Faint dot pattern */}
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(${s.border} 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }}
                    />

                    <div className="relative space-y-4">
                      {/* Stat cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <StatCard
                          icon="contacts"
                          label="Contacts"
                          value="1,247"
                          change="12.3%"
                          sparkData={[3, 5, 4, 7, 6, 8, 9, 8, 10, 12]}
                        />
                        <StatCard
                          icon="deals"
                          label="Active Deals"
                          value="38"
                          change="5 new"
                          sparkData={[2, 3, 2, 4, 3, 5, 4, 6, 5, 7]}
                        />
                        <StatCard
                          icon="pipeline"
                          label="Pipeline"
                          value="$127.5K"
                          change="18.2%"
                          sparkData={[8, 9, 7, 10, 11, 10, 13, 12, 14, 16]}
                        />
                        <StatCard
                          icon="reply"
                          label="Reply Rate"
                          value="94%"
                          change="3.1%"
                          sparkData={[7, 7, 8, 8, 8, 9, 9, 9, 9, 10]}
                        />
                      </div>

                      {/* Charts row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Card>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[11px] font-semibold" style={{ color: s.text }}>
                                Revenue Trend
                              </p>
                              <p className="text-[9px] mt-0.5" style={{ color: s.text3 }}>
                                Monthly recurring revenue
                              </p>
                            </div>
                            <span
                              className="text-[8px] px-2 py-1 rounded-md font-medium"
                              style={{ backgroundColor: s.bg1, color: s.text3, border: `1px solid ${s.border}` }}
                            >
                              30 days
                            </span>
                          </div>
                          <RevenueChart />
                        </Card>
                        <Card>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[11px] font-semibold" style={{ color: s.text }}>
                                Deals Closed
                              </p>
                              <p className="text-[9px] mt-0.5" style={{ color: s.text3 }}>
                                Weekly conversion breakdown
                              </p>
                            </div>
                            <span
                              className="text-[8px] px-2 py-1 rounded-md font-medium"
                              style={{ backgroundColor: s.bg1, color: s.text3, border: `1px solid ${s.border}` }}
                            >
                              This week
                            </span>
                          </div>
                          <DealsBarChart />
                        </Card>
                      </div>

                      {/* Activity + Pipeline row */}
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        {/* Recent activity */}
                        <Card className="sm:col-span-2">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-[11px] font-semibold" style={{ color: s.text }}>
                              Recent Activity
                            </p>
                            <span
                              className="text-[8px] px-2 py-0.5 rounded-md font-medium"
                              style={{ backgroundColor: s.bg1, color: s.text3, border: `1px solid ${s.border}` }}
                            >
                              Live
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            <ActivityItem
                              text="New lead: Sarah M. — Inbound Form"
                              time="2m"
                              dot="#16a34a"
                            />
                            <ActivityItem
                              text="Deal moved: Johnson Corp → Proposal"
                              time="18m"
                              dot="#f59e0b"
                            />
                            <ActivityItem
                              text={'"Q1 Outreach" campaign — 67% open rate'}
                              time="1h"
                              dot="#6366f1"
                            />
                            <ActivityItem
                              text="Follow up completed: Parkview LLC"
                              time="3h"
                              dot={s.text4}
                            />
                          </div>
                        </Card>

                        {/* Pipeline kanban */}
                        <Card className="sm:col-span-3">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-[11px] font-semibold" style={{ color: s.text }}>
                              Pipeline
                            </p>
                            <span
                              className="text-[8px] px-2 py-0.5 rounded-md font-medium"
                              style={{ backgroundColor: s.bg1, color: s.text3, border: `1px solid ${s.border}` }}
                            >
                              6 deals
                            </span>
                          </div>
                          <div className="flex gap-2.5">
                            <KanbanColumn title="Lead" count={2} color="#16a34a">
                              <KanbanCard name="Sarah Martinez" amount="$4,200" tag="New" tagDot="#16a34a" borderColor="#16a34a" initials="SM" avatarBg="#92b4a1" />
                              <KanbanCard name="Greenfield Inc." amount="$12,800" tag="Warm" tagDot="#f59e0b" borderColor="#16a34a" initials="GI" avatarBg="#8ba896" />
                            </KanbanColumn>
                            <KanbanColumn title="Qualified" count={2} color="#3b82f6">
                              <KanbanCard name="Bright Path Co." amount="$8,500" tag="Demo" tagDot="#3b82f6" borderColor="#3b82f6" initials="BP" avatarBg="#7c9db8" />
                              <KanbanCard name="Oakmont Group" amount="$22,000" tag="Follow-up" tagDot="#f59e0b" borderColor="#3b82f6" initials="OG" avatarBg="#a08c7a" />
                            </KanbanColumn>
                            <KanbanColumn title="Proposal" count={2} color="#8b5cf6">
                              <KanbanCard name="Johnson Corp" amount="$34,000" tag="Pending" tagDot="#8b5cf6" borderColor="#8b5cf6" initials="JC" avatarBg="#9b8ab8" />
                              <KanbanCard name="Riverstone LLC" amount="$18,750" tag="Review" tagDot="#f59e0b" borderColor="#8b5cf6" initials="RL" avatarBg="#7a8fa0" />
                            </KanbanColumn>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center mt-8 sm:mt-10 text-sm text-nestui-text3">
          This is Nest with the <span className="text-nestui-text2 font-medium">Silk</span> theme.
          Choose from 12+ themes or build your own.
        </p>
      </div>
    </section>
  )
}
