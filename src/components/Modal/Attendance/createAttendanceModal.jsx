import React from "react";
import { Modal} from "antd";
import AttendanceForm from "../../Attendance/AttendanceForm";

export default function CreateAttendanceModal({ isModalOpen, closeModal, notification, classesId }) {
  return (
    <Modal
      title="Attendance"
      centered
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={500}
    >
      <AttendanceForm classId={classesId} notification={notification} closeModal={closeModal} isModalOpen={isModalOpen}/>
    </Modal>
  );
}
