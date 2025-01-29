import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button, notification as notification2 } from "antd";
import { deleteAssesment } from "@services/assesment";
import { MESSAGES_ERROR } from "@config/constants";

export default function DeleteAssesmentForm({ assesment, closeModal, notification }) {
  const [Description, setDescription] = useState("");
  const [Percent, setPercent] = useState("");

  useEffect(() => {
    if (assesment) {
      setDescription(assesment.description);
      setPercent(assesment.percent);
    }
  }, [assesment]);

  const handleDelete = useCallback(async () => {
    try {
      closeModal(); // Cierra el modal después de eliminar
      const result = await deleteAssesment(assesment.id);
      if (result) {
        notification(true); // Activa la notificación para mostrar éxito
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.ASSESMENT_DELETED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.ASSESMENT_DELETED, error);
    }
  }, [assesment, closeModal, notification]);

  const descriptionElement = useMemo(() => (
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
  ), [Description]);

  const percentElement = useMemo(() => (
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
  ), [Percent]);

  return (
    <>
      <hr style={{ border: "none", padding: "5px" }} />
      <p>Estás a punto de eliminar la assesment con la siguiente información:</p>
      <div style={{ padding: "10px", paddingLeft: "15px" }}>
        {descriptionElement}
        {percentElement}
      </div>
      <hr style={{ border: "none", padding: "5px" }} />
      <p>¿Estás seguro de que deseas continuar con esta acción?</p>
      <hr style={{ border: "none", padding: "5px" }} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px" }}>
        <Button key="cancel" onClick={closeModal}>
          Cancelar
        </Button>
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </>
  );
}
