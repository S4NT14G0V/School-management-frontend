import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button, notification as notification2 } from "antd";
import { getGroups } from "@services/groupService";
import { updateGroupByIds } from "@services/groupService";
import { MESSAGES_ERROR } from "@config/constants";

export default function EditGroupStudentForm({
  groupsData,
  notification,
  closeModal,
}) {
  const [formData, setFormData] = useState(groupsData || {});
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    setFormData(groupsData || {});
  }, [groupsData]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const groups = await getGroups();
      setGroupOptions(groups);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
  };

  const handleGroupChange = (value) => {
    const selectedGroup = groupOptions.find((group) => group.id === value);
    setFormData((prevData) => ({ ...prevData, group: selectedGroup || {} }));
  };

  const handleEdit = async (idStudent, idGroup) => {
    if (formData.group?.id === groupsData.group?.id) {
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
      const result = await updateGroupByIds(idStudent, idGroup);
      if (result) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.STUDENT_GROUP_UPDATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.STUDENT_GROUP_UPDATED, error);
    }
  };

  const studentName = () => {
    return formData.student?.name
      ? `${formData.student.name} ${formData.student.lastname}`
      : "Estudiante no válido";
  };

  return (
    <div className="form-group">
      <span
        style={{ display: "block", fontWeight: "500", paddingBlock: "5px" }}
      >
        <strong style={{ textDecoration: "underline" }}>Estudiante:</strong>{" "}
        {studentName()}
      </span>
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
          onClick={() => handleEdit(formData.student.id, formData.group.id)} 
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
