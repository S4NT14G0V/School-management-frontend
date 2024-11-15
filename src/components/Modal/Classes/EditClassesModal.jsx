import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { getSubjects } from "../../../services/subjectService";
import { getTeachers } from "../../../services/userService";
import { getGroups } from "../../../services/groupService";
import { updateClasses } from "../../../services/ClassService";

export default function EditModal({
  isModalOpen,
  closeModal,
  notification,
  classesData,
}) {
  const [formData, setFormData] = useState(classesData || {});
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      fetchOptions();
    } else {
      // Reiniciar formData cuando se cierra el modal
      setFormData({
        teacher: {},
        group: {},
        subject: {},
        schedule: "",
      });
    }
  }, [isModalOpen]);

  const fetchOptions = async () => {
    try {
      const teachers = await getTeachers();
      setTeacherOptions(teachers);

      const groups = await getGroups();
      setGroupOptions(groups);

      const subjects = await getSubjects();
      setSubjectOptions(subjects);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    if (classesData) {
      setFormData(classesData);
    }
  }, [classesData]);

  const handleTeacherChange = (value) => {
    const selectedTeacher = teacherOptions.find(
      (teacher) => teacher.id === value
    );
    setFormData((prevData) => ({
      ...prevData,
      teacher: selectedTeacher || {},
    }));
  };

  const handleGroupChange = (value) => {
    const selectedGroup = groupOptions.find((group) => group.id === value);
    setFormData((prevData) => ({ ...prevData, group: selectedGroup || {} }));
  };

  const handleSubjectChange = (value) => {
    const selectedSubject = subjectOptions.find(
      (subject) => subject.id === value
    );
    setFormData((prevData) => ({
      ...prevData,
      subject: selectedSubject || {},
    }));
  };

  const handleEdit = async (classes) => {
    try {
      console.log("Clases a editar:", classes);
      const result = await updateClasses(classes);
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
          {teacherOptions?.map((option) => (
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
          {groupOptions?.map((option) => (
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
          {subjectOptions?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <label>Horario</label>
        <input
          type="text"
          name="schedule"
          value={formData.schedule}
          onChange={(e) =>
            setFormData({ ...formData, schedule: e.target.value })
          }
        />
      </div>
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
          style={{ backgroundColor: "#2f1b41", color: "white" }}
          onClick={() => handleEdit(formData)}
        >
          Guardar Cambios
        </Button>
      </div>
    </Modal>
  );
}
