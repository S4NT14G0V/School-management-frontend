import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import DeleteUserForm from "@forms/DeleteUserForm";

const DeleteUserModal = ({
  isModalOpen,
  closeModal,
  notification,
  email,
}) => {
  return (
    <BaseModal
      title="Eliminación de Usuario"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <DeleteUserForm
        email={email}
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(DeleteUserModal);