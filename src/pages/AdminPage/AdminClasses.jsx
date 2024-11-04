import React from "react";
import ClassesAdmin from "../../components/Administration/Classes/ClassesAdmin";
import "./AdminPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import PageLayout from "../Layouts/PageLayout";

export default function AdminPage({ title = "Classes Management" }) {
  return (
    <div className="admin-container">
      <h1>{title}</h1>
      <hr className="admin-divider" />
      <ClassesAdmin />
    </div>
  );
}