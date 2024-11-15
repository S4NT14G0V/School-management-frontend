import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { getSubjects } from "../../../services/subjectService";
import { getGroups } from "../../../services/groupService";
import { getTeachers } from "../../../services/userService";
import { createClass } from "../../../services/ClassService";
import "./CreateClassesModal.css";

export default function CreateModal({ isModalOpen, closeModal, notification }) {
  const [formData, setFormData] = useState({
    teacher: {}, // Mantener como objeto completo
    group: {},   // Mantener como objeto completo
    subject: {}, // Mantener como objeto completo
    schedule: "",
  });
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      fetchOptions();
    } else {
      // Reiniciar formData cuando se cierra el modal
      setFormData({
        teacher: {}, // Reiniciar a objeto vacío
        group: {},   // Reiniciar a objeto vacío
        subject: {}, // Reiniciar a objeto vacío
        schedule: "",
      });
    }
  }, [isModalOpen]);

  const fetchOptions = async () => {
    try {
      const teachers = await getTeachers();
      setTeacherOptions(teachers); // Guardar el objeto completo

      const groups = await getGroups();
      setGroupOptions(groups); // Guardar el objeto completo

      const subjects = await getSubjects();
      setSubjectOptions(subjects); // Guardar el objeto completo
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const handleCreateClass = async () => {
    try {
      console.log("Datos a enviar:", formData); // Para depuración
      const result = await createClass(formData);
      if (result) {
        notification(true);
        closeModal(); // Cerrar el modal
      }
    } catch (error) {
      console.error("Error creando la materia", error);
    }
  };

  const handleTeacherChange = (value) => {
    const selectedTeacher = teacherOptions.find((teacher) => teacher.id === value);
    setFormData((prevData) => ({ ...prevData, teacher: selectedTeacher }));
  };

  const handleGroupChange = (value) => {
    const selectedGroup = groupOptions.find((group) => group.id === value);
    setFormData((prevData) => ({ ...prevData, group: selectedGroup }));
  };

  const handleSubjectChange = (value) => {
    const selectedSubject = subjectOptions.find((subject) => subject.id === value);
    setFormData((prevData) => ({ ...prevData, subject: selectedSubject }));
  };

  return (
    <Modal
      title="Crear una nueva Materia"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <div className="form-group">
        <label>Profesor</label>
        <select
          name="teacher"
          value={formData.teacher.id || ""} // Asignar el ID del profesor seleccionado o vacío
          onChange={(e) => handleTeacherChange(parseInt(e.target.value))}
          required
        >
          <option value="" disabled>Seleccione...</option>
          {teacherOptions.map((option) => (
            <option key={option.id} value={option.id}>{`${option.name} ${option.lastname}`}</option>
          ))}
        </select>

        <label>Grupo</label>
        <select
          name="group"
          value={formData.group?.id || ""}
          onChange={(e) => handleGroupChange(parseInt(e.target.value))}
          required
        >
          <option value="" disabled>
            Seleccione...
          </option>
          {groupOptions?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.grade + " - " + option.variant}
            </option>
          ))}
        </select>

        <label>Materia</label>
        <select
          name="subject"
          value={formData.subject.id || ""} // Asignar el ID de la materia seleccionada o vacío
          onChange={(e) => handleSubjectChange(parseInt(e.target.value))}
          required
        >
          <option value="" disabled>Seleccione...</option>
          {subjectOptions.map((option) => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>

        <label>Horario</label>
        <input
          type="text"
          name="schedule"
          value={formData.schedule}
          onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>Cancelar</Button>
        <Button
          key="submit"
          type="primary"
          onClick={handleCreateClass}
        >
          Guardar Cambios
        </Button>
      </div>
    </Modal>
  );
}
