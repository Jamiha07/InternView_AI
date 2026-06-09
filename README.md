# InternView AI 🧠
 
> **End-to-end machine learning pipeline** that predicts intern performance using a real trained XGBoost model — from synthetic data generation all the way to a live React dashboard.
 
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat&logo=flask)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![XGBoost](https://img.shields.io/badge/XGBoost-2.x-189ABE?style=flat)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
 
---


 <img width="1913" height="907" alt="image" src="https://github.com/user-attachments/assets/a6f6f2ff-3d5b-4e90-b592-d9bc3ea64e04" />
<img width="1910" height="903" alt="image" src="https://github.com/user-attachments/assets/c7954c8c-4a7f-4b8e-a481-34a442cb480b" />
<img width="1908" height="908" alt="image" src="https://github.com/user-attachments/assets/42abe903-6468-43b4-bc25-2d2f6dcc2c9d" />
<img width="1905" height="895" alt="image" src="https://github.com/user-attachments/assets/79f0264a-a2eb-472f-8e0d-8723bacf66d7" />


## What It Does
 
InternView AI is a full-stack ML application that takes 9 intern performance KPIs as inputs and produces an instant performance score (0–100%) along with a 4-tier classification — all powered by a real pre-trained XGBoost model served via a Python REST API.
 
**Key capabilities:**
 
- **Live Performance Simulator** — Tune 9 sliders for an intern's metrics and receive an instant prediction from the actual `.pkl` model. No mock data — real inference every time.
- **4-Tier Classification** — Scores are automatically bucketed into: `Struggle` (< 50%), `Average` (50–68%), `Excel` (68–80%), and `High Excel` (80%+).
- **Feature Impact Breakdown** — Visual bar chart showing which KPIs drive the score, using the real `feature_importances_` from the trained model. Task Completion (26.9%) and Deadline Adherence (24.3%) are the top drivers.
- **XGBoost vs Random Forest Delta** — Side-by-side comparison of the two models. XGBoost consistently outperforms the RF baseline by ~2%.
- **AI-Generated Insights** — Contextual recommendations generated per-prediction (e.g., "Improving deadline adherence could push to High Excel").
- **Data Explorer** — Browse and inspect the actual `intern_data.csv` (573 rows, 11 columns) directly inside the UI.
- **About / Tech Stack Page** — Full ML pipeline breakdown: data generation → EDA → baseline models → XGBoost optimization → serialization → deployment.
---
 
## ML Model
 
The model was built and trained in a Jupyter Notebook (`notebook/Intern_Performance_AI_Project.ipynb`) following this pipeline:
 
| Step | Details |
|------|---------|
| **Data Generation** | 573 synthetic intern records created with NumPy (`np.random.seed(21)`) using real-world-like distributions across 9 KPIs |
| **EDA & Preprocessing** | Exploratory analysis via pandas. `StandardScaler` fitted on `X_train` to normalize all 9 features to zero mean, unit variance |
| **Baseline Models** | Random Forest (200 trees, ~79% R²) and default XGBoost (200 estimators, ~80% R²) |
| **XGBoost Optimization** | Tuned: `learning_rate=0.04`, `n_estimators=300`, `max_depth=2` → **84.6% test R²**, train-test gap of only ~1.2% |
| **Serialization** | Optimized XGBoost + fitted StandardScaler saved as `.pkl` files via `pickle` |
 
### Performance KPIs (Features)
 
| Feature | Description |
|---------|-------------|
| `task_completion_rate` | % of tasks fully completed |
| `avg_task_time_hours` | Average hours per task (lower is better) |
| `feedback_rating` | Mentor quality score (1–5) |
| `attendance_rate` | % of days present |
| `punctuality_score` | Score out of 10 |
| `problem_solving_rating` | Rating out of 5 |
| `team_collaboration_score` | Score out of 10 |
| `training_completion_pct` | % of training modules completed |
| `deadline_adherence_ratio` | On-time tasks / total tasks |
 
---

 
## Tech Stack
 
### Machine Learning & Data
- **Python 3.11** — Core language
- **XGBoost 2.x** — Champion model (84.6% R²)
- **scikit-learn 1.4** — `StandardScaler`, `train_test_split`
- **pandas 2.x** — Data manipulation and EDA
- **NumPy 1.26** — Synthetic data generation
- **pickle** — Model serialization
- **matplotlib / seaborn** — EDA plots in the notebook
### Backend
- **Flask 3.x** — REST API serving predictions
- **flask-cors** — Cross-origin support for the Vite dev server
- **gunicorn** — Production WSGI server
### Frontend
- **React 18** — UI framework
- **Vite 5** — Build tool and dev proxy
- **Recharts** — Live bar/line charts for feature impact and model comparison
- **Space Grotesk** — Primary typeface
- **JetBrains Mono** — Data / code typeface
### Dev & Tooling
- **Jupyter Notebook** — ML development environment
- **Node.js 20** — Frontend build runtime
- **npm** — Package management
---
 
## Getting Started
 
### Prerequisites
- Python 3.11+
- Node.js 20+
- npm
### Quick Start (one command)
 
```bash
git clone https://github.com/your-username/internview-ai.git
cd internview-ai
chmod +x start.sh
./start.sh
```
 
This installs all dependencies and starts both servers:
- **Frontend** → http://localhost:3000
- **API** → http://localhost:5000/api/health
---
 
### Manual Setup
 
**Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```
 
**Frontend** (in a separate terminal):
```bash
cd frontend
npm install
npm run dev
```
 
### Environment Variables
 
Copy `.env.example` to `.env` and adjust if needed:
 
```bash
cp .env.example .env
```
 
```env
FLASK_ENV=development
FLASK_PORT=5000
VITE_API_BASE=/api
```
 
---
 
## License
 
MIT — free to use, modify, and distribute.
