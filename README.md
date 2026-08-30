# LearnSpace

LearnSpace is a full-featured Learning Management System built with Next.js and Strapi, featuring four distinct user roles, secure role-based access control, course management, and a clean, modern user experience.

## 🚀 Live Links
- **Frontend (Vercel):** https://learn-space-seven.vercel.app
- **Backend (Railway):** https://learnspace-production.up.railway.app

## 🛠️ Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Strapi 5
- **Database:** PostgreSQL
- **Hosting:** Vercel (Frontend) & Railway (Backend)

## 👥 User Roles & Permissions
| Role | Permissions |
|---|---|
| **Admin** | Full platform control. Manages users & roles, all courses, and lessons. |
| **Content Manager** | Creates, edits, and deletes any course and lesson across the platform. |
| **Instructor** | Manages only their own courses and lessons. Views progress of their own students. |
| **Student** | Enrolls in courses, views lessons, and tracks their own learning progress. |

## ✅ Features Completed

### Core Features
- ✅ **Authentication & Authorization:** Secure signup and login with role assignment.
- ✅ **Role-Based Access Control:** Strict backend enforcement ensuring users only access permitted routes and data.
- ✅ **Course & Lesson Management:** Content Managers can manage all courses; Instructors manage only their own.
- ✅ **Course Enrollment:** Students can browse courses, enroll, and view them under "My Courses".
- ✅ **Sequential Learning:** Enrolled students can view course lessons in proper sequence.

### Differentiator Features
- ✅ **Progress Tracking:** Students can mark lessons as complete. Course progress is calculated accurately.
- ✅ **Admin Dashboard:** A dedicated space for the Admin to view all users, manage roles, and see basic platform statistics.


## 💻 How to Run Locally

**1. Clone the repository:**
```bash
git clone [Insert your GitHub Repo URL here]
cd LearnSpace
```

**2. Setup and run the backend:**
```bash
cd server
npm install
```
Create a `.env` file in the `server/` directory with these dummy values:
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=learnspace
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_local_db_password
DATABASE_SSL=false
APP_KEYS=key1,key2
API_TOKEN_SALT=salt
ADMIN_JWT_SECRET=secret
TRANSFER_TOKEN_SALT=salt
JWT_SECRET=secret
```
Run the backend:
```bash
npm run develop
```
*(Strapi admin panel runs at `http://localhost:1337/admin`)*

**3. Setup and run the frontend:**
Open a new terminal tab and run:
```bash
cd ../web
npm install
```
Create a `.env` file in the `web/` directory:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```
Run the frontend:
```bash
npm run dev
```
*(Frontend runs at `http://localhost:3000`)*
