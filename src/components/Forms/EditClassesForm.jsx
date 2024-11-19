import { useState, useEffect, useCallback, useMemo } from "react";
import { Button, notification as notification2 } from "antd";
import { getSubjects } from "@services/subjectService";
import { getTeachers } from "@services/userService";
import { getGroups } from "@services/groupService";
import { updateClasses } from "@services/ClassService";
import { MESSAGES_ERROR } from "@config/constants";

export default function EditClassesForm({
  classesData,
  closeModal,
  notification,
}) {
  const [formData, setFormData] = useState(classesData || {});
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    if (classesData) {
      setFormData(classesData);
    }
  }, [classesData]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = useCallback(async () => {
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
  }, []);

  const handleTeacherChange = useCallback((value) => {
    const selectedTeacher = teacherOptions.find(
      (teacher) => teacher.id === value
    );
    setFormData((prevData) => ({
      ...prevData,
      teacher: selectedTeacher || {},
    }));
  }, [teacherOptions]);

  const handleGroupChange = useCallback((value) => {
    const selectedGroup = groupOptions.find((group) => group.id === value);
    setFormData((prevData) => ({ ...prevData, group: selectedGroup || {} }));
  }, [groupOptions]);

  const handleSubjectChange = useCallback((value) => {
    const selectedSubject = subjectOptions.find(
      (subject) => subject.id === value
    );
    setFormData((prevData) => ({
      ...prevData,
      subject: selectedSubject || {},
    }));
  }, [subjectOptions]);

  const handleEdit = useCallback(async (classes) => {
    try {
      closeModal();
      const result = await updateClasses(classes);
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
      setFormData({
        teacher: {},
        group: {},
        subject: {},
        schedule: "",
      });
    } catch (error) {
      console.error(MESSAGES_ERROR.CLASSES_UPDATED, error);
    }
  }, [notification, closeModal]);

  const teacherOptionsMemo = useMemo(() => teacherOptions, [teacherOptions]);
  const groupOptionsMemo = useMemo(() => groupOptions, [groupOptions]);
  const subjectOptionsMemo = useMemo(() => subjectOptions, [subjectOptions]);

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
        {teacherOptionsMemo?.map((option) => (
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
        {groupOptionsMemo?.map((option) => (
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
        {subjectOptionsMemo?.map((option) => (
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
          onClick={() => handleEdit(formData)}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
