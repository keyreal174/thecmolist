import React, { Fragment, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import "./sharemodule.css";

function InviteModal(props) {
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [name2, setName2] = useState("");
  const [email2, setEmail2] = useState("");
  const [name3, setName3] = useState("");
  const [email3, setEmail3] = useState("");
  const [personalNote, setPersonalNote] = useState("");

  let closeDialog = () => {
    let data = [];
    if (name1.length > 0 && email1.length > 0) {
      data.push({
        name: name1,
        email: email1,
      });
    }
    if (name2.length > 0 && email2.length > 0) {
      data.push({
        name: name2,
        email: email2,
      });
    }
    if (name3.length > 0 && email3.length > 0) {
      data.push({
        name: name3,
        email: email3,
      });
    }
    if (personalNote.length > 0) {
      data.push({
        note: personalNote,
      });
    }
    if (data.length > 0) {
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
            Invite other marketing leaders to your network
          </Modal.Title>
          <img
            className="invite-modal-title-img"
            src="https://d3k6hg21rt7gsh.cloudfront.net/sharing_icon.png"
            alt=""
          />
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <strong>
              Please nominate other marketing leaders that you would like to be
              part of your network.
            </strong>
            <p>
              We will{" "}
              <strong style={{ textDecoration: "underline" }}>not</strong> send
              any emails without your permission and work with you to onboard
              them to your CMOlist network.
            </p>
            <Row className="mt-3">
              <Col xs={6}>
                <Form.Control
                  className="invite-module-input"
                  type="text"
                  placeholder="First and last name"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                />
              </Col>
              <Col xs={6}>
                <Form.Control
                  className="invite-module-input"
                  type="email"
                  placeholder="Email address"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={6}>
                <Form.Control
                  className="invite-module-input"
                  type="text"
                  placeholder="First and last name"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                />
              </Col>
              <Col xs={6}>
                <Form.Control
                  className="invite-module-input"
                  type="email"
                  placeholder="Email address"
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-2 mb-2">
              <Col xs={6}>
                <Form.Control
                  className="invite-module-input"
                  type="text"
                  placeholder="First and last name"
                  value={name3}
                  onChange={(e) => setName3(e.target.value)}
                />
              </Col>
              <Col xs={6}>
                <Form.Control
                  className="invite-module-input"
                  type="email"
                  placeholder="Email address"
                  value={email3}
                  onChange={(e) => setEmail3(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-2 mb-2">
              <Col xs={12}>
                <Form.Label>Include a personal note (optional)</Form.Label>
              </Col>
              <Col xs={12}>
                <Form.Control
                  as="textarea"
                  rows="2"
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
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
              Invite
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InviteModal;
