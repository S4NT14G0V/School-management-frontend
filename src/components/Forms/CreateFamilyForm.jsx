import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Select, Button, notification as notification2 } from "antd";
import { getParents, getStudents } from "../../services/userService";
import { createFamily } from "../../services/family";
import { MESSAGES_ERROR } from "../../config/constants";

export default function CreateFamilyForm({
  notification,
  closeModal,
}) {
  const [parentOptions, setParentOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [formData, setFormData] = useState({
    parent: {},
    student: {},
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = useCallback(async () => {
    try {
      const parents = await getParents();
      setParentOptions(parents);

      const students = await getStudents();
      setStudentOptions(students);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
  }, []);

  const handleParentChange = useCallback((value) => {
    const selectedParent = parentOptions.find((parent) => parent.id === value);
    setFormData((prevData) => ({
      ...prevData,
      parent: selectedParent || {},
    }));
  }, [parentOptions]);

  const handleStudentChange = useCallback((value) => {
    const selectedStudent = studentOptions.find(
      (student) => student.id === value
    );
    setFormData((prevData) => ({
      ...prevData,
      student: selectedStudent || {},
    }));
  }, [studentOptions]);

  const handleSubmit = useCallback(async () => {
    try {
      closeModal(); // Cerrar el modal
      const result = await createFamily(formData);
      if (result) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.FAMILY_CREATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
      setFormData({
          parent: {},
          student: {},
        });
    } catch (error) {
      console.error(MESSAGES_ERROR.FAMILY_CREATED, error);
    }
  }, [formData, notification, closeModal]);

  const parentSelectOptions = useMemo(() => (
    parentOptions.map((option) => (
      <Select.Option key={option.id} value={option.id}>
        {`${option.name} ${option.lastname}`}
      </Select.Option>
    ))
  ), [parentOptions]);

  const studentSelectOptions = useMemo(() => (
    studentOptions.map((option) => (
      <Select.Option key={option.id} value={option.id}>
        {`${option.name} ${option.lastname}`}
      </Select.Option>
    ))
  ), [studentOptions]);

  return (
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
        {parentSelectOptions}
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
        {studentSelectOptions}
      </Select>

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
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
