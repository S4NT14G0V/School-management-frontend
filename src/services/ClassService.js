import { apiUrls } from "../routes/ApiUrls";

export const createClass = async (token,classes) => {
    console.log("class.  ",classes)
    const response = await fetch(apiUrls.classes.create, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
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


export const getClasses = async (token) => {
    try {
        console.log("token:",token)
      const response = await fetch(apiUrls.classes.all, {
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

  export const updateClasses = async (token,classes) => {
    console.log("Id =",classes.id)
    const response = await fetch(apiUrls.classes.update, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classes),
    });
  
    if (!response.ok) {
      throw new Error("Error en la edicion del subject");
    }
  
    return response.ok;
};

export const deleteClasses = async (token,id) => {
    const response = await fetch(apiUrls.classes.delete, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        id:id,
        "Content-Type": "application/json",
      }
    });
  
    if (!response.ok) {
      throw new Error("Error en la edicion del subject");
    }
    return response.ok;
};