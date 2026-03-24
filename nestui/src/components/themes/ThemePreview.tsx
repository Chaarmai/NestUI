import type { Theme, ThemeColors } from '../../lib/themes'

interface ThemePreviewProps {
  theme: Theme
}

/* ── Shared building blocks ── */

function StatCard({ label, value, c }: { label: string; value: string; c: ThemeColors }) {
  return (
    <div style={{ flex: 1, borderRadius: 4, background: c.surface, border: `1px solid ${c.border}`, padding: '6px 8px' }}>
      <div style={{ fontSize: 5, color: c.text2, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 8, fontWeight: 700, color: c.text }}>{value}</div>
    </div>
  )
}

function MiniChart({ color }: { c?: ThemeColors; color: string }) {
  const bars = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 68]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: '100%', padding: '0 2px 4px' }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 1, background: color, opacity: i === bars.length - 3 ? 1 : 0.4 }} />
      ))}
    </div>
  )
}

function TableRows({ c, rows }: { c: ThemeColors; rows: string[][] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 6px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: c.accentSoft, border: `1px solid ${c.border}`, flexShrink: 0 }} />
          <div style={{ flex: 2 }}>
            <div style={{ fontSize: 5, fontWeight: 600, color: c.text }}>{row[0]}</div>
            <div style={{ fontSize: 4, color: c.text3 }}>{row[1]}</div>
          </div>
          <div style={{ fontSize: 5, color: c.accent, fontWeight: 600, flexShrink: 0 }}>{row[2]}</div>
        </div>
      ))}
    </div>
  )
}

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

function SidebarNav({ c, items, width }: { c: ThemeColors; items: string[]; width: number }) {
  return (
    <div style={{ width, background: c.bg1, borderRight: `1px solid ${c.border}`, padding: '6px 3px', display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0 }}>
      <div style={{ fontSize: 5, fontWeight: 700, color: c.accent, padding: '0 4px 4px', marginBottom: 2 }}>CRM</div>
      {items.map((item, i) => (
        <NavItem key={item} label={item} active={i === 0} c={c} />
      ))}
    </div>
  )
}

function TopBar({ c, children }: { c: ThemeColors; children?: React.ReactNode }) {
  return (
    <div style={{ height: 14, background: c.bg1, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 6, flexShrink: 0 }}>
      <div style={{ fontSize: 5, fontWeight: 700, color: c.accent }}>CRM</div>
      {children}
      <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: 4, background: c.accentSoft, border: `1px solid ${c.border}` }} />
    </div>
  )
}

