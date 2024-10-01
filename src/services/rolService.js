import { apiUrls } from "../routes/ApiUrls";

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

export const getPublicRoles = async () => {
  try {
      const response = await fetch(apiUrls.rol.getPublic, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          const errorMessage = await response.text(); // Capturar el mensaje de error del servidor
          throw new Error(`Error al obtener los roles públicos: ${response.status} ${errorMessage}`);
      }

    return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};
