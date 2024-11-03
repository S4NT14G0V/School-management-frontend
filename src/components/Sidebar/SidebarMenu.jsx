import React from "react";
import "./SidebarMenu.css";
import { Link, useLocation } from "react-router-dom";

export default function SidebarMenu({menuItems}) {

  const location = useLocation();

  return (
    <div className="sidebar-menu">
      <ul className="sidebar-menu-item-list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`sidebar-menu-item ${
              location.pathname.includes(item.href.split("?")[0])
                ? "item-active"
                : ""
            }`} // Activa el botón si coincide la ruta
          >
            <Link to={item.href}>
              <img src={item.src} alt={item.alt} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
