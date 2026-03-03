📘 APS Security Platform (React + Vite)

Frontend-only prototype of an APS Security Platform UI, recreated in React with a modern, responsive dashboard layout.
Includes authentication flow (mocked), dashboard, scan detail view, and a full sidebar navigation system with multiple working pages.

🚀 Tech Stack

React (functional components + hooks)

Vite (fast dev server + production build tooling)

React Router for routing & active navigation

CSS with custom theme tokens (light/dark modes)

LocalStorage for theme & mock authentication

🖥️ Screens & Pages
Main Flow
Route	Screen
/	Login
/dashboard	Dashboard
/scans/:scanId	Scan Detail
Sidebar Pages
Route	Screen
/projects	Projects
/scans	Scans (List View)
/schedule	Schedule
/notifications	Notifications
/settings	Settings
/support	Support

✔ Navigation uses NavLink to automatically apply active styles.

✨ Features Implemented
✅ Routing & Navigation

Fully functional sidebar navigation

Every tab loads a real page (no dead buttons)

Clicking scan row → opens Scan Detail

Keyboard support: Enter/Space activate rows

🌗 Light/Dark Theme Support

Global theme toggle

CSS variables for theme tokens

Theme persists in localStorage

⚡ Interactivity

Modals:

New Scan

Filter

Columns

Export

Stop Scan

Toast notifications

Loading states

Skeleton loaders for async look-and-feel

📱 Responsive UI

Mobile hamburger sidebar

Overlay behavior

Scrollable tables for smaller screens

♿ Accessibility

ARIA labels added

Escape key closes modals/menus

Ctrl/Cmd + K focuses search

Keyboard-usable scan rows

🛠️ Setup Instructions
1. Prerequisites

Node.js (LTS recommended)

npm (comes with Node)

2. Install Dependencies
npm install
3. Run Development Server
npm run dev

Vite will print a URL such as:

http://localhost:5173/
4. Build for Production
npm run build
5. Preview Production Build
npm run preview

Note: vite preview is for local production preview, not a real server.

📂 Project Structure
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
⚠️ Known Limitations (Current Prototype)
❌ No backend

All data (scans, findings, logs) is mocked.

❌ No real authentication

"Login" only sets aps_authed in localStorage.

❌ Filter/column modals don’t persist settings

UI-complete but not linked to persistent storage.

❌ Export functionality is simulated

Shows modal + toast but doesn’t generate real files.

❌ Sidebar pages (Projects, Schedule, etc.)

Currently placeholders ready to expand.

🐞 Troubleshooting
❗ "Failed to resolve import … Does the file exist?"

A file path mismatch.
Fix the path and restart your dev server:

npm run dev
❗ "Failed to resolve import 'react-router-dom'"

Install it inside your project folder:

npm install react-router-dom
🚧 Suggested Next Improvements

Persist scan list changes, theme, filters in localStorage or backend

Implement real export (PDF / CSV / JSON)

Add real authentication + roles

Add pagination or virtualization for large lists

Connect the UI with APIs and real scan data
