import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import CreateGroupForm from "@forms/CreateGroupsForm";

const CreateGroupModal = ({ isModalOpen, closeModal, notification }) => {
  return (
    <BaseModal
      title="Crear un nuevo Grupo"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <CreateGroupForm notification={notification} closeModal={closeModal} />
    </BaseModal>
  );
}

export default React.memo(CreateGroupModal);