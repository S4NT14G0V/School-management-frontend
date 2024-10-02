import React, { useState, useEffect } from "react";
import "./SidebarMenu.css";
import { useUser } from "../../context/userContext";
import { validateAdmin } from "../../services/userService";

export default function SidebarMenu() {
  const { authToken, auth } = useUser();
  const [isAdmin, setIsAdmin] = useState(false); // Estado para determinar si es admin
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Lógica para validar si es administrador (como en tu ejemplo anterior)
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token") || authToken;

    if (!token) {
      setLoading(false);
      return;
    }
    auth(token);

    // Aquí va la función de autenticación y validación de admin
    validateAdmin(token)
      .then((response) => {
        setIsAdmin(response); // Establecer si es admin o no
      })
      .finally(() => {
        setLoading(false); // Dejar de cargar
      });
  }, [authToken]);

  const menuItems = [
    {
      src: "src/assets/item-classes.svg",
      alt: "button-classes",
      label: "Classes",
      href: `/classes?token=${authToken}`,
    },
    {
      src: "src/assets/item-assesments.svg",
      alt: "button-assesments",
      label: "Assesments",
      href: "#",
    },
    {
      src: "src/assets/item-attendance.svg",
      alt: "button-attendance",
      label: "Attendance",
      href: "#",
    },
    {
      src: "src/assets/item-califications.svg",
      alt: "button-califications",
      label: "Califications",
      href: "#",
    },
  ];

  // Agrega el elemento de administración solo si el usuario es admin
  if (isAdmin) {
    menuItems.push({
      src: "src/assets/item-admin.svg",
      alt: "button-administration",
      label: "Administration",
      href: `/admin?token=${authToken}`,
    });
  }

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
