import { apiUrls } from "../config/ApiUrls";

export const getGroups = async () => {
  try {
    const response = await fetch(apiUrls.group.all, {
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

export const createGroups = async (group) => {
  try {
    const response = await fetch(apiUrls.group.create, {
      method: "POST",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
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

export const getStudentsWithGroup = async () => {
  try {
    const response = await fetch(apiUrls.groupxUsers.studentsWithGroup, {
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

export const updateGroupByIds = async (idStudent, IdGroup) => {
  try {
    const response = await fetch(apiUrls.groupxUsers.updateGroupById, {
      method: "PUT",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        StudentId: `${idStudent}`,
        GroupId: `${IdGroup}`,
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
