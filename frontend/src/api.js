const BASE = '/api'

export async function fetchHealth() {
  const res = await fetch(`${BASE}/health`)
  return res.json()
}

/**
 * Send all 9 feature values to the real XGBoost model.
 * @param {Object} features  — keys must match FEATURE_COLS in backend/app.py
 * @returns {Object} prediction result
 */
export async function fetchPrediction(features) {
  const res = await fetch(`${BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(features),
  })
  if (!res.ok) throw new Error(`Prediction failed: ${res.status}`)
  return res.json()
}

export async function fetchDatasetStats() {
  const res = await fetch(`${BASE}/dataset/stats`)
  return res.json()
}

export async function fetchDatasetSample() {
  const res = await fetch(`${BASE}/dataset/sample`)
  return res.json()
}
