import React from "react";
import "./Sidebar.css";
import AcademicInfo from "./AcademicInfo";
import UserInfo from "./UserInfo";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <AcademicInfo/>
      <SidebarMenu/>
      <UserInfo/>
    </div>
  );
}
