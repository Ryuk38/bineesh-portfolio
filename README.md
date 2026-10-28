# Bineesh Mathew — Personal Portfolio

A personal portfolio and full-stack CMS built with Next.js App Router, Three.js 3D background, GSAP scroll animations, and a built-in content management dashboard.

---

## 👤 About

**Bineesh Mathew** | AI & Data Science Engineer  
M.Sc. Big Data Analytics @ St. Xavier's College, Mumbai  
BCA with Analytics — Kristu Jayanti College, Bengaluru (CGPA: 8.64)  
📍 Nagpur, India | 📧 c380bineesh@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/bineesh38/) · [GitHub](https://github.com/Ryuk38) · [Linktree](https://linktr.ee/bineesh38)

---

## 🚀 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Vanilla CSS with HSL-based dynamic light/dark mode
- **3D Graphics**: Three.js via React Three Fiber (`@react-three/fiber` & `@react-three/drei`)
- **Animations**: GSAP + ScrollTrigger
- **Storage**: Local JSON files under `data/`
- **Email**: EmailJS for contact form

---

## 📂 Architecture & Routing

- `/` — Public-facing portfolio page (server-rendered)
- `/hellothere` — Secure admin login gateway
- `/welcometocms` — Protected CMS dashboard to manage all portfolio content
- `/api/portfolio` — JSON data read (GET) and write (POST) endpoints
- `/api/auth` — Authentication, session management

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Copy `.env.example` to `.env.local` and fill in your keys:
```bash
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

> **Tip:** If you see a `Cannot find module './[number].js'` error, delete the `.next` folder and re-run `npm run dev`.

---

## 💾 Local Storage Engine

No external database required. Data is stored in:
- `data/portfolioContent.json` — portfolio info, projects, skills, education, contact
- `data/adminCredentials.json` — hashed admin login credentials
