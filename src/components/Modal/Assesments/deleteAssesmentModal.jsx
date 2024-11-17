import React from "react";
import BaseModal from "../BaseModal";
import DeleteAssesmentForm from "../../Forms/DeleteAssesmentForm";

const DeleteAssesmentModal = ({
  isModalOpen,
  closeModal,
  notification,
  data = {},
}) => {
  return (
    <BaseModal
      title="Delete an Assessment"
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      <DeleteAssesmentForm
        assesment={data}
        closeModal={closeModal}
        notification={notification}
      />
    </BaseModal>
  );
}

export default React.memo(DeleteAssesmentModal);