import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useUser } from "../../../context/userContext";
import { getSubjects } from "../../../services/subjectService";
import { createGroups } from "../../../services/groupService";
import "./CreateGroupsModal.css";

export default function CreateModal({ isModalOpen, closeModal, notification }) {
  const { authToken } = useUser();
  const [formData, setFormData] = useState({
    grade: 0, // Cambiado a string
    variant: "", // Cambiado a string
  });

  useEffect(() => {
    if (!isModalOpen) {
      // Reiniciar formData cuando se cierra el modal
      setFormData({
        grade: 0,   // Reiniciar a string vacía
        variant: "", // Reiniciar a string vacía
      });
    }
  }, [isModalOpen]);

  const handleCreateGroup = async () => {
    try {
      const formDataToSend = {
        ...formData,
        grade: parseInt(formData.grade, 10) || 0, // Convierte a entero, o 0 si no es un número válido
      };
      console.log("Datos a enviar:", formData); // Para depuración
      const result = await createGroups(authToken, formDataToSend);
      if (result) {
        notification(true);
        closeModal(); // Cerrar el modal
      }
    } catch (error) {
      console.error("Error creando la materia", error);
    }
  };

  // Manejadores para los cambios en los inputs de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal
      title="Crear un nuevo Grupo"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <div className="form-group">
        <label>Grado</label>
        <input
          type="number"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          required
        />

        <label>Variante</label>
        <input
          type="text"
          name="variant"
          value={formData.variant}
          onChange={handleInputChange}
          required
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>Cancelar</Button>
        <Button
          key="submit"
          type="primary"
          onClick={handleCreateGroup}
        >
          Guardar Cambios
        </Button>
      </div>
    </Modal>
  );
}
