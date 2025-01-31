import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, notification as notification2 } from "antd";
import { getSubjects } from "@services/subjectService";
import { getGroups } from "@services/groupService";
import { getTeachers } from "@services/userService";
import { createClass } from "@services/ClassService";
import { MESSAGES_ERROR } from "@config/constants";

export default function CreateClassesForm({ closeModal, notification }) {
  const [formData, setFormData] = useState({
    teacher: {}, // Mantener como objeto completo
    group: {}, // Mantener como objeto completo
    subject: {}, // Mantener como objeto completo
    schedule: "",
  });
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const teachers = await getTeachers();
      setTeacherOptions(teachers);

      const groups = await getGroups();
      setGroupOptions(groups);

      const subjects = await getSubjects();
      setSubjectOptions(subjects);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
  };

  const handleCreateClass = async () => {
    try {
      closeModal(); // Cerrar el modal
      const result = await createClass(formData);
      if (result) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.CLASSES_CREATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.CLASSES_CREATED, error);
    }
  };

  const handleTeacherChange = (value) => {
      const selectedTeacher = teacherOptions.find(
        (teacher) => teacher.id === value
      );
      setFormData((prevData) => ({ ...prevData, teacher: selectedTeacher }));
    };

  const handleGroupChange = (value) => {
      const selectedGroup = groupOptions.find((group) => group.id === value);
      setFormData((prevData) => ({ ...prevData, group: selectedGroup }));
    };

  const handleSubjectChange = (value) => {
      const selectedSubject = subjectOptions.find(
        (subject) => subject.id === value
      );
      setFormData((prevData) => ({ ...prevData, subject: selectedSubject }));
    };

  const teacherSelectOptions = () =>
      teacherOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {`${option.name} ${option.lastname}`}
        </option>
      ));

  const groupSelectOptions = () =>
      groupOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.grade + " - " + option.variant}
        </option>
      ));

  const subjectSelectOptions = () =>
      subjectOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ));

  return (
    <div className="form-group">
      <label>Profesor</label>
      <select
        name="teacher"
        value={formData.teacher.id || ""} // Asignar el ID del profesor seleccionado o vacío
        onChange={(e) => handleTeacherChange(parseInt(e.target.value))}
        required
      >
        <option value="" disabled>
          Seleccione...
        </option>
        {teacherSelectOptions}
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
        {groupSelectOptions}
      </select>

      <label>Materia</label>
      <select
        name="subject"
        value={formData.subject.id || ""} // Asignar el ID de la materia seleccionada o vacío
        onChange={(e) => handleSubjectChange(parseInt(e.target.value))}
        required
      >
        <option value="" disabled>
          Seleccione...
        </option>
        {subjectSelectOptions}
      </select>

      <label>Horario</label>
      <input
        type="text"
        name="schedule"
        value={formData.schedule}
        onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancelar
        </Button>
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            if (
              !formData.teacher ||
              !formData.group ||
              !formData.subject ||
              !formData.schedule
            ) {
              notification2.warning({
                message: "Information",
                description: "All fields are required",
                placement: "bottom",
                style: { backgroundColor: "#fff7dd" },
                pauseOnHover: false,
              });
              return;
            }
            handleCreateClass();
          }}
          style={{ backgroundColor: "#11538C" }}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
