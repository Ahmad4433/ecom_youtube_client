import React from "react";
import "./customModel.css";
import { Modal } from "react-bootstrap";
const CustomModel = ({ show, onClose, title, children }) => {
  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModel;
