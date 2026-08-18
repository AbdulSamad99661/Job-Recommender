# Job Recommender

AI-powered job matching app: upload a resume, get ranked job recommendations with skill gap analysis.

- **Frontend:** React + Vite → [Vercel](https://job-recommender-seven.vercel.app)
- **Backend:** Node.js + Express → [Render](https://render.com) (see below)
- **APIs:** [RapidAPI JSearch](https://rapidapi.com/letscrape-6bb852d2-e698-472d-a94f-a496b8e3ea7e/api/jsearch), [OpenAI](https://platform.openai.com), optional [n8n](https://n8n.io) workflow

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

Frontend runs at `http://localhost:5173` and talks to the backend at `http://localhost:5000/api`.

## Deploy backend to Render (live)

1. Push this repo to GitHub (already at [AbdulSamad99661/Job-Recommender](https://github.com/AbdulSamad99661/Job-Recommender)).
2. Go to [render.com](https://render.com) → **New** → **Blueprint**.
3. Connect the GitHub repo. Render reads `render.yaml` and creates the `job-recommender-api` web service.
4. When prompted, set these environment variables:
   - `RAPIDAPI_KEY` — from [RapidAPI JSearch](https://rapidapi.com/letscrape-6bb852d2-e698-472d-a94f-a496b8e3ea7e/api/jsearch)
   - `OPENAI_API_KEY` — from [OpenAI](https://platform.openai.com)
   - `N8N_WEBHOOK_URL` — optional; your n8n webhook URL if using the workflow
5. Wait for deploy. Copy your service URL, e.g. `https://job-recommender-api.onrender.com`.
6. Test: open `https://YOUR-SERVICE.onrender.com/api/health` — you should see `"status": "ok"`.

> **Note:** Render free tier sleeps after ~15 min idle. First request after sleep may take 30–60 seconds.

## Connect Vercel frontend to Render backend

1. Open [Vercel Dashboard](https://vercel.com) → your **Job-Recommender** project.
2. **Settings** → **Environment Variables**.
3. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://YOUR-RENDER-SERVICE.onrender.com/api` (include `/api`)
   - **Environments:** Production (and Preview if you want)
4. **Deployments** → redeploy the latest production build (or push a new commit).

After redeploy, the live site will call your Render backend instead of `localhost`.

## Environment variables

| Variable | Where | Purpose |
|----------|--------|---------|
| `RAPIDAPI_KEY` | Render | Live job listings (Indeed, LinkedIn, Glassdoor) |
| `OPENAI_API_KEY` | Render | Resume parsing & match scoring |
| `N8N_WEBHOOK_URL` | Render | Optional n8n workflow |
| `VITE_API_URL` | Vercel | Frontend → backend URL in production |

See `server/.env.example` and `.env.example` for local copies.

## n8n workflow (optional)

Import `n8n-job-recommender-workflow.json` into n8n, activate it, and set `N8N_WEBHOOK_URL` on Render to the webhook URL.
