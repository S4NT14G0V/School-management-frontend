import { apiUrls } from "../routes/ApiUrls";

export const createUser = async (userInfo) => {
  const response = await fetch(apiUrls.user.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error("Error en la creación del usuario");
  }

  const data = await response.json();
  return data;
};

export const createRol = async (rol) => {
  const response = await fetch(apiUrls.rol.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rol),
  });

  if (!response.ok) {
    throw new Error("Error en la creación del rol");
  }

  return await response.json();
};

export const validateEmail = async (email) => {
  const response = await fetch(apiUrls.user.validateEmail, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Cambia para enviar el email dentro de un objeto
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Error al validar el correo electrónico");
  }

  const isValid = await response.json();
  return isValid;
};

export const validateEmail2 = async (email) => {
    try {
      const response = await fetch(apiUrls.user.validateEmail, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviar el email como un objeto JSON con la clave "email"
        body: JSON.stringify({ email }),
      });
  
      // Verifica si la respuesta no es OK (4xx o 5xx)
      if (!response.ok) {
        throw new Error("Error en la validación del correo");
      }
  
      // Parsear el resultado (que será un booleano)
      const data = await response.json();
  
      // Devolver el valor booleano directamente
      return data; // Aquí devolvemos el booleano (true/false)
    } catch (error) {
      console.error("Error:", error);
      return false; // En caso de error, devolvemos false o puedes manejarlo de otra manera
    }
  };
  
  