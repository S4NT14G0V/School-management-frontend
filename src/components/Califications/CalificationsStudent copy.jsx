import { useState, useEffect, useRef } from "react";
import { Table, Divider } from "antd";
import { getCalificationsSummaryByEmail } from "../../services/califications";
import "./CalificationsEdit.css";

export default function CalificationsStudent() {
  const [dataSource, setDataSource] = useState([]);
  const [pressedButton, setPressedButton] = useState(false);
  const isInitialRender = useRef(true);

  const fetchCalificationsStudent = async () => {
    try {
      const califications = await getCalificationsSummaryByEmail();
      return califications;
    } catch (error) {
      console.error("Error fetching califications:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchCalificationsStudent();
        if (userData && userData.length > 0) {
          setDataSource(userData);
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

  const columns = [
    { title: "Materia", dataIndex: "subject", key: "subject" },
    { title: "Promedio", dataIndex: "average", key: "average", render: (text) => text.toFixed(2) },
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
        {dataSource.map((studentData) => (
          <div key={studentData.student}>
            <Divider orientation="left" style={{ fontSize: "18px" }}>
              {studentData.student}
            </Divider>
            <Table
              bordered
              dataSource={studentData.subjects}
              columns={columns}
              pagination={false}
              style={{ marginBottom: "20px" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}