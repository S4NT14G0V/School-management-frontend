import { apiUrls } from "../routes/ApiUrls";

export const getGroups = async (token) => {
  try {
    console.log("token:", token);
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

export const createGroups = async (token, group) => {
  try {
    console.log("group:", group);
    const response = await fetch(apiUrls.group.create, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
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

export const getStudentsWithGroup = async (token) => {
  try {
    console.log("token:", token);
    const response = await fetch(apiUrls.groupxUsers.studentsWithGroup, {
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

export const updateGroupByIds = async (token, idStudent, IdGroup) => {
  try {
    const response = await fetch(apiUrls.groupxUsers.updateGroupById, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        StudentId: `${idStudent}`,
        GroupId: `${IdGroup}`,
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
