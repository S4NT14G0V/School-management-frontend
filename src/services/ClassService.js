import { apiUrls } from "../routes/ApiUrls";

export const createClass = async (classes) => {
  const response = await fetch(apiUrls.classes.create, {
    method: "POST",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classes),
  });
  if (!response.ok) {
    throw new Error("Error en la creación del subject");
  }
  const data = await response.json();
  return response.ok;
};

export const getClasses = async () => {
  try {
    const response = await fetch(apiUrls.classes.all, {
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

export const getClassesById = async (ClassId) => {
  try {
    const response = await fetch(apiUrls.classes.getClassById, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        ClassId: ClassId,
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
  }
};

export const getMyClasses = async () => {
  try {
    const response = await fetch(apiUrls.classes.getMyClasses, {
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

export const updateClasses = async (classes) => {
  const response = await fetch(apiUrls.classes.update, {
    method: "PUT",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classes),
  });
  if (!response.ok) {
    throw new Error("Error en la edicion del subject");
  }
  return response.ok;
};

export const deleteClasses = async (id) => {
  const response = await fetch(apiUrls.classes.delete, {
    method: "DELETE",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      id: id,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error en la edicion del subject");
  }
  return response.ok;
};
