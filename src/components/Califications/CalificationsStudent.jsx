import React, { useState, useEffect, useRef } from "react";
import { Table, Divider } from "antd";
import { getCalificationsByEmail } from "../../services/califications";
import { useUser } from "../../context/userContext";
import "./CalificationsEdit.css";

export default function CalificationsStudent() {
  const [dataSource, setDataSource] = useState({});
  const { authToken } = useUser();
  const [pressedButton, setPressedButton] = useState(false);

  // Use ref to avoid calling on initial render
  const isInitialRender = useRef(true);

  // Fetch califications data
  const fetchCalificationsStudent = async () => {
    try {
      const califications = await getCalificationsByEmail(authToken);
      return califications;
    } catch (error) {
      console.error("Error fetching califications:", error);
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
        studentCalif.assesment?.description || "No tienes calificaciones";
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
      if (authToken) {
        try {
          const userData = await fetchCalificationsStudent();
          if (userData && userData.length > 0) {
            const groupedData = transformData(userData);
            setDataSource(groupedData);
          }
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
    };

    // Make the call when the component mounts (only once)
    if (isInitialRender.current && authToken) {
      loadData();
      isInitialRender.current = false;  // Prevent subsequent calls on re-renders
    }

    // Only trigger a new API call if pressedButton is true
    if (pressedButton && authToken) {
      loadData();
      setPressedButton(false);  // Reset pressedButton after the call
    }
  }, [authToken, pressedButton]); // Only depend on authToken and pressedButton

  // Calculate total percentage and weighted average
  const calculateTotals = (data) => {
    const totalPercent = data.reduce((sum, item) => sum + item.percent, 0);
    const weightedSum = data.reduce(
      (sum, item) => sum + item.calification * (item.percent / 100),
      0
    );
    const weightedEval = (weightedSum / totalPercent) * 100;
    const weightedAverage = totalPercent > 0 ? weightedEval : 0;
    const total = `${totalPercent}`;

    return { total, weightedAverage };
  };

  // Columns configuration
  const columns = [
    { title: "Descripción", dataIndex: "description", key: "description" },
    {
      title: "Porcentaje",
      dataIndex: "percent",
      key: "percent",
      render: (text, record) => (
        <span
          style={{
            textAlign: "center",
            display: "block",
            fontWeight: String(record.key).includes("total")
              ? "bold"
              : "normal", // Convierte record.key a string antes de usar includes
          }}
        >
          {text}%
        </span>
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "1rem",
          width: "100%",
          paddingInline: "7.5%",
        }}
      >
        <button
          onClick={() => setPressedButton(true)}
          style={{
            width: "80px",
            height: "30px",
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
      <div
        style={{
          width: "85%",
          height: "100%",
          overflowY: "auto",
          paddingInline: "20px",
        }}
      >
        {Object.keys(dataSource).map((subject) => {
          const subjectData = dataSource[subject];
          const { total, weightedAverage } = calculateTotals(subjectData);

          // Add a row for total and weighted average
          const dataWithTotal = [
            ...subjectData,
            {
              key: `${subject}-total`,
              description: <strong>Total</strong>, // Aseguramos que 'Total' esté en strong
              percent: <strong>{total}</strong>, // Mantener el total en negrita
              calification: <strong>{weightedAverage.toFixed(2)}</strong>, // Calificación en negrita
            },
          ];

          return (
            <div key={subject}>
              <h2 style={{ display: "block", textAlign: "start" }}>
                {subject}
              </h2>
              <Table
                bordered
                dataSource={dataWithTotal}
                columns={columns}
                rowClassName="editable-row"
                pagination={false}
                style={{ marginBottom: "20px" }}
              />
              <Divider />
            </div>
          );
        })}
      </div>
    </>
  );
}
