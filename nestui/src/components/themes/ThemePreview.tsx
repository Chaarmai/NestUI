import type { Theme, ThemeColors } from '../../lib/themes'

interface ThemePreviewProps {
  theme: Theme
}

/* ═══════════════════════════════════════════════
   Shared premium building blocks
   ═══════════════════════════════════════════════ */

/** Tiny sparkline SVG */
function Spark({ data, color, w = 24, h = 8 }: { data: number[]; color: string; w?: number; h?: number }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * h * 0.8 - h * 0.1,
  }))
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const cp1x = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * 0.4
    const cp2x = pts[i].x - (pts[i].x - pts[i - 1].x) * 0.4
    d += ` C${cp1x},${pts[i - 1].y} ${cp2x},${pts[i].y} ${pts[i].x},${pts[i].y}`
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={d} stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

/** Premium stat card with sparkline & change pill */
function StatCard({ label, value, change, positive = true, c, sparkData }: {
  label: string; value: string; change: string; positive?: boolean
  c: ThemeColors; sparkData: number[]
}) {
  const isDark = isColorDark(c.bg)
  const green = '#16a34a'
  const red = '#dc2626'
  const changeColor = positive ? green : red
  return (
    <div style={{
      flex: 1,
      borderRadius: 4,
      background: c.surface,
      border: `1px solid ${c.border}`,
      padding: '4px 5px',
      boxShadow: isDark
        ? '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)'
        : '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 4, color: c.text2, marginBottom: 1, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: 0.3 }}>{label}</div>
          <div style={{ fontSize: 7, fontWeight: 700, color: c.text, letterSpacing: -0.2 }}>{value}</div>
        </div>
        <div style={{ flexShrink: 0, paddingTop: 4 }}>
          <Spark data={sparkData} color={c.accent} />
        </div>
      </div>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        marginTop: 2,
        padding: '0.5px 3px',
        borderRadius: 6,
        background: `${changeColor}12`,
        fontSize: 3.5,
        fontWeight: 600,
        color: changeColor,
      }}>
        <svg width="4" height="4" viewBox="0 0 12 12" fill="none">
          <path d={positive ? 'M6 9V3M3 5l3-3 3 3' : 'M6 3v6M3 7l3 3 3-3'} stroke={changeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {change}
      </div>
    </div>
  )
}

/** Bezier revenue chart with gradient fill */
function BezierChart({ c, uid }: { c: ThemeColors; uid: string }) {
  const data: [number, number][] = [
    [0, 28], [14, 24], [28, 26], [42, 18], [56, 22], [70, 14], [84, 16], [98, 10], [112, 12], [126, 6]
  ]
  let d = `M${data[0][0]},${data[0][1]}`
  for (let i = 1; i < data.length; i++) {
    const cp1x = data[i - 1][0] + (data[i][0] - data[i - 1][0]) * 0.4
    const cp2x = data[i][0] - (data[i][0] - data[i - 1][0]) * 0.4
    d += ` C${cp1x},${data[i - 1][1]} ${cp2x},${data[i][1]} ${data[i][0]},${data[i][1]}`
  }
  const areaD = `${d} L126,34 L0,34 Z`
  const last = data[data.length - 1]
  return (
    <svg width="100%" viewBox="0 0 126 34" fill="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={c.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[10, 20, 30].map(y => (
        <line key={y} x1="0" y1={y} x2="126" y2={y} stroke={c.border} strokeWidth="0.3" />
      ))}
      <path d={areaD} fill={`url(#${uid}-fill)`} />
      <path d={d} stroke={c.accent} strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="3" fill={c.accent} opacity="0.15">
        <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={last[0]} cy={last[1]} r="1.5" fill={c.bg} stroke={c.accent} strokeWidth="0.8" />
    </svg>
  )
}

