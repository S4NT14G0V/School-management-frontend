import { apiUrls } from "../routes/ApiUrls";

export const createAssesment = async (assestment) => {
  const response = await fetch(apiUrls.assesment.create, {
    method: "POST",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assestment),
  });
  if (!response) {
    throw new Error("Error en la creación del subject");
  }
  return response;
};

export const getMyAssesment = async () => {
  try {
    const response = await fetch(apiUrls.assesment.getMyAssestment, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export const getAssesmentsByClass = async (id) => {
  try {
    const response = await fetch(apiUrls.assesment.getAssesmentsByClass, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        ClassId: id,
        "Content-Type": "application/json",
      },
    });
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
