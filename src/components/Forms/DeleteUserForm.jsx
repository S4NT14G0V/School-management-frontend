import React, { useCallback, useState } from "react";
import { Button, notification as notification2 } from "antd";
import { deleteUser } from "@services/userService"; // Asegúrate de que el servicio esté bien importado
import { MESSAGES_ERROR } from "@config/constants";
import { sendCustomMessage } from "@services/userService";

export default function DeleteUserForm({ email, closeModal, notification }) {
  const [emailReceived, setEmailReceived] = useState(email);

  const handleDelete = useCallback(
    async (email) => {
      try {
        closeModal(); // Cierra el modal después de procesar
        const result = await deleteUser(email); // Espera el resultado
        const resultMessage = await sendCustomMessage(
          email,
          "%CONFIG:{\"borderColor\":\"#E4080A\"}%Eliminación de Cuenta",
          "¡Tu cuenta ha sido Eliminada! Por favor contacta con un administrador si piensas que se trata de un error"
        ); // Envía un mensaje al usuario

        if (result && resultMessage) {
          notification(true); // Muestra notificación de éxito
        } else {
          notification2.error({
            message: MESSAGES_ERROR.TITLE,
            description: MESSAGES_ERROR.USER_DELETED,
            placement: "bottom",
            showProgress: true,
            style: { backgroundColor: "#ffd9d9" },
            pauseOnHover: false,
          });
        }
      } catch (error) {
        console.error(MESSAGES_ERROR.USER_DELETED, error);
      }
    },
    [closeModal, notification]
  );

  return (
    <div>
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
          onClick={() => handleDelete(emailReceived)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}
