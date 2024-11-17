import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import CreateSubjectForm from "../../Forms/CreateSubjectForm";

const CreateSubjectModal = ({ isModalOpen, closeModal, notification }) => {
  return (
    <BaseModal
      title="Crear una nueva Materia"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <CreateSubjectForm
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(CreateSubjectModal);