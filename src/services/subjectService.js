import { apiUrls } from "../routes/ApiUrls";

export const createSubject = async (token,subject) => {
    const response = await fetch(apiUrls.subject.create, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });
  
    if (!response.ok) {
      throw new Error("Error en la creación del subject");
    }
  
    const data = await response.json();
    return data;
};


export const getSubjects = async () => {
    try {
      const response = await fetch(apiUrls.subject.all, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Respuesta de subjects:", response); // Verifica la respuesta del servidor
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Error al obtener los subjects");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  export const updateSubject = async (token,subject) => {
    const response = await fetch(apiUrls.subject.update, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });
  
    if (!response.ok) {
      throw new Error("Error en la edicion del subject");
    }
  
    const data = await response.json();
    return data;
};

export const deleteSubject = async (token,id) => {
    const response = await fetch(apiUrls.subject.delete, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        id:id,
        "Content-Type": "application/json",
      }
    });
  
    if (!response.ok) {
      throw new Error("Error en la edicion del subject");
    }
  
    const data = await response.json();
    return data;
};