import React from "react";
import { useState } from "react";
import { getListUserInfo } from "../../services/userService";
import { useUser } from "../../context/userContext";

export default function Table() {
  const { authToken, auth } = useUser();
  const [users, setUsers] = useState([]);
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);

  const handleSubmit = async () => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (!isTokenProcessed && token) {
      auth(token); // Guardar el token en el contexto
      setIsTokenProcessed(true); // Marcar como procesado
    }

    try {
      console.log(token);
      const data = await getListUserInfo(token);
      setUsers(data);
      console.log("Data recibida:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>BOTON</button>
    </div>
  );
}
