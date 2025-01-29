import React from "react";
import BaseModal from "../BaseModal"; // Asegúrate de que esté correctamente importado
import EditForm from "@forms/EditClassesForm"; // Asegúrate de que esté correctamente importado

const EditClassesModal = ({ isModalOpen, closeModal, notification, classesData }) =>{
  return (
    <BaseModal
      title="Edit Class"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <EditForm
        classesData={classesData}
        closeModal={closeModal}
        notification={notification}
      />
    </BaseModal>
  );
};

export default React.memo(EditClassesModal);
