import React from "react";
import './SidebarMenu.css'

const menuItems = [
  { src: "src/assets/item-classes.svg", alt: "button-classes", label: "Classes", href: "#" },
  { src: "src/assets/item-assesments.svg", alt: "button-assesments", label: "Assesments", href: "#" },
  { src: "src/assets/item-attendance.svg", alt: "button-attendance", label: "Attendance", href: "#" },
  { src: "src/assets/item-califications.svg", alt: "button-califications", label: "Califications", href: "#" },
  { src: "src/assets/item-admin.svg", alt: "button-administration", label: "Administration", href: "#" }
];

export default function SidebarMenu() {
  return (
    <div className="sidebar-menu">
      <ul className="sidebar-menu-item-list">
        {menuItems.map((item, index) => (
          <li key={index} className={`sidebar-menu-item ${index === 0 ? 'item-active' : ''}`}>
            <a href={item.href}>
              <img src={item.src} alt={item.alt} />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
