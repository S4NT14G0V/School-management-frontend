import React from "react";
import "./Login.css";
import AcademicInfo from "../AcademicInfo/AcademicInfo";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { apiUrls } from "../../routes/ApiUrls";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { createUser } from "../../services/useService";
export default function Login() {

  const googleLogin = useGoogleAuth();
  
  const rol3 = {
    id: 1,
    name: "Student",
  };
  const userInfo = {
    name: "Juan",
    lastname: "Pérez",
    birthday: "2000-01-01", // Formato de fecha (AAAA-MM-DD)
    gender: "Masculino",
    address: "Calle Falsa 123",
    phone: "123456789",
    email: "juan.perrz@example.com",
    document_type: "DNI",
    document_number: "12345678",
    rol: rol3,
  };
  
  //createUser(userInfo)
/*
  createUser(userInfo)
    .then((data) => console.log("Usuario creado:", data))
    .catch((error) => console.error("Error:", error));
*/

  return (
    <div className="login-container">
      <AcademicInfo login />
      <button className="login-button" onClick={googleLogin}>
        <img src="src/assets/google-icon.svg" alt="" />
        Continue with Google
      </button>
    </div>
  );
}
