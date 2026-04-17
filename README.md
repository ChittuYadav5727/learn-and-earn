# Learn & Earn

A full-stack learning platform where users can gain skills and earn through tasks, built with React, Node.js, and MongoDB.

Production-structured full-stack portfolio project with strict role separation for learners and providers.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT

## Workspace structure

- `client/` React frontend with separate public, learner, and provider experiences
- `server/` Express API with modular controllers, services, middleware, validators, and MongoDB models
- `docs/` project notes

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
npm install --prefix client
npm install --prefix server
```

### 2. Configure environment

```bash
copy client\\.env.example client\\.env
copy server\\.env.example server\\.env
```

Update the values if your MongoDB or frontend URL differs.

### 3. Start MongoDB

Use a local MongoDB instance or point `MONGODB_URI` to MongoDB Atlas.

### 4. Optional demo seed

```bash
npm run server:seed
```

Seeded demo accounts:

- Learner: `demo.user@learnandearn.com` / `password123`
- Provider: `demo.provider@learnandearn.com` / `password123`
- Admin: `demo.admin@learnandearn.com` / `password123`

### 5. Run the apps

Terminal 1:

```bash
npm run server:dev
```

Terminal 2:

```bash
npm run client:dev
```

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
