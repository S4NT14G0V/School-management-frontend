import { useEffect } from "react";
import { Modal, Button } from "antd";
import CalificationsEditableTable from "../../Califications/CalificationsEdit";

export default function EditModal({
  isModalOpen,
  closeModal,
  notification,
  id,
  editData,
  setEditData
}) {

  const handleEdit = async () => {
    notification(true);
  };

  return (
    <Modal
      title="Editar Calificaciones de Estudiantes"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={1000}
    >
      <div className="form-group">
        <CalificationsEditableTable id={id} setEditData={setEditData} />
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
          onClick={handleEdit}
        >
          Guardar Cambios
        </Button>
      </div>
    </Modal>
  );
}
