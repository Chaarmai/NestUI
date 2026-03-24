import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ── Silk theme tokens ─────────────────────────── */
const s = {
  bg: '#f7f5f0',
  bg1: '#f2efe9',
  bg2: '#fefefe',
  surface: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  accent: '#3d6b4f',
  accentSoft: 'rgba(61,107,79,0.08)',
  text: '#1a1a16',
  text2: '#6b6757',
  text3: '#aba898',
}

/* ── Tiny icon components ──────────────────────── */
function Icon({ d, active = false }: { d: string; active?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? s.accent : s.text3}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  )
}

const icons = {
  dashboard:
    'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
  contacts:
    'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2 M23 21v-2a4 4 0 00-3-3.87 M9 7a4 4 0 100-8 4 4 0 000 8 M16 3.13a4 4 0 010 7.75',
  pipeline:
    'M22 12h-4l-3 9L9 3l-3 9H2',
  campaigns:
    'M22 2L11 13 M22 2l-7 20-4-9-9-4z',
  automation:
    'M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83',
  analytics:
    'M18 20V10 M12 20V4 M6 20v-6',
  settings:
    'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
}

const navItems = [
  { label: 'Dashboard', icon: icons.dashboard, active: true },
  { label: 'Contacts', icon: icons.contacts },
  { label: 'Pipeline', icon: icons.pipeline },
  { label: 'Campaigns', icon: icons.campaigns },
  { label: 'Automation', icon: icons.automation },
  { label: 'Analytics', icon: icons.analytics },
  { label: 'Settings', icon: icons.settings },
]

/* ── Mini SVG chart ───────────────────────────── */
function MiniChart() {
  const points = [
    [0, 38], [14, 32], [28, 35], [42, 24], [56, 28],
    [70, 18], [84, 22], [98, 12], [112, 15], [126, 8],
    [140, 10], [154, 4],
  ]
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const area = `${line} L154,44 L0,44 Z`

  return (
    <svg width="100%" viewBox="0 0 154 44" fill="none" className="mt-2">
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={s.accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={s.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#chart-fill)" />
      <path d={line} stroke={s.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="154" cy="4" r="2.5" fill={s.surface} stroke={s.accent} strokeWidth="1.5" />
    </svg>
  )
}

/* ── Mini bar chart ──────────────────────────── */
function MiniBarChart() {
  const bars = [28, 42, 36, 55, 48, 62, 58]
  return (
    <svg width="100%" viewBox="0 0 112 48" fill="none" className="mt-2">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 16}
          y={48 - h}
          width="10"
          height={h}
          rx="2"
          fill={i === bars.length - 1 ? s.accent : `${s.accent}30`}
        />
      ))}
    </svg>
  )
}

/* ── Stat card ───────────────────────────────── */
function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div
      className="rounded-lg p-3 flex-1 min-w-0"
      style={{ backgroundColor: s.surface, border: `1px solid ${s.border}` }}
    >
      <p className="text-[9px] font-medium uppercase tracking-wider" style={{ color: s.text3 }}>
        {label}
      </p>
      <p className="text-base font-bold mt-0.5 truncate" style={{ color: s.text }}>
        {value}
      </p>
      <p className="text-[9px] font-medium mt-0.5" style={{ color: s.accent }}>
        {change}
      </p>
    </div>
  )
}

/* ── Pipeline kanban card ────────────────────── */
function KanbanCard({ name, amount, tag }: { name: string; amount: string; tag: string }) {
  return (
    <div
      className="rounded-md p-2 mb-1.5 last:mb-0"
      style={{ backgroundColor: s.bg2, border: `1px solid ${s.border}` }}
    >
      <p className="text-[10px] font-semibold truncate" style={{ color: s.text }}>
        {name}
      </p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[9px] font-medium" style={{ color: s.accent }}>
          {amount}
        </span>
        <span
          className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: s.accentSoft, color: s.accent }}
        >
          {tag}
        </span>
      </div>
    </div>
  )
}

