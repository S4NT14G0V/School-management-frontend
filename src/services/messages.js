import { apiUrls } from "@config/ApiUrls";

export const sendMessage = async (message) => {
    try {
      const response = await fetch(apiUrls.messages.sendMessage, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al enviar el mensaje: ${errorText}`);
      }
  
      const data = await response.json();
      return true;
    } catch (error) {
      console.error("Error en sendMessage:", error);
      return false;
    }
  };
  

export const getMessagesByClass = async (classId) => {
  try {
    const response = await fetch(
      `${apiUrls.messages.getMessagesByClass}/${classId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los mensajes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getMessagesByClass:", error);
    return [];
  }
};

export const getActiveUsersGeneral = async () => {
  try {
    const response = await fetch(
      `${apiUrls.activeUsers.general}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los mensajes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getActiveUsersGeneral:", error);
    return [];
  }
};
