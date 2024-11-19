import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import EditGroupStudentForm from "@forms/EditGroupStudentForm";

const EditGroupStudentModal = ({ isModalOpen, closeModal, notification, groupsData }) => {
  return (
    <BaseModal
      title="Editar Grupo de Estudiante"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <EditGroupStudentForm
        groupsData={groupsData}
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(EditGroupStudentModal);