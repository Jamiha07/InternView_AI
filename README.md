# InternView AI 🌟

> ML-powered intern performance prediction — XGBoost + Flask + React

![Python](https://img.shields.io/badge/Python-3.11-yellow?style=flat-square)
![XGBoost](https://img.shields.io/badge/XGBoost-82.8%25_R²-green?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![Flask](https://img.shields.io/badge/Flask-3.x-white?style=flat-square)

---

## What This Project Does

InternView AI is a complete end-to-end machine learning project that:

1. **Generates** a realistic synthetic dataset of 573 intern records across 9 KPIs
2. **Trains** Random Forest and XGBoost models, then optimises XGBoost to **82.8% R²**
3. **Deploys** the trained model via a Flask REST API
4. **Visualises** predictions in a real-time React dashboard with interactive sliders

---

## Project Structure

```
InternView_AI/
│
├── notebook/
│   └── Intern_Performance_AI_Project.ipynb   ← Full ML development notebook
│
├── data/
│   └── intern_data.csv                        ← 573-row synthetic intern dataset
│
├── models/
│   ├── xgboost_dashboard_model.pkl            ← Trained & optimised XGBoost model
│   └── scaler.pkl                             ← Fitted StandardScaler
│
├── backend/
│   ├── app.py                                 ← Flask API (loads .pkl, serves /api/predict)
│   └── requirements.txt                       ← Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                           ← React entry point
│   │   ├── App.jsx                            ← Page router
│   │   ├── index.css                          ← Global styles (yellow/grey/black theme)
│   │   ├── api.js                             ← Fetch helpers for Flask API
│   │   ├── components.jsx                     ← Nav, Slider, StatCard, TierBadge
│   │   ├── HomePage.jsx                       ← Landing page with stats & preview
│   │   ├── SimulatorPage.jsx                  ← Interactive prediction dashboard
│   │   └── AboutPage.jsx                      ← Tech stack & pipeline breakdown
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── vite.config.js                         ← Dev proxy → Flask :5000
│
└── README.md
```

---

## Quick Start

### 1 — Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
# → Running on http://localhost:5000
```

### 2 — Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# → Running on http://localhost:3000
```

Open **http://localhost:3000** — the Vite dev server proxies `/api/*` calls to Flask automatically.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET  | `/api/health`         | Health check + model info |
| POST | `/api/predict`        | Run XGBoost prediction (JSON body with 9 features) |
| GET  | `/api/dataset/stats`  | Label counts, score stats from intern_data.csv |
| GET  | `/api/dataset/sample` | 10 random rows from the dataset |

### Example `/api/predict` request

```json
{
  "task_completion_rate":     0.85,
  "avg_task_time_hours":      4.0,
  "feedback_rating":          4.2,
  "attendance_rate":          0.95,
  "punctuality_score":        7.5,
  "problem_solving_rating":   3.8,
  "team_collaboration_score": 7.2,
  "training_completion_pct":  0.88,
  "deadline_adherence_ratio": 0.93
}
```

### Example response

```json
{
  "score_pct": 82.4,
  "raw_score": 0.824,
  "rf_score":  80.2,
  "delta":     2.2,
  "tier": {
    "label": "High Excel",
    "emoji": "🌟",
    "color": "#F5C518"
  },
  "insights": [
    "Excellent across all metrics — top tier performance!",
    "Consider mentoring other interns."
  ],
  "feature_impact": [
    { "name": "Task Completion Rate", "importance": 0.2694, "value": 0.81 },
    ...
  ]
}
```

---

## The 9 KPIs

| Feature | Weight | Range |
|---------|--------|-------|
| task_completion_rate | 25% | 0.2 – 1.0 |
| deadline_adherence_ratio | 12% | 0.0 – 1.0 |
| feedback_rating | 15% | 1.0 – 5.0 |
| attendance_rate | 15% | 0.35 – 1.0 |
| punctuality_score | 10% | 1.0 – 10.0 |
| problem_solving_rating | 10% | 1.0 – 5.0 |
| team_collaboration_score | 8% | 1.0 – 10.0 |
| training_completion_pct | 5% | 0.1 – 1.0 |
| avg_task_time_hours | –5% penalty | 1.0 – 20.0 |

---

## Model Results

| Model | Test R² | Notes |
|-------|---------|-------|
| Random Forest (baseline) | ~79% | 200 trees |
| XGBoost (baseline) | ~80% | 200 estimators |
| **XGBoost (optimised)** | **82.8%** | lr=0.04, 300 trees, max_depth=2 |
| Train-Test Gap | ~1.2% | No overfitting |

---

## Performance Tiers

| Tier | Score Range |
|------|-------------|
| 🌟 High Excel | ≥ 80% |
| ✅ Excel | 68% – 79% |
| 📊 Average | 50% – 67% |
| ⚠️ Struggle | < 50% |

---

## Tech Stack

**ML:** Python, pandas, NumPy, scikit-learn, XGBoost, matplotlib, seaborn, Jupyter  
**Backend:** Flask, flask-cors, pickle, gunicorn  
**Frontend:** React 18, Vite 5, Recharts, Space Grotesk, JetBrains Mono
