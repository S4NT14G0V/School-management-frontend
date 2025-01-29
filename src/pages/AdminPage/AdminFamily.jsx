import React from "react";
import FamilyAdmin from "@components/Administration/Family/FamilyAdmin";
import "./AdminPage.css";

export default function AdminClasses({ title = "Family Management"}) {
  return (
    <>
      <h1>{title}</h1>
      <hr className="page-divider" />
      <FamilyAdmin />
    </>
  );
}