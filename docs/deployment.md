# Deployment Guide

## Frontend on Vercel

1. Create a Vercel project with `client` as the root directory.
2. Add environment variables:
   - `VITE_API_URL=https://your-backend.example.com/api`
   - `VITE_SOCKET_URL=https://your-backend.example.com`
3. Build command: `npm run build`
4. Output directory: `dist`
5. For GitHub Actions deployment, add secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

## Backend on Render or Railway

1. Create a Node.js web service with `server` as the root directory.
2. Install command: `npm install`
3. Start command: `npm start`
4. Add environment variables from `server/.env.example`.
5. Use MongoDB Atlas for `MONGODB_URI`.
6. Use Upstash, Redis Cloud, Railway Redis or Render Redis for `REDIS_URL`.
7. Set `CLIENT_URL` to your Vercel frontend URL.

## MongoDB Atlas

1. Create a cluster and database user.
2. Allow the backend host IP or use `0.0.0.0/0` for temporary course demos.
3. Copy the connection string into `MONGODB_URI`.

## CI/CD

The `.github/workflows/ci-cd.yml` workflow:

- Installs backend dependencies.
- Runs Mocha + Chai API tests with an in-memory MongoDB.
- Installs frontend dependencies.
- Builds the Vite production bundle.
- Deploys the frontend to Vercel on `main` when Vercel secrets exist.
- Triggers a Render backend deploy hook when `RENDER_DEPLOY_HOOK_URL` is configured.
