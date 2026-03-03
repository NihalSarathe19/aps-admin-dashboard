import React from "react";

export default function Tabs({ value, onChange, tabs }) {
  return (
    <div className="tabs" role="tablist" aria-label="Console tabs">
      {tabs.map((t, idx) => {
        const active = t.value === value;
        return (
          <div
            key={t.value}
            className={`tab ${active ? "active" : ""}`}
            role="tab"
            tabIndex={active ? 0 : -1}
            aria-selected={active}
            onClick={() => onChange(t.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onChange(t.value);
              if (e.key === "ArrowRight") onChange(tabs[(idx + 1) % tabs.length].value);
              if (e.key === "ArrowLeft") onChange(tabs[(idx - 1 + tabs.length) % tabs.length].value);
            }}
          >
            {t.label}
          </div>
        );
      })}
    </div>
  );
}
