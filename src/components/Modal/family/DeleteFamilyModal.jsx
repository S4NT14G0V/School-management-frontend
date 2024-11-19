import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que BaseModal esté correctamente importado
import DeleteFamilyForm from "@forms/DeleteFamilyForm";

const DeleteFamilyModal = ({
  isModalOpen,
  closeModal,
  notification,
  FamilyData,
}) => {
  return (
    <BaseModal
      title="Eliminar Familia"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <DeleteFamilyForm
        FamilyData={FamilyData}
        notification={notification}
        closeModal={closeModal}
      />
    </BaseModal>
  );
}

export default React.memo(DeleteFamilyModal);
