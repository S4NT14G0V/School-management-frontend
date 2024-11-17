import React from "react";
import EditCalificationsForm from "../../Forms/EditCalificationsForm";
import BaseModal from "../BaseModal";

const EditCalificationsSubjectModal = ({
  isModalOpen,
  closeModal,
  notification,
  id,
}) => {
  return (
    <BaseModal
      title="Attendance List of Students"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={1000}
    >
      <EditCalificationsForm id={id} notification={notification} closeModal={closeModal} />
    </BaseModal>
  );
}

export default React.memo(EditCalificationsSubjectModal);
