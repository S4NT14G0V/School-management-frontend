import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que esté correctamente importado
import DeleteClassesForm from "@forms/DeleteClassesForm";

const DeleteClassesModal = ({
  isModalOpen,
  closeModal,
  notification,
  classesData = {},
}) => {
  return (
    <BaseModal
      title="Eliminar clase"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <DeleteClassesForm
        classesData={classesData}
        closeModal={closeModal}
        notification={notification}
      />
    </BaseModal>
  );
}

export default React.memo(DeleteClassesModal);