/* ── Pipeline column ─────────────────────────── */
function KanbanColumn({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: s.text2 }}>
          {title}
        </p>
        <span
          className="text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: s.accentSoft, color: s.accent }}
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
    <div className="flex items-start gap-2 py-1.5">
      <div
        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
        style={{ backgroundColor: dot }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] leading-snug" style={{ color: s.text2 }}>
          {text}
        </p>
      </div>
      <span className="text-[9px] shrink-0" style={{ color: s.text3 }}>
        {time}
      </span>
    </div>
  )
}

/* ── Main CRM Preview ────────────────────────── */
export default function CrmPreview() {
  const { ref, isVisible } = useScrollReveal(0.08)

  return (
    <section className="relative py-8 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div
        ref={ref}
        className={`relative max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-8 sm:-inset-12 rounded-3xl opacity-40 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(61,107,79,0.15), transparent 70%)' }}
        />

        {/* 3D perspective wrapper */}
        <div
          className="relative"
          style={{
            perspective: '2000px',
          }}
        >
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden"
            style={{
              transform: 'rotateX(2deg) rotateY(0deg)',
              transformOrigin: 'center center',
              boxShadow:
                '0 25px 60px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* ── Browser chrome ──────────────── */}
            <div
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5"
              style={{ backgroundColor: '#e8e5df', borderBottom: `1px solid ${s.border}` }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
              </div>
              {/* URL bar */}
              <div
                className="flex-1 mx-2 sm:mx-8 rounded-md px-3 py-1 text-center"
                style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
              >
                <span className="text-[10px] sm:text-[11px] font-mono" style={{ color: s.text3 }}>
                  <span className="hidden sm:inline" style={{ color: s.text3 }}>https://</span>
                  <span style={{ color: s.text2 }}>app.apexdigital.com</span>
                  <span className="hidden sm:inline" style={{ color: s.text3 }}>/dashboard</span>
                </span>
              </div>
              <div className="w-6 sm:w-8" />
            </div>

            {/* ── CRM body ────────────────────── */}
            <div className="flex" style={{ backgroundColor: s.bg, minHeight: 340 }}>
              {/* ── Left sidebar ─────────────── */}
              <div
                className="hidden sm:flex flex-col shrink-0"
                style={{
                  width: 180,
                  backgroundColor: s.surface,
                  borderRight: `1px solid ${s.border}`,
                }}
              >
                {/* Sidebar logo */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ borderBottom: `1px solid ${s.border}` }}
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: s.accent }}
                  >
                    A
                  </div>
                  <span className="text-[12px] font-semibold" style={{ color: s.text }}>
                    Apex Digital
                  </span>
                </div>

                {/* Nav items */}
                <nav className="flex-1 py-2 px-2 space-y-0.5">
                  {navItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-md transition-colors"
                      style={{
                        backgroundColor: item.active ? s.accentSoft : 'transparent',
                      }}
                    >
                      <Icon d={item.icon} active={item.active} />
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: item.active ? s.accent : s.text2 }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </nav>

                {/* Sidebar footer */}
                <div
                  className="px-3 py-3 flex items-center gap-2"
                  style={{ borderTop: `1px solid ${s.border}` }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ backgroundColor: '#b8a088' }}
                  >
                    JD
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium truncate" style={{ color: s.text }}>
                      James Donovan
                    </p>
                    <p className="text-[8px]" style={{ color: s.text3 }}>
                      Admin
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Main content ─────────────── */}
              <div className="flex-1 min-w-0 flex flex-col">
                {/* Top bar */}
                <div
                  className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5"
                  style={{ borderBottom: `1px solid ${s.border}`, backgroundColor: s.surface }}
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
                  <h2
                    className="hidden sm:block text-[13px] font-semibold"
                    style={{ color: s.text }}
                  >
                    Dashboard
                  </h2>
                  <div className="flex items-center gap-3">
                    {/* Search */}
                    <div
                      className="hidden md:flex items-center gap-2 rounded-md px-2.5 py-1"
                      style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={s.text3} strokeWidth="2" strokeLinecap="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                      <span className="text-[10px]" style={{ color: s.text3 }}>
                        Search...
                      </span>
                    </div>
                    {/* Bell */}
                    <div className="relative">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.text3} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                      </svg>
                      <div
                        className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#ef4444' }}
                      />
                    </div>
                    {/* Avatar */}
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ backgroundColor: '#b8a088' }}
                    >
                      JD
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-hidden" style={{ backgroundColor: s.bg }}>
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3">
                    <StatCard label="Contacts" value="1,247" change="+12.3% ↑" />
                    <StatCard label="Active Deals" value="38" change="+5 this week" />
                    <StatCard label="Pipeline" value="$127.5K" change="+18.2% ↑" />
                    <StatCard label="Reply Rate" value="94%" change="+3.1% ↑" />
                  </div>

                  {/* Charts + Activity row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {/* Revenue chart */}
                    <div
                      className="rounded-lg p-3"
                      style={{ backgroundColor: s.surface, border: `1px solid ${s.border}` }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-semibold" style={{ color: s.text }}>
                          Revenue Trend
                        </p>
                        <span
                          className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: s.accentSoft, color: s.accent }}
                        >
                          Last 30 days
                        </span>
                      </div>
                      <MiniChart />
                    </div>
                    {/* Weekly deals */}
                    <div
                      className="rounded-lg p-3"
                      style={{ backgroundColor: s.surface, border: `1px solid ${s.border}` }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-semibold" style={{ color: s.text }}>
                          Deals Closed
                        </p>
                        <span
                          className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: s.accentSoft, color: s.accent }}
                        >
                          This week
                        </span>
                      </div>
                      <MiniBarChart />
                    </div>
                  </div>

                  {/* Activity + Pipeline row */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3">
                    {/* Recent activity */}
                    <div
                      className="sm:col-span-2 rounded-lg p-3"
                      style={{ backgroundColor: s.surface, border: `1px solid ${s.border}` }}
                    >
                      <p className="text-[10px] font-semibold mb-2" style={{ color: s.text }}>
                        Recent Activity
                      </p>
                      <div
                        className="divide-y"
                        style={{ borderColor: s.border }}
                      >
                        <ActivityItem
                          text="New lead: Sarah M. — Inbound Form"
                          time="2m ago"
                          dot={s.accent}
                        />
                        <ActivityItem
                          text="Deal moved: Johnson Corp → Proposal Sent"
                          time="18m ago"
                          dot="#f59e0b"
                        />
                        <ActivityItem
                          text='Campaign "Q1 Outreach" — 67% open rate'
                          time="1h ago"
                          dot="#6366f1"
                        />
                        <ActivityItem
                          text="Task completed: Follow up with Parkview LLC"
                          time="3h ago"
                          dot={s.text3}
                        />
                      </div>
                    </div>

                    {/* Pipeline kanban */}
                    <div
                      className="sm:col-span-3 rounded-lg p-3"
                      style={{ backgroundColor: s.surface, border: `1px solid ${s.border}` }}
                    >
                      <p className="text-[10px] font-semibold mb-2" style={{ color: s.text }}>
                        Pipeline
                      </p>
                      <div className="flex gap-2">
                        <KanbanColumn title="Lead" count={3}>
                          <KanbanCard name="Sarah Martinez" amount="$4,200" tag="New" />
                          <KanbanCard name="Greenfield Inc." amount="$12,800" tag="Warm" />
                        </KanbanColumn>
                        <KanbanColumn title="Qualified" count={2}>
                          <KanbanCard name="Bright Path Co." amount="$8,500" tag="Demo" />
                          <KanbanCard name="Oakmont Group" amount="$22,000" tag="Follow-up" />
                        </KanbanColumn>
                        <KanbanColumn title="Proposal" count={2}>
                          <KanbanCard name="Johnson Corp" amount="$34,000" tag="Pending" />
                          <KanbanCard name="Riverstone LLC" amount="$18,750" tag="Review" />
                        </KanbanColumn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center mt-6 sm:mt-8 text-sm text-nestui-text3">
          This is Nest with the <span className="text-nestui-text2 font-medium">Silk</span> theme.
          Choose from 12+ themes or build your own.
        </p>
      </div>
    </section>
  )
}
