import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@services/userService";
import ArrowDownIcon from "@assets/arrow_down.svg";
import LogoutIcon from "@assets/logout-rounded-icon.svg";
import { MESSAGES_ERROR, PAGES_URLS } from "@config/constants";
import { useUser } from "@context/userContext";
import "./UserInfo.css";

const UserInfo = ({ userInfo }) => {
  const [actionsVisible, setActionsVisible] = useState(false);
  const [rotateIcon, setRotateIcon] = useState(false);
  const navigate = useNavigate();
  const actionsRef = useRef(null); // Crear un ref para el menú de acciones
  const buttonRef = useRef(null); // Ref para el botón de acciones
  const { setUserDataChat } = useUser();

  const handleLogout = async () => {
    try{
      const success = await logout();
      if (success) {
          navigate(`${PAGES_URLS.PUBLIC.HOME}`);
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
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
      <div ref={actionsRef} className={`user-info-actions ${actionsVisible ? "visible" : ""}`} style={!actionsVisible ? {visibility:"hidden" } : {}}>
        <button className="actions-button logout-button" style={!actionsVisible ? {visibility:"hidden"} : {}} onClick={handleLogout}>
          <img src={LogoutIcon} alt="Cerrar Sesión" />
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
            src={ArrowDownIcon}
            className={rotateIcon ? "rotated" : ""}
            alt="Toggle actions"
          />
        </button>
      </div>
    </div>
  );
}

export default React.memo(UserInfo);