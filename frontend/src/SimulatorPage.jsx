import { useState } from 'react'
import { Slider, Spinner, TierBadge } from './components.jsx'
import { fetchPrediction } from './api.js'

const SECTION_STYLE = {
  background: '#141414', border: '1px solid #252525',
  borderRadius: 16, padding: '1.5rem',
}
const LABEL_STYLE = {
  fontSize: 11, color: '#555', textTransform: 'uppercase',
  letterSpacing: '0.8px', marginBottom: 6,
}

export default function SimulatorPage() {
  const [inputs, setInputs] = useState({
    task_completion_rate:     0.85,
    avg_task_time_hours:      4.0,
    feedback_rating:          4.2,
    attendance_rate:          0.95,
    punctuality_score:        7.5,
    problem_solving_rating:   3.8,
    team_collaboration_score: 7.2,
    training_completion_pct:  0.88,
    // derived — user controls total tasks and on-time to compute ratio
    _total_tasks: 15,
    _on_time:     14,
  })

  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const set = key => val => setInputs(p => ({ ...p, [key]: val }))

  // deadline_adherence_ratio is derived from sliders
  const deadlineRatio = inputs._total_tasks > 0
    ? parseFloat((inputs._on_time / inputs._total_tasks).toFixed(4))
    : 0

  async function handlePredict() {
    setLoading(true); setError(null)
    try {
      const payload = {
        task_completion_rate:     inputs.task_completion_rate,
        avg_task_time_hours:      inputs.avg_task_time_hours,
        feedback_rating:          inputs.feedback_rating,
        attendance_rate:          inputs.attendance_rate,
        punctuality_score:        inputs.punctuality_score,
        problem_solving_rating:   inputs.problem_solving_rating,
        team_collaboration_score: inputs.team_collaboration_score,
        training_completion_pct:  inputs.training_completion_pct,
        deadline_adherence_ratio: deadlineRatio,
      }
      const data = await fetchPrediction(payload)
      setResult(data)
    } catch (e) {
      setError('Backend not reachable. Run: cd backend && python app.py')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh', color: '#F5F5F5', paddingTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 6 }}>
            Performance <span style={{ color: '#F5C518' }}>Simulator</span>
          </h1>
          <p style={{ color: '#888', fontSize: 15 }}>
            Adjust the intern's KPIs — the real trained XGBoost model (84.6% R²) predicts their score instantly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 22, alignItems: 'start' }}>

          {/* ── Input Panel ── */}
          <div style={{ ...SECTION_STYLE, position: 'sticky', top: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
              <div style={{ width: 4, height: 20, background: '#F5C518', borderRadius: 2 }} />
              <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#E8E8E8' }}>
                Simulation Metrics
              </span>
            </div>

            <Slider label="Task Completion Rate"
              value={inputs.task_completion_rate} min={0.2} max={1} step={0.01}
              onChange={set('task_completion_rate')}
              format={v => `${(v*100).toFixed(0)}%`} />

            <Slider label="Avg Task Time (hrs)"
              value={inputs.avg_task_time_hours} min={1} max={20} step={0.5}
              onChange={set('avg_task_time_hours')}
              format={v => `${v.toFixed(1)}h`} />

            <Slider label="Feedback Rating"
              value={inputs.feedback_rating} min={1} max={5} step={0.1}
              onChange={set('feedback_rating')}
              format={v => v.toFixed(1)} />

            <Slider label="Attendance Rate"
              value={inputs.attendance_rate} min={0.35} max={1} step={0.01}
              onChange={set('attendance_rate')}
              format={v => `${(v*100).toFixed(0)}%`} />

            <Slider label="Total Tasks Assigned"
              value={inputs._total_tasks} min={5} max={18} step={1}
              onChange={v => set('_total_tasks')(v)}
              format={v => `${v}`} />

            <Slider label="Tasks Completed On-Time"
              value={inputs._on_time} min={0} max={inputs._total_tasks} step={1}
              onChange={set('_on_time')}
              format={v => `${v}`} />

            <Slider label="Punctuality Score"
              value={inputs.punctuality_score} min={1} max={10} step={0.5}
              onChange={set('punctuality_score')}
              format={v => v.toFixed(1)} />

            <Slider label="Mentor Rating"
              value={inputs.feedback_rating} min={1} max={5} step={0.1}
              onChange={set('feedback_rating')}
              format={v => v.toFixed(1)} />

            <Slider label="Communication Score"
              value={inputs.team_collaboration_score} min={1} max={10} step={0.5}
              onChange={set('team_collaboration_score')}
              format={v => v.toFixed(1)} />

            {/* Derived display */}
            <div style={{ background: '#1C1C1C', borderRadius: 8, padding: '10px 12px', marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 0.8 }}>Deadline Ratio (derived)</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F5C518', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                {deadlineRatio.toFixed(2)}
              </div>
            </div>

            <button onClick={handlePredict} disabled={loading} style={{
              width: '100%', background: loading ? '#1C1C1C' : '#F5C518',
              color: loading ? '#888' : '#0D0D0D',
              border: 'none', borderRadius: 8, padding: '13px',
              fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-main)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8, transition: 'all 0.2s',
            }}>
              {loading ? <><Spinner /> Predicting…</> : '⚡ Predict Performance'}
            </button>

            {error && (
              <div style={{ marginTop: 12, background: 'rgba(232,124,124,0.1)', border: '1px solid rgba(232,124,124,0.3)', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: '#E87C7C', lineHeight: 1.5 }}>
                {error}
              </div>
            )}
          </div>

          {/* ── Results Panel ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Score Card */}
            <div style={{
              ...SECTION_STYLE,
              border: result ? `1px solid ${result.tier.color}33` : '1px solid #252525',
              transition: 'border-color 0.4s',
            }}>
              {!result ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 0' }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>🎯</div>
                  <div style={{ color: '#555', fontSize: 16 }}>Adjust the sliders and click Predict Performance</div>
                  <div style={{ color: '#333', fontSize: 13, marginTop: 8 }}>Calls the real XGBoost .pkl model via Flask</div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                  <div>
                    <div style={LABEL_STYLE}>Performance Index</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                      <span style={{ fontSize: 72, fontWeight: 900, color: result.tier.color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                        {result.score_pct}
                      </span>
                      <span style={{ fontSize: 28, fontWeight: 700, color: result.tier.color }}>%</span>
                    </div>
                    <TierBadge {...result.tier} />
                    <div style={{ marginTop: 10, fontSize: 12, color: '#555', fontFamily: 'var(--font-mono)' }}>
                      RF: {result.rf_score}%  ·  XGB Δ: +{result.delta}%  ·  raw: {result.raw_score}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      ['Completion',  `${(inputs._on_time/inputs._total_tasks*100).toFixed(0)}%`],
                      ['On-Time',     `${(deadlineRatio*100).toFixed(0)}%`],
                      ['Efficiency',  `${Math.max(1, 10 - Math.floor(inputs.avg_task_time_hours/2))}`],
                      ['RF Score',    `${result.rf_score}%`],
                    ].map(([k, v]) => (
                      <div key={k} style={{ background: '#1C1C1C', borderRadius: 10, padding: '0.75rem 1rem', minWidth: 120 }}>
                        <div style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 0.6 }}>{k}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#F5F5F5', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Feature Impact + Model Delta */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>

              {/* Feature Impact */}
              <div style={SECTION_STYLE}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
                  <span style={{ fontSize: 16 }}>📈</span>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#E8E8E8' }}>Feature Impact</span>
                </div>
                {result ? result.feature_impact.slice(0, 7).map(({ name, importance }) => (
                  <div key={name} style={{ marginBottom: 11 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: '#E8E8E8' }}>{name}</span>
                      <span style={{ fontSize: 11, color: '#888', fontFamily: 'var(--font-mono)' }}>{(importance*100).toFixed(1)}%</span>
                    </div>
                    <div style={{ height: 4, background: '#252525', borderRadius: 2 }}>
                      <div style={{
                        height: '100%', borderRadius: 2, background: '#F5C518',
                        width: `${importance*100 / 0.27 * 100}%`,
                        maxWidth: '100%', transition: 'width 0.9s ease',
                      }} />
                    </div>
                  </div>
                )) : (
                  <div style={{ color: '#333', fontSize: 13, textAlign: 'center', padding: '2rem 0' }}>Run prediction first</div>
                )}
              </div>

              {/* Model Delta */}
              <div style={SECTION_STYLE}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
                  <span style={{ fontSize: 16 }}>🔄</span>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#E8E8E8' }}>Model Delta</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 160, justifyContent: 'center', paddingBottom: 8 }}>
                  {[
                    ['Random Forest', result?.rf_score ?? 0,    '#888',    '▪▪▪'],
                    ['XGBoost',       result?.score_pct ?? 0,   '#F5C518', '███'],
                  ].map(([name, val, col]) => (
                    <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: col, fontFamily: 'var(--font-mono)' }}>
                        {result ? `${val}%` : '--'}
                      </span>
                      <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', height: 100 }}>
                        <div style={{
                          width: '100%', background: col, opacity: result ? 1 : 0.2,
                          height: result ? `${val}%` : '4px', minHeight: 4,
                          borderRadius: '4px 4px 0 0', transition: 'height 0.9s ease',
                        }} />
                      </div>
                      <span style={{ fontSize: 11, color: '#888', textAlign: 'center' }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            {result && (
              <div style={{
                ...SECTION_STYLE,
                border: `1px solid rgba(245,197,24,0.25)`,
                animation: 'fadeUp 0.5s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                  <span style={{ fontSize: 16 }}>💡</span>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#F5C518' }}>AI Insights</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {result.insights.map((ins, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: result.tier.color, fontSize: 15, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 13, color: '#E8E8E8', lineHeight: 1.55 }}>{ins}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
