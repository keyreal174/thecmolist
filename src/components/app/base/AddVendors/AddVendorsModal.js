import React from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import AddVendors from "./AddVendors";
import clsx from "clsx";
import "./AddVendors.scss";

const AddVendorsModal = ({ show, handleClose }) => {
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
        <Modal.Body>
          <Container>
            <AddVendors submitAfter={() => handleClose()} />
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
            form="form-add-vendors"
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddVendorsModal;
