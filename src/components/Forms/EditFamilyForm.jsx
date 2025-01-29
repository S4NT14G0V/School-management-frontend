import { useState, useEffect, useCallback, useMemo } from "react";
import { Button, notification as notification2 } from "antd";
import { getStudents, getParents } from "@services/userService";
import { updateFamily } from "@services/family";
import { MESSAGES_ERROR } from "@config/constants";

export default function EditFamilyForm ({ FamilyData, notification, closeModal }) {
  const [formData, setFormData] = useState(FamilyData || {});
  const [studentOptions, setStudentOptions] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);

  useEffect(() => {
    if (FamilyData) {
      setFormData(FamilyData || {});
    }
  }, [FamilyData]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const students = await getStudents();
        setStudentOptions(students);

        const parents = await getParents();
        setParentOptions(parents);
      } catch (error) {
        console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
      }
    };

    fetchOptions();
  }, []);

  const handleStudentChange = (value) => {
    const selectedStudent = studentOptions.find((student) => student.id === value);
    setFormData((prevData) => ({
      ...prevData,
      student: selectedStudent || {},
    }));
  };

  const handleParentChange = (value) => {
    const selectedParent = parentOptions.find((parent) => parent.id === value);
    setFormData((prevData) => ({ ...prevData, parent: selectedParent || {} }));
  };

  const handleEdit = async (data) => {
    if (formData === FamilyData) {
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
      closeModal();
      const result = await updateFamily(data);
      if (result) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.FAMILY_UPDATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.FAMILY_UPDATED, error);
    }
  };

  return (
    <div className="form-group">
      <label>Estudiante</label>
      <select
        name="student"
        value={formData.student?.id || ""}
        onChange={(e) => handleStudentChange(parseInt(e.target.value))}
        required
      >
        <option value="" disabled>
          Seleccione...
        </option>
        {studentOptions?.map((option) => (
          <option key={option.id} value={option.id}>
            {`${option.name} ${option.lastname}`}
          </option>
        ))}
      </select>

      <label>Padre</label>
      <select
        name="parent"
        value={formData.parent?.id || ""}
        onChange={(e) => handleParentChange(parseInt(e.target.value))}
        required
      >
        <option value="" disabled>
          Seleccione...
        </option>
        {parentOptions?.map((option) => (
          <option key={option.id} value={option.id}>
            {`${option.name} ${option.lastname}`}
          </option>
        ))}
      </select>

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
};
