<<<<<<< HEAD
# TechNova Afghanistan

TechNova Afghanistan is a production-ready full-stack Web Engineering course project for technology services, learning, jobs and real-time chat.

## Stack

- React, Vite, Tailwind CSS, React Router, Axios
- Node.js, Express.js, Socket.io
- MongoDB Atlas with Mongoose
- JWT authentication and bcrypt password hashing
- Helmet, CORS, rate limiting, express-validator and dotenv
- Redis caching
- Mocha, Chai, Supertest and mongodb-memory-server
- GitHub Actions CI/CD
- Frontend deployable to Vercel
- Backend deployable to Render or Railway

## Project Structure

```text
technova-afghanistan/
├── client/
├── server/
├── docs/
├── .github/workflows/
└── README.md
```

## Quick Start

```bash
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev:server
npm run dev:client
```

Open the frontend at `http://localhost:5173` and the API health check at `http://localhost:5000/health`.

## Required Environment

Server:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/technova_afghanistan
JWT_SECRET=replace-with-a-long-random-secret
REDIS_URL=redis://localhost:6379
```

Client:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Main Features

- Register, login, logout and protected profile routes
- Services marketplace CRUD with search, sorting and pagination
- Job posting, CV upload applications and employer dashboard
- Learning center with course details and enrollment
- Real-time Socket.io messaging
- Admin analytics and management dashboard
- Redis-backed API caching for list endpoints and external technology news
- Secure Express middleware and global error handling

## Testing

```bash
npm test --prefix server
```

The test suite uses an in-memory MongoDB instance, so it does not require MongoDB Atlas.

## Deployment

See [docs/deployment.md](docs/deployment.md) for Vercel, Render, Railway, MongoDB Atlas, Redis and GitHub Actions instructions.
=======
# technova-afghanistan
Modern full-stack web platform for technology services, jobs, learning, and real-time collaboration.
>>>>>>> bbd5f28cdfaae62ec4b3d6e49650473b0039783f
