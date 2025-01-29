import React from "react";
import BaseModal from "../BaseModal";
import EditCalificationsForm from "@forms/EditCalificationsForm";

const EditCalificationsSubjectModal = ({
  isModalOpen,
  closeModal,
  notification,
  id,
}) => {
  return (
    <BaseModal
      title="Califications of Students"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={1000}
    >
      <EditCalificationsForm id={id} notification={notification} closeModal={closeModal} />
    </BaseModal>
  );
}

export default React.memo(EditCalificationsSubjectModal);
