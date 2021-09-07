import React from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import AddVendors from "./AddVendors";
import clsx from "clsx";
import "./AddVendors.scss";

const AddVendorsModal = ({ show, handleClose, categoryTitle, limit }) => {
  return (
    <>
      <Modal
        className="modal vendor-category-modal"
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <div className="close-modal" onClick={() => handleClose(false)}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </div>
        <Modal.Header as="h4">
          <Modal.Title className="vendor-category-modal">
            Share your marketing tools and agencies with your peers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <AddVendors
              categoryTitle={categoryTitle}
              limit={limit}
              submitAfter={() => handleClose(true)}
            />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button
            className="btn__homepage-blue modal-ok-button"
            variant="primary"
            type="submit"
            form="form-add-vendors"
          >
            Add Vendors
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddVendorsModal;
