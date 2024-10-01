const baseUrl = "https://backend-hogwarts.onrender.com";

export const apiUrls = {
  user: {
    all: `${baseUrl}/user/getAll`,
    create: `${baseUrl}/user/create`,
    validateEmail:`${baseUrl}/user/validateEmail`,
    getByEmail:`${baseUrl}/user/getByEmail`,
    delete:`${baseUrl}/user/delete`,
    updateByEmail:`${baseUrl}/user/updateByEmail`,
    getInfo:`${baseUrl}/user/getInfoByEmail`,
    listUserInfo:`${baseUrl}/user/listUserInfo`,
  },

  rol:{
    all: `${baseUrl}/rol/getAll`,
    create: `${baseUrl}/rol/create`,
    getPublic: `${baseUrl}/rol/getPublicRoles`
  }
};
