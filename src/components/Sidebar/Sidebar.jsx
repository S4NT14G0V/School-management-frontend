import React, { useState, useEffect } from "react";
import AcademicInfo from "../AcademicInfo/AcademicInfo";
import UserInfo from "../UserInfo/UserInfo";
import SidebarMenu from "./SidebarMenu";
import Skeleton from "../Skeleton/SkeletonSidebar";
import { validateAdmin, getInfo } from "@services/userService";
import { useUser } from "@context/userContext";
import UserCogIcon from "@assets/user-cog.svg";
import BookCogIcon from "@assets/book-cog.svg";
import FolderCogIcon from "@assets/folder-cog.svg";
import GroupCogIcon from "@assets/group-cog.svg";
import FamilyIcon from "@assets/family.svg";
import { MENUITEMS, MESSAGES_ERROR } from "@config/constants";
import "./Sidebar.css";

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const { email, setUserDataChat } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Primero obtenemos la información del usuario
        const userData = await getInfo();
        setUserDataChat(userData);
        setUserInfo(userData);

        // Luego validamos si es admin
        const adminData = await validateAdmin();
        if (adminData) {
          email(userData.email);
          const newMenuItems = [
            ...MENUITEMS,
            {
              src: UserCogIcon,
              alt: "button-administration",
              label: "User Management",
              href: `/admin/users`,
            },
            {
              src: BookCogIcon,
              alt: "button-administration-2",
              label: "Subject Management",
              href: `/admin/subjects`,
            },
            {
              src: FolderCogIcon,
              alt: "button-administration-3",
              label: "Classes Management",
              href: `/admin/classes`,
            },
            {
              src: GroupCogIcon,
              alt: "button-administration-3",
              label: "Groups Management",
              href: `/admin/groups`,
            },
            {
              src: FamilyIcon,
              alt: "button-administration-3",
              label: "Family Management",
              href: `/admin/family`,
            },
          ];
          setMenuItems(newMenuItems);
        } else {
          setMenuItems(MENUITEMS);
        }
      } catch (error) {
        console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
      } finally {
        // Añade un retraso de 3 segundos antes de cambiar loading a false
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar">
      {loading ? (
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
};

export default Sidebar;
