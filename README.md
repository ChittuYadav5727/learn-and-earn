# Learn & Earn

A full-stack learning platform where users can gain skills and earn through tasks, built with React, Node.js, and MongoDB.

Production-structured full-stack portfolio project with strict role separation for learners and providers.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT

## Workspace structure

- `apps/frontend/` React + Vite frontend
- `apps/backend/` Express + MongoDB backend
- `docs/` project notes
- `docs/deployment.md` deployment setup for Vercel + backend hosting
- `infra/data/` local database storage for development
- `infra/tools/` local infrastructure tooling
- `runtime/logs/` local development logs

## Features

- Separate learner and provider registration/login flows
- JWT-based authentication with role-protected routes
- Learner pages:
  - Learn / Earn
  - Internships
  - Competitions
  - Leaderboard
  - Wallet
  - My Task
  - Profile
  - Certification
- Provider pages:
  - Dashboard
  - GST Verification
  - Post Opportunities
  - Manage Posts
  - View Applicants
  - Company Profile
- Provider posting lock until GST is approved
- Certification rule: certificate is awarded only when score is above `70%`
- Admin-ready GST review endpoints on backend

## Setup

### 1. Install dependencies

```bash
npm install
npm install --prefix apps/frontend
npm install --prefix apps/backend
```

### 2. Configure environment

```bash
copy apps\\frontend\\.env.example apps\\frontend\\.env
copy apps\\backend\\.env.example apps\\backend\\.env
```

Update the values if your MongoDB or frontend URL differs.

Production deployment values:

- Vercel frontend: set `VITE_API_URL=https://your-render-service.onrender.com/api`
- Render backend: set `CLIENT_URL=https://your-vercel-app.vercel.app`
- Optional preview deployments: set `ALLOW_VERCEL_PREVIEWS=true`
- MongoDB Atlas: set `MONGODB_URI=mongodb+srv://...`

### 3. Start MongoDB

Use a local MongoDB instance or point `MONGODB_URI` to MongoDB Atlas.

### 4. Optional demo seed

```bash
npm run backend:seed
```

Seeded demo accounts:

- Learner: `demo.user@learnandearn.com` / `password123`
- Provider: `demo.provider@learnandearn.com` / `password123`
- Admin: `demo.admin@learnandearn.com` / `password123`

### 5. Run the workspace

```bash
npm run dev
```

Or run each app independently:

```bash
npm run backend:dev
npm run frontend:dev
```

## Deployment structure

- Deploy `apps/frontend` to Vercel
- Deploy `apps/backend` to Render / Railway / any Node host
- Keep `infra/` and `runtime/` out of production deploy roots

Recommended deploy roots:

- Frontend root directory: `apps/frontend`
- Backend root directory: `apps/backend`

Deployment references:

- Frontend config: `apps/frontend/vercel.json`
- Backend blueprint: `render.yaml`

## API summary

- `/api/public/*`
- `/api/auth/*`
- `/api/users/*`
- `/api/providers/*`
- `/api/admin/*`

## Submission notes

- Learner and provider route trees are fully separated.
- Provider posting logic is blocked server-side until GST approval.
- Certification awarding is enforced server-side with the `score > 70` rule.
- The codebase is organized for extension, including admin moderation support.
