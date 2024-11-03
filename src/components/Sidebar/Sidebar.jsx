import React, { useState, useEffect } from "react";
import AcademicInfo from "../AcademicInfo/AcademicInfo";
import UserInfo from "../UserInfo/UserInfo";
import SidebarMenu from "./SidebarMenu";
import Skeleton from "../Skeleton/SkeletonSidebar";
import { validateAdmin, getInfo } from "../../services/userService";
import "./Sidebar.css";
import { useUser } from "../../context/userContext";

export default function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const { email } = useUser();
  // Configura los elementos del menú
  const newMenuItems = [
    {
      src: "src/assets/item-classes.svg",
      alt: "button-classes",
      label: "Classes",
      href: `/classes?token=${token}`,
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

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      setLoading(true);
      try {
        // Primero obtenemos la información del usuario
        const userData = await getInfo(token);
        setUserInfo(userData);

        // Luego validamos si es admin
        const adminData = await validateAdmin(token);
        setIsAdmin(adminData);

        if (adminData) {
          email(userData.email);
          newMenuItems.push({
            src: "src/assets/item-admin.svg",
            alt: "button-administration",
            label: "Administration",
            href: `/admin?token=${token}`,
          });
        }

        setMenuItems(newMenuItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Añade un retraso de 3 segundos antes de cambiar loading a false
        setTimeout(() => setLoading(false), 3000);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="sidebar">
      {loading ? ( // Cambiamos aquí a una sola condición con operador ternario
        <Skeleton>
          <AcademicInfo />
          <SidebarMenu menuItems={menuItems} />
          {userInfo && <UserInfo userInfo={userInfo} />}
        </Skeleton>
      ) : (
        <>
          <AcademicInfo />
          <SidebarMenu menuItems={menuItems} />
          {userInfo && <UserInfo userInfo={userInfo} />}
        </>
      )}
    </div>
  );
  
}
