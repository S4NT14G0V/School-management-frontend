import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useUser } from "../../../context/userContext";
import { updateSubject } from "../../../services/subjectService";

export default function EditModal({
  isModalOpen,
  closeModal,
  notification,
  subjectData
}) {
  const { authToken } = useUser();
  const [formData, setFormData] = useState(subjectData || {}); // Inicializa con `subjectData`

  useEffect(() => {
    if (subjectData) {
      setFormData(subjectData); // Actualiza `formData` cuando `subjectData` cambia
    }
  }, [subjectData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (subject) => {
    try {
      const result = await updateSubject(authToken, subject);
      if (result) {
        notification(true);
        closeModal();
      } else {
        console.error("Error actualizando la materia:", result.message);
      }
    } catch (error) {
      console.error("Error actualizando la materia", error);
    }
  };

  return (
    <Modal
      title="Editar materia"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
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
      </div>
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
    </Modal>
  );
}
