import React from "react";
import Login from "@components/Login/Login";
import Background from "@assets/background.png";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div
      className="login-page"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundClip: "cover",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
      }}
    >
      <Login />
    </div>
  );
}
