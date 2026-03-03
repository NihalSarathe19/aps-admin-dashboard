APS Security Platform (React + Vite)
Frontend-only prototype of an “APS Security Platform” UI recreated in React with 3 primary screens (Login → Dashboard → Scan Detail) plus working sidebar navigation pages (Projects, Scans, Schedule, Notifications, Settings, Support).
Built with functional components + hooks, client-side routing, light/dark theme tokens, and responsive layout.

Tech stack
React (functional components, hooks)

Vite (dev server + production build tooling; scripts: dev, build, preview)
​

React Router for routing + active navigation using NavLink
​

CSS (custom design tokens via CSS variables; light/dark modes)

Screens & pages
Main flow (core screens)
Login (/)

Dashboard (/dashboard)

Scan Detail (/scans/:scanId)

Sidebar pages (tabs must work)
Projects (/projects)

Scans (/scans) – list view

Schedule (/schedule)

Notifications (/notifications)

Settings (/settings)

Support (/support)

Navigation uses NavLink to automatically apply active styles when the route matches.
​

Features implemented
Routing + navigation

Sidebar tabs navigate to real pages (no “dead” buttons)

Scan row click (and Enter/Space) opens Scan Detail

Light/Dark theme

Global theme toggle using CSS variables

Theme persisted in localStorage

Interactivity

Modals (New Scan, Filter, Columns, Export, Stop Scan)

Toast notifications for actions

Loading states

Skeleton loaders to simulate mock data resolving

Responsive UI

Mobile hamburger menu with overlay

Scrollable table on small screens

Accessibility

Keyboard support: Enter/Space on scan rows, Escape closes modals/menu, Ctrl/Cmd+K focuses search

ARIA labels on key controls

Setup instructions
1) Prerequisites
Node.js + npm installed

Recommended: Node LTS

2) Install dependencies
From the project root (where package.json is):

bash
npm install
3) Run the app (development)
Start Vite dev server:

bash
npm run dev
Vite prints the local URL in your terminal (commonly http://localhost:5173/).
​

4) Build for production
Create an optimized production build:

bash
npm run build
5) Preview the production build locally
Serve the built app locally:

bash
npm run preview
vite preview is meant for locally previewing the production build, not as a full production server.
​

Project structure
text
src/
  main.jsx
  App.jsx
  index.css
  data/
    mock.js
  context/
    ThemeContext.jsx
    ToastContext.jsx
  shell/
    AppShell.jsx
    Sidebar.jsx
  screens/
    Login.jsx
    Dashboard.jsx
    ScanDetail.jsx
    Projects.jsx
    Scans.jsx
    Schedule.jsx
    Notifications.jsx
    Settings.jsx
    Support.jsx
  ui/
    ToastHost.jsx
    Modal.jsx
    Button.jsx
    Badge.jsx
    Tabs.jsx
    Skeleton.jsx
Known limitations (current)
No backend: all data is mocked (scans, logs, findings). Actions like “Export” and “New Scan” show UI feedback but don’t persist anywhere.

No authentication: “auth” is simulated with localStorage (aps_authed), not real login/roles.

No real filtering/column persistence: filter/column modals are UX-complete but can be extended to persist preferences per user/org.

Export is simulated: doesn’t generate real PDF/CSV/JSON files yet (just modal + toast).

Projects/Schedule/Notifications/Support pages are scaffold pages designed to be expanded with real tables/cards/forms.

Troubleshooting
“Failed to resolve import … Does the file exist?”
This indicates a missing local file/folder (path mismatch). Ensure the file exists exactly at the import path and restart npm run dev. This error is a common Vite import-analysis failure when the referenced file is missing.
​

“Failed to resolve import 'react-router-dom'…”
Install React Router in the same folder you run Vite:

bash
npm install react-router-dom
Suggested next improvements
Persist scan list changes and user preferences (filters/columns/theme) in local storage or a backend.

Implement real export generation (PDF/CSV/JSON).

Add a proper auth flow and role-based access control.

Add pagination/virtualization for large scan lists.
