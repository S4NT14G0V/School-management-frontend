import React from "react";
import "./ClassesPage.css";
import ClassesPersonal  from "../../components/Classes/ClassesPersonal";

export default function ClassesPage({ title = "Classes" }) {

  

  return (
    <>
      <h1>{title}</h1>
      <hr className="classes-divider" />
      <ClassesPersonal/>
    </>
  );
}
