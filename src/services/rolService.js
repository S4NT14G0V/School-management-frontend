import { apiUrls } from "../routes/ApiUrls";

export const getRoles = async () => {
    try {
        const response = await fetch(apiUrls.rol.all, {
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
