import React, { useCallback } from "react";
import { deleteSubject } from "../../services/subjectService"; // Importa tu servicio de eliminación
import { Button, notification as notification2 } from "antd";
import { MESSAGES_ERROR } from "../../config/constants";

export default function DeleteSubjectForm ({ subjectData, closeModal, notification }) {
  const handleDelete = useCallback(async () => {
    try {
      closeModal(); // Cierra el modal después de eliminar
      // Esperamos la respuesta de deleteSubject
      const result = await deleteSubject(subjectData.id); 
      if (result) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.SUBJECT_DELETED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.SUBJECT_DELETED, error);
    }
  }, [subjectData.id, closeModal, notification]);
  

  return (
    <div>
      <hr style={{ border: "none", padding: "5px" }} />
      <p>Estás a punto de eliminar la materia con el nombre:</p>
      <p style={{ padding: "10px", paddingLeft: "15px" }}>
        <strong style={{ textDecoration: "underline" }}>
          {subjectData?.name || "Nombre no disponible"}
        </strong>
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
    </div>
  );
};
