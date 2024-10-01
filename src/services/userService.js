import { apiUrls } from "../routes/ApiUrls";

export const createUser = async (userInfo) => {
  const response = await fetch(apiUrls.user.create, {
    method: "POST",
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

export const validateEmail = async (authToken) => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.validateEmail, {
      method: "GET", // Cambia a GET
      headers: {
        "authorization": `Bearer ${authToken}`
      },
      credentials: 'include',
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

export const getUserByEmail = async (authToken) => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.getByEmail, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${authToken}`
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null; // Puedes devolver null o manejar el error de otra manera
  }
}

export const updateUser = async (token, userInfo) => {
  try {
    const response = await fetch(`${apiUrls.user.updateByEmail}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Authorization": `Bearer ${token}`,
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
}

export const getUsers = async () => {
  alert("funcion get users");
  try {
    const response = await fetch(apiUrls.user.all, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response object:", response); // Verifica la respuesta del servidor
    if (!response.ok) {
      const errorMessage = await response.text(); 
      throw new Error("Error al obtener los usuarios");
    }

  
    console.log("Data recibida:", response); // Verifica los datos recibidos
    
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }

};export const getInfo = async (authToken) => {
  try {
    // Enviar la solicitud GET con el email como parámetro de consulta
    const response = await fetch(apiUrls.user.getInfo, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${authToken}`
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return null; // Devuelve null si la respuesta no es OK
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return null; // Puedes devolver null o manejar el error de otra manera
  }
}

export const getListUserInfo = async (authToken) => {
  alert("funcion get users");
  try {
    const response = await fetch(apiUrls.user.listUserInfo, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Response object:", response); // Verifica la respuesta del servidor
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

const deleteUser = async (id) => {
  try {
    const response = await fetch(`${apiUrls.user.delete}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    // Opcional: Manejo de respuesta si es necesario
    console.log("Usuario eliminado con éxito");
  } catch (error) {
    console.error("Error:", error);
  }
};

