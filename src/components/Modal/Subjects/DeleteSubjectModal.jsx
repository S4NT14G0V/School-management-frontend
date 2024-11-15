import React from "react";
import { Modal, Button } from "antd";
import { deleteSubject } from "../../../services/subjectService";

export default function DeleteConfirmModal({ isModalOpen, closeModal, notification, subjectData }) {

  const handleDelete = async () => {
    try {
      const result = await deleteSubject(subjectData.id);
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

  return (
    <Modal
      title="Eliminar materia"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <hr style={{ border: "none", padding: "5px" }} />
      <p>Estás a punto de eliminar la materia con el nombre:</p>
      <p style={{ padding: "10px", paddingLeft: "15px" }}>
        <strong style={{ textDecoration: "underline" }}>{subjectData?.name || "Nombre no disponible"}</strong>
      </p>
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
        <Button
          key="delete"
          type="primary"
          danger
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </div>
    </Modal>
  );
}
