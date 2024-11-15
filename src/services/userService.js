import { apiUrls } from "../routes/ApiUrls";

export const createUser = async (userInfo) => {
  const response = await fetch(apiUrls.user.create, {
    method: "POST",
    credentials: "include", // Incluye cookies en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error("Error en la creación del usuario");
  }

  const data = await response.json();
  return data;
};

export const validateUser = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.validateUser, {
      method: "GET", // Cambia a GET
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta no es OK (4xx o 5xx)
    if (!response.ok) {
      throw new Error("Error en la validación del correo");
    }

    // Parsear el resultado (que será un booleano)
    const data = await response.json();

    // Devolver el valor booleano directamente
    return data; // Aquí devolvemos el booleano (true/false)
  } catch (error) {
    console.error("Error:", error);
    return false; // En caso de error, devolvemos false o puedes manejarlo de otra manera
  }
};

export const validateAdmin = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.validateAdmin, {
      method: "GET", // Cambia a GET
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta no es OK (4xx o 5xx)
    if (!response.ok) {
      throw new Error("Error en la validación del correo");
    }

    // Parsear el resultado (que será un booleano)
    const data = await response.json();

    // Devolver el valor booleano directamente
    return data; // Aquí devolvemos el booleano (true/false)
  } catch (error) {
    console.error("Error:", error);
    return false; // En caso de error, devolvemos false o puedes manejarlo de otra manera
  }
};

export const getUserByEmail = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.getByEmail, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null; // Puedes devolver null o manejar el error de otra manera
  }
};

export const updateUser = async (userInfo) => {
  try {
    const response = await fetch(`${apiUrls.user.updateByEmail}`, {
      method: "PUT",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(apiUrls.user.all, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta de Users:", response); // Verifica la respuesta del servidor
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getParents = async () => {
  try {
    const response = await fetch(apiUrls.user.getParents, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta de Users:", response); // Verifica la respuesta del servidor
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getStudents = async () => {
  try {
    const response = await fetch(apiUrls.user.getStudents, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta de Users:", response); // Verifica la respuesta del servidor
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getInfo = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.getInfo, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null; // Puedes devolver null o manejar el error de otra manera
  }
};

export const getListUserInfo = async () => {
  try {
    const response = await fetch(apiUrls.user.listUserInfo, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta de Users para Editar:", response); // Verifica la respuesta del servidor
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Error al obtener los usuarios");
    }
    console.log("Data recibida:", response); // Verifica los datos recibidos
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
export const deleteUser = async (email) => {
  try {
    const response = await fetch(apiUrls.user.delete, {
      method: "DELETE",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = await response.json(); // La respuesta es un booleano

    if (!response.ok || !success) {
      throw new Error("Error al eliminar el usuario");
    }

    return { success: true }; // Si es exitoso
  } catch (error) {
    console.error("Error al eliminar el usuario:", error.message);
    return { success: false, message: error.message };
  }
};

export const editRolByEmail = async (email, rol) => {
  try {
    const response = await fetch(`${apiUrls.user.editRolByEmail}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        user: email,
        role: rol,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al editar el usuario");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getTeachers = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.getTeachers, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null; // Puedes devolver null o manejar el error de otra manera
  }
};

export const validateTeachersAdmins = async () => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.validateTeachersAdmins, {
      method: "GET",
      credentials: "include", // Incluye cookies en la petición
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null; // Puedes devolver null o manejar el error de otra manera
  }
};
