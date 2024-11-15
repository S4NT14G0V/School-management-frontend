import React, { useState, useEffect } from "react";
import { Table, Select, Button, DatePicker, message } from "antd";
import {
  getAttendancesByClassAndDate,
  createAttendance,
} from "../../services/attendance";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const AttendanceForm = ({ classId, notification, closeModal, isModalOpen }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [attendancesForDate, setAttendancesForDate] = useState([]);
  const [date, setDate] = useState("");
  const [idClass, setIdClass] = useState(classId);

  const handleDateChange = (date, dateString) => {
    // Convertir la fecha seleccionada a la zona horaria de Colombia (UTC-5)
    setDate(dateString);
    setAttendance({}); // Reinicia la asistencia al cambiar la fecha
  };

  useEffect(() => {
    if (idClass && date) {
      fetchAttendancesClassAndDate(idClass, date);
    }
  }, [idClass, date, isModalOpen]);

  const fetchAttendancesClassAndDate = async (id, selectedDate) => {
    try {
      const response = await getAttendancesByClassAndDate(id, selectedDate);
      const mappedAttendance = response.reduce((acc, attendanceItem) => {
        const studentId = attendanceItem.student.id;
        acc[studentId] = attendanceItem.status || "Seleccionar";
        return acc;
      }, {});
      setAttendancesForDate(response);
      setAttendance(mappedAttendance); // Cargar el estado de cada estudiante
    } catch (error) {
      console.error("Error fetching attendances: ", error);
    }
  };

  const fetchCreateAttendance = async (attendanceData) => {
    try {
      const response = await createAttendance(attendanceData);
      setAttendance({});
      setDate("");
    } catch (error) {
      console.error("Error creating attendance: ", error);
    }
  };

  const handleAttendanceChange = (studentId, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const submitAttendance = () => {
    if (!date) {
      message.error("Por favor, seleccione una fecha.");
      return;
    }

    // Convertir la fecha seleccionada a UTC-5 para almacenarla correctamente
    const formattedDate = dayjs(date).tz("America/Bogota").format("YYYY-MM-DD");
    console.log("formattedDate", formattedDate);

    const attendanceData = Object.keys(attendance).map((studentId) => ({
      student: { id: parseInt(studentId, 10) },
      classes: { id: idClass },
      date: formattedDate,
      status:
        attendance[studentId] !== "Seleccionar" ? attendance[studentId] : null,
    }));
    try {
      const result = fetchCreateAttendance(attendanceData);
      if (result) {
        notification(true);
        closeModal(); 
      }
    } catch (error) {
      console.error("Error creating attendance", error);
    }
  };

  const columns = [
    {
      title: "Estudiante",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        `${record.student.name} ${record.student.lastname}`,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          placeholder="Seleccionar estado"
          style={{ width: "200px" }}
          onChange={(value) => handleAttendanceChange(record.student.id, value)}
          value={attendance[record.student.id] || "Seleccionar"}
        >
          <Select.Option value="presente">Presente</Select.Option>
          <Select.Option value="ausente">Ausente</Select.Option>
          <Select.Option value="tarde">Tarde</Select.Option>
        </Select>
      ),
    },
  ];

  const data = attendancesForDate.length > 0 ? attendancesForDate : students;

  return (
    <>
      <DatePicker
        value={date ? dayjs(date).tz("America/Bogota") : null}
        onChange={(date, dateString) => handleDateChange(date, dateString)}
        style={{width: "50%", marginBlock:"20px"}}
      />

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.student.id}
        style={{ width: "100%"}}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
      />

      <Button
        type="primary"
        onClick={submitAttendance}
        style={{ marginTop: "20px" }}
      >
        Guardar Asistencia
      </Button>
    </>
  );
};

export default AttendanceForm;
