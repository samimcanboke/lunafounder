import React from "react";
import { Modal as AntModal } from "antd";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AntModal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
