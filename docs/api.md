# API Overview

Base URL: `/api`

## Authentication

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/profile`
- `PUT /auth/profile`

Authenticated requests use:

```http
Authorization: Bearer <jwt>
```

## Services

- `GET /services?search=react&page=1&limit=10&sortBy=price&order=asc`
- `POST /services`
- `PUT /services/:id`
- `DELETE /services/:id`

## Jobs

- `GET /jobs`
- `POST /jobs`
- `POST /jobs/:id/apply`
- `GET /jobs/dashboard/employer`

## Courses

- `GET /courses`
- `GET /courses/:id`
- `POST /courses`
- `POST /courses/:id/enroll`

## Chat

- `GET /chat/:userId`
- Socket event: `message:send`
- Socket event: `message:new`

## Admin

- `GET /admin/analytics`
- `GET /admin/users`
- `PUT /admin/users/:id/deactivate`
- `GET /admin/services`
- `GET /admin/jobs`

## External Integration

- `GET /integrations/technology-news`
