import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import "./Classes.css";
import { PAGES_URLS } from "../../config/constants";

const ClassesCard = ({ data = {}}) => {
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const handleShowClass = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del botón, como recargar la página

    // Codifica el nombre de la materia en la URL
    const encodedSubjectID = encodeURIComponent(data.id);
    // Navega a la URL de la materia con el token
    navigate(`${PAGES_URLS.PUBLIC.CLASSES}/${encodedSubjectID}`);
  };

  return (
    <div className="classes-card">
      <img src={`${data.subject.picture}`} alt="" className="card-img" />
      
      <div className="classes-right-section">
        <div className="title-card">
          <h2>{data.subject.name}</h2>
        </div>
        <div className="classes-info-card">
          <p className="text-card">
            <span className="subtitle-card">Profesor:</span> {data.teacher.name}{" "}
            {data.teacher.lastname}
          </p>
          <p className="text-card">
            <span className="subtitle-card">Grupo:</span> {data.group.grade}- {data.group.variant}
          </p>
          <p className="text-card">
            <span className="subtitle-card">Horario:</span> {data.schedule}
          </p>
        </div>
        <button className="button-card" onClick={handleShowClass}>
          Mostrar Clase
        </button>
      </div>
    </div>
  );
}

export default React.memo(ClassesCard);