import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import { getAssesmentsByClass } from "../../services/assesment";
import { useUser } from "../../context/userContext";
import "./CalificationsEdit.css";
import { getCalificationsByClass } from "../../services/califications";

const EditableTable = ({ id, setEditData }) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const { authToken } = useUser();

  const fetchAssesments = async (id) => {
    try {
      const assessments = await getAssesmentsByClass(authToken, id);
      return assessments;
    } catch (error) {
      console.error("Error fetching assessments:", error);
      return [];
    }
  };

  const fetchUsersTable = async (id) => {
    try {
      const users = await getCalificationsByClass(authToken, id);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const transformData = (students, assessments) => {
    const studentMap = {};
    students.forEach((studentCalif) => {
      const studentId = studentCalif.student.id;
      const assessmentId = studentCalif.assesment ? studentCalif.assesment.id : null;
      const assessmentDesc = studentCalif.assesment ? studentCalif.assesment.description : '';

      if (!studentMap[studentId]) {
        studentMap[studentId] = {
          key: studentId,
          name: studentCalif.student.name,
        };
      }

      studentMap[studentId][assessmentDesc] = studentCalif.calification !== undefined ? studentCalif.calification : "";
      studentMap[studentId][`${assessmentDesc}_id`] = assessmentId;
    });

    const transformedData = Object.values(studentMap);

    transformedData.forEach((student) => {
      assessments.forEach((assessment) => {
        if (!student.hasOwnProperty(assessment.description)) {
          student[assessment.description] = "";  // Asignar vacío para calificaciones nuevas
          student[`${assessment.description}_id`] = assessment.id;
        }
      });
    });

    return transformedData;
  };

  const revertDataTransformation = (data) => {
    const transformedData = [];
    data.forEach((item) => {
      Object.keys(item)
        .filter((key) => !["key", "name"].includes(key) && !key.endsWith("_id"))
        .forEach((assessmentDesc) => {
          const calification = item[assessmentDesc];
          const assessmentIdKey = `${assessmentDesc}_id`;
          const assesmentId = item[assessmentIdKey] || null;

          transformedData.push({
            student: {
              id: item.key,
              name: item.name,
            },
            calification: calification !== undefined ? Number(calification) : 0.0,
            assesment: {
              id: assesmentId,
              description: assessmentDesc,
            },
            state: false,
          });
        });
    });

    return transformedData;
  };

  const handleFieldChange = (e, key, field) => {
    const value = e.target.value;
    setDataSource((prevData) => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => item.key === key);

      if (index > -1) {
        newData[index] = { ...newData[index], [field]: value === "" ? 0.0 : Number(value) };
        const updatedCalifications = revertDataTransformation(newData);
        setEditData(updatedCalifications);
      }

      return newData;
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsersTable(id);
        const assessments = await fetchAssesments(id);

        if (usersData && usersData.length > 0 && Array.isArray(assessments)) {
          const transformedData = transformData(usersData, assessments);
          setDataSource(transformedData);

          const tableColumns = [
            { title: "Nombre", dataIndex: "name", key: "name" },
            ...assessments.map((assessment, index) => ({
              title: `${assessment.description} - ${assessment.percent}%`,
              dataIndex: assessment.description,
              key: `${assessment.description}-${index}`,
              render: (_, record) => (
                <Input
                  type="number"
                  value={record[assessment.description]}
                  style={{ maxWidth: "50px", minWidth: "50px" }}
                  onChange={(e) =>
                    handleFieldChange(e, record.key, assessment.description)
                  }
                />
              ),
            })),
          ];
          setColumns(tableColumns);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    const dataReverse = revertDataTransformation(dataSource);
    setEditData(dataReverse);
  }, [dataSource]);

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        overflowX: "auto",
        overflowY: "auto",
      }}
    >
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
        style={{ minWidth: "1000px" }}
      />
    </div>
  );
};

export default EditableTable;
