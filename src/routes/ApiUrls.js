const baseUrl = "https://backend-hogwarts.onrender.com";

export const apiUrls = {
  user: {
    all: `${baseUrl}/user/getAll`,
    create: `${baseUrl}/user/create`,
    validateEmail:`${baseUrl}/user/validateUser`,
    getByEmail:`${baseUrl}/user/getByEmail`,
    delete:`${baseUrl}/user/deleteUserByEmail`,
    updateByEmail:`${baseUrl}/user/updateByEmail`,
    getInfo:`${baseUrl}/user/getInfoByEmail`,
    listUserInfo:`${baseUrl}/user/listUserInfo`,
    validateAdmin:`${baseUrl}/user/validateAdmin`,
    editRolByEmail:`${baseUrl}/user/editRolByEmail`,
  },

  rol:{
    all: `${baseUrl}/rol/getAll`,
    create: `${baseUrl}/rol/create`,
    getPublic: `${baseUrl}/rol/getPublicRoles`
  },
  subject:{
    all: `${baseUrl}/subject/getAll`,
    create: `${baseUrl}/subject/create`,
    delete: `${baseUrl}/subject/delete`,
    update: `${baseUrl}/subject/update`,
  }  
};
