import React, { useState, useRef, useEffect } from "react";
import "./UserInfo.css";
import { useNavigate } from "react-router-dom";

export default function UserInfo({ userInfo }) {
  const [actionsVisible, setActionsVisible] = useState(false);
  const [rotateIcon, setRotateIcon] = useState(false);
  const navigate = useNavigate();
  const actionsRef = useRef(null); // Crear un ref para el menú de acciones
  const buttonRef = useRef(null); // Ref para el botón de acciones

  const handleLogout = () => {
    navigate("/");
  };

  const handleActionsToggle = (e) => {
    e.stopPropagation(); // Detiene la propagación del clic al documento
    setRotateIcon((prev) => !prev); // Cambia el estado de rotación
    setActionsVisible((prev) => !prev); // Alterna la visibilidad de las acciones
  };

  // Manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionsVisible && // Solo cerrar si el menú está visible
        actionsRef.current && 
        !actionsRef.current.contains(event.target) && // Clic fuera del menú
        !buttonRef.current.contains(event.target) // Y fuera del botón
      ) {
        setActionsVisible(false); // Cerrar el menú de acciones si se hace clic fuera
        setRotateIcon(false); // Restablecer la rotación del icono
      }
    };

    // Agregar el evento de clic
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el evento al desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionsVisible]);

  if (!userInfo) return null;

  return (
    <div className="user-info">
      <div ref={actionsRef} className={`user-info-actions ${actionsVisible ? "visible" : ""}`}>
        <button className="actions-button logout-button" style={!actionsVisible ? {visibility:"hidden"} : {}} onClick={handleLogout}>
          <img src="src/assets/logout-rounded-icon.svg" alt="Cerrar Sesión" />
          Logout
        </button>
      </div>

      <div className="image-container">
        {userInfo.picture && <img src={userInfo.picture} className="image-icon" alt="user-icon" />}
      </div>
      <div className="user-details">
        <h3>{`${userInfo.name} ${userInfo.lastname}`}</h3>
        <h4 className="role">{userInfo.rol.name}</h4>
      </div>
      <div className="user-actions">
        <button ref={buttonRef} className="user-actions-button" onClick={handleActionsToggle}>
          <img
            src="src/assets/arrow_down.svg"
            className={rotateIcon ? "rotated" : ""}
            alt="Toggle actions"
          />
        </button>
      </div>
    </div>
  );
}
