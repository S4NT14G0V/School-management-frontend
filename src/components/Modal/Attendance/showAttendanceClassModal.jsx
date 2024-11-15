import React from "react";
import { Modal} from "antd";
import AttendanceList from "../../Attendance/AttendanceList";

export default function ShowAttendanceClassModal({ isModalOpen, closeModal, classesId }) {
  return (
    <Modal
      title="Attendance List of the Students"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={500}
    >
      <AttendanceList classId={classesId} closeModal={closeModal} isModalOpen={isModalOpen}/>
    </Modal>
  );
}
