import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUser } from "../context/userContext";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setAuthToken } = useUser();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Enviar el token al backend
        const response = await axios.post(
          "https://backend-hogwarts.onrender.com/login/oauth2/code/google",
          {
            token: tokenResponse.credential,
          }
        );

        // Si el backend responde exitosamente, actualiza el estado
        setIsAuthenticated(true);
        setUser(response.data);
        const token = response;
        alert("1",token)
        setAuthToken(token); // Guarda el token en React Context o una capa segura
        console.log("Login exitoso:", response.data);
      } catch (err) {
        console.error("Error en el login con Google:", err);
        setError(err);
      }
    },
    onError: (errorResponse) => {
      console.error("Error en la autenticación con Google:", errorResponse);
      setError(errorResponse);
    },
  });

  return {
    googleLogin,
    isAuthenticated,
    user,
    error,
  };
};

export default useAuth;

