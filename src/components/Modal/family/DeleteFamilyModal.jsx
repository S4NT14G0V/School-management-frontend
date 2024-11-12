import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useUser } from "../../../context/userContext";
import { deleteFamily } from "../../../services/ClassService";

export default function DeleteConfirmModal({
  isModalOpen,
  closeModal,
  notification,
  classesData = {},
}) {
  const { authToken } = useUser();
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleDelete = async () => {
    try {
      const result = await deleteClasses(authToken, classesData.id);
      if (result) {
        console.log("Clase eliminada con éxito");
        notification(true); // Activa la notificación para mostrar éxito
      } else {
        console.error("Error al borrar la clase:", result.message);
      }
      closeModal(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error al borrar la clase", error);
    }
  };

  useEffect(() => {
    if (classesData) {
      setStudentName(`${classesData.student?.name || ''} ${classesData.student?.lastname || ''}`);
      setParentName(`${classesData.parent?.name || ''} ${classesData.parent?.lastname || ''}`);
      setSubjectName(classesData.subject?.name || '');
      setSchedule(classesData.schedule || '');
    }
  }, [classesData]);

  return (
    <Modal
      title="Eliminar clase"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <hr style={{ border: "none", padding: "5px" }} />
      <p>Estás a punto de eliminar la clase con la siguiente información:</p>
      <div style={{ padding: "10px", paddingLeft: "15px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <strong style={{ textDecoration: "underline" }}>Estudiante:</strong>
          <span style={{ fontWeight: "500" }}>{studentName}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <strong style={{ textDecoration: "underline" }}>Padre:</strong>
          <span style={{ fontWeight: "500" }}>{parentName}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <strong style={{ textDecoration: "underline" }}>Materia:</strong>
          <span style={{ fontWeight: "500" }}>{subjectName}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <strong style={{ textDecoration: "underline" }}>Horario:</strong>
          <span style={{ fontWeight: "500" }}>{schedule}</span>
        </div>
      </div>
      <hr style={{ border: "none", padding: "5px" }} />
      <p>¿Estás seguro de que deseas continuar con esta acción?</p>
      <hr style={{ border: "none", padding: "5px" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <Button key="cancel" onClick={closeModal}>
          Cancelar
        </Button>
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </Modal>
  );
}
