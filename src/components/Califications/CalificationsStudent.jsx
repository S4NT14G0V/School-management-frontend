import React, { useState, useEffect, useRef } from "react";
import { Table, Divider } from "antd";
import { getCalificationsByEmail } from "../../services/califications";
import "./CalificationsEdit.css";

export default function CalificationsStudent() {
  const [dataSource, setDataSource] = useState({});
  const [pressedButton, setPressedButton] = useState(false);

  const isInitialRender = useRef(true);

  const fetchCalificationsStudent = async () => {
    try {
      const califications = await getCalificationsByEmail();
      return califications;
    } catch (error) {
      console.error("Error fetching califications:", error);
      return [];
    }
  };

  // Agrupa las calificaciones por estudiante y por materia
  const transformData = (califications) => {
    const groupedData = {};

    califications.forEach((studentCalif) => {
      const studentName = `${studentCalif.student?.name} ${studentCalif.student?.lastname}`;
      const subjectName = studentCalif.assesment?.classes?.subject?.name || "Sin materia";
      const description = studentCalif.assesment?.description || "No tienes calificaciones";
      const percent = studentCalif.assesment?.percent || 0;
      const calification = studentCalif.calification || 0;

      if (!groupedData[studentName]) {
        groupedData[studentName] = {};
      }
      if (!groupedData[studentName][subjectName]) {
        groupedData[studentName][subjectName] = [];
      }

      groupedData[studentName][subjectName].push({
        key: studentCalif.id,
        description,
        percent,
        calification,
      });
    });

    return groupedData;
  };

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

    if (isInitialRender.current) {
      loadData();
      isInitialRender.current = false;
    }

    if (pressedButton) {
      loadData();
      setPressedButton(false);
    }
  }, [pressedButton]);

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
            fontWeight: String(record.key).includes("total") ? "bold" : "normal",
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
        {Object.keys(dataSource).map((student) => (
          <div key={student}>
            <Divider orientation="left" style={{ fontSize: "18px" }}>
              {student}
            </Divider>
            {Object.keys(dataSource[student]).map((subject) => {
              const subjectData = dataSource[student][subject];
              const { total, weightedAverage } = calculateTotals(subjectData);

              const dataWithTotal = [
                ...subjectData,
                {
                  key: `${subject}-total`,
                  description: <strong>Total</strong>,
                  percent: <strong>{total}</strong>,
                  calification: <strong>{weightedAverage.toFixed(2)}</strong>,
                },
              ];

              return (
                <div key={subject}>
                  <h3 style={{ display: "block", textAlign: "start", fontWeight: "bold" }}>
                    {subject}
                  </h3>
                  <Table
                    bordered
                    dataSource={dataWithTotal}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={false}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
