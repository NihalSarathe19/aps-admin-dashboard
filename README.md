# APS Security Platform (React + Vite)

A frontend-only prototype of the **APS Security Platform** with 3 core screens (Login → Dashboard → Scan Detail) plus working sidebar navigation pages (Projects, Scans, Schedule, Notifications, Settings, Support).  
Built with **React (functional components + hooks)**, **Vite**, and **React Router**.

## Tech stack

- React + Vite
- React Router (client-side routing) [web:76]
- CSS (design tokens via CSS variables, light/dark modes)

## Features

- 3 main flows
  - Login → Dashboard
  - Dashboard scan row → Scan Detail
  - Export/Stop actions with modals + toasts
- Sidebar navigation pages
  - Dashboard, Projects, Scans, Schedule, Notifications, Settings, Support
- Light/Dark theme toggle (global)
- Responsive layout (mobile sidebar menu + overlay)
- Loading skeletons (mock async load)
- Keyboard accessibility (Enter/Space on rows, Escape closes modals/menu, Ctrl/Cmd+K focuses search)

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm (ships with Node)

### Install

From the project root (where `package.json` exists):

```bash
npm install
