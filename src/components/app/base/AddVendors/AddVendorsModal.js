import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import AddVendors from "./AddVendors";
import clsx from "clsx";
import "./AddVendors.scss";

const AddVendorsModal = ({ show, handleClose, saveVendors }) => {
  const handleSubmit = async () => {
    await saveVendors();
  };

  return (
    <>
      <Modal
        className="modal vendor-category-modal"
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton as="h4">
          <Container>
            <Row>
              <Col md={4}>Category</Col>
              <Col md={4}>My Tools</Col>
              <Col md={4}>Popular Tools</Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <AddVendors handleClose={handleClose} />
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

const mapState = (state) => {
  return {
    suggestions: state.suggestionsModel.suggestions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    saveVendors: dispatch.contentModel.saveVendors,
  };
};

export default connect(mapState, mapDispatch)(AddVendorsModal);
