import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { deleteFamily } from "../../../services/family";

export default function DeleteConfirmModal({
  isModalOpen,
  closeModal,
  notification,
  FamilyData,
}) {
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");

  const handleDelete = async () => {
    try {
      const result = await deleteFamily(FamilyData.id);
      if (result) {
        console.log("Familia eliminada con éxito");
        notification(true); // Activa la notificación para mostrar éxito
      } else {
        console.error("Error al borrar la familia:", result.message);
      }
      closeModal(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error al borrar la familia", error);
    }
  };

  useEffect(() => {
    if (FamilyData) {
      setParentName(`${FamilyData.parent?.name || ''} ${FamilyData.parent?.lastname || ''}`);
      setStudentName(`${FamilyData.student?.name || ''} ${FamilyData.student?.lastname || ''}`);
  
    }
  }, [FamilyData]);

  return (
    <Modal
      title="Eliminar Familia"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <hr style={{ border: "none", padding: "5px" }} />
      <p>Estás a punto de eliminar la familia con la siguiente información:</p>
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
