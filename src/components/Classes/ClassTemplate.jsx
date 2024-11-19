import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssesmentTable from "../../components/Assesment/AssesmentsTable";
import arrowLeftIcon from "../../assets/arrow_left.svg";
import { useParams } from "react-router-dom";
import { getClassesById } from "../../services/ClassService";
import { notification } from "antd";
import CreateAttendanceModal from "../Modal/Attendance/createAttendanceModal";
import ShowAttendanceClassModal from "../Modal/Attendance/showAttendanceClassModal";
import EditModal from "../Modal/Califications/EditCalificationsSubjectModal";
import Forum from "../Forum/Forum";
import {
  MESSAGES_ERROR,
  MESSAGES_SUCCESS,
  PAGES_URLS,
} from "../../config/constants";

export default function ClassTemplate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  // CREATE
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [notificationAttendance, setNotificationAttendance] = useState(false);
  const openAttendanceModal = useCallback(() => {
    setIsAttendanceModalOpen(true); // Abre el modal
  }, []);
  const showNotificationAttendance = () => {
    showNotification(
      MESSAGES_SUCCESS.TITLE,
      MESSAGES_SUCCESS.ATTENDANCE_CREATED
    );
    closeModalAttendance();
  };
  const closeModalAttendance = useCallback(() => {
    setIsAttendanceModalOpen(false); // Cierra el modal
  }, []);

  // SHOW
  const [isAttendanceShowModalOpen, setIsAttendanceShowModalOpen] =
    useState(false);
  const openShowAttendanceModal = useCallback(() => {
    setIsAttendanceShowModalOpen(true); // Abre el modal
  }, []);
  const closeModalShowAttendance = useCallback(() => {
    setIsAttendanceShowModalOpen(false); // Cierra el modal
  }, []);

  // EDIT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationEdit, setNotificationEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const openModal = useCallback(() => {
    setIsModalOpen(true); // Abre el modal
  }, []);
  const showNotificationEdit = useCallback(() => {
    showNotification(
      MESSAGES_SUCCESS.TITLE,
      MESSAGES_SUCCESS.CALIFICATIONS_UPDATED
    );
    setEditData(null);
    closeModal();
  }, []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false); // Cierra el modal
  }, []);

  const showNotification = (message, description) => {
    notification.success({
      message: message,
      description: description,
      placement: "bottom",
      showProgress: true,
      style: { backgroundColor: "#f4fcf2" },
      pauseOnHover: false,
    });
  };

  useEffect(() => {
    if (notificationEdit) {
      showNotificationEdit();
      setNotificationEdit(false);
    }
    if (notificationAttendance) {
      showNotificationAttendance();
      setNotificationAttendance(false);
    }
  }, [notificationEdit, notificationAttendance]);

  const fetchClasses = useCallback(async (id) => {
    try {
      const Classe = await getClassesById(id);
      setClassData(Classe); // Actualizamos el estado con los datos obtenidos
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchClasses(id); // Llamada a la función que obtiene los datos de la clase
    }
  }, [id]); // Dependencias en id

  // Función para redirigir
  const handleNavigate = () => {
    navigate(`${PAGES_URLS.PUBLIC.CLASSES}`); // Redirigimos a la página de clases
  };

  // Renderizar solo si classData no es null
  if (!classData) {
    return <div>Loading...</div>; // Mensaje de carga
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          position: "absolute",
          left: "20px",
          top: "20px",
        }}
      >
        <button
          style={{
            width: "100px",
            height: "30px",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            padding: "0 20px",
          }}
          onClick={handleNavigate}
        >
          <img
            src={arrowLeftIcon}
            alt="a"
            style={{
              position: "absolute",
              left: "5px",
              width: "24px",
              height: "24px",
              fontWeight: "400",
            }}
          />
          Return
        </button>
      </div>
      <div
        style={{
          height: "fit-content",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <h1>
          {classData.subject.name} | {classData.group.grade} -{" "}
          {classData.group.variant}
        </h1>
        <hr className="page-divider" />

        {/* Contenedor con barra de desplazamiento */}
        <div
          style={{
            minHeight: "fit-content", // Altura mínima del contenedor
            maxHeight: "500px", // Máxima altura del contenedor
            overflowY: "auto", // Permite el desplazamiento vertical
            padding: "10px", // Espaciado dentro del contenedor
            width: "100%", // Ancho del contenedor
          }}
        >
          <AssesmentTable
            classes={classData}
            modal={openModal}
            attendanceModal={openAttendanceModal}
            attendanceShowModal={openShowAttendanceModal}
          />

          <CreateAttendanceModal
            isModalOpen={isAttendanceModalOpen}
            closeModal={closeModalAttendance}
            notification={setNotificationAttendance}
            classesId={classData.id}
          />

          <ShowAttendanceClassModal
            isModalOpen={isAttendanceShowModalOpen}
            closeModal={closeModalShowAttendance}
            classesId={classData.id}
          />

          <EditModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            notification={setNotificationEdit}
            id={classData.id}
          />
        </div>
      </div>
      <Forum Id_Class={classData.id} />
    </>
  );
}
