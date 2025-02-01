import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button, notification as notification2 } from "antd";
import { deleteFamily } from "@services/family";
import { MESSAGES_ERROR } from "@config/constants";

export default function DeleteFamilyForm ({ FamilyData, notification, closeModal }){
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");

  const handleDelete = useCallback(async () => {
    try {
      closeModal(); // Cierra el modal después de eliminar
      const result = await deleteFamily(FamilyData.id);
      if (result) {
        notification(true); // Activa la notificación para mostrar éxito
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.FAMILY_DELETED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.FAMILY_DELETED, error);
    }
  }, [FamilyData.id, notification, closeModal]);

  useEffect(() => {
    if (FamilyData) {
      setParentName(`${FamilyData.parent?.name || ''} ${FamilyData.parent?.lastname || ''}`);
      setStudentName(`${FamilyData.student?.name || ''} ${FamilyData.student?.lastname || ''}`);
    }
  }, [FamilyData]);

  const memoizedStudentName = useMemo(() => studentName, [studentName]);
  const memoizedParentName = useMemo(() => parentName, [parentName]);

  return (
    <>
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
          <span style={{ fontWeight: "500" }}>{memoizedStudentName}</span>
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
          <span style={{ fontWeight: "500" }}>{memoizedParentName}</span>
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
    </>
  );
};