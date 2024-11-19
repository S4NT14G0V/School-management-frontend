import React, { useState, useCallback, useMemo } from "react";
import { createSubject } from "../../services/subjectService"; // Importa tu servicio de eliminación
import { Button, notification as notification2 } from "antd";
import { MESSAGES_ERROR } from "../../config/constants";

export default function CreateSubjectForm ({ notification, closeModal }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    picture: '',
  });

  const handleCreateSubject = useCallback(async (subject) => {
    try {
      closeModal(); // Cerrar el modal después de procesar
      const response = await createSubject(subject); // Espera el resultado
      if (response) {
        notification(true); // Marcar para mostrar notificación
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.SUBJECT_CREATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
      setFormData({
        name: '',
        description: '',
        picture: '',
      });
    } catch (error) {
      console.error(MESSAGES_ERROR.SUBJECT_CREATED, error);
    }
  }, [notification, closeModal]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const formElements = useMemo(() => (
    <>
      <label>Nombre de la Materia</label>
      <input
        type="text"
        placeholder="Nombre"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <label>Descripción de la Materia</label>
      <input
        type="text"
        placeholder="Descripción"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <label>Link de la Imágen</label>
      <input
        type="text"
        placeholder="Imágen"
        name="picture"
        value={formData.picture}
        onChange={handleInputChange}
      />
    </>
  ), [formData, handleInputChange]);

  return (
    <div className="form-group" style={{ border: "none", marginTop: "5px" }}>
      <div style={{ padding: "10px" }} />
      {formElements}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancelar
        </Button>
        <Button
          key="submit"
          style={{ backgroundColor: "#11538C", color: "white" }} 
          onClick={() => handleCreateSubject(formData)}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};