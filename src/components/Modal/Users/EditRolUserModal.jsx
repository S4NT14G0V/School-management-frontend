import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import EditRolUserForm from "../../Forms/EditRolUserForm"; // Importa el contenido del modal

const EditRolUserModal = ({ isModalOpen, closeModal, notification, email }) => {
  return (
    <BaseModal
      title="Editar Rol"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <EditRolUserForm
        email={email}
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(EditRolUserModal);