import React from "react";
import CreateAttendanceForm from "../../Forms/CreateAttendanceForm";
import BaseModal from "../BaseModal";

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