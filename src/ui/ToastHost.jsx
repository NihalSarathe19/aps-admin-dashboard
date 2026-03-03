import React from "react";
import { useToast } from "../context/ToastContext.jsx";

export default function ToastHost() {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} role="status" aria-live="polite">
          <div className="toast-message">{t.message}</div>
        </div>
      ))}
    </>
  );
}
