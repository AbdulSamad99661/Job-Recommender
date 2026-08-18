# Job Recommender

AI-powered job matching app: upload a resume, get ranked job recommendations with skill gap analysis.

- **Frontend + Backend:** React + Vite + Express API → [Vercel Hobby](https://job-recommender-seven.vercel.app)
- **APIs:** [RapidAPI JSearch](https://rapidapi.com/letscrape-6bb852d2-e698-472d-a94f-a496b8e3ea7e/api/jsearch), [OpenAI](https://platform.openai.com), optional [n8n](https://n8n.io)

## Local development

```bash
# Frontend
npm install
npm run dev

# Backend (separate terminal)
cd server
cp .env.example .env   # add your API keys
npm install
npm run dev
```

Frontend: `http://localhost:5173` · Backend: `http://localhost:5000/api`

## Deploy live on Vercel Hobby (frontend + backend together)

Everything deploys from one repo — no Render or separate backend host needed.

### Step 1 — Push to GitHub

Repo: [AbdulSamad99661/Job-Recommender](https://github.com/AbdulSamad99661/Job-Recommender)

### Step 2 — Add API keys in Vercel

1. Open [vercel.com](https://vercel.com) → **Job-Recommender** project.
2. **Settings** → **Environment Variables**.
3. Add these (for **Production**, **Preview**, and **Development**):

| Name | Value |
|------|--------|
| `RAPIDAPI_KEY` | Your [JSearch RapidAPI key](https://rapidapi.com/letscrape-6bb852d2-e698-472d-a94f-a496b8e3ea7e/api/jsearch) |
| `OPENAI_API_KEY` | Your [OpenAI API key](https://platform.openai.com) |
| `N8N_WEBHOOK_URL` | Optional — your n8n webhook URL |

You do **not** need `VITE_API_URL` — production uses `/api` on the same domain automatically.

### Step 3 — Redeploy

**Deployments** → **⋯** on latest → **Redeploy** (or push a new commit to `main`).

### Step 4 — Test

1. Health check: `https://job-recommender-seven.vercel.app/api/health`
2. Open the app → **Upload Resume** → run job matching.

Expected health response:

```json
{ "status": "ok", "config": { "has_rapidapi": true, "has_openai": true } }
```

## How it works on Vercel

```
Browser → job-recommender-seven.vercel.app
              ├── /           → React frontend (dist/)
              └── /api/*      → Express server (api/index.js → server/index.js)
```

## Vercel Hobby limits

- API functions have a **time limit** (~10s on Hobby, up to 60s if your plan allows).
- Heavy job searches (RapidAPI + OpenAI) may timeout on Hobby. Use **sample profiles** for quick tests, or run `cd server && npm run dev` locally for full 90-second searches.

## n8n workflow (optional)

Import `n8n-job-recommender-workflow.json` into n8n, activate it, and set `N8N_WEBHOOK_URL` in Vercel environment variables.

## Environment variables summary

| Variable | Where | Purpose |
|----------|--------|---------|
| `RAPIDAPI_KEY` | Vercel | Live job listings |
| `OPENAI_API_KEY` | Vercel | Resume parsing & matching |
| `N8N_WEBHOOK_URL` | Vercel | Optional n8n workflow |
| `VITE_API_URL` | Optional | Override API URL (default `/api` in production) |

See `server/.env.example` for local backend setup.
