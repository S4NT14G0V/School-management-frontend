import React, { useState, useEffect } from "react";
import { Table, Tag, DatePicker, message } from "antd";
import { getMyAttendances } from "../../services/attendance";

const { RangePicker } = DatePicker;

const AttendanceTable = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Formato de fecha usando API nativa


  // Columnas para la tabla
  const columns = [
    {
      title: "Estudiante",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
        title: "Class",
        dataIndex: "class",
        key: "class ",
      },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "presente" ? "green" : "red"}>
          {status ? status.toUpperCase() : ""}
        </Tag>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date) => date, // Formatea la fecha
    },
  ];

  useEffect(() => {
    fetchAttendances();
  }, []);

  // Cargar asistencias desde el backend
  const fetchAttendances = async () => {
    setLoading(true);
    try {
        const response = await getMyAttendances();
        setAttendances(
          response.map((item) => ({
            key: item.id,
            class:`${item.classes.subject.name} ${item.classes.group.grade}-${item.classes.group.variant}`,
            studentName: `${item.student.name} ${item.student.lastname}`,
            status: item.status,
            date: item.date,
          }))
        );
      } catch (error) {
        console.error("Error al cargar las asistencias:", error); 
    } finally {
      setLoading(false);
    }
  };

  // Filtrar asistencias por rango de fechas
  const handleDateFilter = async (dates) => {
    if (!dates || dates.length === 0) {
      fetchAttendances();
      return;
    }
  
    const [startDate, endDate] = dates;
    console.log("Rango de fechas seleccionado:", startDate, endDate);
  
    try {
      setLoading(true);
      const response = await getAttendancesByClass(id_class);
  
      // Filtrar manualmente los datos en el frontend
      const filteredData = response.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate.toDate() && itemDate <= endDate.toDate();
      });
  
      setAttendances(
        filteredData.map((item) => ({
          key: item.id,
          studentName: `${item.student.name} ${item.student.lastname}`,
          status: item.status,
          date: item.date,
        }))
      );
    } catch (error) {
      console.error("Error al filtrar las asistencias:", error);
      message.error("No se pudieron filtrar las asistencias.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <RangePicker onChange={(dates) => handleDateFilter(dates)} />
      </div>
      <Table
        columns={columns}
        dataSource={attendances}
        loading={loading}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default AttendanceTable;
