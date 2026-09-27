# SkillBridge — SIH26044 Prototype

Academia–Industry Collaboration Portal for Skill Mapping, Internships and Placement.

A standalone React + Vite app. No backend, no API keys, no Claude dependency — runs entirely
in the browser with mock data.

## Tech stack
- React 18
- React Router DOM v6
- Vite 5
- Plain modern CSS (CSS variables, flexbox/grid, dark-mode aware)

## Folder structure
```
skillbridge-vite/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── src/
│   ├── main.jsx              # React entry point (BrowserRouter)
│   ├── App.jsx                # Routes, auth/role state, application tracking logic
│   ├── index.css              # Global styles
│   ├── data/
│   │   └── mockData.js        # All mock data (skills, jobs, courses, stats)
│   ├── components/
│   │   ├── UI.jsx             # Card, Badge, Progress
│   │   └── Sidebar.jsx        # Role-aware navigation
│   └── pages/
│       ├── Login.jsx
│       ├── Home.jsx
│       ├── StudentDashboard.jsx
│       ├── Assessment.jsx
│       ├── SkillGap.jsx
│       ├── Internships.jsx
│       ├── Tracking.jsx
│       ├── Portfolio.jsx
│       ├── IndustryDashboard.jsx
│       ├── FacultyDashboard.jsx
│       └── InstitutionDashboard.jsx
```

## Run locally
```bash
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173).

## Build for production
```bash
npm run build
npm run preview   # optional: preview the production build locally
```
Output goes to `dist/`.

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts (framework preset: Vite). Vercel auto-detects `npm run build` and the `dist/` output.

**Option B — Git + Vercel dashboard**
1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. Go to vercel.com → New Project → Import the repo.
3. Framework preset: **Vite** (auto-detected). Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

The included `vercel.json` adds a catch-all rewrite to `index.html` so client-side routes
(`/dashboard`, `/jobs`, etc.) work correctly on direct load/refresh.

## What's implemented
- Role-based login: Student / Industry / Faculty / Institution (mock, no real auth)
- Student flow: Home → Assessment → Skill Gap → Recommendations → Apply → Track Application
- Real client-side routing via React Router (URLs update, browser back/forward works)
- Basic Industry, Faculty and Institution dashboards
- All data is static mock data in `src/data/mockData.js` — replace with real API calls when
  a backend is ready.

## Notes for extending
- To add a backend, swap the static imports in `mockData.js` usages for `fetch`/API calls
  (e.g. inside `useEffect` + `useState`, or a data-fetching library like React Query).
- Application state (applied jobs, pipeline stage) currently lives in `App.jsx` via `useState`
  and resets on page reload — wire it to a database or `localStorage` for persistence.
