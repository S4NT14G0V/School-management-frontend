import React from "react";
import BaseModal from "../BaseModal";
import EditAssesmentForm from "@forms/EditAssesmentForm";

const EditAssesmentModal =({
  isModalOpen,
  closeModal,
  notification,
  data,
}) => {
  return (
    <BaseModal
      title="Edit an Assessment"
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      <EditAssesmentForm
        assesmentData={data}
        closeModal={closeModal}
        notification={notification}
      />
    </BaseModal>
  );
}

export default React.memo(EditAssesmentModal);
