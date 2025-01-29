import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table } from "antd";
import { getCalificationsSummaryByEmail, getCalificationsByEmail } from "@services/califications";
import "./CalificationsEdit.css";

export default function CalificationsStudent() {
  const [subjects, setSubjects] = useState([]); // Estado para almacenar solo los subjects
  const [assessments, setAssessments] = useState({}); // Para las calificaciones de las tareas por materia
  const [loading, setLoading] = useState(false);

  const rowColors = ["#0058ca67", "#72b0ff99"];

  // Obtener los datos del backend
  const fetchSubjectsSummary = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCalificationsSummaryByEmail();
      // Extraer solo los subjects y aplanar el array
      const extractedSubjects = data.map((student) => student.subjects).flat();
      setSubjects(extractedSubjects);
    } catch (error) {
      console.error("Error fetching subjects summary:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAssessmentsBySubject = useCallback(async () => {
    try {
      const data = await getCalificationsByEmail();
      const calificationsAssesments = data.map((calification) => ({
        subjectName: calification.assesment.classes.subject.name,
        description: calification.assesment.description,
        percent: calification.assesment.percent,
        calification: calification.calification,
      }));
      // Group assessments by subject name
      const groupedAssessments = calificationsAssesments.reduce((acc, assessment) => {
        if (!acc[assessment.subjectName]) {
          acc[assessment.subjectName] = [];
        }
        acc[assessment.subjectName].push(assessment);
        return acc;
      }, {});
      setAssessments(groupedAssessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar los datos iniciales
  useEffect(() => {
    fetchSubjectsSummary();
    fetchAssessmentsBySubject();
  }, [fetchSubjectsSummary, fetchAssessmentsBySubject]);

  // Columnas para la tabla de promedios generales
  const summaryColumns = useMemo(() => [
    { title: "Materia", dataIndex: "subject", key: "subject", width: "70%" },
    {
      title: "Promedio General",
      dataIndex: "average",
      key: "average",
      render: (text) => (text !== undefined ? text.toFixed(2) : "0.00"),
      width: "30%",
    },
  ], []);

  // Columnas para la tabla de calificaciones de tareas
  const assessmentColumns = useMemo(() => [
    { title: "Tarea", dataIndex: "description", key: "description", width: "70%" },
    { title: "Porcentaje", dataIndex: "percent", key: "percent", width: "15%", render: (text) => `${text}%` },
    { title: "Calificación", dataIndex: "calification", key: "calification", width: "15%" },
  ], []);

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
          onClick={fetchSubjectsSummary}
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
          paddingInline: "0",
        }}
      >
        <Table
          bordered
          dataSource={subjects}
          columns={summaryColumns}
          loading={loading}
          pagination={false}
          rowKey="subject" // Usamos "subject" como clave única
          expandable={{
            expandedRowRender: (record) => {
              const subjectAssessments = assessments[record.subject] || [];
              return (
                <Table
                  bordered
                  dataSource={subjectAssessments}
                  columns={assessmentColumns}
                  pagination={false}
                  rowKey="description" // Clave única para cada fila en la tabla de tareas
                  style={{ width: "100%" }}
                />
              );
            }
          }}
          rowClassName={(record, index) => `subject-row-${index % 2}`}
          style={{ width: "100%" }}
        />
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