import React, { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker } from "antd";
import { createAssesment } from "../../../services/assesment";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function CreateModal({ isModalOpen, closeModal, notification, classes }) {
  const [formData, setFormData] = useState({
    classes: "", 
    percent: 0,   
    date: "", 
    limit_date: "",
    description: ""
  });

  useEffect(() => {
    if (isModalOpen) {
      // Resetea el formulario al abrir el modal
      setFormData({
        classes: "", 
        percent: 0,   
        date: "", 
        limit_date: "",
        description: ""
      });
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        classes: classes || ""
      }));
    }
  }, [classes, isModalOpen]);

  const handleCreateAssesment = async () => {
    if (!formData.classes) {
      console.error("Classes is required");
      return;
    }

    try {
      console.log("Data to send:", formData); 
      const result = await createAssesment(formData);
      if (result) {
        notification(true);
        closeModal(); 
      }
    } catch (error) {
      console.error("Error creating assessment", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, dateString, field) => {
    // Convierte la fecha seleccionada a UTC-5 (zona horaria de Colombia) antes de guardarla en formData
    const dateInColombia = date ? dayjs(date).tz("America/Bogota").format("YYYY-MM-DD") : "";
    setFormData({ ...formData, [field]: dateInColombia });
  };

  return (
    <Modal
      title="Create a New Assessment"
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
          onClick={handleCreateAssesment}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
}
