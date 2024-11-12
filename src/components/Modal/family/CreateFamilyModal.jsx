import React, { useState, useEffect } from "react";
import { Modal, Button, Select } from "antd";
import { useUser } from "../../../context/userContext";
import { getParents, getStudents } from "../../../services/userService";
import {createFamily} from"../../../services/family"

export default function CreateModal({ isModalOpen, closeModal, notification }) {
  const { authToken } = useUser();
  const [formData, setFormData] = useState({
    parent: {},
    student: {},
  });
  const [parentOptions, setParentOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      fetchOptions();
    } else {
      // Reiniciar formData cuando se cierra el modal
      setFormData({
        parent: {},
        student: {},
      });
    }
  }, [isModalOpen]);

  const fetchOptions = async () => {
    try {
      const parents = await getParents(authToken);
      setParentOptions(parents);

      const students = await getStudents(authToken);
      setStudentOptions(students);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const handleParentChange = (value) => {
    const selectedParent = parentOptions.find((parent) => parent.id === value);
    setFormData((prevData) => ({
      ...prevData,
      parent: selectedParent || {},
    }));
  };

  const handleStudentChange = (value) => {
    const selectedStudent = studentOptions.find((student) => student.id === value);
    setFormData((prevData) => ({ ...prevData, student: selectedStudent || {} }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Datos a enviar:", formData); // Para depuración
      const result = await createFamily(authToken, formData);
      if (result) {
        notification(true);
        closeModal(); // Cerrar el modal
      }
    } catch (error) {
      console.error("Error creando la materia", error);
    }
  };

  return (
    <Modal
      title="Crear relación entre Padre y Estudiante"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <div className="form-group">
        <label>Padre</label>
        <Select
          showSearch
          placeholder="Seleccione un padre"
          optionFilterProp="children"
          value={formData.parent?.id || ""}
          onChange={handleParentChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: "100%" }}
        >
          {parentOptions.map((option) => (
            <Select.Option key={option.id} value={option.id}>
              {`${option.name} ${option.lastname}`}
            </Select.Option>
          ))}
        </Select>

        <label>Estudiante</label>
        <Select
          showSearch
          placeholder="Seleccione un estudiante"
          optionFilterProp="children"
          value={formData.student?.id || ""}
          onChange={handleStudentChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: "100%" }}
        >
          {studentOptions.map((option) => (
            <Select.Option key={option.id} value={option.id}>
              {`${option.name} ${option.lastname}`}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancelar
        </Button>
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </div>
    </Modal>
  );
}
