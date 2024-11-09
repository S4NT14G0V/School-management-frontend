import { apiUrls } from "../routes/ApiUrls";


export const createAssesment = async (token,assestment) => {
    const response = await fetch(apiUrls.assesment.create, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assestment),
    });
  
    if (!response) {
      throw new Error("Error en la creación del subject");
    }
    return response;
};


export const getMyAssestment = async (token) => {
    try {
        console.log("token:",token)
      const response = await fetch(apiUrls.assesment.getMyAssestment, {
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

  export const getAssesmentsByClass= async (token,id) => {
    try {
        console.log("token:",token)
      const response = await fetch(apiUrls.assesment.getAssesmentsByClass, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            ClassId:id,
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
