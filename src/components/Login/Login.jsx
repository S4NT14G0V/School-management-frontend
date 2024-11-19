import React from "react";
import AcademicInfo from "@components/AcademicInfo/AcademicInfo";
import GoogleIcon from "@assets/google-icon.svg";
import { URLS } from "@config/constants";
import "./Login.css";

export default function Login() {

  const handleGoogleLogin = () => {
    window.location.href = URLS.GOOGLE_LOGIN;
  };
  
  return (
    <div className="login-container">
      <AcademicInfo login />
      <button className="login-button" onClick={handleGoogleLogin}>
        <img src={GoogleIcon} alt="Google Icon" />
        Continue with Google
      </button>
    </div>
  );
}
