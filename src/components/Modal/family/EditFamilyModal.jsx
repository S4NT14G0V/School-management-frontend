import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import EditFamilyForm from "../../Forms/EditFamilyForm";

const EditFamilyModal = ({
  isModalOpen,
  closeModal,
  notification,
  FamilyData,
}) => {
  return (
    <BaseModal
      title="Editar Información"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <EditFamilyForm
        FamilyData={FamilyData}
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(EditFamilyModal);