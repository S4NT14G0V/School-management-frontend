import React from "react";
import EditForm from "../../Forms/EditClassesForm"; // Asegúrate de que esté correctamente importado
import BaseModal from "../BaseModal"; // Asegúrate de que esté correctamente importado

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
