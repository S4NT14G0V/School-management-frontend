import { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker } from "antd";
import { updateAssesment } from "../../../services/assesment";
import dayjs from "dayjs";

export default function EditModal({
  isModalOpen,
  closeModal,
  notification,
  assesmentData,
}) {
  const [formData, setFormData] = useState(assesmentData || {});

  useEffect(() => {
    if (assesmentData) {
      setFormData(assesmentData);
    }
  }, [assesmentData]);

  const handleEdit = async (assesment) => {
    try {
      console.log("Assesment a editar:", assesment);
      const result = await updateAssesment(assesment);
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

  const handleDateChange = (date, dateString, field) => {
    // Convierte la fecha seleccionada a UTC-5 (zona horaria de Colombia) antes de guardarla en formData
    const dateInColombia = date ? dayjs(date).tz("America/Bogota").format("YYYY-MM-DD") : "";
    setFormData({ ...formData, [field]: dateInColombia });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <label>Percent</label>
        <Input
          type="number"
          name="percent"
          value={formData.percent}
          onChange={handleInputChange}
        />

        <label>Date</label>
        <DatePicker
          value={formData.date ? dayjs(formData.date).tz("America/Bogota") : null}
          onChange={(date, dateString) => handleDateChange(date, dateString, "date")}
        />

        <label>Limit Date</label>
        <DatePicker
          value={formData.limit_date ? dayjs(formData.limit_date).tz("America/Bogota") : null}
          onChange={(date, dateString) => handleDateChange(date, dateString, "limit_date")}
        />

        <label>Description</label>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>Cancel</Button>
        <Button
          key="submit"
          type="primary"
          onClick={() => handleEdit(formData)}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
}
