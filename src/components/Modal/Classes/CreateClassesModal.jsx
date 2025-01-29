import React from "react";
import BaseModal from "../BaseModal";
import CreateClassesForm from "@forms/CreateClassesForm";

const CreateClassesModal = ({ isModalOpen, closeModal, notification }) => {
  return (
    <BaseModal
      title="Attendance List of Students"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={400}
    >
      <CreateClassesForm closeModal={closeModal} notification={notification} />
    </BaseModal>
  );
}

export default React.memo(CreateClassesModal);