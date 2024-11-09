import React from "react";
import ClassesPersonal  from "../../components/Classes/ClassesPersonal";
import "./ClassesPage.css";
import EditableTable from "../../components/Califications/CalificationsEdit";

export default function ClassesPage({ title = "Classes" }) {
  return (
    <>
      <h1>{title}</h1>
      <hr className="classes-divider" />
      <ClassesPersonal/>
      

    </>
  );
}
