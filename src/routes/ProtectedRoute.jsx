import { useUser } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { validateUser } from "../services/userService";
import React, { useState } from "react";

function ProtectedRoute({ children }) {
  const { authToken, auth, validateUser, validationUser } = useUser();
  const [error, setError] = useState(null);

  const fetchValidateUser = async () => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      auth(token); // Guardar el token en el contexto
    }

    try {
      const validationUser = await validateUser(authToken);
      validateUser(validationUser);
    } catch (error) {
      setError("Error fetching user data: " + error.message);
      alert("Error al validar el usuario");
    }
  };

  fetchValidateUser();

  if (!validateUser) {
    return <Navigate to="/" />; // Redirige al login si el usuario no está logueado
  }

  return children;
}

export default ProtectedRoute;
