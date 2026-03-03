import React from "react";

export function SkeletonRow({ height = 60 }) {
  return <div className="skeleton" style={{ height, borderRadius: 8 }} />;
}

export function SkeletonCard() {
  return <div className="skeleton skeleton-card" />;
}
