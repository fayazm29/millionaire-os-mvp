# Millionaire OS — MVP (Web + Mobile Responsive)

An MVP dashboard to automate and track your *Millionaire Operating System*: weekly planning, 5am deep work, fasting, and 10% savings — with an AI Coach ("Future Fayaz").

## Stack
- **Frontend:** Next.js 14 (App Router) + TailwindCSS (mobile-first)
- **Backend:** FastAPI (Python)
- **Storage:** Local JSON (file) for MVP; swap to Supabase later
- **Deploy:** Vercel (frontend) + Render/Fly.io (backend)

## Quick Start

### 1) Backend (FastAPI)
```bash
cd backend
python -m venv v-env && source v-env/bin/activate  # Windows: v-env\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Backend runs at `http://localhost:8000`.

### 2) Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000`

> The frontend expects the backend URL in `.env.local`:
```
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

## Folders
- `frontend/app` — pages: Dashboard (home), Planner, Wealth, Energy, Coach, Settings
- `backend/main.py` — FastAPI endpoints: planner, finance, fasting, coach (mock), health

## Next Steps
- Replace file storage with Supabase
- Add OAuth (Google) and Calendar sync
- Swap AI coach to your preferred LLM account
