import React from "react";
import "./Sidebar.css";
import AcademicInfo from "../AcademicInfo/AcademicInfo";
import UserInfo from "../UserInfo/UserInfo";
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
