import React from "react";

export default function Button({ variant = "secondary", className = "", children, ...props }) {
  const cls =
    variant === "primary"
      ? "component-button primary"
      : variant === "danger"
      ? "component-button danger"
      : "component-button secondary";
  return (
    <button className={`${cls} ${className}`} {...props}>
      {children}
    </button>
  );
}
