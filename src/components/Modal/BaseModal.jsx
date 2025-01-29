import React from "react";
import { Modal } from "antd";

const BaseModal = ({
  title = "Default Title",
  isOpen,
  onClose,
  children,
  footer = null, // Soporte para un pie de modal dinámico
  width = 400,
}) => {
  return (
    <Modal
      title={title}
      centered
      open={isOpen}
      onCancel={onClose}
      footer={footer}
      width={width}
    >
      {children}
    </Modal>
  );
}

export default React.memo(BaseModal);