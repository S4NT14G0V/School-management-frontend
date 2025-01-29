import React from "react";
import RegisterForm from "@components/RegisterForm/RegisterForm";
import Title from "@components/Title/Title"
import "./RegisterPage.css";

export default function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-form-container">
        <Title> Información Adicional</Title>
        <hr className="register-divider" />
        <RegisterForm />
      </div>
    </div>
  );
}
