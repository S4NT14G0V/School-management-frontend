import React from "react";
import Table from "../../components/Table/Table";
import "./AdminPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import PageLayout from "../Layouts/PageLayout";

export default function AdminPage({ title = "User Management" }) {
  return (
    <div className="admin-container">
      <h1>{title}</h1>
      <hr className="admin-divider" />
      <Table />
    </div>
  );
}
