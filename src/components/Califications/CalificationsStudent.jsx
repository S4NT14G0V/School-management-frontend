import React, { useState, useEffect } from "react";
import { Table, Input, Divider } from "antd";
import { getCalificationsByEmail } from "../../services/califications";
import { useUser } from "../../context/userContext";
import "./CalificationsEdit.css";

export default function CalificationsStudent() {
  const [dataSource, setDataSource] = useState({});
  const { authToken } = useUser();

  // Fetch califications data
  const fetchCalificationsStudent = async () => {
    try {
      const califications = await getCalificationsByEmail(authToken);
      return califications;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  // Group data by subject
  const transformData = (califications) => {
    const groupedData = {};

    califications.forEach((studentCalif) => {
      const subjectName =
        studentCalif.assesment?.classes?.subject?.name || "Sin materia";
      const description =
        studentCalif.assesment?.description || "Sin descripción";
      const percent = studentCalif.assesment?.percent || 0;
      const calification = studentCalif.calification || 0;

      if (!groupedData[subjectName]) {
        groupedData[subjectName] = [];
      }

      groupedData[subjectName].push({
        key: studentCalif.id,
        description,
        percent,
        calification,
      });
    });

    return groupedData;
  };

  // Fetch data and group by subject
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchCalificationsStudent();
        if (userData && userData.length > 0) {
          const groupedData = transformData(userData);
          setDataSource(groupedData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    if (authToken) {
      loadData();
    }
  }, [authToken]);

  // Columns configuration
  const columns = [
    { title: "Descripción", dataIndex: "description", key: "description" },
    {
      title: "Porcentaje",
      dataIndex: "percent",
      key: "percent",
      render: (text) => (
        <span style={{ textAlign: "center", display: "block" }}>{text}%</span>
      ),
    },
    {
      title: "Calificación",
      dataIndex: "calification",
      key: "calification",
      render: (_, record) => (
        <span style={{ textAlign: "center", display: "block" }}>
          {record.calification}
        </span>
      ),
    },
  ];

  return (
    <div style={{ width: "85%", height: "100%", overflowY: "auto", paddingInline:"20px" }}>
      {Object.keys(dataSource).map((subject) => (
        <div key={subject}>
          <h2 style={{display:"block", textAlign:"start"}}>{subject}</h2>
          <Table
            bordered
            dataSource={dataSource[subject]}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
            style={{ marginBottom: "20px" }}
          />
          <Divider />
        </div>
      ))}
    </div>
  );
}
