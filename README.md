Role-Based Access Control System
A full-stack web application with role-based access control, built with React (frontend) and Node.js/Express/Prisma (backend). Users can register, log in, create/edit/delete posts (while unapproved), and view public posts. Admins can approve posts, after which users cannot edit or delete them. The app features a clean UI with shadcn/ui components, lazy loading for performance, and token-based authentication for protected routes.
Features

Role-Based Authentication:
Users select a role (user or admin) during registration and login (no default role).
Protected routes (/, /public, /dashboard, /admin) require a valid JWT token.
Unauthenticated users are redirected to /login.


Post Workflow:
Users create posts (unapproved by default).
Users can edit/delete posts only if unapproved.
Admins can view all posts and approve them.
Approved posts are visible on /public.


Frontend:
Built with React, Vite, and Tailwind CSS (via shadcn/ui).
Lazy-loaded pages (Register, Login, UserDashboard, AdminDashboard, PublicPosts) for faster load times.
Reusable LoadingSpinner component for API calls and page loads.
Modal popup for editing posts in UserDashboard.


Backend:
Node.js/Express with Prisma ORM and PostgreSQL.
JWT-based authentication with token verification (/api/auth/verify).
Role-based endpoints (/api/admin/posts, /api/admin/approve/:id).


Deployment:
Frontend deployed on Vercel: https://role-based-access-control-alpha.vercel.app/
Backend deployed separately (e.g., Render, Heroku).



Tech Stack

Frontend: React, Vite, Tailwind CSS, shadcn/ui, React Router
Backend: Node.js, Express, Prisma, PostgreSQL
Authentication: JWT (JSON Web Tokens)
Deployment: Vercel (frontend), Render/Heroku (backend)

Project Structure
role-based-access-control/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js
│   │   ├── components/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostForm.jsx
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── PublicPosts.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                    # Backend (Node.js/Express)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md

Installation and Setup
Prerequisites

Node.js (v18 or higher)
PostgreSQL
Git
Vercel CLI (for deployment)

Backend Setup

Navigate to the backend directory:cd server


Install dependencies:npm install


Set up environment variables in server/.env:DATABASE_URL="postgresql://user:password@localhost:5432/post_system?schema=public"
JWT_SECRET="your_jwt_secret_key"


Run Prisma migrations:npx prisma migrate dev


Start the backend:npm start

The server runs on http://localhost:5000.

Frontend Setup

Navigate to the frontend directory:cd client


Install dependencies:npm install


Set up environment variables in client/.env:VITE_API_URL=http://localhost:5000/api


Install shadcn/ui components:npx shadcn@latest add dialog select input button textarea card label


Start the frontend:npm run dev

The app runs on http://localhost:5173.

Testing Locally

Open http://localhost:5173/ (redirects to /login if unauthenticated).
Register a user (/register), selecting user or admin role.
Log in (/login) with the same role.
Test routes:
/dashboard (users): Create, edit (via modal), delete unapproved posts.
/admin (admins): View all posts, approve unapproved posts.
/public: View approved posts (requires token).


Verify LoadingSpinner during API calls and page loads.

API Endpoints

Auth:
POST /api/auth/register: Register a user ({username, email, password, role}).
POST /api/auth/login: Log in ({email, password, role}).
GET /api/auth/verify: Verify JWT token.


Posts:
GET /api/posts: Get approved posts (public, requires token).
GET /api/posts/my-posts: Get user’s posts (requires token).
POST /api/posts: Create a post (requires token).
PUT /api/posts/:id: Update a post (unapproved only, requires token).
DELETE /api/posts/:id: Delete a post (unapproved only, requires token).


Admin:
GET /api/admin/posts: Get all posts (admin only, requires token).
PUT /api/admin/approve/:id: Approve a post (admin only, requires token).



Deployment
Backend (e.g., Render)

Push the server directory to a Git repository.
Create a new Web Service on Render.
Set environment variables:DATABASE_URL="your_postgres_url"
JWT_SECRET="your_jwt_secret_key"


Set build command: npm install && npx prisma migrate deploy.
Set start command: npm start.
Deploy and note the API URL (e.g., https://your-backend-api-url).

Frontend (Vercel)

Push the client directory to a Git repository.
Create a new project on Vercel, linking to the repository.
Set environment variables:VITE_API_URL=https://your-backend-api-url/api


Configure:
Root Directory: client
Build Command: npm run build
Output Directory: dist


Deploy and verify at https://role-based-access-control-alpha.vercel.app/
