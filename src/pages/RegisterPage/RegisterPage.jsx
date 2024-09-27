import React from "react";
import "./RegisterPage.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Title from "../../components/Title/Title"

export default function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-form-container">
        <Title>Completa la Siguiente Información</Title>
        <hr className="register-divider" />
        <RegisterForm />
      </div>
    </div>
  );
}
