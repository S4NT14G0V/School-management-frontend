import React from "react";
import UserAdmin from "../../components/Administration/Users/UsersAdmin";
import "./AdminPage.css";

export default function AdminPage({ title = "Admin Page" }) {
  return (
    <>
      <h1>{title}</h1>
      <hr className="page-divider" />
      <UserAdmin />
    </>
  );
}
