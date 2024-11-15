// src/context/UserContext.js
import React, { createContext, useState, useContext } from "react";

// Creamos el contexto
const UserContext = createContext();

// Hook personalizado para usar el contexto
export const useUser = () => useContext(UserContext);

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  // Inicializa el estado con los datos del usuario que pudieran estar en localStorage
  const [admin, setAdmin] = useState("");
  const [validationUser, setValidationUser] = useState(false);
  const [editDataCalificationClass, setEditDataCalificationClass] = useState(null);
  const [assesmentData, setAssesmentData] = useState(null);
  const [userDataChat, setUserDataChat] = useState(null);
  // Función para loguear al usuario
  // Al autenticarse y recibir el token JWT

  const email = (email) => {
    setAdmin(email);
  }

  const validateUser = async (bool) => {
    setValidationUser(bool);
  }

  return (
    <UserContext.Provider value={{ validationUser, validateUser, admin, setAdmin, email, editDataCalificationClass, setEditDataCalificationClass, assesmentData, setAssesmentData, userDataChat, setUserDataChat }}>
      {children}
    </UserContext.Provider>
  );
};
