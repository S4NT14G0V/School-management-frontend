import React from "react";
import BaseModal from "../BaseModal";
import SendMessageForm from "@forms/SendMessageForm";

const SendMessageModal = ({ isModalOpen, closeModal, notification, userData }) => {
  return (
    <BaseModal
      title="Send a Message to a Specific User"
      isOpen={isModalOpen}
      onClose={closeModal}
      width={500}
    >
      <SendMessageForm notification={notification} closeModal={closeModal} userData={userData}/>
    </BaseModal>
  );
}

export default React.memo(SendMessageModal);