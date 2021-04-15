import React, { Fragment, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import "./sharemodule.css";

function InviteModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  let closeDialog = () => {
    let data = {
      name,
      email,
      message,
      linkedIn,
    };

    if (Object.keys(data).length > 0) {
      props.onSuccess(data);
    } else {
      props.onHide();
    }
  };
  return (
    <>
      <Modal
        dialogClassName="invite-module-modal"
        show={props.show}
        backdrop="static"
        keyboard={false}
        onHide={props.onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Invite a marketing leader to join you CMOlist peer network
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <p>
              Build your <strong>trusted peer network</strong> by inviting and
              connecting only with marketing peers that{" "}
              <strong>you know</strong> and whose{" "}
              <strong>advice you trust</strong>
            </p>
            <Row className="mt-3">
              <Col className="invite-modal--input" xs={12}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="invite-module-input"
                  type="text"
                  placeholder="First name, Last name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col className="invite-modal--input" xs={12}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="invite-module-input"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col className="invite-modal--input" xs={12}>
                <Form.Label>Linkedin URL</Form.Label>
                <Form.Control
                  className="invite-module-input"
                  type="text"
                  placeholder="https://linkedin.com/linkedinID"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </Col>
              <Col xs={12}>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="E.g., We know each other from..."
                  rows="2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Col>
            </Row>
          </Fragment>
          <Modal.Footer>
            <Button
              className="btn-white modal-secondary-button"
              onClick={() => props.onHide()}
              variant="outline-primary"
            >
              Cancel
            </Button>
            <Button
              className="btn-white modal-primary-button"
              onClick={() => closeDialog()}
              variant="outline-primary"
            >
              Send invitation
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InviteModal;
