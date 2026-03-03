import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ToastHost from "./ui/ToastHost.jsx";

import Login from "./screens/Login.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import ScanDetail from "./screens/ScanDetail.jsx";
import AppShell from "./shell/AppShell.jsx";
import Projects from "./screens/Projects.jsx";
import Scans from "./screens/Scans.jsx";
import Schedule from "./screens/Schedule.jsx";
import Notifications from "./screens/Notifications.jsx";
import Settings from "./screens/Settings.jsx";
import Support from "./screens/Support.jsx";

function RequireAuth({ children }) {
  const authed = localStorage.getItem("aps_authed") === "1";
  return authed ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route
            element={
              <RequireAuth>
                <AppShell />
              </RequireAuth>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/scans" element={<Scans />} />
            <Route path="/scans/:scanId" element={<ScanDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastHost />
      </ToastProvider>
    </ThemeProvider>
  );
}