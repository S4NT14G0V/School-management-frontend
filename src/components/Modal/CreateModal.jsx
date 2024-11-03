import React from "react";
import { Modal, Button } from "antd"; // Asegúrate de que tienes Ant Design instalado
import { useUser } from "../../context/userContext"; // Importa el contexto de usuario
import { createSubject } from "../../services/subjectService"; // Importa tu servicio de eliminación

export default function CreateModal({ isModalOpen, closeModal, notification }) {
  const { authToken } = useUser(); // Obtén el token de autenticación del contexto

  const handleCreateSubject = async (token, subject) => {
    try {
      const result = await createSubject(token, subject); // Espera el resultado
      if (result.success) {
        console.log("Usuario creado con éxito");
        notification(true); // Marcar para mostrar notificación
      } else {
        console.error("Error creando la materia:", result.message);
      }
      closeModal(); // Cerrar el modal después de procesar
    } catch (error) {
      console.error("Error creando la materia", error);
    }
  };

  return (
    <div>
      <Modal
        title="Crear Materia"
        centered
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={400}
      >
        <div className="form-group">
          <label>Rol</label>
          <select
            name="rol"
            required
          >
            <option value="" disabled>
              Seleccione...
            </option>
            <option key="test" value="test">
              Test
            </option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            key="back"
            onClick={closeModal}
            style={{ marginRight: "10px" }}
          >
            Cancelar
          </Button>
          <Button
            key="submit"
            style={{ backgroundColor: "#2f1b41", color: "white" }}
          >
            Guardar Cambios
          </Button>
        </div>
      </Modal>
    </div>
  );
}
