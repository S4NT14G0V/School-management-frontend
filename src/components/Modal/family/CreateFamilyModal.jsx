import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import CreateFamilyForm from "@forms/CreateFamilyForm";

const CreateFamilyModal = ({ isModalOpen, closeModal, notification }) => {
  return (
    <BaseModal title="Crear relación entre Padre y Estudiante" isOpen={isModalOpen} onClose={closeModal} width={400}>
      <CreateFamilyForm
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(CreateFamilyModal);