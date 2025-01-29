// Skeleton.js
import React from "react";
import "./SkeletonSidebar.css"; // Archivo CSS para los estilos del esqueleto

const Skeleton = ({children}) => {
  return (
    <div className="skeleton-container">
      {children}
    </div>
  );
};

export default React.memo(Skeleton);