import React, { useEffect, useState, useCallback } from "react";
import { updateSubject } from "../../services/subjectService"; // Asegúrate de importar el servicio correctamente
import { Button, notification as notification2 } from "antd";
import { MESSAGES_ERROR } from "../../config/constants";

export default function EditSubjectContent ({ subjectData, closeModal, notification }) {
  const [formData, setFormData] = useState(subjectData || {}); // Inicializa con `subjectData`

  useEffect(() => {
    if (subjectData) {
      setFormData(subjectData); // Actualiza `formData` cuando `subjectData` cambia
    }
  }, [subjectData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleEdit = useCallback(async (subject) => {
    try {
      closeModal(); // Cierra el modal después de actualizar
      const result = await updateSubject(subject);
      if (result) {
        notification(true); // Muestra la notificación de éxito
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.SUBJECT_UPDATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.SUBJECT_UPDATED, error);
    }
  }, [closeModal, notification]);

  return (
    <div className="form-group" style={{ border: "none", marginTop: "5px" }}>
      <div style={{ padding: "10px" }} />
      <label>Nombre de la Materia</label>
      <input
        type="text"
        placeholder="Nombre"
        name="name"
        value={formData.name || ""}
        onChange={handleInputChange}
      />
      <label>Descripción de la Materia</label>
      <input
        type="text"
        placeholder="Descripción"
        name="description"
        value={formData.description || ""}
        onChange={handleInputChange}
      />
      <label>Link de la Imágen</label>
      <input
        type="text"
        placeholder="Imágen"
        name="picture"
        value={formData.picture || ""}
        onChange={handleInputChange}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancelar
        </Button>
        <Button
          key="submit"
          style={{ backgroundColor: "#2f1b41", color: "white" }}
          onClick={() => handleEdit(formData)}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};
