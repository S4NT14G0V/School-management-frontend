import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AcademicInfo from "../AcademicInfo/AcademicInfo";
import { getPublicRoles } from "../../services/rolService";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://backend-hogwarts.onrender.com/oauth2/authorization/google';
  };
  
  const [roles, setRoles] = useState([]);
  const fetchRoles = async () => {
    try {
      const rol = await getPublicRoles();
      setRoles(rol);
      console.log(roles[0].name)
    } catch (error) {
      console.error("Error fetching roles:", error);
    }  
  };


  useEffect(() => {
    fetchRoles();
  },[]);
  return (
    <div className="login-container">
      <AcademicInfo login />
      <button className="login-button" onClick={handleGoogleLogin}>
        <img src="src/assets/google-icon.svg" alt="Google Icon" />
        Continue with Google
      </button>
    </div>
  );
}
