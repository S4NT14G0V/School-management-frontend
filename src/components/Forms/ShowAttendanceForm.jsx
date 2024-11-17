import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Tag, DatePicker, message } from "antd";
import { getAttendancesByClass } from "../../services/attendance";
import { MESSAGES_ERROR } from "../../config/constants";

const { RangePicker } = DatePicker;

export default function ShowAttendanceForm({ id_class }) {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendances = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAttendancesByClass(id_class);
      const formattedData = response.map((item) => ({
        key: item.id,
        studentName: `${item.student.name} ${item.student.lastname}`,
        status: item.status,
        date: item.date,
      }));
      setAttendances(formattedData);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    } finally {
      setLoading(false);
    }
  }, [id_class]);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  const handleDateFilter = useCallback(
    async (dates) => {
      if (!dates || dates.length === 0) {
        fetchAttendances();
        return;
      }

      const [startDate, endDate] = dates;
      try {
        setLoading(true);
        const response = await getAttendancesByClass(id_class);
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
        console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
      } finally {
        setLoading(false);
      }
    },
    [fetchAttendances, id_class]
  );

  const columns = useMemo(
    () => [
      {
        title: "Estudiante",
        dataIndex: "studentName",
        key: "studentName",
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
      },
    ],
    []
  );

  return (
    <div className="form-group">
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RangePicker onChange={handleDateFilter} />
        <button
          style={{
            width: "100px",
            fontSize: "14px",
            height: "32px",
            display: "grid",
            placeContent: "center",
          }}
          onClick={fetchAttendances}
        >
          Refresh
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={attendances}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