function DashboardContent({ c }: { c: ThemeColors }) {
  return (
    <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, overflow: 'hidden' }}>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 3 }}>
        <StatCard label="Contacts" value="2,847" c={c} />
        <StatCard label="Deals" value="$184K" c={c} />
        <StatCard label="Tasks" value="23" c={c} />
      </div>
      {/* Chart */}
      <div style={{ flex: 1, borderRadius: 4, background: c.surface, border: `1px solid ${c.border}`, padding: '4px 4px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 5, fontWeight: 600, color: c.text, padding: '0 2px 3px' }}>Revenue</div>
        <div style={{ flex: 1 }}>
          <MiniChart c={c} color={c.accent} />
        </div>
      </div>
      {/* Table */}
      <div style={{ borderRadius: 4, background: c.surface, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
        <div style={{ fontSize: 5, fontWeight: 600, color: c.text, padding: '4px 6px 2px' }}>Recent Leads</div>
        <TableRows c={c} rows={[
          ['Sarah Chen', 'Acme Corp', '$12K'],
          ['James Wilson', 'TechStart', '$8.5K'],
          ['Maria Lopez', 'GrowthCo', '$24K'],
        ]} />
      </div>
    </div>
  )
}

/* ── Theme previews ── */

const sidebarItems = ['Dashboard', 'Contacts', 'Pipelines', 'Calendar', 'Automation', 'Sites']

export default function ThemePreview({ theme }: ThemePreviewProps) {
  const c = theme.colors

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
    /* ── Rail + Sidebar ── */
    case 'obsidian':
    case 'forge':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Icon rail */}
            <div style={{ width: 14, background: c.bg2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, paddingTop: 8, flexShrink: 0 }}>
              {[c.accent, c.text3, c.text3, c.text3, c.text3].map((col, i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: 2, background: col, opacity: i === 0 ? 1 : 0.5 }} />
              ))}
            </div>
            {/* Sidebar */}
            <SidebarNav c={c} items={sidebarItems} width={38} />
            {/* Content */}
            <DashboardContent c={c} />
          </div>
        </div>
      )

    /* ── Left Sidebar ── */
    case 'aurora':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <SidebarNav c={c} items={sidebarItems} width={44} />
            <DashboardContent c={c} />
          </div>
        </div>
      )

    /* ── Top Nav Only ── */
    case 'phantom':
      return (
        <div style={base}>
          <TopBar c={c}>
            {['Dashboard', 'Contacts', 'Pipelines', 'Calendar'].map((item, i) => (
              <div key={item} style={{ fontSize: 4.5, color: i === 0 ? c.accent : c.text3, fontWeight: i === 0 ? 700 : 400 }}>{item}</div>
            ))}
          </TopBar>
          <DashboardContent c={c} />
        </div>
      )

    /* ── Top Pill Tabs ── */
    case 'nova':
      return (
        <div style={base}>
          {/* Pill tab bar */}
          <div style={{ height: 16, background: c.bg1, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '0 8px', flexShrink: 0 }}>
            {['Dashboard', 'Contacts', 'Pipelines', 'Calendar'].map((item, i) => (
              <div key={item} style={{
                fontSize: 4.5,
                padding: '2px 6px',
                borderRadius: 8,
                color: i === 0 ? c.accent : c.text3,
                background: i === 0 ? c.accentSoft : 'transparent',
                border: i === 0 ? `1px solid ${c.accent}40` : '1px solid transparent',
                fontWeight: i === 0 ? 700 : 400,
              }}>{item}</div>
            ))}
            <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: 4, background: c.accentSoft, border: `1px solid ${c.border}` }} />
          </div>
          <DashboardContent c={c} />
        </div>
      )

    /* ── Bottom Dock ── */
    case 'ember':
      return (
        <div style={base}>
          {/* Minimal top bar */}
          <div style={{ height: 12, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0 }}>
            <div style={{ fontSize: 5, fontWeight: 700, color: c.accent }}>CRM</div>
            <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: 4, background: c.accentSoft }} />
          </div>
          <DashboardContent c={c} />
          {/* Bottom dock */}
          <div style={{ height: 14, background: c.bg1, borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '0 12px', flexShrink: 0 }}>
            {['Home', 'Contacts', 'Deals', 'Tasks', 'More'].map((item, i) => (
              <div key={item} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <div style={{ width: 5, height: 5, borderRadius: 2, background: i === 0 ? c.accent : c.text3, opacity: i === 0 ? 1 : 0.5 }} />
                <div style={{ fontSize: 3, color: i === 0 ? c.accent : c.text3 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )

    /* ── Wide Sidebar + Previews ── */
    case 'prism':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Wide sidebar with lead previews */}
            <div style={{ width: 56, background: c.bg1, borderRight: `1px solid ${c.border}`, padding: '5px 4px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
              <div style={{ fontSize: 5, fontWeight: 700, color: c.accent, padding: '0 2px 3px' }}>Leads</div>
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
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 4.5, fontWeight: 600, color: c.text }}>{lead.name}</div>
                    <div style={{ fontSize: 4, fontWeight: 600, color: c.accent }}>{lead.amount}</div>
                  </div>
                  <div style={{ fontSize: 3.5, color: c.text3 }}>{lead.company}</div>
                </div>
              ))}
            </div>
            <DashboardContent c={c} />
          </div>
        </div>
      )

    /* ── Right Panel Nav ── */
    case 'void':
      return (
        <div style={base}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <DashboardContent c={c} />
            {/* Right panel */}
            <div style={{ width: 38, background: c.bg1, borderLeft: `1px solid ${c.border}`, padding: '6px 3px', display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0 }}>
              <div style={{ fontSize: 5, fontWeight: 700, color: c.accent, padding: '0 4px 4px' }}>Nav</div>
              {sidebarItems.map((item, i) => (
                <NavItem key={item} label={item} active={i === 0} c={c} />
              ))}
            </div>
          </div>
        </div>
      )

    /* ── Floating Center Nav ── */
    case 'silk':
      return (
        <div style={base}>
          <DashboardContent c={c} />
          {/* Floating pill bar */}
          <div style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 6,
            background: c.bg1,
            border: `1px solid ${c.border}`,
            borderRadius: 12,
            padding: '3px 10px',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
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

    default:
      return <div style={{ ...base, background: theme.swatch }} />
  }
}
