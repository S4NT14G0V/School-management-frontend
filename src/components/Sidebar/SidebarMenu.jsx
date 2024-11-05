import React from "react";
import "./SidebarMenu.css";
import { Link, useLocation } from "react-router-dom";

export default function SidebarMenu({ menuItems }) {
  const location = useLocation();

  // Encuentra el índice del primer elemento que contiene "admin" en su href
  const adminIndex = menuItems.findIndex((item) =>
    item.href.includes("admin")
  );

  return (
    <div className="sidebar-menu">
      <ul className="sidebar-menu-item-list">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {/* Insertar el divisor antes del primer elemento "admin" */}
            {index === adminIndex && (
              <div className="sidebar-menu-divider">
                <span className="sidebar-menu-divider-text">
                  Administration
                </span>
                <hr className="sidebar-menu-divider-line" />
              </div>
            )}
            <li
              className={`sidebar-menu-item ${
                location.pathname === item.href.split("?")[0]
                  ? "item-active"
                  : ""
              }`}
            >
              <Link to={item.href}>
                <img src={item.src} alt={item.alt} />
                {item.label}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
