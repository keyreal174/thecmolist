import React, { Fragment, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Close from "../icons/close.svg";
import "./sharemodule.scss";

function InviteModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [collection, setCollection] = useState("");

  let closeDialog = () => {
    let data = {
      name,
      email,
      message,
      collection,
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
        <Modal.Header className="align-items-center">
          <Modal.Title>Invite other marketing leaders</Modal.Title>
          <img
            src={Close}
            alt="close"
            className="cursor-pointer"
            onClick={() => props.onHide()}
          />
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <p className="modal-description">
              Invite other <strong>trusted</strong> marketing leaders to learn
              from their <strong>stacks</strong>, grow your marketing{" "}
              <strong>knowledge network</strong>, and{" "}
              <strong>unlock new capabilities</strong>.
            </p>
            <form id="invite-modal" onSubmit={closeDialog}>
              <Row>
                <Col className="invite-modal--input" xs={6}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="invite-module-input"
                    type="text"
                    placeholder="First name, Last name"
                    value={name}
                    required={true}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                <Col className="invite-modal--input" xs={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="invite-module-input"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Please join me on CMOlist, a new professional network that enables marketing leaders to support each others by sharing proven marketing stacks, best practies, and new insights."
                    rows="3"
                    value={message}
                    required={true}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>Collections</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Collections"
                    rows="1"
                    value={collection}
                    required={true}
                    onChange={(e) => setCollection(e.target.value)}
                  />
                </Col>
              </Row>
            </form>
          </Fragment>
        </Modal.Body>
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
            variant="outline-primary"
            form="invite-modal"
            type="submit"
          >
            Send invitation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InviteModal;
