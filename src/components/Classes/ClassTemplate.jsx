import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssesmentTable from "../../components/Assesment/AssesmentsTable";
import arrowLeftIcon from "../../assets/arrow_left.svg";
import { useParams } from "react-router-dom";
import { getClassesById } from "../../services/ClassService";
import { notification } from "antd";
import { createCalifications } from "../../services/califications";
import CreateAttendanceModal from "../Modal/Attendance/createAttendanceModal";
import EditModal from "../Modal/Califications/EditCalificationsSubjectModal";
import Forum from "../Forum/Forum";

export default function ClassTemplate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [notificationEdit, setNotificationEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchClasses = async (id) => {
    console.log("id en el fetch", id);
    try {
      const Classe = await getClassesById(id);
      setClassData(Classe); // Actualizamos el estado con los datos obtenidos
      console.log(Classe);
    } catch (error) {
      console.log("Error fetching class data: " + error.message);
    }
  };

  const fetchUpdateCalificationsClass = async (califications) => {
    try {
      const response = await createCalifications(califications);
      return response;
    } catch (error) {
      console.error("Error fetching class data: " + error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchClasses(id); // Llamada a la función que obtiene los datos de la clase
    }
  }, [id]); // Dependencias en id

  useEffect(() => {
    if (notificationEdit) {
      showNotificationEdit();
      setNotificationEdit(false);
    }
  }, [notificationEdit]);

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
  const openModal = () => {
    setIsModalOpen(true); // Abre el modal
  };

  const openAttendanceModal = () => {
    setIsAttendanceModalOpen(true); // Abre el modal
  }

  const showNotificationEdit = () => {
    showNotification("Success", "User edited successfully");
    fetchUpdateCalificationsClass(editData);
    setEditData(null);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const closeModalAttendance = () => {
    setIsAttendanceModalOpen(false); // Cierra el modal
  }

  // Función para redirigir
  const handleNavigate = () => {
    navigate(`/classes`);
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
        }}
      >
        <AssesmentTable classes={classData} modal={openModal} attendanceModal={openAttendanceModal} />
        
        <CreateAttendanceModal
          isModalOpen={isAttendanceModalOpen}
          closeModal={closeModalAttendance}
          notification={closeModalAttendance}
          classesId={classData.id}  
        />
        
        <EditModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          notification={setNotificationEdit}
          id={classData.id}
          editData={editData}
          setEditData={setEditData}
        />
      </div>
      <hr className="page-divider" />
      <Forum Id_Class={classData.id} />
    </>
  );
}
