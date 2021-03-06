import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Container,
  Form,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { cdn } from "../../../util/constants";
import "./AddPeronModal.scss";

function AddPersonModal({ onSubmit, show, handleClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const person = {
      name,
      link,
      avatar:
        "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
    };
  };

  const handleCancel = () => {
    handleClose();
  };
  return (
    <>
      <Modal
        className="modal add-person-modal"
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton as="h4">
          <Modal.Title className="modal-title">New Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form id="form-add-person-modal">
              <Row>
                <Col md="12">
                  <div>
                    <div className="person-section">
                      <label htmlFor="person">
                        Please enter the person's full name:
                      </label>
                      <Form.Control
                        as="input"
                        className="modal-person-section-input"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        value={name}
                      />
                    </div>
                    <div className="person-section">
                      <label htmlFor="role">Person's Linked URL:</label>
                      <Form.Control
                        as="input"
                        className="modal-person-section-input"
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://linkedin/.com/in/linkedinID"
                        value={link}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button
                className="btn__homepage-blue modal-ok-button"
                variant="primary"
                form="form-add-person-modal"
                onClick={handleSubmit}
              >
                Create
              </Button>
              <Button
                className="btn-white modal-cancel-button"
                variant="outline-primary"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapState = (state) => {
  return {
    profileStats: state.profileModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProfileStats: dispatch.profileModel.getProfileStats,
    getSuggestions: dispatch.suggestionsModel.getSuggestions,
    getTopicSuggestions: dispatch.suggestionsModel.getTopicSuggestions,
  };
};

export default connect(mapState, mapDispatch)(AddPersonModal);
