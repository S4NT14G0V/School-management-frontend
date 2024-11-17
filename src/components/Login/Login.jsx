import React from "react";
import { useNavigate } from "react-router-dom";
import AcademicInfo from "../AcademicInfo/AcademicInfo";
import "./Login.css";
import { URLS } from "../../config/constants";

export default function Login() {

  const handleGoogleLogin = () => {
    window.location.href = URLS.GOOGLE_LOGIN;
  };
  
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
