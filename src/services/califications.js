import { apiUrls } from "../routes/ApiUrls";

export const getCalificationsByClass = async (token, id) => {
  try {
    console.log("token 2323:", token);
    const response = await fetch(
      apiUrls.califications.getCalificationsByClass,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
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

export const createCalifications = async (token, califications) => {
  const response = await fetch(apiUrls.califications.create, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(califications),
  });

  if (!response) {
    throw new Error("Error en la creación del subject");
  }
  return response;
};

export const getCalificationsByEmail = async (authToken) => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.califications.getCalificationsByEmail, {
      method: "GET",
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
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

