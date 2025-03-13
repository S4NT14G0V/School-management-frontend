import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Tag, DatePicker } from "antd";
import { getMyAttendances } from "@services/attendance";
import { MESSAGES_ERROR } from "@config/constants";

const { RangePicker } = DatePicker;

const AttendanceTable = () => {
  const [attendances, setAttendances] = useState([]); // Datos originales
  const [filteredAttendances, setFilteredAttendances] = useState([]); // Datos filtrados
  const [loading, setLoading] = useState(true);

  // Columnas para la tabla
  const columns = useMemo(() => [
    {
      title: "Estudiante",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
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
      render: (date) => date,
    },
  ], []);

  // Cargar asistencias desde el backend
  const fetchAttendances = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getMyAttendances();
      const formattedAttendances = response.map((item) => ({
        key: item.id,
        class: `${item.classes.subject.name} ${item.classes.group.grade}-${item.classes.group.variant}`,
        studentName: `${item.student.name} ${item.student.lastname}`,
        status: item.status,
        date: item.date,
      }));
      setAttendances(formattedAttendances);
      setFilteredAttendances(formattedAttendances); // Inicialmente, las filtradas son todas
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchAttendances();
  }, []);

  // Filtrar asistencias por rango de fechas
  const handleDateFilter = useCallback((dates) => {
    if (!dates || dates.length === 0) {
      // Restaurar los datos originales si no hay fechas seleccionadas
      setFilteredAttendances(attendances);
      return;
    }
  
    const [startDate, endDate] = dates;
    const filteredData = attendances.filter((item) => {
      const itemDate = new Date(item.date);
      // Incluir las fechas de inicio y final
      return itemDate >= startDate.toDate() && itemDate <= endDate.toDate();
    });
  
    setFilteredAttendances(filteredData);
  },[]);
  
  return (
    <div>
      <div style={{ display: "flex",justifyContent: "space-between",marginBottom: "20px" }}>
        <RangePicker onChange={handleDateFilter} />
        <button
          onClick={fetchAttendances}
          style={{
            width: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          Refresh
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredAttendances} // Usar las asistencias filtradas
        loading={loading}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default AttendanceTable;
