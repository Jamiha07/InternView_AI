import { useState, useEffect } from 'react'
import { fetchDatasetStats } from './api.js'

const S = {
  card: { background: '#141414', border: '1px solid #252525', borderRadius: 12, overflow: 'hidden' },
  inner: { padding: '1.5rem' },
}

export default function AboutPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchDatasetStats().then(setStats).catch(() => {})
  }, [])

  const pipeline = [
    { n:'01', title:'Data Generation',      col:'#7DB3F5', desc:'573 synthetic intern records generated with NumPy (np.random.seed(21)) across 9 KPIs using real-world-like distributions. Weighted performance score formula and 4-tier outcome label assigned.' },
    { n:'02', title:'EDA & Preprocessing',  col:'#F5C518', desc:'Exploratory analysis via pandas .describe(), .info(), .isnull(). StandardScaler fitted on X_train (9 features) to normalize all inputs to zero mean, unit variance.' },
    { n:'03', title:'Baseline Models',      col:'#E87C7C', desc:'Random Forest Regressor (200 trees) and XGBoost Regressor (200 estimators, default params) trained as baselines. RF ≈79% R², XGBoost ≈80% R².' },
    { n:'04', title:'XGBoost Optimization', col:'#7CC47A', desc:'Hyperparameter tuning: learning_rate=0.04, n_estimators=300, max_depth=2. Achieved 82.8% test R² with a train-test gap of only ~1.2% — well-generalized.' },
    { n:'05', title:'Model Serialization',  col:'#C47CF5', desc:'Optimized XGBoost and StandardScaler both serialized via pickle into .pkl files. Ready for zero-dependency production inference.' },
    { n:'06', title:'Dashboard Deployment', col:'#F5C518', desc:'Flask REST API loads the .pkl files at startup. React frontend (Vite) calls /api/predict in real time. Live feature impact bars use actual model.feature_importances_.' },
  ]

  const stack = [
    { cat:'Data & ML', col:'#7DB3F5', items:[
      ['Python 3.11',       'Core language'],
      ['pandas 2.x',        'Data manipulation & EDA'],
      ['NumPy 1.26',        'Synthetic data generation'],
      ['scikit-learn 1.4',  'StandardScaler + train_test_split'],
      ['XGBoost 2.x',       'Champion model (82.8% R²)'],
      ['Random Forest',     'Ensemble baseline model'],
      ['pickle',            'Model serialization / .pkl export'],
    ]},
    { cat:'Visualization', col:'#F5C518', items:[
      ['matplotlib',        'Static distribution plots'],
      ['seaborn',           'KDE histogram, heatmaps'],
      ['Recharts',          'Live bar / line charts in React'],
    ]},
    { cat:'Web & API', col:'#7CC47A', items:[
      ['Flask 3.x',         'REST API serving predictions'],
      ['flask-cors',        'Cross-origin for dev server'],
      ['React 18',          'Frontend framework'],
      ['Vite 5',            'Build tool + dev proxy'],
      ['Space Grotesk',     'Primary typeface'],
      ['JetBrains Mono',    'Data / code typeface'],
    ]},
    { cat:'Dev & Tooling', col:'#C47CF5', items:[
      ['Jupyter Notebook',  'ML development environment'],
      ['gunicorn',          'Production WSGI server'],
      ['Node.js 20',        'Frontend build runtime'],
      ['npm',               'Package management'],
    ]},
  ]

  const kpis = [
    ['task_completion_rate',     'Task Completion Rate',    '% of tasks fully finished',          '25%'],
    ['avg_task_time_hours',      'Avg Task Time (hrs)',     'Hours per task — lower is better',   '5% penalty'],
    ['feedback_rating',          'Feedback Rating',         'Mentor quality score 1–5',           '15%'],
    ['attendance_rate',          'Attendance Rate',         '% days present',                     '15%'],
    ['punctuality_score',        'Punctuality Score',       'On-time arrivals 1–10',              '10%'],
    ['problem_solving_rating',   'Problem Solving',         'Problem solving ability 1–5',        '10%'],
    ['team_collaboration_score', 'Team Collaboration',      'Teamwork score 1–10',                '8%'],
    ['training_completion_pct',  'Training Completion',     '% of training modules done',         '5%'],
    ['deadline_adherence_ratio', 'Deadline Adherence',      'On-deadline / total tasks',          '12%'],
  ]

  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh', color: '#F5F5F5', paddingTop: 64 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>
            About <span style={{ color: '#F5C518' }}>InternView AI</span>
          </h1>
          <p style={{ color: '#888', fontSize: 16, maxWidth: 620, lineHeight: 1.7 }}>
            A full end-to-end machine learning project: synthetic data generation, EDA, model training,
            optimisation, serialisation, and deployment as an interactive web dashboard.
          </p>
        </div>

        {/* Live stats from dataset */}
        <div style={{ ...S.card, marginBottom: 28 }}>
          <div style={{ background: 'rgba(245,197,24,0.07)', borderBottom: '1px solid rgba(245,197,24,0.15)', padding: '0.75rem 1.25rem' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#F5C518', textTransform: 'uppercase', letterSpacing: 1 }}>
              intern_data.csv — Live Stats {stats ? '✓' : '(start backend to load)'}
            </span>
          </div>
          <div style={{ ...S.inner }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
              {[
                ['Total Records',  stats?.total_records ?? 573,                    '#F5C518'],
                ['High Excel',     stats?.label_counts?.['High Excel'] ?? 10,      '#F5C518'],
                ['Excel',          stats?.label_counts?.['Excel'] ?? 177,          '#7CC47A'],
                ['Average',        stats?.label_counts?.['Average'] ?? 369,        '#7DB3F5'],
                ['Struggle',       stats?.label_counts?.['Struggle'] ?? 17,        '#E87C7C'],
                ['Mean Score',     stats ? `${(stats.score_stats.mean*100).toFixed(1)}%` : '64.3%', '#888'],
              ].map(([k, v, c]) => (
                <div key={k} style={{ background: '#1C1C1C', borderRadius: 8, padding: '0.875rem', borderLeft: `3px solid ${c}` }}>
                  <div style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 0.6 }}>{k}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model performance */}
        <div style={{ ...S.card, marginBottom: 28 }}>
          <div style={{ background: 'rgba(245,197,24,0.07)', borderBottom: '1px solid rgba(245,197,24,0.15)', padding: '0.75rem 1.25rem' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#F5C518', textTransform: 'uppercase', letterSpacing: 1 }}>Model Performance</span>
          </div>
          <div style={{ ...S.inner }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              {[
                ['Random Forest',     '~79%', '200 trees, baseline',              '#888888'],
                ['XGBoost Baseline',  '~80%', '200 estimators, default params',   '#7DB3F5'],
                ['XGBoost Optimized', '82.8%','lr=0.04, 300 trees, depth=2',      '#F5C518'],
                ['Train-Test Gap',    '~1.2%','Well generalised, no overfit',      '#7CC47A'],
              ].map(([m, s, d, c]) => (
                <div key={m} style={{ background: '#1C1C1C', borderRadius: 10, padding: '1.25rem', borderLeft: `3px solid ${c}` }}>
                  <div style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6 }}>{m}</div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: c, fontFamily: 'var(--font-mono)' }}>{s}</div>
                  <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ML Pipeline */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>ML Pipeline</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {pipeline.map(({ n, title, col, desc }) => (
              <div key={n} style={{
                ...S.card,
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=col+'44'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#252525'; e.currentTarget.style.transform='translateY(0)' }}
              >
                <div style={{ ...S.inner }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{
                      background: col+'1A', border: `1px solid ${col}33`, color: col,
                      borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                    }}>{n}</span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#F5F5F5' }}>{title}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#888', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>Tech Stack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {stack.map(({ cat, col, items }) => (
              <div key={cat} style={S.card}>
                <div style={{ background: col+'14', borderBottom: `1px solid ${col}22`, padding: '0.75rem 1.25rem' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: col, textTransform: 'uppercase', letterSpacing: 1 }}>{cat}</span>
                </div>
                <div style={{ padding: '0.25rem 1.25rem 1rem' }}>
                  {items.map(([name, role]) => (
                    <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #1C1C1C' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#E8E8E8', fontFamily: 'var(--font-mono)' }}>{name}</span>
                      <span style={{ fontSize: 12, color: '#555' }}>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 9 KPIs */}
        <div style={{ ...S.card, marginBottom: 36 }}>
          <div style={{ background: 'rgba(245,197,24,0.07)', borderBottom: '1px solid rgba(245,197,24,0.15)', padding: '0.75rem 1.25rem' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#F5C518', textTransform: 'uppercase', letterSpacing: 1 }}>The 9 KPIs — Exact Weights from Notebook</span>
          </div>
          <div style={{ ...S.inner }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {kpis.map(([key, label, desc, weight]) => (
                <div key={key} style={{ background: '#1C1C1C', borderRadius: 8, padding: '0.875rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#F5C518', marginBottom: 4 }}>{key}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#E8E8E8', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5, marginBottom: 6 }}>{desc}</div>
                  <div style={{ fontSize: 11, color: '#333' }}>Weight: <span style={{ color: '#F5C518', fontWeight: 700 }}>{weight}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '2rem 0 3rem', color: '#333', fontSize: 13 }}>
          Built with 💛 — XGBoost · scikit-learn · Flask · React · Vite · Python
        </div>
      </div>
    </div>
  )
}
