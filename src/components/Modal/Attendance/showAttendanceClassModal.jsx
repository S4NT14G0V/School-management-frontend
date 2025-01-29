import React, { useEffect } from "react";
import BaseModal from "../BaseModal";
import AttendanceList from "@forms/ShowAttendanceForm";

const ShowAttendanceClassModal = ({
  isModalOpen,
  closeModal,
  classesId,
}) => {

  return (
    <BaseModal
      title="Attendance List of Students"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={500}
    >
      {/* Pasamos el contenido dinámico del modal */}
      <AttendanceList id_class={classesId} />
    </BaseModal>
  );
}

export default React.memo(ShowAttendanceClassModal);