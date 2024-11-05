import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useUser } from "../../../context/userContext";
import { getSubjects } from "../../../services/subjectService";
import { getGroups, getStudentsWithGroup } from "../../../services/groupService";
import { updateGroupByIds } from "../../../services/groupService";

export default function EditModal({
  isModalOpen,
  closeModal,
  notification,
  groupsData,
}) {
  const { authToken } = useUser();
  const [formData, setFormData] = useState(groupsData || {});
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      fetchOptions();
    } else {
      // Reiniciar formData cuando se cierra el modal
      setFormData({});
    }
  }, [isModalOpen]);

  const fetchOptions = async () => {
    try {
      const groups = await getGroups(authToken);
      setGroupOptions(groups);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    if (groupsData) {
      setFormData(groupsData);
      console.log("Datos de la clase:", groupsData);
    }
  }, [groupsData]);


  const handleGroupChange = (value) => {
    const selectedGroup = groupOptions.find((group) => group.id === value);
    setFormData((prevData) => ({ ...prevData, group: selectedGroup || {} }));
  };

  const handleEdit = async (idStudent, idGroup) => {
    try {
      const result = await updateGroupByIds(authToken, idStudent, idGroup); //CAMBIAR
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
      title="Editar Grupo de Estudiante"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <div className="form-group">
        <span style={{display:"block", fontWeight:"500", paddingBlock:"5px"}}><strong style={{textDecoration:"underline"}}>Estudiante:</strong> {formData.student?.name ? `${formData.student.name} ${formData.student.lastname}` : "Estudiante no válido"} </span>
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
          onClick={() => handleEdit(formData.student.id, formData.group.id)}
        >
          Guardar Cambios
        </Button>
      </div>
    </Modal>
  );
}
