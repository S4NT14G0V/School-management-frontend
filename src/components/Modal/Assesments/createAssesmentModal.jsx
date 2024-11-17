import React from "react";
import BaseModal from "../BaseModal";
import CreateAssesmentForm from "../../Forms/CreateAssesmentForm";

const CreateAssesmentModal = ({ isModalOpen, closeModal, notification, data }) => {
  return (
    <BaseModal
      title="Create a New Assessment"
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      <CreateAssesmentForm
        closeModal={closeModal}
        notification={notification}
        classes={data}
      />
    </BaseModal>
  );
}

export default React.memo(CreateAssesmentModal);
