import React from "react";
import "./Login.css";
import AcademicInfo from "../AcademicInfo/AcademicInfo";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

export default function Login() {

  const { user, login } = useUser(); // Usamos el login y el estado del usuario desde UserContext
  const navigate = useNavigate(); // Creamos el hook useNavigate
  
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Usar el access_token para obtener la información del usuario
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            }
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching user info");
        }
        const userData = await response.json()
        
        // Llamamos a login para almacenar la información del usuario en el contexto y en localStorage
        login({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          token: tokenResponse.access_token, // También puedes guardar el token si lo necesitas
        });

        navigate("/classes");
      } catch (error) {
        console.error("Error processing token or fetching user info: ", error);
      }
    }
  });

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
