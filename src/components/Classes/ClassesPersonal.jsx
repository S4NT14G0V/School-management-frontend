import React, { useEffect, useState } from "react";
import ClassesCard from "./ClassesCard";
import "./Classes.css";
import { getMyClasses } from "../../services/ClassService";
import { Divider } from "antd"; // Importa el componente Divider de Ant Design

export default function ClassesPersonal() {
  const [data, setData] = useState([]);

  const fetchClasses = async () => {
    try {
      const data = await getMyClasses();
      const usersWithKeys = data.map((clase) => ({
        ...clase,
        key: clase.id, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
    } catch (error) {
      console.log("Error fetching user data: " + error.message);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Agrupa las clases por grupo
  const groupedClasses = data.reduce((acc, clase) => {
    const groupKey = `${clase.group.grade}-${clase.group.variant}`;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(clase);
    return acc;
  }, {});

  return (
    <div className="classes-card-list">
      {Object.entries(groupedClasses).map(([groupKey, classes]) => (
        <div
          key={groupKey}
          style={{
            width: "100%",
            height: "fit-content",
            padding: "5%",
          }}
        >
          <div className="classes-group-divider">
            <h2
              className="classes-group-divider-title"
            >{`Grupo: ${groupKey}`}</h2>
            <Divider style={{ width: "100%", margin: "0", minWidth: "0" }} />
          </div>
          <div className="group-classes">
            {classes.map((item) => (
              <ClassesCard key={item.key} data={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
