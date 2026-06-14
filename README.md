# Service Management System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18%2B-green.svg)
![React](https://img.shields.io/badge/react-18%2B-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-6%2B-green.svg)

A full-stack web application for managing services with a secure RESTful CRUD API and a modern React frontend. Built with best practices for authentication, security, and scalability.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Service Management**: Full CRUD operations for services with validation
- **Search & Filter**: Advanced search, sorting, and pagination for services
- **Role-Based Access**: Owner-based authorization for service modifications
- **Modern UI**: Clean, responsive React frontend with Tailwind CSS
- **API Security**: Helmet, CORS, rate limiting, and input validation
- **Testing**: Comprehensive test suite with Mocha, Chai, and Supertest
- **CI/CD**: Automated testing and deployment with GitHub Actions

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Security & Quality
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-validator** - Input validation
- **dotenv** - Environment configuration
- **rate-limit** - API rate limiting

### Testing & CI/CD
- **Mocha & Chai** - Testing framework
- **Supertest** - HTTP assertion library
- **GitHub Actions** - CI/CD pipeline

### Deployment
- **Vercel** - Frontend hosting
- **Render/Railway** - Backend hosting
- **MongoDB Atlas** - Cloud database

## 📊 Data Model

### Service Schema

The primary resource is **Service** with the following schema:

| Field | Type | Validation | Description |
| --- | --- | --- | --- |
| `serviceName` | String | Required, 3-120 chars | Name of the service |
| `category` | String | Required | Service category |
| `description` | String | Required, 20-2000 chars | Detailed description |
| `price` | Number | Required, `>= 0` | Service price |
| `providerName` | String | Required | Name of the service provider |
| `contactInfo` | String | Required | Email or phone contact |
| `owner` | ObjectId | Auto | Reference to the authenticated User |

## 📁 Project Structure

```text
service-management-system/
├── client/                 # React + Vite frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   └── package.json       # Frontend dependencies
├── server/                 # Express + MongoDB REST API
│   ├── config/            # Database and server config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth and validation middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── tests/             # Backend tests
│   └── package.json       # Backend dependencies
├── docs/                   # API and deployment documentation
├── .github/workflows/      # CI/CD pipeline configuration
├── LICENSE                 # MIT license
└── README.md              # This file
```

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)

### Setup Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd service-management-system

# 2. Install dependencies for both frontend and backend
npm run install:all

# 3. Create environment files from examples
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Configure your environment variables (see below)

# 5. Start the development servers (in separate terminals)
npm run dev:server  # Backend on http://localhost:5000
npm run dev:client  # Frontend on http://localhost:5173
```

### Environment Variables

**Server (`server/.env`)**

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/service-management-system
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
```

**Client (`client/.env`)**

```env
VITE_API_URL=http://localhost:5000/api
```

> **Note:** For production, use a strong `JWT_SECRET` and configure MongoDB Atlas for cloud database hosting.

## 🔌 API Documentation

**Base URL:** `/api`

### Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | No | Register a new user, returns JWT |
| `POST` | `/auth/login` | No | Log in, returns JWT |
| `POST` | `/auth/logout` | Yes | Log out current user |
| `GET` | `/auth/profile` | Yes | Get current user profile |
| `PUT` | `/auth/profile` | Yes | Update current user profile |

**Authentication Header:**

```http
Authorization: Bearer <your-jwt-token>
```

### Service Endpoints

| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| `GET` | `/api/services` | No | List all services (search, sort, pagination) |
| `GET` | `/api/services/:id` | No | Get a single service by ID |
| `POST` | `/api/services` | Yes | Create a new service |
| `PUT` | `/api/services/:id` | Yes (owner only) | Update a service |
| `DELETE` | `/api/services/:id` | Yes (owner only) | Delete a service |

**Example Request - Create Service:**

```http
POST /api/services
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "serviceName": "Cloud migration consulting",
  "category": "cloud",
  "description": "End-to-end migration of on-premise workloads to the cloud.",
  "price": 500,
  "providerName": "Acme Cloud",
  "contactInfo": "contact@acmecloud.com"
}
```

> 📖 For complete API documentation including all endpoints, request/response formats, and error handling, see [docs/api.md](docs/api.md).

## 🔐 Authentication Architecture

This project uses **JWT (JSON Web Token) authentication**, which is well-suited for a stateless React SPA + REST API architecture:

### Why JWT?

- **Stateless**: Tokens scale horizontally without server-side session storage
- **Cross-Origin**: Works seamlessly with SPA architecture via `Authorization: Bearer` header
- **Security**: Passwords are hashed with bcrypt; routes protected by `protect` middleware
- **Authorization**: Role-based access control via `authorize` middleware for owner-only operations

### Security Features

- bcrypt password hashing
- JWT token expiration (configurable)
- Protected routes with middleware
- Owner-based resource authorization
- CORS configuration
- Rate limiting
- Input validation with express-validator

> **Note:** Passport.js (Local Strategy) is session-oriented and would require adding session storage and reworking the existing stateless flow. JWT is retained to maintain the current security architecture without disruption.

## 🎨 Frontend Pages

| Route | Page | Access | Description |
| --- | --- | --- | --- |
| `/` | Home | Public | Project overview and landing page |
| `/services` | Services List | Public | Browse, search, and filter services |
| `/services/new` | Create Service | Authenticated | Form to create a new service |
| `/services/:id/edit` | Edit Service | Authenticated (owner) | Form to edit existing service |
| `/login` | Login | Public | User login page |
| `/register` | Register | Public | User registration page |

## 🧪 Testing

Run the backend test suite:

```bash
npm test --prefix server
```

The test suite includes:
- API endpoint testing
- Authentication flow testing
- Input validation testing
- Authorization testing
- Error handling testing

## 🚀 Deployment

### Quick Deploy Options

- **Frontend**: Vercel (recommended for React apps)
- **Backend**: Render or Railway (Node.js hosting)
- **Database**: MongoDB Atlas (cloud MongoDB)

> 📖 For detailed deployment instructions including environment configuration, CI/CD setup, and production best practices, see [docs/deployment.md](docs/deployment.md).

## 📄 License

This project is released under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on the GitHub repository.

