import React, { useEffect, useState } from "react";
import ClassesCard from "./ClassesCard";
import { useUser } from "../../context/userContext";
import "./Classes.css";
import { getMyClasses } from "../../services/ClassService";

export default function ClassesPersonal() {
  const { authToken } = useUser();
  const [data, setData] = useState([]);

  const fetchClasses = async (token) => {
    try {
      const data = await getMyClasses(token);
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
    if (authToken) {
      fetchClasses(authToken);
    }
  }, [authToken]);

  return (
    <div className="classes-card-list">
      {data.map((item) => (
        <ClassesCard key={item.key} data={item} />
      ))}
    </div>
  );
}
