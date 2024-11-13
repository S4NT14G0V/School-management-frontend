import React, { useState, useEffect } from "react";
import AcademicInfo from "../AcademicInfo/AcademicInfo";
import UserInfo from "../UserInfo/UserInfo";
import SidebarMenu from "./SidebarMenu";
import Skeleton from "../Skeleton/SkeletonSidebar";
import { validateAdmin, getInfo } from "../../services/userService";
import "./Sidebar.css";
import { useUser } from "../../context/userContext";
import ItemClassesIcon from "../../assets/item-classes.svg";
import ItemAssesmentsIcon from "../../assets/item-assesments.svg";
import ItemAttendanceIcon from "../../assets/item-attendance.svg";
import ItemCalificationsIcon from "../../assets/item-califications.svg";
import UserCogIcon from "../../assets/user-cog.svg";
import BookCogIcon from "../../assets/book-cog.svg";
import FolderCogIcon from "../../assets/folder-cog.svg";
import GroupCogIcon from "../../assets/group-cog.svg";
import FamilyIcon from "../../assets/family.svg";

export default function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [token, setToken] = useState(null);
  const { email, auth, setUserDataChat } = useUser();

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
      auth(urlToken);
    }
  }, [auth]);

  useEffect(() => {
    const newMenuItems = [
      {
        src: ItemClassesIcon ,
        alt: "button-classes",
        label: "Classes",
        href: `/classes?token=${token}`,
      },
      {
        src: ItemAssesmentsIcon,
        alt: "button-assesments",
        label: "Assesments",
        href: `/assesments?token=${token}`,
      },
      {
        src: ItemAttendanceIcon,
        alt: "button-attendance",
        label: "Attendance",
        href: "#",
      },
      {
        src: ItemCalificationsIcon,
        alt: "button-califications",
        label: "Califications",
        href: `/califications?token=${token}`,
      },
    ];

    const fetchData = async () => {
      if (!token) return;

      setLoading(true);
      try {
        // Primero obtenemos la información del usuario
        const userData = await getInfo(token);
        setUserDataChat(userData);
        setUserInfo(userData);

        // Luego validamos si es admin

        const adminData = await validateAdmin(token);

        if (adminData) {
          email(userData.email);
          newMenuItems.push(
            {
              src: UserCogIcon,
              alt: "button-administration",
              label: "User Management",
              href: `/admin/users?token=${token}`,
            },
            {
              src: BookCogIcon,
              alt: "button-administration-2",
              label: "Subject Management",
              href: `/admin/subjects?token=${token}`,
            },
            {
              src: FolderCogIcon,
              alt: "button-administration-3",
              label: "Classes Management",
              href: `/admin/classes?token=${token}`,
            },
            {
              src: GroupCogIcon,
              alt: "button-administration-3",
              label: "Groups Management",
              href: `/admin/groups?token=${token}`,
            },{
              src: FamilyIcon,
              alt: "button-administration-3",
              label: "Family Management",
              href: `/admin/family?token=${token}`,
            },
            
          );
        }

        setMenuItems(newMenuItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Añade un retraso de 3 segundos antes de cambiar loading a false
        setTimeout(() => setLoading(false), 1000);
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
          <UserInfo userInfo={userInfo} />
        </Skeleton>
      ) : (
        <>
          <AcademicInfo />
          <SidebarMenu menuItems={menuItems} />
          <UserInfo userInfo={userInfo} />
        </>
      )}
    </div>
  );
}
