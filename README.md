# Nisanth K — AI & Robotics Personal Portfolio

A production-grade, animated personal portfolio website for **Nisanth K** (B.Tech AI & Data Science student at Indra Ganesan College of Engineering), showcasing real-world systems across AI/ML, humanoid robotics, embedded hardware, and full-stack web applications.

---

## 🌟 Key Features

1. **Hero Section**:
   - Dynamic typewriter alternating between: *"AI & Data Science Student"*, *"Robotics Builder"*, and *"Full-Stack Developer"*.
   - Interactive Canvas Neural Network / Particle Mesh with real-time mouse repulsion and synaptic links.
   - Magnetic action CTAs with smooth scroll, direct PDF resume download, and contact navigation.
2. **About Section**:
   - Verified narrative background highlighting college, focus domains, and awards.
   - 3 Quick-Stat cards: *"2 First Places in 2026"*, *"4 Core Projects"*, *"Robotics + AI + Web"*.
   - Interactive academic timeline (B.Tech AI & Data Science 2025–2029, Higher Secondary CS 2023–2025).
3. **Skills Matrix**:
   - Filterable categories: Programming, Data, Web, Embedded & Robotics, AI Tools, Interests.
   - Illuminated interactive chips with zero fake percentage bars.
4. **Projects Showcase**:
   - **Featured Hero Card**: **AURA - 12-DOF Humanoid Robot** with glowing animated conic border, dual Jetson Nano & ESP32 split architecture callout, and 12-joint standing-pose calibration badge.
   - Grid cards for **Smart Gate Pass System** (Django QR verification), **SmartAttend AI** (Biometric face recognition), and **Smart Energy Generation System** (Energy monitoring & storage).
   - Deep-dive technical modal with hardware pinouts, architecture notes, and dynamic links.
5. **Achievements Timeline**:
   - Vertical milestone timeline for CARE Tech Fest '26 (1st Prize), Project Expo 2026 (1st Place), WARTECH '26 (Certificate of Appreciation).
   - Collapsible row for Esports Free Fire (2nd Place at AIROX 2026).
6. **Contact Section**:
   - Interactive form posting to Django API with honeypot spam protection and rate limiting (5 submissions/hour per IP).
   - Direct links for Email (`nisanth0202@gmail.com`), GitHub (`Nisanth32`), LinkedIn (`Nisanth K`), and location (`Tamil Nadu, India`). *(Phone number is kept private).*
7. **Design & Motion**:
   - Lenis smooth scroll inertia.
   - Persistent Dark / Light mode toggle.
   - Ambient desktop cursor glow.
   - Respects `prefers-reduced-motion` for accessibility.

---

## 🚀 How to Run Locally

### 1. Start Frontend (React + Vite)
In a terminal, run:
```bash
# From workspace root:
npm run dev

# OR from inside frontend directory:
cd frontend
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your web browser.

### 2. Start Backend (Django REST Framework)
In a second terminal, run:
```bash
cd backend
python manage.py runserver
```
The Django API will be live at **[http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)** and Admin at **[http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)**.

---

## 🛠 Database & Seed Data

The database has already been migrated and seeded with Nisanth K's factual profile, skills, projects, and achievements.

To re-seed the database at any time:
```bash
cd backend
python manage.py seed_portfolio
```

To run the automated backend test suite:
```bash
cd backend
python manage.py test api
```

---

## ☁️ Deployment Guide

### Frontend -> Vercel or Netlify
1. Push your repository to GitHub.
2. Link the repository on **Vercel** or **Netlify**.
3. Set **Root Directory** to `frontend`.
4. Build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-domain.com/api`

### Backend -> Render, Railway, or Fly.io
1. Set the root directory to `backend`.
2. Set Environment Variables:
   - `SECRET_KEY`: `<generate-a-secure-production-secret>`
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `your-backend-app.onrender.com,localhost`
   - `CORS_ALLOWED_ORIGINS`: `https://your-portfolio.vercel.app`
   - `DATABASE_URL`: `postgresql://...` (Render / Railway PostgreSQL)
3. Set **Build Command**:
   ```bash
   pip install -r requirements.txt && python manage.py migrate && python manage.py seed_portfolio
   ```
4. Set **Start Command**:
   ```bash
   gunicorn config.wsgi:application
   ```

---

## 📁 Assets to Add (Optional Polish)
- `/frontend/public/assets/resume.pdf` — Nisanth K's official resume document.
- `/frontend/public/assets/aura_humanoid.png` — Real photo or render of the AURA 12-DOF upper body humanoid.
- `/frontend/public/assets/certificates/` — High-res certificate scans for CARE Tech Fest '26 and Project Expo 2026.
