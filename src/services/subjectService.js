import { apiUrls } from "@config/ApiUrls";

export const createSubject = async (subject) => {
    const response = await fetch(apiUrls.subject.create, {
      method: "POST",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });
  
    if (!response.ok) {
      throw new Error("Error en la creación del subject");
    }
  
    const data = await response.json();
    return response.ok;
};


export const getSubjects = async () => {
    try {
      const response = await fetch(apiUrls.subject.all, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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

  export const updateSubject = async (subject) => {
    const response = await fetch(apiUrls.subject.update, {
      method: "PUT",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });
  
    if (!response.ok) {
      throw new Error("Error en la edicion del subject");
    }
  
    return response.ok;
};

export const deleteSubject = async (id) => {
    const response = await fetch(apiUrls.subject.delete, {
      method: "DELETE",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        id:id,
        "Content-Type": "application/json",
      }
    });
  
    if (!response.ok) {
      throw new Error("Error en la edicion del subject");
    }
    return response.ok;
};