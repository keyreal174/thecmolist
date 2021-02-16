import React, { Fragment, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import "./feed.css";

function NewUserModal(props) {
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [name2, setName2] = useState("");
  const [email2, setEmail2] = useState("");
  const [name3, setName3] = useState("");
  const [email3, setEmail3] = useState("");
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
    if (data.length > 0) {
      props.onSuccess(data);
    } else {
      props.onHide();
    }
  };
  return (
    <>
      <Modal
        dialogClassName="nux-modal"
        show={props.show}
        backdrop="static"
        keyboard={false}
        onHide={props.onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome to CMOlist - Getting started</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <Form.Label>
              Support your vendors and share your expertise with other marketing
              leaders
            </Form.Label>
            <Row className="mt-2">
              <Col xs={1} md={1}>
                <img
                  className="add-post-img"
                  src="https://d3k6hg21rt7gsh.cloudfront.net/agency_icon.png"
                  alt=""
                />
              </Col>
              <Col xs={8} md={8}>
                Share your 3 favorite agencies
              </Col>
              <Col xs={3} md={3}>
                <a
                  href="/profile#addagency"
                  className="btn__homepage btn__homepage-blue btn__nux_share"
                >
                  Share agencies
                </a>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={1} md={1}>
                <img
                  className="add-post-img"
                  src="https://d3k6hg21rt7gsh.cloudfront.net/tech_icon.png"
                  alt=""
                />
              </Col>
              <Col xs={8} md={8}>
                Share your 3 favorite marketing technologies
              </Col>
              <Col xs={3} md={3}>
                <a
                  href="/profile#addtechnology"
                  className="btn__homepage btn__homepage-blue btn__nux_share"
                >
                  Share technologies
                </a>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={1} md={1}>
                <img
                  className="add-post-img"
                  src="https://d3k6hg21rt7gsh.cloudfront.net/sharing_icon.png"
                  alt=""
                />
              </Col>
              <Col xs={8} md={8}>
                Nominate 3 other marketing executives that could benefit from
                CMOlist
              </Col>
              <Col xs={3} md={3}>
                <a
                  href="/#"
                  className="btn__homepage btn__homepage-blue btn__nux_share"
                  onClick={() => closeDialog()}
                >
                  Invite
                </a>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={6} md={6}>
                <Form.Control
                  className="nux-modal-input"
                  type="text"
                  placeholder="First and last name"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                />
              </Col>
              <Col xs={6} md={6}>
                <Form.Control
                  className="nux-modal-input"
                  type="email"
                  placeholder="Email address"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={6} md={6}>
                <Form.Control
                  className="nux-modal-input"
                  type="text"
                  placeholder="First and last name"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                />
              </Col>
              <Col xs={6} md={6}>
                <Form.Control
                  className="nux-modal-input"
                  type="email"
                  placeholder="Email address"
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-2 mb-2">
              <Col xs={6} md={6}>
                <Form.Control
                  className="nux-modal-input"
                  type="text"
                  placeholder="First and last name"
                  value={name3}
                  onChange={(e) => setName3(e.target.value)}
                />
              </Col>
              <Col xs={6} md={6}>
                <Form.Control
                  className="nux-modal-input"
                  type="email"
                  placeholder="Email address"
                  value={email3}
                  onChange={(e) => setEmail3(e.target.value)}
                />
              </Col>
            </Row>
          </Fragment>
          <Modal.Footer>
            <Button
              className="btn-white modal-primary-button"
              onClick={() => closeDialog()}
              variant="outline-primary"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewUserModal;
