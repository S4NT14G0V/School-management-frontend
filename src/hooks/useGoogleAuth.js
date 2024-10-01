/*

import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, validateEmail } from "../services/userService"; // Importa el servicio de validación
import { useUser } from "../context/userContext";

export const useGoogleAuth = () => {
  const { login } = useUser(); // Obtenemos el contexto del usuario
  const navigate = useNavigate(); // Usamos navigate para redirigir

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching user info");
        }

        const userData = await response.json();

        // Validar correo y redirigir
        const isValid = await validateEmail(userData.email);

        if (isValid) {
          const user = await getUserByEmail(userData.email);
          const role = user.rol.name;
          // Almacenar la información del usuario
          login({
            name: userData.given_name,
            lastname: userData.family_name,
            email: userData.email,
            picture: userData.picture,
            token: tokenResponse.access_token,
            rol: role,
          });
          navigate("/classes");
        } else {
          login({
            name: userData.given_name,
            lastname: userData.family_name,
            email: userData.email,
            picture: userData.picture,
            token: tokenResponse.access_token,
          });
          navigate("/register");
        }
        
        
      } catch (error) {
        console.error("Error processing token or fetching user info: ", error);
      }
    },
  });

  return googleLogin; // Retorna la función de login
};

-------
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function OAuth2RedirectHandler() {
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const code = query.get("code");
    if (code) {
      // Intercambiar el código de autorización por un token en el backend
      fetch(`http://localhost:5173/oauth2/token?code=${code}`)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.token); // Guardar el token en localStorage o manejar la sesión
          history.push("/home"); // Redirigir al usuario a la página principal
        });
    }
  }, [query, history]);

  return <div>Loading...</div>;
}

export default OAuth2RedirectHandler;


function fetchProtectedResource() {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5173/protected-resource", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:5173/logout"; // Redirigir a una URL de logout del backend
}



*/