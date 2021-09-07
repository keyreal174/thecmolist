import React from "react";
import { Modal } from "react-bootstrap";
import AllMembersList from "./AllMembersList";
import "./AllMembersListModal.scss";

const AllMembersListModal = ({ showStatModal, onHide, statType, list }) => {
  return (
    <Modal
      className="content-detail--modal"
      show={showStatModal}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{statType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AllMembersList list={list} />
      </Modal.Body>
    </Modal>
  );
};

export default AllMembersListModal;
