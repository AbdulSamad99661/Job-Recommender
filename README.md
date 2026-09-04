# JobRecommender

**AI Career Assistant** — upload a resume, get explainable job matches, and track applications in one place.

[![Live Demo](https://img.shields.io/badge/Live-job--recommender--seven.vercel.app-6366F1?style=for-the-badge)](https://job-recommender-seven.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-AbdulSamad99661%2FJob--Recommender-181717?style=for-the-badge&logo=github)](https://github.com/AbdulSamad99661/Job-Recommender)

## Live app

**https://job-recommender-seven.vercel.app**

Health check: `https://job-recommender-seven.vercel.app/api/health`

## Features

- **Resume upload & parsing** — PDF/text resumes parsed into skills, experience, and profile data
- **Explainable job matching** — match scores with matched vs. missing skills
- **Live job search** — listings via RapidAPI JSearch, filtered by country/location
- **Firebase authentication** — sign up, sign in, password reset, user profiles
- **Saved jobs** — bookmark roles and track status (Saved → Applied → Interview → Offer → Rejected)
- **Activity history** — uploads, searches, and match sessions
- **Email notifications** — confirmation email when a job is saved (Brevo / SendGrid / SMTP)
- **Guest mode** — browse and match without an account; sign in to save data
- **Dark / light theme** — responsive dashboard UI

## Tech stack

| Layer | Technologies |
|-------|----------------|
| Frontend | React 19, Vite, Lucide icons |
| Backend | Node.js, Express (Vercel serverless) |
| Auth & data | Firebase Auth, Cloud Firestore |
| Jobs API | RapidAPI JSearch |
| AI | OpenAI (resume parsing & matching) |
| Email | Brevo API / Brevo SMTP / SendGrid / Gmail SMTP |
| Deploy | Vercel + GitHub |
| Optional | n8n workflow orchestration |

## Architecture

```
Browser → job-recommender-seven.vercel.app
              ├── /           → React SPA (Vite build)
              └── /api/*      → Express API (api/index.js → server/index.js)
                                        ├── RapidAPI JSearch
                                        ├── OpenAI
                                        ├── Firebase token verify
                                        └── Email service (Brevo, etc.)
```

Firestore stores per-user profiles, saved jobs, and history. Security rules restrict each user to their own data.

## Local development

### Prerequisites

- Node.js 18+
- Firebase project (Auth + Firestore)
- RapidAPI and OpenAI API keys

### 1. Clone and install

```bash
git clone https://github.com/AbdulSamad99661/Job-Recommender.git
cd Job-Recommender
npm install
cd server && npm install && cd ..
```

### 2. Environment variables

Copy the example files and fill in your values:

```bash
cp .env.example .env
cp server/.env.example server/.env
```

See [Environment variables](#environment-variables) below for the full list.

### 3. Run locally

**Terminal 1 — frontend**

```bash
npm run dev
```

**Terminal 2 — backend**

```bash
cd server
npm run dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:5000/api  
- Health: http://localhost:5000/api/health  

Production uses `/api` on the same domain automatically — you do **not** need `VITE_API_URL` on Vercel.

## Firebase setup

1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Email/Password** authentication.
3. Create a **Firestore** database.
4. Add your app domain to **Authorized domains** (e.g. `job-recommender-seven.vercel.app` and `localhost`).
5. Copy web app config into `VITE_FIREBASE_*` variables.
6. Deploy Firestore rules:

```bash
firebase deploy --only firestore:rules
```

## Deploy on Vercel

1. Push to [AbdulSamad99661/Job-Recommender](https://github.com/AbdulSamad99661/Job-Recommender).
2. Import the repo on [vercel.com](https://vercel.com) (or connect existing project).
3. Add environment variables under **Settings → Environment Variables** for Production, Preview, and Development.
4. Redeploy after adding or changing variables.

### Required variables

| Variable | Purpose |
|----------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase web config |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase web config |
| `VITE_FIREBASE_PROJECT_ID` | Firebase web config |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase web config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase web config |
| `VITE_FIREBASE_APP_ID` | Firebase web config |
| `FIREBASE_API_KEY` | Server-side Firebase token verification |
| `RAPIDAPI_KEY` | Live job listings ([JSearch](https://rapidapi.com/letscrape-6bb852d2-e698-472d-a94f-a496b8e3ea7e/api/jsearch)) |
| `OPENAI_API_KEY` | Resume parsing and job matching |

### Optional — email on save job

| Variable | Purpose |
|----------|---------|
| `BREVO_API_KEY` | Brevo transactional email (recommended) |
| `EMAIL_FROM` | Verified sender email |
| `EMAIL_FROM_NAME` | Sender display name (default: JobRecommender) |
| `BREVO_SMTP_LOGIN` | Brevo SMTP login if using SMTP relay |

For Brevo on Vercel, **disable IP restriction** under [Authorised IPs](https://app.brevo.com/security/authorised_ips) so serverless functions can send mail.

Alternative providers: `SENDGRID_API_KEY`, or `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS`.

### Optional — n8n workflow

| Variable | Purpose |
|----------|---------|
| `N8N_WEBHOOK_URL` | n8n webhook for multi-agent CV parsing |

Import `n8n-job-recommender-workflow.json` into n8n, activate the workflow, then set the webhook URL in Vercel.

## Environment variables

### Frontend (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_FIREBASE_*` | Yes | Six Firebase web config values |
| `VITE_API_URL` | No | Override API base URL (default: `/api` in prod, `http://localhost:5000/api` locally) |

### Backend (`server/.env` or root `.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `RAPIDAPI_KEY` | Yes | JSearch API key |
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `FIREBASE_API_KEY` | Yes | Same Firebase API key for token verify |
| `BREVO_API_KEY` | No | Email via Brevo |
| `EMAIL_FROM` | No | Sender address |
| `N8N_WEBHOOK_URL` | No | n8n integration |

Never commit real API keys. Use Vercel environment variables for production.

## Project structure

```
├── api/                 # Vercel serverless entry
├── public/              # Static assets (favicon, icons)
├── server/              # Express API (index.js, email, auth verify)
├── src/
│   ├── components/      # UI components (Navbar, Sidebar, JobCard, …)
│   ├── context/         # AuthContext
│   ├── firebase/        # Firebase client config
│   ├── pages/           # Dashboard, Upload, Matches, Saved, History, …
│   ├── services/        # API and Firestore helpers
│   └── styles/          # Global and dashboard CSS
├── firestore.rules      # Firestore security rules
├── vercel.json          # Vercel routing and function config
└── n8n-job-recommender-workflow.json
```

## Vercel limits (Hobby)

- Serverless functions have a **time limit** (configured up to 60s in `vercel.json`).
- Heavy searches (RapidAPI + OpenAI) may be slow or timeout on cold starts.
- Use **sample profiles** for quick demos, or run the backend locally for long-running searches.

## Health check response

```json
{
  "status": "ok",
  "message": "Job Recommender Node.js Backend Running",
  "config": {
    "has_rapidapi": true,
    "has_openai": true,
    "has_n8n": false,
    "has_email": true,
    "live_jobs_available": true,
    "ai_parsing_available": true
  }
}
```

## License

© 2026 JobRecommender. All rights reserved.
