import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import EditSubjectForm from "@forms/EditSubjectForm"; // Importa el contenido del modal

const EditSubjectModal = ({ isModalOpen, closeModal, notification, subjectData }) => {
  return (
    <BaseModal
      title="Editar materia"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <EditSubjectForm
        subjectData={subjectData}
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(EditSubjectModal);