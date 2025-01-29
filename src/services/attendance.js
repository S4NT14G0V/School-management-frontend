import { apiUrls } from "@config/ApiUrls";

export const createAttendance = async (attendance) => {
  try {
    const response = await fetch(apiUrls.attendance.create, {
      method: "POST",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendance),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al crear el attendance");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getAllAttendances = async () => {
  try {
    const response = await fetch(apiUrls.attendance.all, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener los attendances");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getAttendancesByClass = async (id) => {
  try {
    const response = await fetch(apiUrls.attendance.getAttendancesByClass, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        ClassId: id,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener el attendance por id");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getAttendancesByClassAndDate = async (id, date) => {
  try {
    const response = await fetch(
      apiUrls.attendance.getAttendancesByClassAndDate,
      {
        method: "GET",
        credentials: "include", // Incluye cookies en la petición
        headers: {
          ClassId: id,
          SelectedDate: date,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener el attendance por id y fecha");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getMyAttendances = async () => {
  try {
    const response = await fetch(apiUrls.attendance.getMyAttendances, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener mis attendances");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
