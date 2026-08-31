import { useState, useEffect, useRef } from 'react'
import { StatCard } from './components.jsx'

function useTypewriter(text, speed = 38) {
  const [display, setDisplay] = useState('')
  const i = useRef(0)
  useEffect(() => {
    i.current = 0; setDisplay('')
    const t = setInterval(() => {
      if (i.current < text.length) { setDisplay(text.slice(0, ++i.current)) }
      else clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])
  return display
}

export default function HomePage({ setPage }) {
  const headline = useTypewriter('Predict Intern Performance with AI Precision')
  const [previewVisible, setPreviewVisible] = useState(false)
  useEffect(() => { setTimeout(() => setPreviewVisible(true), 500) }, [])

  const features = [
    { icon:'🧠', title:'XGBoost Engine',        desc:'Optimized gradient boosting — 300 estimators, lr=0.04, max_depth=2 — achieving 84.6% R² on 573 real intern records.' },
    { icon:'⚡', title:'Live Simulation',         desc:'Tune 9 performance sliders and get an instant prediction from the actual trained .pkl model served via Flask.' },
    { icon:'📊', title:'Feature Impact',          desc:'See which KPIs drive the score using real model feature importances: task completion (26.9%) and deadline adherence (24.3%) lead.' },
    { icon:'🔄', title:'Model Delta View',        desc:'Compare XGBoost vs Random Forest predictions side-by-side. XGBoost consistently outperforms RF by ~2%.' },
    { icon:'🎯', title:'4-Tier Classification',   desc:'Struggle < 50% → Average 50–68% → Excel 68–80% → High Excel 80%+, directly from your notebook\'s labeling logic.' },
    { icon:'🔬', title:'Data Explorer',           desc:'Browse and inspect the actual intern_data.csv directly in the UI — 573 rows, 11 columns, fully searchable.' },
  ]

  const previewBars = [
    ['Deadline Adherence', 0.97],
    ['Task Completion',    0.89],
    ['Attendance Rate',    0.76],
    ['Feedback Rating',    0.68],
    ['Punctuality Score',  0.61],
  ]

  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh', color: '#F5F5F5', paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '6rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.25)',
          borderRadius: 20, padding: '5px 16px', marginBottom: 32,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F5C518', display: 'inline-block' }} className="pulse-dot" />
          <span style={{ color: '#F5C518', fontSize: 13, fontWeight: 600 }}>ML-Powered Performance Intelligence</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1,
          letterSpacing: '-1.5px', margin: '0 0 1.5rem',
          background: 'linear-gradient(135deg, #F5F5F5 0%, #F5C518 55%, #D4A800 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {headline}<span style={{ color: '#F5C518', WebkitTextFillColor: '#F5C518' }}>_</span>
        </h1>

        <p style={{ fontSize: 18, color: '#888', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          End-to-end machine learning pipeline — data generation, XGBoost optimisation,
          and a real-time prediction dashboard built with Python + React.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setPage('simulate')} style={{
            background: '#F5C518', color: '#0D0D0D', border: 'none',
            padding: '13px 30px', borderRadius: 8, fontSize: 15,
            fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-main)',
            transition: 'transform 0.15s',
          }}
            onMouseEnter={e => e.target.style.transform='translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform='translateY(0)'}
          >Launch Simulator →</button>
          <button onClick={() => setPage('about')} style={{
            background: 'transparent', color: '#E8E8E8',
            border: '1px solid #252525', padding: '13px 30px',
            borderRadius: 8, fontSize: 15, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'var(--font-main)',
          }}>View Tech Stack</button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ maxWidth: 900, margin: '0 auto 5rem', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          <StatCard value="84.6" suffix="%" label="XGBoost R² Score"         delay={100} />
          <StatCard value="573"               label="Intern Records"          delay={250} />
          <StatCard value="9"                 label="Performance KPIs"        delay={400} />
          <StatCard value="300"               label="XGBoost Estimators"      delay={550} />
        </div>
      </section>

      {/* ── Dashboard Preview ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto 5rem', padding: '0 2rem' }}>
        <div style={{
          background: '#141414', border: '1px solid #252525', borderRadius: 16, padding: '1.75rem',
          opacity: previewVisible ? 1 : 0, transform: previewVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s, transform 0.6s',
        }}>
          {/* fake browser chrome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
            {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
            <div style={{
              flex: 1, background: '#1C1C1C', borderRadius: 6, padding: '5px 12px',
              fontSize: 12, color: '#555', marginLeft: 8, fontFamily: 'var(--font-mono)',
            }}>internview.ai / simulator</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[['85.1%','Performance Index','#F5C518'],['100%','Completion Rate','#7CC47A'],['82.8%','RF Score','#7DB3F5']].map(([v,l,c]) => (
              <div key={l} style={{ background: '#1C1C1C', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: c, fontFamily: 'var(--font-mono)' }}>{v}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#1C1C1C', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Feature Impact (Real Model)</div>
            {previewBars.map(([name, val]) => (
              <div key={name} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: '#E8E8E8' }}>{name}</span>
                  <span style={{ fontSize: 12, color: '#888', fontFamily: 'var(--font-mono)' }}>{(val*100).toFixed(0)}%</span>
                </div>
                <div style={{ height: 4, background: '#252525', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: previewVisible ? `${val*100}%` : '0%', background: '#F5C518', borderRadius: 2, transition: 'width 1.2s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto 6rem', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 900, marginBottom: 8 }}>What's Inside</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem', fontSize: 15 }}>Every component from scratch — data → model → dashboard</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          {features.map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: '#141414', border: '1px solid #252525', borderRadius: 12, padding: '1.5rem',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(245,197,24,0.35)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#252525'; e.currentTarget.style.transform='translateY(0)' }}
            >
              <div style={{ fontSize: 30, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#F5F5F5', marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#888', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ textAlign: 'center', padding: '3rem 2rem 7rem' }}>
        <div style={{
          display: 'inline-block', background: 'rgba(245,197,24,0.07)',
          border: '1px solid rgba(245,197,24,0.2)', borderRadius: 16, padding: '3rem 4rem',
        }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 10 }}>Ready to evaluate?</h2>
          <p style={{ color: '#888', marginBottom: 24, fontSize: 15 }}>Tune the sliders, fire the real XGBoost model, see instant results.</p>
          <button onClick={() => setPage('simulate')} style={{
            background: '#F5C518', color: '#0D0D0D', border: 'none',
            padding: '13px 34px', borderRadius: 8, fontSize: 15,
            fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-main)',
          }}>Open Simulator</button>
        </div>
      </section>
    </div>
  )
}
