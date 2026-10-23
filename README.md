# UCAM BUP

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)

An improved full-stack university portal for **Bangladesh University of Professionals (BUP)** students and administrators. UCAM BUP centralizes academic information and campus services in one place: profiles, LMS, attendance, exam marks, payments, course feedback, schedules, library, scholarships, transport, complaints, counseling, and lost-and-found.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Seed Data](#seed-data)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Authentication Flow](#authentication-flow)
- [Development Notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

**Academics**
- Student dashboard and home overview
- Profile management
- Learning Management System (LMS)
- Attendance summary
- Exam marks and course history
- Admit card download
- Mid-term course feedback
- Student CourseKit
- Faculty information
- CGPA calculator

**Campus services**
- Daily class schedule and upcoming events
- Bills and payment history
- Library management
- Scholarship tracking
- Transport and bus timing
- Housing and medical center information
- Complaint box (with anonymous submission)
- Counseling and wellness appointments
- Lost-and-found reporting
- Lost ID card reporting

**Platform**
- Login and registration with JWT authentication
- Administrator panel
- Notification dropdown and toast notifications

---

## Tech Stack

| Layer          | Technology                                              |
| -------------- | ------------------------------------------------------- |
| Frontend       | React 18, Vite 5, TypeScript/TSX, Tailwind CSS 3, PostCSS |
| Routing / HTTP | react-router-dom, axios                                 |
| UI             | lucide-react icons, custom CSS                          |
| Backend        | Node.js, Express 4, TypeScript                          |
| Database       | MongoDB with Mongoose                                   |
| Auth           | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` hashing    |

---

## Project Structure

```text
Ucam_BUP/
├── README.md
└── OneDrive/Desktop/Ucam_Next/
    ├── index.html                  Frontend HTML entry point
    ├── package.json                Frontend dependencies and scripts
    ├── tailwind.config.js
    ├── postcss.config.js
    │
    ├── src/                        React frontend
    │   ├── main.tsx                Entry point
    │   ├── App.tsx                 App shell and page routing
    │   ├── index.css               Global styles + Tailwind imports
    │   ├── api/client.ts           Axios client + JWT interceptor
    │   ├── components/             Layout, NotificationDropdown, Toast, ToastContainer
    │   ├── context/                Shared frontend state
    │   ├── pages/                  Home, Dashboard, Login, LMS, Profile, Attendance,
    │   │   │                       Exammarks, AdmitCard, Faculty, AdminPanel
    │   │   └── services/           BillsPayments, CGPACalculator, ClassSchedule,
    │   │                           ComplaintBox, Counselling, Housing, IdCardLost,
    │   │                           Library, LostAndFound, MedicalCenter, Profile,
    │   │                           Scholarships, Transport, UpcomingEvents
    │   └── types/index.ts          Shared TypeScript types
    │
    └── server/                     Express backend
        ├── package.json
        ├── tsconfig.json
        ├── seed.ts                 Development seed script
        └── src/
            ├── index.ts            Server entry point
            ├── config/db.ts        MongoDB connection
            ├── middleware/auth.ts  JWT + admin authorization
            ├── models/             User, Complaint, LostItem, Notification, Appointment
            └── routes/             auth, complaints, lostFound, counseling,
                                    notifications, admin
```

**How it fits together:** `src/main.tsx` renders `App.tsx`, which imports the portal pages and uses `Layout.tsx` for navigation. All API calls go through `src/api/client.ts`, which targets `http://localhost:5000/api` and attaches the JWT stored in `localStorage` as `ucam_token`. The backend (`server/src/index.ts`) loads env vars, connects to MongoDB, enables CORS and JSON parsing, and mounts route modules under `/api`.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/) (local install or MongoDB Atlas)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Saku53/Ucam_BUP.git
cd Ucam_BUP/OneDrive/Desktop/Ucam_Next
```

### 2. Configure the backend

Create `server/.env` (see [Environment Variables](#environment-variables)):

```bash
cp server/.env.example server/.env   # then edit the values
```

### 3. Install dependencies

```bash
# Frontend (from Ucam_Next/)
npm install

# Backend
cd server
npm install
```

### 4. Run in development

Backend (from `Ucam_Next/server`):

```bash
npm run dev
```

Runs on `http://localhost:5000` (uses Nodemon + ts-node). Health check: `http://localhost:5000/api/health`.

Frontend (new terminal, from `Ucam_Next`):

```bash
npm run dev
```

Runs on `http://localhost:5173`.

### 5. Production build

```bash
# Frontend (from Ucam_Next/)
npm run build
npm run preview        # preview the production build

# Backend (from Ucam_Next/server)
npm run build          # outputs to server/dist/
npm start
```

---

## Environment Variables

The backend reads these from `server/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ucam
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_PASSWORD=replace-with-a-secure-admin-password
CLIENT_URL=http://localhost:5173
PORT=5000
```

| Variable         | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `MONGO_URI`      | MongoDB connection string (required)            |
| `JWT_SECRET`     | Secret used to sign auth tokens                 |
| `ADMIN_PASSWORD` | Password for the administrator login            |
| `CLIENT_URL`     | Allowed frontend origin for CORS                |
| `PORT`           | Backend port (default `5000`)                   |

> **Security:** never commit real secrets. If `.env` is already tracked in git, remove it from the repo, use an untracked local file instead, and **rotate any exposed credentials**.

---

## Seed Data

`server/seed.ts` populates the database with development data: a demo student, sample complaints, lost-and-found records, notifications, and counseling appointments. A development seed endpoint is also available at `POST /api/auth/seed`.

Demo login (development only):

```text
Student ID: 23549009053
Password:   123456
```

> These credentials are for local development only. Never use them in production.

---

## API Reference

All routes are mounted under `/api`. Protected routes require:

```http
Authorization: Bearer <token>
```

| Group             | Endpoints                                                              |
| ----------------- | ---------------------------------------------------------------------- |
| `/api/health`     | `GET /` health check                                                   |
| `/api/auth`       | `POST /register`, `POST /login`, `PATCH /profile`, `PATCH /password`, `POST /seed` |
| `/api/complaints` | Create and retrieve complaints                                         |
| `/api/lost-found` | Report and manage lost/found items                                     |
| `/api/counseling` | Counseling appointment operations                                      |
| `/api/notifications` | Student notification operations                                     |
| `/api/admin`      | Administrator-only operations                                          |

The backend has separate middleware for normal authenticated users and admin-only routes.

---

## Data Models

| Model            | Key fields                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **User**         | student ID, name, email, password, department, program, year/semester, CGPA, blood group, contact and guardian info, profile image, role |
| **Complaint**    | student ref, category, subject, description, anonymous flag, priority, status, resolution info |
| **LostItem**     | name, description, lost/found status, location, contact info, reporting student              |
| **Notification** | title, message, type, read/unread state, related student                                     |
| **Appointment**  | student ref, counselor details, date and time, status                                        |

---

## Authentication Flow

1. A student registers via `POST /api/auth/register`.
2. The backend validates the student ID, email, and password.
3. The password is hashed by the `User` model's bcrypt pre-save hook.
4. The backend returns a JWT.
5. The frontend stores the token in `localStorage` as `ucam_token`.
6. `src/api/client.ts` attaches the token to every subsequent request.
7. On a `401` response, the frontend clears the token and reloads.
8. Administrators sign in through a dedicated admin login path and receive an admin JWT.

---

## Development Notes

- Frontend and backend have separate `package.json` files; there is no root workspace config.
- The API base URL is hardcoded to `http://localhost:5000/api` in `src/api/client.ts`. Consider moving it to a Vite env variable (`VITE_API_URL`).
- No automated test scripts are defined yet.
- `node_modules/`, `venv/`, and `.idea/` are currently committed and should be removed from version control and covered by `.gitignore`.

### Suggested `.gitignore`

```gitignore
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment files
.env
.env.*
!.env.example

# Python environments
venv/
.venv/

# IDE files
.idea/
.vscode/

# Logs
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# OS files
.DS_Store
Thumbs.db
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Install frontend and backend dependencies.
4. Configure your local environment variables.
5. Make your changes.
6. Verify that both the frontend and backend build successfully.
7. Commit your changes:

   ```bash
   git commit -m "feat: describe your change"
   ```

8. Push the branch and open a pull request.

Please avoid committing `.env` files, generated dependencies, build output, or personal data.

---

## License
Required Notice: Copyright (c) 2026 Md. Nazmus Sakib Siam (https://github.com/Saku53)
