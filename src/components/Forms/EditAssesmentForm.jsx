import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Input, DatePicker, notification as notification2 } from "antd";
import { updateAssesment } from "@services/assesment";
import { MESSAGES_ERROR } from "@config/constants";
import dayjs from "dayjs";

export default function EditAssesmentForm({ assesmentData, closeModal, notification }) {
  const [formData, setFormData] = useState(assesmentData || {});

  useEffect(() => {
    if (assesmentData) {
      setFormData(assesmentData);
    }
  }, [assesmentData]);

  const handleEdit = useCallback(async () => {
    if (formData === assesmentData) {
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
      const result = await updateAssesment(formData);
      if (result) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.ASSESMENT_UPDATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.ASSESMENT_UPDATED, error);
    }
  }, [formData, closeModal, notification]);

  const handleDateChange = useCallback((date, dateString, field) => {
    const dateInColombia = date
      ? dayjs(date).tz("America/Bogota").format("YYYY-MM-DD")
      : "";
    setFormData((prevData) => ({ ...prevData, [field]: dateInColombia }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const dateValue = useMemo(() => formData.date ? dayjs(formData.date).tz("America/Bogota") : null, [formData.date]);
  const limitDateValue = useMemo(() => formData.limit_date ? dayjs(formData.limit_date).tz("America/Bogota") : null, [formData.limit_date]);

  return (
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
        value={dateValue}
        onChange={(date, dateString) => handleDateChange(date, dateString, "date")}
      />

      <label>Limit Date</label>
      <DatePicker
        value={limitDateValue}
        onChange={(date, dateString) =>
          handleDateChange(date, dateString, "limit_date")
        }
      />

      <label>Description</label>
      <Input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancel
        </Button>
        <Button key="submit" type="primary" onClick={handleEdit} style={{backgroundColor: "#11538C"  }}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
