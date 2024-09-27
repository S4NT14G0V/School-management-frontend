import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { validateEmail2 } from "../services/useService"; // Importa el servicio de validación
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

        // Almacenar la información del usuario
        login({
          name: userData.given_name,
          lastname: userData.family_name,
          email: userData.email,
          picture: userData.picture,
          token: tokenResponse.access_token,
        });

        // Validar correo y redirigir
        const isValid = await validateEmail2(userData.email);

        if (isValid) {
          navigate("/classes");
        } else {
          navigate("/register");
        }
      } catch (error) {
        console.error("Error processing token or fetching user info: ", error);
      }
    },
  });

  return googleLogin; // Retorna la función de login
};
