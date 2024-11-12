import { apiUrls } from "../routes/ApiUrls";

export const createFamily = async (token, family) => {
  
  const response = await fetch(apiUrls.family.create, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
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

export const getFamilies = async (token) => {
  try {
    console.log("token:", token);
    const response = await fetch(apiUrls.family.getAll, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta de families:", response); // Verifica la respuesta del servidor
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

export const updateFamily = async (token, family) => {
  
    const response = await fetch(apiUrls.family.updateFamily, {
      method: "OUT",
      headers: {
        authorization: `Bearer ${token}`,
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

  export const deleteFamily = async (token, id_family) => {
  
    const response = await fetch(apiUrls.family.deleteFamily, {
      method: "OUT",
      headers: {
        authorization: `Bearer ${token}`,
        id:id_family,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(family),
    });
  
    if (!response.ok) {
      throw new Error("Error eliminando ");
    }
  
    const data = await response.json();
    return response.ok;
  };