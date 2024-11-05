import React, {useEffect, useState} from "react";
import { Modal, Button } from "antd";
import { useUser } from "../../../context/userContext";
import { deleteClasses } from "../../../services/ClassService";

export default function DeleteConfirmModal({
  isModalOpen,
  closeModal,
  notification,
  classesData = {},
}) {
  const { authToken } = useUser();
  const [teacherName, setTeacherName] = useState("");
  const [groupVariant, setGroupVariant] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleDelete = async () => {
    try {
      const result = await deleteClasses(authToken, classesData.id);
      if (result) {
        console.log("Materia eliminada con éxito");
        notification(true); // Activa la notificación para mostrar éxito
      } else {
        console.error("Error al borrar la materia:", result.message);
      }
      closeModal(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error al borrar la materia", error);
    }
  };

  useEffect(() => {
    if (classesData) {
      setTeacherName(classesData.teacher.name);
      setGroupVariant(classesData.group.variant);
      setSubjectName(classesData.subject.name);
      setSchedule(classesData.schedule);
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
          <strong style={{ textDecoration: "underline" }}>Teacher:</strong>
          <span style={{ fontWeight: "500" }}>{teacherName}</span>
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
          <strong style={{ textDecoration: "underline" }}>Group:</strong>
          <span style={{ fontWeight: "500" }}>{groupVariant}</span>
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
          <strong style={{ textDecoration: "underline" }}>Subject:</strong>
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
          <strong style={{ textDecoration: "underline" }}>Schedule:</strong>
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
