import { useState, useEffect } from 'react'

/* ── Nav ───────────────────────────────────────────────────────────────────── */
export function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 64, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 2rem',
      background: scrolled ? 'rgba(13,13,13,0.96)' : 'transparent',
      borderBottom: scrolled ? '1px solid #252525' : 'none',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div
        onClick={() => setPage('home')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      >
        <div style={{
          width: 34, height: 34, background: '#F5C518', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 14, color: '#0D0D0D',
          fontFamily: 'var(--font-mono)',
        }}>IV</div>
        <span style={{ fontWeight: 800, fontSize: 17, color: '#F5F5F5', letterSpacing: '-0.3px' }}>
          Intern<span style={{ color: '#F5C518' }}>View</span> AI
        </span>
      </div>

      <div style={{ display: 'flex', gap: 4 }}>
        {[['home','Home'],['simulate','Simulator'],['about','About']].map(([id, label]) => (
          <button key={id} onClick={() => setPage(id)} style={{
            background: page === id ? 'rgba(245,197,24,0.12)' : 'transparent',
            border: page === id ? '1px solid rgba(245,197,24,0.4)' : '1px solid transparent',
            color: page === id ? '#F5C518' : '#888',
            padding: '6px 18px', borderRadius: 6, cursor: 'pointer',
            fontSize: 14, fontWeight: page === id ? 700 : 400,
            fontFamily: 'var(--font-main)', transition: 'all 0.2s',
          }}>{label}</button>
        ))}
      </div>
    </nav>
  )
}

/* ── Slider ────────────────────────────────────────────────────────────────── */
export function Slider({ label, value, min, max, step = 0.01, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100
  const display = format ? format(value) : value.toFixed(2)

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#F5C518', fontFamily: 'var(--font-mono)' }}>
          {display}
        </span>
      </div>
      <div style={{ position: 'relative', height: 4 }}>
        <div style={{ height: 4, background: '#252525', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: '#F5C518', borderRadius: 2, transition: 'width 0.1s' }} />
        </div>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{
            position: 'absolute', top: -6, left: 0, width: '100%',
            opacity: 0, cursor: 'pointer', height: 16,
          }}
        />
      </div>
    </div>
  )
}

/* ── StatCard with count-up ────────────────────────────────────────────────── */
export function StatCard({ value, suffix = '', label, delay = 0, color = '#F5C518' }) {
  const [count, setCount]   = useState(0)
  const [visible, setVisible] = useState(false)
  const target = parseFloat(value)

  useEffect(() => { setTimeout(() => setVisible(true), delay) }, [delay])
  useEffect(() => {
    if (!visible) return
    let cur = 0
    const steps = 50
    const inc = target / steps
    const t = setInterval(() => {
      cur += inc
      if (cur >= target) { setCount(target); clearInterval(t) }
      else setCount(cur)
    }, 20)
    return () => clearInterval(t)
  }, [visible, target])

  const display = Number.isInteger(target)
    ? Math.floor(count).toString()
    : count.toFixed(1)

  return (
    <div style={{
      background: '#1C1C1C', border: '1px solid #252525', borderRadius: 12,
      padding: '1.5rem', textAlign: 'center',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(18px)',
      transition: 'opacity 0.5s, transform 0.5s',
    }}>
      <div style={{ fontSize: 36, fontWeight: 900, color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
        {display}{suffix}
      </div>
      <div style={{ fontSize: 12, color: '#888', marginTop: 6, letterSpacing: '0.3px' }}>{label}</div>
    </div>
  )
}

/* ── Spinner ───────────────────────────────────────────────────────────────── */
export function Spinner({ size = 18, color = '#F5C518' }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size,
      border: `2px solid #333`,
      borderTop: `2px solid ${color}`,
      borderRadius: '50%',
    }} className="spin" />
  )
}

/* ── Badge ─────────────────────────────────────────────────────────────────── */
export function TierBadge({ label, emoji, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: color + '22', border: `1px solid ${color}55`,
      borderRadius: 20, padding: '5px 16px',
      fontSize: 14, fontWeight: 700, color,
    }}>
      <span>{emoji}</span>{label}
    </span>
  )
}
