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

  const transformData = (data) => {
    return data.map((item) => {
      const transformedItem = {
        key: item.student.id,
        name: item.student.name,
      };
  
      if (item.califications && Array.isArray(item.califications)) {
        item.califications.forEach((c) => {
          transformedItem[c.assesment.description] = c.calification;
        });
      }
  
      return transformedItem;
    });
  };
  
  const revertDataTransformation = (data) => {
    const transformedData = [];
  
    data.forEach((item) => {
      console.log(item); // Verifica el objeto del estudiante en cada iteración
  
      // Asegúrate de que item tiene las propiedades esperadas antes de continuar
      if (item.key && item.name) {
        Object.keys(item)
          .filter((key) => key !== "key" && key !== "name") // Filtra "key" y "name"
          .forEach((assessmentDesc) => {
            const calification = item[assessmentDesc];
            if (calification !== undefined) {
              const assesmentId = item[`${assessmentDesc}_id`] || 0; // Asegúrate de tener el id del assesment
              transformedData.push({
                student: {
                  id: item.key, // Id del estudiante
                  name: item.name, // Nombre del estudiante
                },
                calification: calification || 0, // La calificación
                assesment: {
                  id: assesmentId, // El id de la evaluación
                  description: assessmentDesc, // Descripción del assessment
                },
                state: false, // Estado por defecto
              });
            }
          });
      }
    });
  
    console.log(transformedData); // Verifica los datos transformados
    return transformedData;
  };
  
  
  
  
  const handleFieldChange = (e, key, field) => {
    const value = e.target.value;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
  
    if (index > -1) {
      newData[index] = { ...newData[index], [field]: Number(value) };
      setDataSource(newData);
  
      const updatedCalifications = revertDataTransformation(newData);
      setEditData(updatedCalifications);
    }
  };
  

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar datos de los usuarios y assessments
        const usersData = await fetchUsersTable(id);
        const assessments = await fetchAssesments(id);

        // Transformar y setear data inicial
        if (usersData && usersData.length > 0 && Array.isArray(assessments)) {
          const transformedData = transformData(usersData);
          setDataSource(transformedData);

          // Configurar las columnas de la tabla
          const tableColumns = [
            { title: "Nombre", dataIndex: "name", key: "name" },
            ...assessments.map((assessment, index) => ({
              title: `${assessment.description} - ${assessment.percent}%`,
              dataIndex: assessment.description,
              key: `${assessment.description}-${index}`, // Usa description + index para asegurar una clave única
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

  // Actualizar setEditData cada vez que dataSource cambie
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
