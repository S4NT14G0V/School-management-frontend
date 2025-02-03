import { apiUrls } from "@config/ApiUrls";

export const getCalificationsByClass = async (id) => {
  try {
    const response = await fetch(
      apiUrls.califications.getCalificationsByClass,
      {
        method: "GET",
        credentials: "include",
        headers: {
          ClassId: id,
          "Content-Type": "application/json",
        },
      }
    );
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

export const createCalifications = async (califications) => {
  const response = await fetch(apiUrls.califications.create, {
    method: "POST",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(califications),
  });

  if (!response) {
    throw new Error("Error en la creación del subject");
  }
  return response;
};

export const getCalificationsByEmail = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(
      apiUrls.califications.getCalificationsByEmail,
      {
        method: "GET",
        credentials: "include", // Incluye cookies en la petición
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //console.error("Error:", error);
  }
};

export const getCalificationsSummaryByEmail = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(
      apiUrls.califications.getCalificationsSummaryByEmail,
      {
        method: "GET",
        credentials: "include", // Incluye cookies en la petición
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const downloadCalifications = async () => {
  const response = await fetch(apiUrls.califications.downloadCalifications, {
    method: "GET",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
  });
        const timestamp = obtenerFechaHora();
        const filename = `Califications_${timestamp}.xlsx`; // Nombre por defecto
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename; // Usa el nombre correcto
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
};

const obtenerFechaHora = () => {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes en 2 dígitos
  const day = String(fecha.getDate()).padStart(2, '0'); // Día en 2 dígitos
  const hours = String(fecha.getHours()).padStart(2, '0'); // Hora en 2 dígitos
  const minutes = String(fecha.getMinutes()).padStart(2, '0'); // Minutos en 2 dígitos
  
  // Formato "yyyy-MM-dd_HH-mm"
  return `${year}-${month}-${day}_${hours}.${minutes}`;
};
