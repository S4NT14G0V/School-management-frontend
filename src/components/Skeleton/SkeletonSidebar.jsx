// Skeleton.js
import React from "react";
import "./SkeletonSidebar.css"; // Archivo CSS para los estilos del esqueleto

export default function Skeleton({children}) {
  return (
    <div className="skeleton-container">
      {children}
    </div>
  );
};

