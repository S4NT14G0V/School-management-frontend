import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Select, Button, DatePicker, notification as notification2 } from "antd";
import { getAttendancesByClassAndDate, createAttendance } from "@services/attendance";
import { MESSAGES_ERROR } from "@config/constants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function CreateAttendanceForm({ id_class, notification, closeModal }) {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [attendancesForDate, setAttendancesForDate] = useState([]);
  const [date, setDate] = useState("");
  const [idClass, setIdClass] = useState(id_class);

  const handleDateChange = useCallback((date, dateString) => {
    setDate(dateString);
    setAttendance({});
  }, []);

  useEffect(() => {
    if (idClass && date) {
      fetchAttendancesClassAndDate(idClass, date);
    }
  }, [idClass, date]);

  const fetchAttendancesClassAndDate = useCallback(async (id, selectedDate) => {
    try {
      const response = await getAttendancesByClassAndDate(id, selectedDate);
      const mappedAttendance = response.reduce((acc, attendanceItem) => {
        const studentId = attendanceItem.student.id;
        acc[studentId] = attendanceItem.status || "Seleccionar";
        return acc;
      }, {});
      setAttendancesForDate(response);
      setAttendance(mappedAttendance);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
  }, []);

  const fetchCreateAttendance = useCallback(async (attendanceData) => {
    try {
      closeModal();
      const response = await createAttendance(attendanceData);
      if (response) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.ATTENDANCE_CREATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
      setAttendance({});
      setDate("");
    } catch (error) {
      console.error(MESSAGES_ERROR.ATTENDANCE_CREATED, error);
    }
  }, [notification, closeModal]);

  const handleAttendanceChange = useCallback((studentId, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  }, []);

  const submitAttendance = useCallback(() => {
    if (!date) {
      return;
    }

    const formattedDate = dayjs(date).tz("America/Bogota").format("YYYY-MM-DD");
    console.log("formattedDate", formattedDate);

    const attendanceData = Object.keys(attendance).map((studentId) => ({
      student: { id: parseInt(studentId, 10) },
      classes: { id: idClass },
      date: formattedDate,
      status: attendance[studentId] !== "Seleccionar" ? attendance[studentId] : null,
    }));

    fetchCreateAttendance(attendanceData);
  }, [date, attendance, idClass, fetchCreateAttendance]);

  const columns = useMemo(() => [
    {
      title: "Estudiante",
      dataIndex: "name",
      key: "name",
      render: (text, record) => `${record.student.name} ${record.student.lastname}`,
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
  ], [attendance, handleAttendanceChange]);

  const data = useMemo(() => (attendancesForDate.length > 0 ? attendancesForDate : students), [attendancesForDate, students]);

  return (
    <>
      <DatePicker
        value={date ? dayjs(date).tz("America/Bogota") : null}
        onChange={handleDateChange}
        style={{ width: "50%", marginBlock: "20px" }}
      />

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.student.id}
        style={{ width: "100%" }}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
      />

      <Button
        type="primary"
        onClick={submitAttendance}
        style={{ marginTop: "20px",backgroundColor: "#11538C"  }}
      >
        Guardar Asistencia
      </Button>
    </>
  );
}
