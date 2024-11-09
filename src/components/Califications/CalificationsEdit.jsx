import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";

// Datos iniciales
const initialData = [
  {
    id: 1,
    student: { name: "Juan" },
    califications: [
      { assesment: { name: "Taller 1", percent: 50 }, score: 5 },
      { assesment: { name: "Examen", percent: 30 }, score: 6 },
    ],
  },
  {
    id: 2,
    student: { name: "Carlos" },
    califications: [
      { assesment: { name: "Taller 1", percent: 50 }, score: 5 },
      { assesment: { name: "Examen", percent: 30 }, score: 6 },
    ],
  },
];

// Función para transformar los datos
const transformData = (data) => {
  return data.map((item) => {
    const transformedItem = {
      key: item.id,
      name: item.student.name,
    };
    item.califications.forEach((c) => {
      transformedItem[c.assesment.name] = c.score;
    });
    return transformedItem;
  });
};

const revertDataTransformation = (data) => {
    return data.map((item) => {
      return {
        id: item.key,
        student: { name: item.name },
        califications: Object.keys(item)
          .filter((key) => key !== "key" && key !== "name")
          .map((assessment) => ({
            assesment: { name: assessment, percent: 0 }, // Ajusta el porcentaje según tus necesidades
            score: item[assessment],
          })),
      };
    });
  };

const EditableTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);

  // useEffect para transformar y preparar las columnas dinámicamente
  useEffect(() => {
    const transformedData = transformData(initialData);
    setDataSource(transformedData);

    // Definir las columnas
    const allColumns = [
      { title: 'Nombre', dataIndex: 'name', key: 'name', editable: false },
    ];

    // Agregar columnas dinámicas según las calificaciones
    const uniqueAssessments = Array.from(
      new Set(initialData.flatMap((student) => student.califications.map((c) => c.assesment.name)))
    );

    uniqueAssessments.forEach((assessment) => {
      allColumns.push({
        title: assessment,
        dataIndex: assessment,
        key: assessment,
        editable: true,
        render: (_, record) => (
          <Input
            type="number"
            value={record[assessment]}
            onChange={(e) => handleFieldChange(e, record.key, assessment)}
          />
        ),
      });
    });

    setColumns(allColumns);
  }, []);

  // Función para actualizar las calificaciones en el estado
  const handleFieldChange = (e, key, field) => {
    const value = e.target.value;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      newData[index][field] = Number(value); // Convertir a número
      setDataSource(newData);
    }
  };

  // Función para guardar los datos
  const handleSave = () => {
    const revertedData = revertDataTransformation(dataSource);
    console.log("Datos revertidos:", revertedData);
    // Aquí puedes enviar los datos al backend, por ejemplo
  };

  return (
    <div>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
      />
      <Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
        Guardar cambios
      </Button>
    </div>
  );
};

export default EditableTable;
