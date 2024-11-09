import React from "react";
import ClassesAdmin from "../../components/Administration/Classes/ClassesAdmin";
import "./AdminPage.css";

export default function AdminClasses({ title = "Classes Management"}) {
  return (
    <>
      <h1>{title}</h1>
      <hr className="page-divider" />
      <ClassesAdmin />
    </>
  );
}