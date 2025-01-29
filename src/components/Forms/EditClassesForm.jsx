import { useState, useEffect, useCallback } from "react";
import { Button, notification as notification2 } from "antd";
import { getSubjects } from "@services/subjectService";
import { getTeachers } from "@services/userService";
import { getGroups } from "@services/groupService";
import { updateClasses } from "@services/ClassService";
import { MESSAGES_ERROR } from "@config/constants";

export default function EditClassesForm({
  classesData = {}, // Valor por defecto para evitar undefined
  closeModal,
  notification,
}) {
  const [formData, setFormData] = useState({
    teacher: {},
    group: {},
    subject: {},
    schedule: "",
    ...classesData,
  });
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  // Actualizar formData si classesData cambia
  useEffect(() => {
    setFormData({
      teacher: {},
      group: {},
      subject: {},
      schedule: "",
      ...classesData,
    });
  }, [classesData]);

  // Cargar opciones
  const fetchOptions = useCallback(async () => {
    try {
      const [teachers, groups, subjects] = await Promise.all([
        getTeachers(),
        getGroups(),
        getSubjects(),
      ]);
      setTeacherOptions(teachers || []);
      setGroupOptions(groups || []);
      setSubjectOptions(subjects || []);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  // Cambiar el profesor
  const handleTeacherChange = (value) => {
    const selectedTeacher = teacherOptions.find((teacher) => teacher.id === value);
    setFormData((prevData) => ({
      ...prevData,
      teacher: selectedTeacher || {},
    }));
  };

  // Cambiar el grupo
  const handleGroupChange = (value) => {
    const selectedGroup = groupOptions.find((group) => group.id === value);
    setFormData((prevData) => ({
      ...prevData,
      group: selectedGroup || {},
    }));
  };

  // Cambiar la materia
  const handleSubjectChange = (value) => {
    const selectedSubject = subjectOptions.find((subject) => subject.id === value);
    setFormData((prevData) => ({
      ...prevData,
      subject: selectedSubject || {},
    }));
  };

  // Guardar cambios
  const handleEdit = async () => {
    const hasChanges =
      formData.teacher?.id !== classesData.teacher?.id ||
      formData.group?.id !== classesData.group?.id ||
      formData.subject?.id !== classesData.subject?.id ||
      formData.schedule !== classesData.schedule;

    if (!hasChanges) {
      notification2.warning({
        message: "Warning",
        description: "There are no changes to save",
        placement: "bottom",
        style: { backgroundColor: "#fff7dd" },
        pauseOnHover: false,
      });
      return;
    }

    try {
      const result = await updateClasses(formData);
      if (result) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.CLASSES_UPDATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
      closeModal();
    } catch (error) {
      console.error(MESSAGES_ERROR.CLASSES_UPDATED, error);
    }
  };

  return (
    <div className="form-group">
      <label>Profesor</label>
      <select
        name="teacher"
        value={formData.teacher?.id || ""}
        onChange={(e) => handleTeacherChange(parseInt(e.target.value))}
        required
      >
        <option value="" disabled>
          Seleccione...
        </option>
        {teacherOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {`${option.name} ${option.lastname}`}
          </option>
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
        {groupOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.grade + " - " + option.variant}
          </option>
        ))}
      </select>

      <label>Materia</label>
      <select
        name="subject"
        value={formData.subject?.id || ""}
        onChange={(e) => handleSubjectChange(parseInt(e.target.value))}
        required
      >
        <option value="" disabled>
          Seleccione...
        </option>
        {subjectOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      <label>Horario</label>
      <input
        type="text"
        name="schedule"
        value={formData.schedule || ""}
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
          style={{ backgroundColor: "#11538C", color: "white" }}
          onClick={handleEdit}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
