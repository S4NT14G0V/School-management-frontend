import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button, notification as notification2 } from "antd";
import { deleteClasses } from "@services/ClassService";
import { MESSAGES_ERROR } from "@config/constants";

export default function DeleteClassesForm ({ classesData, closeModal, notification }) {
  const [teacherName, setTeacherName] = useState("");
  const [groupVariant, setGroupVariant] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleDelete = useCallback(async () => {
    try {
      closeModal(); // Cierra el modal después de eliminar
      const result = await deleteClasses(classesData.id);
      if (result) {
        notification(true); // Activa la notificación para mostrar éxito
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.CLASSES_DELETED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.CLASSES_DELETED, error);
    }
  }, [classesData.id, closeModal, notification]);

  useEffect(() => {
    if (classesData) {
      setTeacherName(classesData.teacher.name);
      setGroupVariant(`${classesData.group.grade} - ${classesData.group.variant}`);
      setSubjectName(classesData.subject.name);
      setSchedule(classesData.schedule);
    }
  }, [classesData]);

  const classInfo = useMemo(() => (
    <>
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
    </>
  ), [teacherName, groupVariant, subjectName, schedule]);

  return (
    <>
      <hr style={{ border: "none", padding: "5px" }} />
      <p>Estás a punto de eliminar la clase con la siguiente información:</p>
      <div style={{ padding: "10px", paddingLeft: "15px" }}>
        {classInfo}
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