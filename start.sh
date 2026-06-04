#!/bin/bash
# InternView AI — Start both servers

echo "🚀 Starting InternView AI..."

# Start Flask backend
echo "▶ Starting Flask backend on :5000"
cd "$(dirname "$0")/backend"
pip install -r requirements.txt -q
python app.py &
FLASK_PID=$!

# Start React frontend
echo "▶ Starting React frontend on :3000"
cd "$(dirname "$0")/frontend"
npm install -q
npm run dev &
REACT_PID=$!

echo ""
echo "✅ InternView AI is running!"
echo "   Frontend → http://localhost:3000"
echo "   API      → http://localhost:5000/api/health"
echo ""
echo "Press Ctrl+C to stop both servers."

# Wait and clean up on exit
trap "kill $FLASK_PID $REACT_PID 2>/dev/null; echo 'Stopped.'" EXIT
wait
