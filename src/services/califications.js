import { apiUrls } from "../routes/ApiUrls";

export const getCalificationsByClass = async (id) => {
  try {
    const response = await fetch(
      apiUrls.califications.getCalificationsByClass,
      {
        method: "GET",
        credentials: "include",
        headers: {
          ClassId: id,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Respuesta de subjects:", response); // Verifica la respuesta del servidor
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener las classes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const createCalifications = async (califications) => {
  const response = await fetch(apiUrls.califications.create, {
    method: "POST",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(califications),
  });

  if (!response) {
    throw new Error("Error en la creación del subject");
  }
  return response;
};

export const getCalificationsByEmail = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.califications.getCalificationsByEmail, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
      "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

