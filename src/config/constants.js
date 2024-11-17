import ItemClassesIcon from "../assets/item-classes.svg";
import ItemAssesmentsIcon from "../assets/item-assesments.svg";
import ItemAttendanceIcon from "../assets/item-attendance.svg";
import ItemCalificationsIcon from "../assets/item-califications.svg";

export const MESSAGES_SUCCESS = {
    TITLE: "Success",
    USER_ROLE_UPDATED: 'User Role updated successfully',
    USER_DELETED: 'User deleted successfully',
    SUBJECT_CREATED: 'Subject created successfully',
    SUBJECT_UPDATED: 'Subject updated successfully',
    SUBJECT_DELETED: 'Subject deleted successfully',
    ASSESMENT_CREATED: 'Assesment created successfully',
    ASSESMENT_UPDATED: 'Assesment updated successfully',
    ASSESMENT_DELETED: 'Assesment deleted successfully',
    FAMILY_CREATED: 'Family created successfully',
    FAMILY_UPDATED: 'Family updated successfully',
    FAMILY_DELETED: 'Family deleted successfully',
    CLASSES_CREATED: 'Class created successfully',
    CLASSES_UPDATED: 'Class updated successfully',
    CLASSES_DELETED: 'Class deleted successfully',
    GROUP_CREATED: 'Group created successfully',
    STUDENT_GROUP_UPDATED: 'Group updated successfully',
    ATTENDANCE_CREATED: 'Attendance created successfully',
    CALIFICATIONS_UPDATED: 'Califications updated successfully',
};

export const MESSAGES_ERROR = {
    TITLE: "Error",
    USER_ROLE_UPDATED: 'Error updating user role',
    USER_DELETED: 'Error deleting user',
    SUBJECT_CREATED: 'Error creating subject',
    SUBJECT_UPDATED: 'Error updating subject',
    SUBJECT_DELETED: 'Error deleting subject',
    ASSESMENT_CREATED: 'Error creating assesment',
    ASSESMENT_UPDATED: 'Error updating assesment',
    ASSESMENT_DELETED: 'Error deleting assesment',
    FAMILY_CREATED: 'Error creating family',
    FAMILY_UPDATED: 'Error updating family',
    FAMILY_DELETED: 'Error deleting family',
    CLASSES_CREATED: 'Error creating class',
    CLASSES_UPDATED: 'Error updating class',
    CLASSES_DELETED: 'Error deleting class',
    GROUP_CREATED: 'Error creating group',
    STUDENT_GROUP_UPDATED: 'Error updating group',
    ATTENDANCE_CREATED: 'Error creating attendance',
    CALIFICATIONS_UPDATED: 'Error updating califications',
    STANDARD_ERROR_FETCHING: 'Error fetching the data',
    WEBSOCKET_CONNECTION: 'Error in WebSocket connection',
};

export const PAGES_URLS = {
    PUBLIC: {
        HOME: "/",
        REGISTER: "/register",
        CLASSES: "/classes",
        ASSESMENTS: "/assesments",
        ATTENDANCE: "/attendance",
        CALIFICATIONS: "/califications",
    },
    ADMIN: {
        USERS: "/admin/users",
        SUBJECTS: "/admin/subjects",
        CLASSES: "/admin/classes",
        GROUPS: "/admin/groups",
        FAMILY: "/admin/family",
    }
}

export const ROLECOLORS = {
    Admin: "red",
    Student: "blue",
    Parent: "green",
    Teacher: "purple",
};

export const ROLES = {
    Admin: "Admin",
    Student: "Student",
    Parent: "Parent",
    Teacher: "Teacher",
};

export const URLS = {
    GOOGLE_LOGIN: "http://localhost:8080/oauth2/authorization/google",
    BASE_URL: "http://localhost:8080",
    SOCKET_URL: "http://localhost:8080/ws",
};

export const TYPE_DOCUMENT_OPTIONS = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "TI", label: "Tarjeta de Identidad" },
    { value: "PP", label: "Pasaporte" },
];
  
export const GENDER_OPTIONS = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
    { value: "Otros", label: "Otros" },
];

export const MENUITEMS = [
    {
      src: ItemClassesIcon ,
      alt: "button-classes",
      label: "Classes",
      href: `/classes`,
    },
    {
      src: ItemAssesmentsIcon,
      alt: "button-assesments",
      label: "Assesments",
      href: `/assesments`,
    },
    {
      src: ItemAttendanceIcon,
      alt: "button-attendance",
      label: "Attendance",
      href: "/attendances",
    },
    {
      src: ItemCalificationsIcon,
      alt: "button-califications",
      label: "Califications",
      href: `/califications`,
    },
];