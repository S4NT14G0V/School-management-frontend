import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Input, DatePicker, Button } from "antd";
import { notification as notification2 } from "antd";
import { createAssesment } from "../../services/assesment";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { MESSAGES_ERROR } from "../../config/constants";

dayjs.extend(utc);
dayjs.extend(timezone);

const initialFormData = {
  classes: "",
  percent: 0,
  date: "",
  limit_date: "",
  description: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return { ...initialFormData, classes: action.classes };
    default:
      return state;
  }
};

export default function CreateAssesmentForm({ closeModal, notification, classes }) {
  const [formData, dispatch] = useReducer(formReducer, {
    ...initialFormData,
    classes: classes || "",
  });

  useEffect(() => {
    dispatch({ type: "RESET_FORM", classes });
  }, [classes]);

  const handleCreateAssesment = useCallback(async () => {
    if (!formData.classes) {
      return;
    }
    try {
      closeModal();
      setTimeout(() => {
        dispatch({ type: "RESET_FORM", classes });
      }, 200);
      const response = await createAssesment(formData);
      if (response && response.status === 200) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.ASSESMENT_CREATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.ASSESMENT_CREATED, error);
    }
  }, [formData, closeModal, notification, classes]);
  

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FORM_DATA", field: name, value });
  }, []);

  const handleDateChange = useCallback((date, dateString, field) => {
    const dateInColombia = date ? dayjs(date).tz("America/Bogota").format("YYYY-MM-DD") : "";
    dispatch({ type: "SET_FORM_DATA", field, value: dateInColombia });
  }, []);

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

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancel
        </Button>
        <Button key="submit" type="primary" onClick={handleCreateAssesment}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
