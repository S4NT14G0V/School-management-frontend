import React from "react";
import { Modal, Button } from "antd"; // Asegúrate de que tienes Ant Design instalado
import { useUser } from "../../../context/userContext"; // Importa el contexto de usuario
import { deleteUser } from "../../../services/userService"; // Importa tu servicio de eliminación

export default function DeleteConfirmModal({ email, isModalOpen, closeModal, notification }) {
  const { authToken } = useUser(); // Obtén el token de autenticación del contexto

  const handleDelete = async (email) => {
    try {
      const result = await deleteUser(authToken, email); // Espera el resultado
      if (result.success) {
        console.log("Usuario eliminado con éxito");
        notification(true); // Marcar para mostrar notificación
      } else {
        console.error("Error borrando el usuario:", result.message);
      }
      closeModal(); // Cerrar el modal después de procesar
    } catch (error) {
      console.error("Error borrando el usuario", error);
    }
  };

  return (
    <Modal
      title="Eliminación de Usuario"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <hr style={{ border: "none", padding: "5px" }} />
      <p>Estás a punto de eliminar al usuario con el correo electrónico:</p>
      <p style={{ padding: "10px", paddingLeft: "15px" }}>
        <strong style={{ textDecoration: "underline" }}>{email}</strong>.
      </p>
      <hr style={{ border: "none", padding: "5px" }} />
      <p>¿Estás seguro de que deseas continuar con esta acción?</p>
      <hr style={{ border: "none", padding: "5px" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <Button key="cancel" onClick={closeModal}>
          Cancelar
        </Button>
        <Button
          key="delete"
          type="primary"
          danger
          onClick={() => handleDelete(email)}
        >
          Eliminar
        </Button>
      </div>
    </Modal>
  );
}
