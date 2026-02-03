# Two Truths & A Lie (Pixel Edition)

A simple full-stack OOP-focused web application built for a university workshop.

## Features
- **User Accounts**: Sign up and Login (JWT based).
- **Create Quiz**: Write 3 statements, mark one as a lie.
- **Play Quizzes**: Attempt quizzes made by others.
- **Retro UI**: Pixelated design style.
- **Architecture**: Clean OOP backend with Controller-Service-Repository pattern.

## Tech Stack
- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript, Vite
- **Styling**: Custom CSS (Pixel Art Style)

## Project Structure

### Backend (`/backend`)
Ordered by dependency flow:
1. `models/` - Core Entities (User, Quiz, Statement)
2. `repositories/` - Data Access Layer (JSON File persistence)
3. `services/` - Business Logic
4. `controllers/` - HTTP Request Handling
5. `routes.ts` - API Route Definitions
6. `app.ts` - Entry point

### Frontend (`/frontend`)
- `components/` - Reusable UI (PixelButton, PixelCard)
- `pages/` - Main Views
- `api.ts` - Axios instance

## How to Run

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:4000`

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Client runs on `http://localhost:5173` (or similar)

## Note
This project uses JSON file persistence in the `backend/data` folder. Your data will persist even if you restart the server.