/** Mini bar chart */
function BarChart({ c, uid }: { c: ThemeColors; uid: string }) {
  const bars = [22, 35, 28, 45, 38, 52, 48]
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const maxH = 52
  const hi = 5
  return (
    <svg width="100%" viewBox="0 0 100 40" fill="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`${uid}-bar-a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.accent} />
          <stop offset="100%" stopColor={c.accent} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`${uid}-bar-i`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={c.accent} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => {
        const x = i * 14 + 1
        const barH = (h / maxH) * 28
        return (
          <g key={i}>
            <rect x={x} y={32 - barH} width="10" height={barH} rx="2.5" fill={i === hi ? `url(#${uid}-bar-a)` : `url(#${uid}-bar-i)`} />
            <text x={x + 5} y={38} textAnchor="middle" fill={i === hi ? c.text2 : c.text3} fontSize="4" fontFamily="Inter, system-ui, sans-serif" fontWeight={i === hi ? 600 : 400}>{labels[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** Kanban card */
function KCard({ name, amount, tag, borderColor, c }: {
  name: string; amount: string; tag: string; borderColor: string; c: ThemeColors
}) {
  const isDark = isColorDark(c.bg)
  return (
    <div style={{
      borderRadius: 3,
      padding: '2.5px 3px',
      marginBottom: 2,
      background: c.bg2 || c.bg,
      border: `1px solid ${c.border}`,
      borderLeft: `2px solid ${borderColor}`,
      boxShadow: isDark ? '0 1px 2px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 4, fontWeight: 600, color: c.text }}>{name}</span>
        <span style={{ fontSize: 3.5, fontWeight: 700, color: c.text }}>{amount}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
        <span style={{ width: 2.5, height: 2.5, borderRadius: 999, background: borderColor, flexShrink: 0 }} />
        <span style={{ fontSize: 3, color: c.text3 }}>{tag}</span>
      </div>
    </div>
  )
}

/** Kanban column */
function KCol({ title, count, color, c, children }: {
  title: string; count: number; color: string; c: ThemeColors; children: React.ReactNode
}) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
        <span style={{ width: 3, height: 3, borderRadius: 999, background: color }} />
        <span style={{ fontSize: 3.5, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.3, color: c.text2 }}>{title}</span>
        <span style={{ fontSize: 3, fontWeight: 700, color: c.text3, marginLeft: 'auto' }}>{count}</span>
      </div>
      {children}
    </div>
  )
}

/** Activity feed item */
function ActItem({ text, time, dot, c }: { text: string; time: string; dot: string; c: ThemeColors }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 3, padding: '2px 0' }}>
      <span style={{ width: 3, height: 3, borderRadius: 999, background: dot, marginTop: 1.5, flexShrink: 0, boxShadow: `0 0 3px ${dot}60` }} />
      <span style={{ flex: 1, fontSize: 4, color: c.text2, lineHeight: 1.3 }}>{text}</span>
      <span style={{ fontSize: 3.5, color: c.text3, flexShrink: 0, fontWeight: 500 }}>{time}</span>
    </div>
  )
}

/** Card wrapper with depth */
function Card({ c, children, style }: { c: ThemeColors; children: React.ReactNode; style?: React.CSSProperties }) {
  const isDark = isColorDark(c.bg)
  return (
    <div style={{
      borderRadius: 4,
      background: c.surface,
      border: `1px solid ${c.border}`,
      padding: '4px 5px',
      boxShadow: isDark
        ? '0 1px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)'
        : '0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
      overflow: 'hidden' as const,
      ...style,
    }}>
      {children}
    </div>
  )
}

/** Simple dark-check for bg color */
function isColorDark(hex: string): boolean {
  const clean = hex.replace('#', '')
  if (clean.length < 6) return true
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

/* ── Shared nav item ── */
function NavItem({ label, active, c }: { label: string; active?: boolean; c: ThemeColors }) {
  return (
    <div style={{
      fontSize: 4.5,
      padding: '2px 5px',
      borderRadius: 3,
      color: active ? c.accent : c.text2,
      background: active ? c.accentSoft : 'transparent',
      fontWeight: active ? 700 : 400,
    }}>
      {label}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Premium dashboard content — shared across themes
   ═══════════════════════════════════════════════ */

function PremiumDashboard({ c, uid, compact }: { c: ThemeColors; uid: string; compact?: boolean }) {
  const isDark = isColorDark(c.bg)
  return (
    <div style={{
      flex: 1,
      padding: compact ? 4 : 5,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      minWidth: 0,
      overflow: 'hidden',
      position: 'relative' as const,
    }}>
      {/* Faint dot pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isDark ? 0.15 : 0.3,
        pointerEvents: 'none' as const,
        backgroundImage: `radial-gradient(${c.border} 0.5px, transparent 0.5px)`,
        backgroundSize: '10px 10px',
      }} />
      <div style={{ position: 'relative' as const, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 3 }}>
          <StatCard label="Contacts" value="1,247" change="12%" positive c={c} sparkData={[3, 5, 4, 7, 6, 8, 9, 8, 10, 12]} />
          <StatCard label="Deals" value="$127K" change="18%" positive c={c} sparkData={[8, 9, 7, 10, 11, 10, 13, 12, 14, 16]} />
          <StatCard label="Reply" value="94%" change="3%" positive c={c} sparkData={[7, 7, 8, 8, 8, 9, 9, 9, 9, 10]} />
        </div>
        {/* Charts row */}
        <div style={{ display: 'flex', gap: 3 }}>
          <Card c={c} style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <span style={{ fontSize: 4.5, fontWeight: 600, color: c.text }}>Revenue</span>
              <span style={{ fontSize: 3, color: c.text3, padding: '1px 3px', borderRadius: 3, background: c.accentSoft }}>30d</span>
            </div>
            <BezierChart c={c} uid={uid} />
          </Card>
          <Card c={c} style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <span style={{ fontSize: 4.5, fontWeight: 600, color: c.text }}>Deals</span>
              <span style={{ fontSize: 3, color: c.text3, padding: '1px 3px', borderRadius: 3, background: c.accentSoft }}>Week</span>
            </div>
            <BarChart c={c} uid={uid} />
          </Card>
        </div>
        {/* Activity + Kanban row */}
        <div style={{ display: 'flex', gap: 3 }}>
          <Card c={c} style={{ flex: 2 }}>
            <div style={{ fontSize: 4.5, fontWeight: 600, color: c.text, marginBottom: 2 }}>Activity</div>
            <ActItem text="New lead: Sarah M." time="2m" dot="#16a34a" c={c} />
            <ActItem text="Deal moved: Johnson Corp" time="18m" dot="#f59e0b" c={c} />
            <ActItem text="Campaign sent — 67% open" time="1h" dot="#6366f1" c={c} />
          </Card>
          <Card c={c} style={{ flex: 3 }}>
            <div style={{ fontSize: 4.5, fontWeight: 600, color: c.text, marginBottom: 2 }}>Pipeline</div>
            <div style={{ display: 'flex', gap: 2 }}>
              <KCol title="Lead" count={2} color="#16a34a" c={c}>
                <KCard name="Sarah M." amount="$4.2K" tag="New" borderColor="#16a34a" c={c} />
                <KCard name="Greenfield" amount="$12K" tag="Warm" borderColor="#16a34a" c={c} />
              </KCol>
              <KCol title="Qualified" count={1} color="#3b82f6" c={c}>
                <KCard name="Bright Path" amount="$8.5K" tag="Demo" borderColor="#3b82f6" c={c} />
              </KCol>
              <KCol title="Proposal" count={1} color="#8b5cf6" c={c}>
                <KCard name="Johnson" amount="$34K" tag="Pending" borderColor="#8b5cf6" c={c} />
              </KCol>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Top bar variations
   ═══════════════════════════════════════════════ */

function PremiumTopBar({ c, brandText, children }: { c: ThemeColors; brandText?: string; children?: React.ReactNode }) {
  const isDark = isColorDark(c.bg)
  return (
    <div style={{
      height: 16,
      background: c.bg1,
      borderBottom: `1px solid ${c.border}`,
      display: 'flex',
      alignItems: 'center',
      padding: '0 6px',
      gap: 4,
      flexShrink: 0,
      boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        width: 7,
        height: 7,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${c.accent}, ${c.accent}aa)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 4, fontWeight: 700, color: isDark ? '#fff' : c.bg }}>A</span>
      </div>
      <span style={{ fontSize: 5, fontWeight: 700, color: c.text }}>{brandText ?? 'Apex'}</span>
      {children}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
        <div style={{ width: 7, height: 7, borderRadius: 3, background: c.accentSoft, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke={c.text3} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
        </div>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: isDark ? 'linear-gradient(135deg, #b8a088, #96816a)' : 'linear-gradient(135deg, #96816a, #b8a088)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 3.5,
          fontWeight: 700,
          color: '#fff',
        }}>JD</div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Sidebar variations
   ═══════════════════════════════════════════════ */

const navLabels = ['Dashboard', 'Contacts', 'Pipelines', 'Calendar', 'Automation', 'Settings']

function PremiumSidebar({ c, width = 40, items }: { c: ThemeColors; width?: number; items?: string[] }) {
  const isDark = isColorDark(c.bg)
  const labels = items ?? navLabels
  return (
    <div style={{
      width,
      background: c.bg1,
      borderRight: `1px solid ${c.border}`,
      padding: '6px 3px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      flexShrink: 0,
      boxShadow: isDark ? '1px 0 4px rgba(0,0,0,0.15)' : '1px 0 3px rgba(0,0,0,0.03)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '0 3px 5px',
        marginBottom: 2,
        borderBottom: `1px solid ${c.border}`,
      }}>
        <div style={{
          width: 7,
          height: 7,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${c.accent}, ${c.accent}aa)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 3.5, fontWeight: 700, color: isDark ? '#fff' : c.bg }}>A</span>
        </div>
        <span style={{ fontSize: 4.5, fontWeight: 700, color: c.text }}>Apex</span>
      </div>
      {labels.map((item, i) => (
        <NavItem key={item} label={item} active={i === 0} c={c} />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Theme-specific layouts
   ═══════════════════════════════════════════════ */

export default function ThemePreview({ theme }: ThemePreviewProps) {
  const c = theme.colors
  const isDark = isColorDark(c.bg)

  const base: React.CSSProperties = {
    background: c.bg,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: '4px',
    position: 'relative',
    fontFamily: 'Inter, system-ui, sans-serif',
  }

  switch (theme.id) {

    /* ── Obsidian: Rail + Sidebar (Sci-fi cyan) ── */
    case 'obsidian':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Icon rail */}
            <div style={{
              width: 14,
              background: c.bg2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              paddingTop: 8,
              flexShrink: 0,
              borderRight: `1px solid ${c.border}`,
              boxShadow: '1px 0 6px rgba(0,0,0,0.2)',
            }}>
              {[c.accent, c.text3, c.text3, c.text3, c.text3].map((col, i) => (
                <div key={i} style={{
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  background: col,
                  opacity: i === 0 ? 1 : 0.4,
                  boxShadow: i === 0 ? `0 0 4px ${c.accent}60` : 'none',
                }} />
              ))}
            </div>
            {/* Sidebar */}
            <PremiumSidebar c={c} width={38} />
            {/* Content */}
            <PremiumDashboard c={c} uid="obsidian" />
          </div>
        </div>
      )

    /* ── Aurora: Left Sidebar (Light purple) ── */
    case 'aurora':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <PremiumSidebar c={c} width={44} />
            <PremiumDashboard c={c} uid="aurora" />
          </div>
        </div>
      )

    /* ── Forge: Rail + Sidebar (Amber industrial) ── */
    case 'forge':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Icon rail */}
            <div style={{
              width: 14,
              background: c.bg2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              paddingTop: 8,
              flexShrink: 0,
              borderRight: `1px solid ${c.border}`,
              boxShadow: '1px 0 6px rgba(0,0,0,0.25)',
            }}>
              {[c.accent, c.text3, c.text3, c.text3, c.text3].map((col, i) => (
                <div key={i} style={{
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  background: col,
                  opacity: i === 0 ? 1 : 0.4,
                  boxShadow: i === 0 ? `0 0 4px ${c.accent}50` : 'none',
                }} />
              ))}
            </div>
            {/* Sidebar */}
            <PremiumSidebar c={c} width={38} />
            {/* Content */}
            <PremiumDashboard c={c} uid="forge" />
          </div>
        </div>
      )

    /* ── Phantom: Top Nav Only (Editorial B&W + gold) ── */
    case 'phantom':
      return (
        <div style={base}>
          <PremiumTopBar c={c} brandText="Apex">
            {['Dashboard', 'Contacts', 'Pipelines', 'Calendar'].map((item, i) => (
              <span key={item} style={{
                fontSize: 4.5,
                color: i === 0 ? c.accent : c.text3,
                fontWeight: i === 0 ? 700 : 400,
                borderBottom: i === 0 ? `1px solid ${c.accent}` : 'none',
                paddingBottom: 1,
              }}>{item}</span>
            ))}
          </PremiumTopBar>
          <PremiumDashboard c={c} uid="phantom" />
        </div>
      )

    /* ── Nova: Top Pill Tabs (Glass purple) ── */
    case 'nova':
      return (
        <div style={base}>
          {/* Pill tab bar */}
          <div style={{
            height: 18,
            background: c.bg1,
            borderBottom: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            padding: '0 8px',
            flexShrink: 0,
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}>
            {['Dashboard', 'Contacts', 'Pipelines', 'Calendar'].map((item, i) => (
              <div key={item} style={{
                fontSize: 4.5,
                padding: '2px 6px',
                borderRadius: 8,
                color: i === 0 ? c.accent : c.text3,
                background: i === 0 ? c.accentSoft : 'transparent',
                border: i === 0 ? `1px solid ${c.accent}30` : '1px solid transparent',
                fontWeight: i === 0 ? 700 : 400,
                boxShadow: i === 0 ? `0 0 6px ${c.accent}20` : 'none',
              }}>{item}</div>
            ))}
            <div style={{
              marginLeft: 'auto',
              width: 8,
              height: 8,
              borderRadius: 999,
              background: 'linear-gradient(135deg, #b8a088, #96816a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 3.5,
              fontWeight: 700,
              color: '#fff',
            }}>JD</div>
          </div>
          <PremiumDashboard c={c} uid="nova" />
        </div>
      )

    /* ── Ember: Bottom Dock (Luxury crimson) ── */
    case 'ember':
      return (
        <div style={base}>
          {/* Minimal top bar */}
          <PremiumTopBar c={c} brandText="Apex" />
          <PremiumDashboard c={c} uid="ember" compact />
          {/* Bottom dock */}
          <div style={{
            height: 16,
            background: c.bg1,
            borderTop: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '0 12px',
            flexShrink: 0,
            boxShadow: isDark ? '0 -1px 4px rgba(0,0,0,0.2)' : '0 -1px 3px rgba(0,0,0,0.04)',
          }}>
            {['Home', 'Contacts', 'Deals', 'Tasks', 'More'].map((item, i) => (
              <div key={item} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <div style={{
                  width: 5,
                  height: 5,
                  borderRadius: 2,
                  background: i === 0 ? c.accent : c.text3,
                  opacity: i === 0 ? 1 : 0.4,
                  boxShadow: i === 0 ? `0 0 4px ${c.accent}50` : 'none',
                }} />
                <div style={{ fontSize: 3, color: i === 0 ? c.accent : c.text3, fontWeight: i === 0 ? 600 : 400 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )

    /* ── Prism: Wide Sidebar + Lead Previews ── */
    case 'prism':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Wide sidebar with lead previews */}
            <div style={{
              width: 58,
              background: c.bg1,
              borderRight: `1px solid ${c.border}`,
              padding: '5px 4px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flexShrink: 0,
              boxShadow: '1px 0 6px rgba(0,0,0,0.2)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '0 2px 4px',
                marginBottom: 1,
                borderBottom: `1px solid ${c.border}`,
              }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${c.accent}, ${c.accent}aa)`,
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: 4.5, fontWeight: 700, color: c.accent }}>Leads</span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 3,
                  color: c.text3,
                  padding: '0.5px 3px',
                  borderRadius: 4,
                  background: c.accentSoft,
                  fontWeight: 600,
                }}>4</span>
              </div>
              {[
                { name: 'Sarah Chen', company: 'Acme Corp', amount: '$12K' },
                { name: 'James Wilson', company: 'TechStart', amount: '$8.5K' },
                { name: 'Maria Lopez', company: 'GrowthCo', amount: '$24K' },
                { name: 'Alex Kim', company: 'DataFlow', amount: '$15K' },
              ].map((lead, i) => (
                <div key={lead.name} style={{
                  borderRadius: 3,
                  background: i === 0 ? c.accentSoft : c.surface,
                  border: `1px solid ${i === 0 ? c.accent + '30' : c.border}`,
                  padding: '3px 4px',
                  boxShadow: i === 0 ? `0 0 4px ${c.accent}15` : '0 1px 2px rgba(0,0,0,0.1)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <div style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: ['#92b4a1', '#7c9db8', '#a08c7a', '#8ba896'][i],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 2.5,
                        fontWeight: 700,
                        color: '#fff',
                      }}>{lead.name.split(' ').map(n => n[0]).join('')}</div>
                      <span style={{ fontSize: 4.5, fontWeight: 600, color: c.text }}>{lead.name}</span>
                    </div>
                    <span style={{ fontSize: 4, fontWeight: 700, color: c.accent }}>{lead.amount}</span>
                  </div>
                  <span style={{ fontSize: 3.5, color: c.text3, marginLeft: 8 }}>{lead.company}</span>
                </div>
              ))}
            </div>
            <PremiumDashboard c={c} uid="prism" />
          </div>
        </div>
      )

    /* ── Void: Right Panel Nav (Brutalist green) ── */
    case 'void':
      return (
        <div style={base}>
          <PremiumTopBar c={c} brandText="Apex" />
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <PremiumDashboard c={c} uid="void" />
            {/* Right panel */}
            <div style={{
              width: 38,
              background: c.bg1,
              borderLeft: `1px solid ${c.border}`,
              padding: '6px 3px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              flexShrink: 0,
              boxShadow: '-1px 0 6px rgba(0,0,0,0.2)',
            }}>
              <div style={{
                fontSize: 5,
                fontWeight: 700,
                color: c.accent,
                padding: '0 3px 4px',
                borderBottom: `1px solid ${c.border}`,
                marginBottom: 2,
                letterSpacing: 1,
                textTransform: 'uppercase' as const,
                fontFamily: 'JetBrains Mono, monospace',
              }}>Nav</div>
              {navLabels.map((item, i) => (
                <NavItem key={item} label={item} active={i === 0} c={c} />
              ))}
            </div>
          </div>
        </div>
      )

    /* ── Silk: Floating Center Nav (Sage green on cream) ── */
    case 'silk':
      return (
        <div style={base}>
          <PremiumTopBar c={c} brandText="Apex" />
          <PremiumDashboard c={c} uid="silk" />
          {/* Floating pill bar */}
          <div style={{
            position: 'absolute',
            bottom: 5,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 4,
            background: isDark ? c.bg1 : '#fff',
            border: `1px solid ${c.border}`,
            borderRadius: 12,
            padding: '3px 8px',
            alignItems: 'center',
            boxShadow: isDark
              ? '0 4px 12px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)'
              : '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
          }}>
            {['Home', 'Contacts', 'Deals', 'Tasks'].map((item, i) => (
              <div key={item} style={{
                fontSize: 4,
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? c.accent : c.text3,
                padding: '2px 4px',
                borderRadius: 6,
                background: i === 0 ? c.accentSoft : 'transparent',
              }}>{item}</div>
            ))}
          </div>
        </div>
      )

    /* ── Ivory: Floating Top Bar (Luxury gold) ── */
    case 'ivory':
      return (
        <div style={base}>
          {/* Floating top bar with rounded corners */}
          <div style={{ padding: '4px 5px 0', flexShrink: 0 }}>
            <div style={{
              height: 14,
              background: '#fff',
              borderRadius: 8,
              border: `1px solid ${c.border}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 6px',
              gap: 4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
            }}>
              <div style={{
                width: 7,
                height: 7,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${c.accent}, #dab65e)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 3.5, fontWeight: 700, color: '#fff' }}>A</span>
              </div>
              <span style={{ fontSize: 5, fontWeight: 700, color: c.text }}>Apex</span>
              {['Dashboard', 'Contacts', 'Pipelines'].map((item, i) => (
                <span key={item} style={{
                  fontSize: 4,
                  color: i === 0 ? c.accent : c.text3,
                  fontWeight: i === 0 ? 600 : 400,
                }}>{item}</span>
              ))}
              <div style={{
                marginLeft: 'auto',
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'linear-gradient(135deg, #c4993c, #dab65e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 3.5,
                fontWeight: 700,
                color: '#fff',
              }}>JD</div>
            </div>
          </div>
          <PremiumDashboard c={c} uid="ivory" />
        </div>
      )

    /* ── Cloud: Pill Sidebar (Sky blue) ── */
    case 'cloud':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Pill-style sidebar */}
            <div style={{
              width: 44,
              background: c.bg1,
              borderRight: `1px solid ${c.border}`,
              padding: '6px 4px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              flexShrink: 0,
              boxShadow: '1px 0 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '0 3px 5px',
                marginBottom: 2,
                borderBottom: `1px solid ${c.border}`,
              }}>
                <div style={{
                  width: 7,
                  height: 7,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${c.accent}, #5aa4f5)`,
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: 4.5, fontWeight: 700, color: c.text }}>Apex</span>
              </div>
              {navLabels.map((item, i) => (
                <div key={item} style={{
                  fontSize: 4.5,
                  padding: '2.5px 6px',
                  borderRadius: 10,
                  color: i === 0 ? c.accent : c.text2,
                  background: i === 0 ? c.accentSoft : 'transparent',
                  fontWeight: i === 0 ? 700 : 400,
                  border: i === 0 ? `1px solid ${c.accent}18` : '1px solid transparent',
                }}>
                  {item}
                </div>
              ))}
            </div>
            <PremiumDashboard c={c} uid="cloud" />
          </div>
        </div>
      )

    /* ── Pearl: Top Tabs + Underline (Rose blush) ── */
    case 'pearl':
      return (
        <div style={base}>
          <PremiumTopBar c={c} brandText="Apex" />
          {/* Tab bar with underline indicator */}
          <div style={{
            height: 14,
            background: c.surface,
            borderBottom: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 8px',
            gap: 8,
            flexShrink: 0,
          }}>
            {['Dashboard', 'Contacts', 'Pipelines', 'Calendar'].map((item, i) => (
              <span key={item} style={{
                fontSize: 4.5,
                color: i === 0 ? c.accent : c.text3,
                fontWeight: i === 0 ? 600 : 400,
                paddingBottom: 3,
                borderBottom: i === 0 ? `1.5px solid ${c.accent}` : '1.5px solid transparent',
              }}>{item}</span>
            ))}
          </div>
          <PremiumDashboard c={c} uid="pearl" />
        </div>
      )

    /* ── Linen: Compact Icon Sidebar (Terracotta) ── */
    case 'linen':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Compact icon-only sidebar */}
            <div style={{
              width: 18,
              background: c.bg1,
              borderRight: `1px solid ${c.border}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              paddingTop: 6,
              flexShrink: 0,
              boxShadow: '1px 0 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${c.accent}, #d88a60)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 4,
              }}>
                <span style={{ fontSize: 4, fontWeight: 700, color: '#fff' }}>A</span>
              </div>
              {['#e8ddd0', c.text3, c.text3, c.text3, c.text3, c.text3].map((col, i) => (
                <div key={i} style={{
                  width: 8,
                  height: 8,
                  borderRadius: 3,
                  background: i === 0 ? c.accentSoft : 'transparent',
                  border: i === 0 ? `1px solid ${c.accent}25` : `1px solid ${c.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: 4,
                    height: 4,
                    borderRadius: 1.5,
                    background: i === 0 ? c.accent : col,
                    opacity: i === 0 ? 1 : 0.4,
                  }} />
                </div>
              ))}
            </div>
            <PremiumDashboard c={c} uid="linen" />
          </div>
        </div>
      )

    /* ── Frost: Glass Pill Tabs (Electric indigo) ── */
    case 'frost':
      return (
        <div style={base}>
          {/* Glassmorphic pill tab bar */}
          <div style={{
            height: 18,
            background: c.bg1,
            borderBottom: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            padding: '0 8px',
            flexShrink: 0,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            {['Dashboard', 'Contacts', 'Pipelines', 'Calendar'].map((item, i) => (
              <div key={item} style={{
                fontSize: 4.5,
                padding: '2px 6px',
                borderRadius: 8,
                color: i === 0 ? '#fff' : c.text3,
                background: i === 0 ? `linear-gradient(135deg, ${c.accent}, #8b6ce0)` : 'transparent',
                border: i === 0 ? 'none' : '1px solid transparent',
                fontWeight: i === 0 ? 700 : 400,
                boxShadow: i === 0 ? `0 2px 6px ${c.accent}30` : 'none',
              }}>{item}</div>
            ))}
            <div style={{
              marginLeft: 'auto',
              width: 8,
              height: 8,
              borderRadius: 999,
              background: 'linear-gradient(135deg, #8b6ce0, #6c47d9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 3.5,
              fontWeight: 700,
              color: '#fff',
            }}>JD</div>
          </div>
          <PremiumDashboard c={c} uid="frost" />
        </div>
      )

    /* ── Canvas: Bottom Dock (Forest green) ── */
    case 'canvas':
      return (
        <div style={base}>
          <PremiumTopBar c={c} brandText="Apex" />
          <PremiumDashboard c={c} uid="canvas" compact />
          {/* Bottom dock */}
          <div style={{
            height: 16,
            background: '#fff',
            borderTop: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '0 12px',
            flexShrink: 0,
            boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
          }}>
            {['Home', 'Contacts', 'Deals', 'Tasks', 'More'].map((item, i) => (
              <div key={item} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <div style={{
                  width: 5,
                  height: 5,
                  borderRadius: 2,
                  background: i === 0 ? c.accent : c.text3,
                  opacity: i === 0 ? 1 : 0.4,
                  boxShadow: i === 0 ? `0 0 4px ${c.accent}40` : 'none',
                }} />
                <div style={{ fontSize: 3, color: i === 0 ? c.accent : c.text3, fontWeight: i === 0 ? 600 : 400 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return <div style={{ ...base, background: theme.swatch }} />
  }
}
