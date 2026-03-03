import React from "react";

export default function Badge({ kind = "status", level = "completed", children, ariaLabel }) {
  const cls = `component-badge ${kind}-${level}`;
  return (
    <span className={cls} role="status" aria-label={ariaLabel || `${kind}: ${level}`}>
      {children}
    </span>
  );
}
