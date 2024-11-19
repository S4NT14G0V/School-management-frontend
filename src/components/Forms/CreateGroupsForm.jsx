import React, { useState, useCallback } from "react";
import { createGroups } from "../../services/groupService";
import { Button, notification as notification2 } from "antd";
import { MESSAGES_ERROR } from "../../config/constants";

export default function CreateGroupsForm ({ notification, closeModal }) {
  const [formData, setFormData] = useState({
    grade: 0,
    variant: "",
  });

  const handleCreateGroup = useCallback(async () => {
    try {
      const formDataToSend = {
        ...formData,
        grade: parseInt(formData.grade, 10) || 0, // Convierte a entero, o 0 si no es un número válido
      };
      closeModal();
      const result = await createGroups(formDataToSend);
      if (result) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.GROUP_CREATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
      setFormData({
        grade: 0,
        variant: "",
      });
    } catch (error) {
      console.error(MESSAGES_ERROR.GROUP_CREATED, error);
    }
  }, [formData, notification, closeModal]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  return (
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

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancelar
        </Button>
        <Button
          key="submit"
          type="primary"
          onClick={handleCreateGroup}
          style={{backgroundColor: "#11538C"  }}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};
