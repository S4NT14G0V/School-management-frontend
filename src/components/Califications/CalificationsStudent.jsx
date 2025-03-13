import { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Divider } from "antd";
import {
  getCalificationsSummaryByEmail,
  getCalificationsByEmail,
  downloadCalifications,
} from "@services/califications";
import { validateTeachersAdmins } from "@services/userService";

import "./CalificationsEdit.css";

export default function CalificationsStudent() {
  const [subjects, setSubjects] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(false);

  const rowColors = useMemo(() => ["#0058ca67", "#72b0ff99"], []);

  const [validUser, setValidUser] = useState(false);

  const validate = async () => {
    try {
      const valid = await validateTeachersAdmins();
      if (valid) {
        setValidUser(true);
      } else {
        throw new Error("User not valid.");
      }
    } catch (error) {
      //console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    validate();
  }, []);

  const download = async () => {
    try {
      if (validUser) {
        downloadCalifications();
      }
    } catch (error) {
      //console.error("Error fetching data:", error);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [subjectsData, assessmentsData] = await Promise.all([
        getCalificationsSummaryByEmail(),
        getCalificationsByEmail(),
      ]);

      setSubjects(
        subjectsData.map((item) => ({
          studentId: item.student.id,
          subjects: item.subjects.map((sub) => ({
            subject: sub.subject,
            average: sub.average,
          })),
        }))
      );

      setAssessments(
        assessmentsData.reduce((acc, calification) => {
          const studentId = calification.student.id;
          const studentInfo = calification.student;

          const assessment = {
            subjectName: calification.assesment.classes.subject.name,
            description: calification.assesment.description,
            percent: calification.assesment.percent,
            calification: calification.calification,
            group: `${calification.assesment.classes.group.grade}-${calification.assesment.classes.group.variant}`,
          };

          const studentIndex = acc.findIndex(
            (item) => item.studentId === studentId
          );
          if (studentIndex === -1) {
            acc.push({ studentId, studentInfo, assessments: [assessment] });
          } else {
            acc[studentIndex].assessments.push(assessment);
          }

          return acc;
        }, [])
      );
    } catch (error) {
      //console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const summaryColumns = [
    { title: "Materia", dataIndex: "subject", key: "subject", width: "70%" },
    {
      title: "Promedio General",
      dataIndex: "average",
      key: "average",
      render: (text) => (text !== undefined ? text.toFixed(2) : "0.00"),
      width: "30%",
    },
  ];

  const assessmentColumns = [
    {
      title: "Tarea",
      dataIndex: "description",
      key: "description",
      width: "70%",
    },
    {
      title: "Porcentaje",
      dataIndex: "percent",
      key: "percent",
      width: "15%",
      render: (text) => `${text}%`,
    },
    {
      title: "Calificación",
      dataIndex: "calification",
      key: "calification",
      width: "15%",
    },
  ];

  const showStudentInfo = assessments.length >= 2;

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
        {validUser && (
          <button
            style={{
              width: "fit-content",
              paddingInline: "20px",
              fontSize: "0.8rem",
            }}
            onClick={() => download()}
          >
            Download
          </button>
        )}
        <button
          onClick={fetchData}
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
      <div
        style={{
          width: "85%",
          height: "100%",
          overflowY: "auto",
          paddingInline: "0",
        }}
      >
        {assessments.map(({ studentId, studentInfo, assessments }) => (
          <div key={studentId} style={{ padding: "2rem" }}>
            {showStudentInfo && (
              <Divider
                orientation="left"
                style={{
                  fontSize: "18px",
                  position: "relative",
                  paddingLeft: "1rem",
                }}
              >
                <span
                  style={{
                    marginLeft: "1rem",
                    fontSize: "14px",
                    backgroundColor: "#0058ca",
                    cursor: "default",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    position: "absolute",
                    left: 0,
                  }}
                >
                  {assessments[0]?.group}
                </span>
                {`${studentInfo.name.charAt(0).toUpperCase()}${studentInfo.name
                  .slice(1)
                  .toLowerCase()} 
                  ${studentInfo.lastname
                    .split(" ")
                    .map(
                      (name) =>
                        name.charAt(0).toUpperCase() +
                        name.slice(1).toLowerCase()
                    )
                    .join(" ")}`}
              </Divider>
            )}
            <Table
              bordered
              dataSource={
                subjects.find((s) => s.studentId === studentId)?.subjects || []
              }
              columns={summaryColumns}
              loading={loading}
              pagination={false}
              rowKey="subject"
              expandable={{
                expandedRowRender: (record) => {
                  const subjectAssessments = assessments.filter(
                    (assessment) => assessment.subjectName === record.subject
                  );
                  return (
                    <Table
                      bordered
                      dataSource={subjectAssessments}
                      columns={assessmentColumns}
                      pagination={false}
                      rowKey="description"
                      style={{ width: "100%" }}
                    />
                  );
                },
              }}
              rowClassName={(_, index) => `subject-row-${index % 2}`}
              style={{ width: "100%" }}
            />
          </div>
        ))}
      </div>
      <style>
        {`
          .ant-table-thead > tr > th {
            background-color: #11538C !important;
            color: white !important;
            border-radius: 0 !important;
          }
          .subject-row-0 {
            background-color: ${rowColors[0]} !important;
          }
          .subject-row-1 {
            background-color: ${rowColors[1]} !important;
          }
          .ant-table-tbody > tr:hover > td {
            background-color: inherit !important;
          }
        `}
      </style>
    </>
  );
}