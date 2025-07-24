# Role-Based Access Control System

A full-stack web application with **role-based access control**, built using **React (frontend)** and **Node.js/Express/Prisma (backend)**. Users can register, log in, create/edit/delete posts (while unapproved), and view public posts. Admins can approve posts, after which users cannot edit or delete them. The app features a clean UI with **shadcn/ui components**, **lazy loading for performance**, and **token-based authentication** for protected routes.

---

## Features

### **Role-Based Authentication**

* Users select a role (**user** or **admin**) during registration and login (no default role).
* Protected routes (`/`, `/public`, `/dashboard`, `/admin`) require a valid JWT token.
* Unauthenticated users are redirected to `/login`.

### **Post Workflow**

* Users create posts (unapproved by default).
* Users can edit/delete posts only if unapproved.
* Admins can view all posts and approve them.
* Approved posts are visible on `/public`.

### **Frontend**

* Built with **React, Vite, Tailwind CSS, and shadcn/ui**.
* **Lazy-loaded pages** (`Register`, `Login`, `UserDashboard`, `AdminDashboard`, `PublicPosts`) for faster load times.
* Reusable **LoadingSpinner** component for API calls and page loads.
* **Modal popup** for editing posts in `UserDashboard`.

### **Backend**

* **Node.js/Express with Prisma ORM** and PostgreSQL.
* **JWT-based authentication** with token verification (`/api/auth/verify`).
* Role-based endpoints (`/api/admin/posts`, `/api/admin/approve/:id`).

### **Deployment**

* Frontend deployed on **Vercel**: [Live Demo](https://role-based-access-control-alpha.vercel.app/)
* Backend deployed separately (Render/Heroku).

---

## Tech Stack

* **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, React Router
* **Backend**: Node.js, Express, Prisma, PostgreSQL
* **Authentication**: JWT (JSON Web Tokens)
* **Deployment**: Vercel (frontend), Render/Heroku (backend)

---

## Installation and Setup

### **Prerequisites**

* Node.js (v18 or higher)
* PostgreSQL
* Git
* Vercel CLI (for deployment)

### **Backend Setup**

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```
DATABASE_URL="postgresql://user:password@localhost:5432/post_system?schema=public"
JWT_SECRET="your_jwt_secret_key"
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm start
```

Backend runs at `http://localhost:5000`.

---

### **Frontend Setup**

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```
VITE_API_URL=http://localhost:5000/api
```

Install `shadcn/ui` components:

```bash
npx shadcn@latest add dialog select input button textarea card label
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Testing Locally

1. Open `http://localhost:5173/` (unauthenticated users redirect to `/login`).
2. Register a user (`/register`), selecting **user** or **admin** role.
3. Log in (`/login`).
4. Test routes:

   * `/dashboard`: Users create, edit (via modal), delete unapproved posts.
   * `/admin`: Admins view all posts and approve unapproved posts.
   * `/public`: View approved posts (requires token).
5. Verify **LoadingSpinner** during API calls.

---

## API Endpoints

### **Auth**

* `POST /api/auth/register` – Register a user (`{username, email, password, role}`).
* `POST /api/auth/login` – Log in (`{email, password, role}`).
* `GET /api/auth/verify` – Verify JWT token.

### **Posts**

* `GET /api/posts` – Get approved posts (public, token required).
* `GET /api/posts/my-posts` – Get user’s posts (token required).
* `POST /api/posts` – Create a post (token required).
* `PUT /api/posts/:id` – Update unapproved post (token required).
* `DELETE /api/posts/:id` – Delete unapproved post (token required).

### **Admin**

* `GET /api/admin/posts` – Get all posts (admin only, token required).
* `PUT /api/admin/approve/:id` – Approve a post (admin only, token required).

---

## Deployment

### **Backend (Render Example)**

1. Push `server` to a Git repository.
2. Create a Web Service on Render.
3. Set environment variables:

   ```
   DATABASE_URL="your_postgres_url"
   JWT_SECRET="your_jwt_secret_key"
   ```
4. Build command: `npm install && npx prisma migrate deploy`.
5. Start command: `npm start`.

### **Frontend (Vercel)**

1. Push `client` to a Git repository.
2. Create a project on Vercel.
3. Set environment variables:

   ```
   VITE_API_URL=https://your-backend-api-url/api
   ```
4. Configure:

   * **Root Directory**: `client`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Deploy and access at: [https://role-based-access-control-alpha.vercel.app/](https://role-based-access-control-alpha.vercel.app/)

