import React from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import AddSkills from "./AddSkills";
import clsx from "clsx";

const AddSkillsModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal
        className="modal vendor-category-modal"
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <div className="close-modal" onClick={handleClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </div>
        <Modal.Header as="h4">
          <Modal.Title className="vendor-category-modal">
            Share your areas of marketing expertise with your peers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <AddSkills submitAfter={() => handleClose()} />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="btn__homepage-blue modal-ok-button"
            variant="primary"
            type="submit"
            form="form-add-skills"
          >
            Add Topics
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSkillsModal;
