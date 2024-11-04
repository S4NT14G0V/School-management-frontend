import { apiUrls } from "../routes/ApiUrls";


export const getGroups = async (token) => {
    try {
        console.log("token:",token)
      const response = await fetch(apiUrls.group.all, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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