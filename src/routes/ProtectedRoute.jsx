import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { validateAdmin } from "../services/userService";
import React, { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const { authToken, setAuthToken, auth, validateUser, validationUser } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValidateAdmin = async () => {
      const query = new URLSearchParams(window.location.search);
      const token = query.get("token");
  
      if (token) {
        setAuthToken(token); // Guardar el token en el contexto
      }
  
      try {
        const validationUser = await validateAdmin(token);
        if (!validationUser && (token != null)) {
          return navigate(`/classes?token=${token}`);
        } //reiniciando celular
        else if(validationUser && (token != null)){
        }
        else{
          return window.location.href = 'http://localhost:5173/';
        }

      } catch (error) {
        setError("Error fetching user data: " + error.message);
      }
    };
  
    fetchValidateAdmin();
  }, []);

  return children;
}

export default ProtectedRoute;
