const baseUrl = "https://backend-hogwarts.onrender.com";

export const apiUrls = {
  user: {
    all: `${baseUrl}/user/getAll`,
    create: `${baseUrl}/user/create`,
    validateEmail:`${baseUrl}/user/validateEmail`,
  },

  rol:{
    all: `${baseUrl}/rol/getAll`,
    create: `${baseUrl}/rol/create`
  }
};
