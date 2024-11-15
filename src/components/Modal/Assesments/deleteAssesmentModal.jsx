import React, {useEffect, useState} from "react";
import { Modal, Button } from "antd";
import { deleteAssesment } from "../../../services/assesment";

export default function DeleteConfirmModal({
  isModalOpen,
  closeModal,
  notification,
  assesment = {},
}) {
  const [Description, setDescription] = useState("");
  const [Percent, setPercent] = useState("");

  const handleDelete = async () => {
    try {
      const result = await deleteAssesment(assesment.id);
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
    if (assesment) {
      setDescription(assesment.description);
      setPercent(assesment.percent);
    }
  }, [assesment]);

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
      <p>Estás a punto de eliminar la assesment con la siguiente información:</p>
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
          <strong style={{ textDecoration: "underline" }}>Description :</strong>
          <span style={{ fontWeight: "500" }}>{Description}</span>
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
          <strong style={{ textDecoration: "underline" }}>Percent:</strong>
          <span style={{ fontWeight: "500" }}>{Percent}</span>
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
