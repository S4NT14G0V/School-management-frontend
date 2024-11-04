import React, {useState} from "react";
import { Modal, Button } from "antd"; // Asegúrate de que tienes Ant Design instalado
import { useUser } from "../../../context/userContext"; // Importa el contexto de usuario
import { createSubject } from "../../../services/subjectService"; // Importa tu servicio de eliminación

export default function CreateModal({ isModalOpen, closeModal, notification }) {
  const { authToken } = useUser(); // Obtén el token de autenticación del contexto
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    picture: '',
  });

  const handleCreateSubject = async (subject) => {
    try {
      const result = await createSubject(authToken, subject); // Espera el resultado
      if (result) {
        console.log("materia creado con éxito");
        notification(true); // Marcar para mostrar notificación
        setFormData({
            name: '',
            description: '',
            picture: '',
          });
      } else {
        console.error("Error creandoffffffffffffff la materia:", result.message);
      }
      closeModal(); // Cerrar el modal después de procesar
    } catch (error) {
      console.error("Error creandoggggggggggggggs la materia", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Modal
        title="Crear una nueva Materia"
        centered
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={400}
      >
        <div className="form-group" style={{ border: "none", marginTop: "5px" }}>
          <div style={{ padding: "10px" }} />
          <label>Nombre de la Materia</label>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label>Descripción de la Materia</label>
          <input
            type="text"
            placeholder="Descripción"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label>Link de la Imágen</label>
          <input
            type="text"
            placeholder="Imágen"
            name="picture"
            value={formData.picture}
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
            Cancelar
          </Button>
          <Button
            key="submit"
            style={{ backgroundColor: "#2f1b41", color: "white" }}
            onClick={() => handleCreateSubject(formData)}
          >
            Guardar Cambios
          </Button>
        </div>
      </Modal>
    </div>
  );
}
