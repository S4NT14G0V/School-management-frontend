import { apiUrls } from "../config/ApiUrls";

export const createFamily = async (family) => {
  const response = await fetch(apiUrls.family.create, {
    method: "POST",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(family),
  });
  if (!response.ok) {
    throw new Error("Error en la creación de la familia");
  }
  const data = await response.json();
  return response.ok;
};

export const getFamilies = async () => {
  try {
    const response = await fetch(apiUrls.family.getAll, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener las familias");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const updateFamily = async (family) => {
  const response = await fetch(apiUrls.family.updateFamily, {
    method: "PUT",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(family),
  });
  if (!response.ok) {
    throw new Error("Error en la update");
  }
  const data = await response.json();
  return response.ok;
};

export const deleteFamily = async (id_family) => {
  const response = await fetch(apiUrls.family.deleteFamily, {
    method: "DELETE",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      id: id_family,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error eliminando ");
  }
  const data = await response.json();
  return response.ok;
};
