import React, { useState } from "react";
import { Alert, Button, Form, Modal, Row, Col } from "react-bootstrap";
import "./addMemberModal.scss";

function AddMemberModal({
  firstButtonText = "Cancel",
  secondButtonText = "Send invitation",
  modalTitle = "Invite a marketing leader to join you CMOlist peer network",
  modalSubtitle = "Build your trusted peer network by inviting and connecting only with marketing peers that you know and whose advice you trust",
  onClose,
  onSubmit,
  show,
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    const content = {
      name,
      linkedin,
      mail,
      message,
    };
    setError(null);
    setLoading(true);
    e.preventDefault();

    try {
      await onSubmit(content);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      onClose();
      cleanFields();
    }
  };

  const cleanFields = () => {
    setName("");
    setMail("");
    setLinkedin("");
    setMessage("");
  };

  const handleCancel = () => {
    onClose();
    setError(null);
    cleanFields();
  };

  return (
    <>
      <Modal
        className="add-member-modal"
        show={show}
        onHide={onClose}
        size="lg"
      >
        <Modal.Header closeButton as="h4">
          <Modal.Title className="add-member-modal--title">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form-add-member-modal" onSubmit={handleSubmit}>
            <Row>
              {error && (
                <Alert
                  variant="danger"
                  className="mb-0 mt-2"
                  style={{ width: "100%" }}
                >
                  {error}
                </Alert>
              )}
            </Row>
            <Row>
              <Col md="11">
                <p className="add-member-modal--subtitle">{modalSubtitle}</p>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Form.Group>
                  <Form.Label className="add-member-modal--label">
                    Name
                  </Form.Label>
                  <Form.Control
                    className="add-member-modal--input"
                    id="name"
                    placeholder="First name, Last name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group>
                  <Form.Label className="add-member-modal--label">
                    Email
                  </Form.Label>
                  <Form.Control
                    className="add-member-modal--input"
                    id="mail"
                    placeholder="name@company.com"
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group>
                  <Form.Label className="add-member-modal--label">
                    LinkedIn URL
                  </Form.Label>
                  <Form.Control
                    className="add-member-modal--input"
                    id="linkedin"
                    placeholder="https://linkedin/.com/in/linkedinID"
                    onChange={(e) => setLinkedin(e.target.value)}
                    value={linkedin}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group>
                  <Form.Label className="add-member-modal--label">
                    Message (optional)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    className="add-member-modal--textarea"
                    id="textarea"
                    placeholder="E.g., We know each other from..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    required={false}
                    rows={3}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={() => handleCancel()}
            disabled={loading}
          >
            {firstButtonText}
          </Button>
          <Button
            className="btn__homepage-blue modal-ok-button"
            disabled={loading}
            variant="primary"
            type="submit"
            form="form-add-member-modal"
          >
            {secondButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMemberModal;
