# Deployment Guide

## Frontend

- Platform: Vercel
- Root Directory: `apps/frontend`
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

### Frontend environment variables

```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Backend

- Platform: Render, Railway, Fly.io, or any Node host
- Recommended root directory: `apps/backend`
- Start command: `npm run start`
- Health check path: `/api/health`

### Backend environment variables

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=replace-this-in-production
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-production-vercel-domain.vercel.app
CLIENT_URLS=
ALLOW_VERCEL_PREVIEWS=true
GOOGLE_AUTH_URL=
GITHUB_AUTH_URL=
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=120
```

## Deploy order

1. Deploy backend first and confirm `/api/health` responds.
2. Set `VITE_API_URL` in the frontend deployment.
3. Deploy frontend and verify public homepage data loads.
4. Update backend `CLIENT_URL` if the production frontend domain changes.

## Local development

Run both apps from the repository root:

```bash
npm run dev
```
