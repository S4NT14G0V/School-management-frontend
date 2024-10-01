import React, { useState, useEffect } from "react";
import './UserInfo.css';
import { useUser } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { getInfo } from "../../services/userService";

export default function UserInfo() {
  const { authToken, auth } = useUser(); // Asegúrate de tener la función `logout` en `useUser`
  const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar los errores
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token") || authToken; // Intenta obtener el token de la URL o del contexto
    console.log(token)
    // Si no hay token y `authToken` aún no está disponible, no hagas nada
    if (!token && !authToken) {
      setLoading(false); // Evita quedarse en estado de carga indefinido
      return;
    }
  
    // Función asincrónica para obtener los datos del usuario
    const fetchUserInfo = async () => {
      try {
        const data = await getInfo(token); // Llama al servicio para obtener la info del usuario
        setUserInfo(data); // Almacena la información del usuario en el estado
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };
  
    fetchUserInfo(); // Llama a la función si el token está disponible
  }, [authToken]); // El efecto depende del token de autenticación
  
  if (loading) {
    return <div>Loading user data...</div>; // Muestra un mensaje mientras los datos se cargan
  }
  // Verifica si la información del usuario está cargada

  // Maneja el logout y la navegación
  const handleLogout = () => {
    logout(); // Llama a la función de logout
    navigate('/'); // Redirige a la página de inicio o a donde desees
  };

  return (
    <div className="user-info">
      <img src={userInfo.picture} alt="user-icon" />
      <div className="user-details">
        <h3>{userInfo.name + " " + userInfo.lastname}</h3>
        <h4 className="role">{userInfo.rol.name}</h4>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <img src="src/assets/logout-rounded-icon.svg" alt="logout-icon" />
      </button>
    </div>
  );
}
