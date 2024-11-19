import React from "react";
import BaseModal from "../BaseModal";
import CreateAttendanceForm from "@forms/CreateAttendanceForm";

const CreateAttendanceModal = ({ isModalOpen, closeModal, notification, classesId }) => {
  return (
    <BaseModal
      title="Create a New Attendance"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={500}
    >
      <CreateAttendanceForm id_class={classesId} notification={notification} closeModal={closeModal}/>
    </BaseModal>
  );
}

export default React.memo(CreateAttendanceModal);