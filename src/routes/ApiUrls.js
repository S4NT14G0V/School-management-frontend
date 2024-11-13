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
    getTeachers:`${baseUrl}/user/getTeachers`,
    validateTeachersAdmins:`${baseUrl}/user/validateTeachersAdmins`,
    getParents:`${baseUrl}/user/getParents`,
    getStudents:`${baseUrl}/user/getStudents`,
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
  }  ,
  classes:{
    all: `${baseUrl}/class/getAll`,
    create: `${baseUrl}/class/create`,
    delete: `${baseUrl}/class/delete`,
    update: `${baseUrl}/class/update`,
    getMyClasses:`${baseUrl}/class/getMyClasses`,
    getClassById:`${baseUrl}/class/getClassById`,
  },
  group:{
    all:`${baseUrl}/group/getAll`,
    create:`${baseUrl}/group/create`,
  },
  groupxUsers:{
    studentsWithGroup:`${baseUrl}/userXGroup/student-groups`,
    updateGroupById:`${baseUrl}/userXGroup/updateGroupById`,
  },
  assesment:{
    create:`${baseUrl}/assesment/create`,
    getMyAssestment:`${baseUrl}/assesment/getMyAssesments`,
    getAssesmentsByClass:`${baseUrl}/assesment/getAssesmentsByClass`,
  },
  califications:{
    create:`${baseUrl}/calification/CreateUpdateCalifications`,
    getCalificationsByClass:`${baseUrl}/calification/getCalificationsListByClass`,
    getCalificationsByEmail:`${baseUrl}/calification/getCalificationsByEmail`,
  },
  messages:{
    sendMessage:`${baseUrl}/messages/send`,
    getMessagesByClass:`${baseUrl}/messages/getMessagesClassId`,
  },
  family:{
    getAll:`${baseUrl}/studentXParent/getAll`,
    create:`${baseUrl}/studentXParent/create`,
    updateFamily:`${baseUrl}/studentXParent/update`,
    deleteFamily:`${baseUrl}/studentXParent/delete`
  }
};
