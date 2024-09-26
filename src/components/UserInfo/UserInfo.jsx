import React from "react";
import './UserInfo.css';
import { useUser } from '../../context/userContext';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate

export default function UserInfo() {
  const { user, logout } = useUser();  // Usamos el contexto para obtener el usuario y la función de logout
  const navigate = useNavigate(); // Creamos el hook useNavigate

  // Verifica si el usuario está presente
  if (!user) {
    return <div>Loading user data...</div>;  // O muestra un loader o un mensaje de espera
  }

  // Maneja el logout y la navegación
  const handleLogout = () => {
    logout(); // Llama a la función de logout
    navigate('/'); // Redirige a la página de inicio (o a donde desees)
  };

  return (
    <div className="user-info">
      <img src={user.picture} alt="user-icon" />
      <div className="user-details">
        <h3>{user.name}</h3>
        <h4 className="role">Administrator</h4>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <img src="src/assets/logout-rounded-icon.svg" alt="logout-icon" />
      </button>
    </div>
  );
}
