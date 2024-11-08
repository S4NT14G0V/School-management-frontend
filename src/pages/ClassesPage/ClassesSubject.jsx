import React, { useEffect } from "react";
import './ClassesSubject.css';
import { useParams, useLocation } from "react-router-dom";

export default function ClassesSubject() {
  const { id } = useParams();

  useEffect(() => {
    console.log("Subject ID:", id);
  }, [id]);

  return (
    <>
      <button>Return</button>
      <h1>Subject</h1>
      <hr className="subject-divider" />
    </>
  );
}
