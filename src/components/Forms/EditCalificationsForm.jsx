import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Input, Button, notification as notification2 } from "antd";
import { getAssesmentsByClass } from "../../services/assesment";
import { useUser } from "../../context/userContext";
import { getCalificationsByClass, createCalifications } from "../../services/califications";
import { MESSAGES_ERROR } from "../../config/constants";

export default function EditCalificationsForm({
  id,
  notification,
  closeModal,
}) {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [searchText, setSearchText] = useState(""); // Estado para el filtro de búsqueda
  const { assesmentData } = useUser();
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);

  const fetchUpdateCalificationsClass = useCallback(async () => {
    try {
      closeModal();
      const response = await createCalifications(data);
      if (response) {
        notification(true);
      } else {
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.CALIFICATIONS_UPDATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.CALIFICATIONS_UPDATED, error);
    }
  },[]);

  const fetchUsersTable = useCallback(async () => {
    try {
      const users = await getCalificationsByClass(id);
      return users;
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
      return [];
    }
  }, [id]);

  const transformData = useCallback((students, assessments) => {
    const studentMap = {};
    students.forEach((studentCalif) => {
      const studentId = studentCalif.student.id;
      const assessmentId = studentCalif.assesment
        ? studentCalif.assesment.id
        : null;

      if (!studentMap[studentId]) {
        studentMap[studentId] = {
          key: studentId,
          name: studentCalif.student.name,
          lastname: studentCalif.student.lastname, // Agregar apellido al registro
        };
      }

      if (assessmentId) {
        studentMap[studentId][assessmentId] =
          studentCalif.calification !== undefined
            ? studentCalif.calification
            : "";
      }
    });

    const transformedData = Object.values(studentMap);

    transformedData.forEach((student) => {
      assessments.forEach((assessment) => {
        if (!student.hasOwnProperty(assessment.id)) {
          student[assessment.id] = ""; // Calificación vacía para las evaluaciones nuevas
        }
      });
    });

    return transformedData;
  }, []);

  const revertDataTransformation = useCallback((data) => {
    const transformedData = [];
    data.forEach((item) => {
      Object.keys(item)
        .filter((key) => !["key", "name", "lastname"].includes(key))
        .forEach((assessmentId) => {
          const calification = item[assessmentId];

          transformedData.push({
            student: {
              id: item.key,
              name: item.name,
              lastname: item.lastname,
            },
            calification:
              calification !== undefined ? Number(calification) : 0.0,
            assesment: {
              id: assessmentId,
            },
            state: false,
          });
        });
    });

    return transformedData;
  }, []);

  const handleFieldChange = useCallback((e, key, assessmentId) => {
    const value = Math.max(0, Math.min(5, e.target.value)); // Limitar el valor entre 0 y 5
    setDataSource((prevData) => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => item.key === key);

      if (index > -1) {
        newData[index] = {
          ...newData[index],
          [assessmentId]: value === "" ? 0.0 : Number(value),
        };
        const updatedCalifications = revertDataTransformation(newData);
        setData(updatedCalifications);
      }
      return newData;
    });
  }, [revertDataTransformation]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsersTable();
        if (update){
          setUpdate(false);
        }
        const assessments = assesmentData || {};

        if (usersData && usersData.length > 0 && Array.isArray(assessments)) {
          const transformedData = transformData(usersData, assessments);
          setDataSource(transformedData);

          const tableColumns = [
            { title: "Nombre", dataIndex: "name", key: "name" },
            { title: "Apellido", dataIndex: "lastname", key: "lastname" }, // Nueva columna para el apellido
            ...assessments.map((assessment) => ({
              title: `${assessment.description} - ${assessment.percent}%`,
              dataIndex: assessment.id, // Identificador único para evitar colisiones
              key: assessment.id, // Clave única
              render: (_, record) => (
                <Input
                  type="number"
                  min={0}
                  max={5}
                  value={record[assessment.id]}
                  style={{ maxWidth: "50px", minWidth: "50px" }}
                  onChange={
                    (e) => handleFieldChange(e, record.key, assessment.id) // Usar assessment.id como clave única
                  }
                />
              ),
            })),
          ];

          setColumns(tableColumns);
        }
      } catch (error) {
        console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, assesmentData, update, fetchUsersTable, transformData, handleFieldChange]);

  useEffect(() => {
    const dataReverse = revertDataTransformation(dataSource);
    setData(dataReverse);
  }, [dataSource, revertDataTransformation]);

  const filteredData = useMemo(() => dataSource.filter(
    (item) =>
      `${item.name} ${item.lastname}`
        .toLowerCase()
        .includes(searchText.toLowerCase()) // Filtrar por nombre y apellido
  ), [dataSource, searchText]);

  return (
    <div
      className="form-group"
      style={{
        width: "100%",
        height: "500px",
        overflowX: "auto",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Buscar por nombre o apellido"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "10px", width: "200px" }}
        />
        <button
          style={{
            width: "100px",
            fontSize: "14px",
            height: "32px",
            display: "grid",
            placeContent: "center",
          }}
          onClick={() => setUpdate(true)}
        >
          Refresh
        </button>
      </div>
      <Table
        bordered
        dataSource={filteredData} // Usa los datos filtrados
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
        style={{ minWidth: "100%", minHeight: "fit-content", marginBlock: "20px", flex:1 }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "40px",
        }}
      >
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancelar
        </Button>
        <Button
          key="submit"
          style={{ backgroundColor: "#2f1b41", color: "white" }}
          onClick={() => fetchUpdateCalificationsClass()}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
