import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useUser } from "../../../context/userContext";
import { getStudents, getParents } from "../../../services/userService";
import {updateFamily} from"../../../services/family"


export default function EditModal({
  isModalOpen,
  closeModal,
  notification,
  classesData,
}) {
  const { authToken } = useUser();
  const [formData, setFormData] = useState(classesData || {});

  const [studentOptions, setStudentOptions] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);

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
      const students = await getStudents(authToken);
      setStudentOptions(students);

      const parents = await getParents(authToken);
      setParentOptions(parents);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

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
    try {
      console.log("Datos a editar:", data);
      const result = await updateFamily(authToken, data);
      if (result) {
        notification(true);
        closeModal();
      } else {
        console.error("Error actualizando la información:", result.message);
      }
    } catch (error) {
      console.error("Error actualizando la información", error);
    }
  };

  return (
    <Modal
      title="Editar Información"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
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
