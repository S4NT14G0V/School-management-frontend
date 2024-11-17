import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import DeleteSubjectForm from "../../Forms/DeleteSubjectForm";

const DeleteSubjectModal = ({ isModalOpen, closeModal, notification, subjectData }) => {
  return (
    <BaseModal
      title="Eliminar materia"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <DeleteSubjectForm
        subjectData={subjectData}
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(DeleteSubjectModal);