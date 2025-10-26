<h1 align="center">
  🎬 MflixX – Movie Dashboard Application
</h1>

<p align="center">
  <strong>A modern, full-stack movie management dashboard built with Next.js, MongoDB, Tailwind CSS, Shadcn/UI and Better Auth.</strong>
</p>

---

## 📖 Overview

**MflixX** is a full-stack **Movie Dashboard Application** inspired by [IMDb](https://www.imdb.com/).  
It allows administrators to manage movies (CRUD), view active logged-in users, and monitor the platform in real time.  
The app includes **secure authentication**, a **mobile-friendly UI**, and a clean, minimal dashboard layout built using **Next.js**, **MongoDB**, and **Tailwind CSS** with **ShadCN/UI components**.

---

## ✨ Key Features

### 🎞️ Movie Management
- Add, edit, delete, and view movie details (CRUD operations)
- Upload poster images, trailers, or metadata
- Filter and search movies by genre, rating, or release year

### 👥 User Management
- Secure **authentication** using **Better Auth**
- View **active logged-in users** directly on the dashboard
- Manage user sessions and roles
- Display total users, login activity, and online status

### 🧑‍💻 Admin Dashboard
- Intuitive dashboard for managing both users and movie content
- Analytics summary (movie count, user activity, etc.)
- Real-time updates from MongoDB

### 📱 Responsive UI
- Fully mobile-responsive design
- Built with **Tailwind CSS** and **ShadCN/UI**
- Adaptive layout for mobile, tablet, and desktop views

### 🔐 Authentication
- Implemented using **Better Auth** with secure JWT session handling
- Protected routes for admin access
- Logout and session expiry handling

### ⚡ Performance
- Built with **Next.js App Router** for lightning-fast performance
- Uses **Server Actions** for optimized data fetching
- Optimized MongoDB queries for scalability

---

## 🧱 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js (App Router), React |
| **Backend** | Next.js API Routes, MongoDB |
| **Database** | MongoDB Atlas |
| **Authentication** | Better Auth |
| **UI Framework** | Tailwind CSS + ShadCN/UI |
| **Icons** | Lucide React |
| **Version Control** | Git & GitHub |


---

## 🚀 Getting Started

### 1. Clone the repository
  ```bash
git clone https://github.com/yourusername/MflixX.git
cd MflixX

```
### 2. Install dependencies

```bash
npm install
```
### 3. Setup environment variables

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret_key
```
### 4. Run the development server
```bash
npm run dev
```

