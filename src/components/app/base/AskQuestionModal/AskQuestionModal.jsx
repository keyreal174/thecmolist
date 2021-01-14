import React from "react";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import "./askQuestionModal.css";

function AskQuestionModal(props) {
  return (
    <>
      <Modal
        className="modal"
        show={props.show}
        onHide={props.handleClose}
        size="lg"
      >
        <Modal.Header closeButton as="h4">
          <Modal.Title className="modal-title">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="modal-section-title">Share this post with</div>
                <div>
                  <label className="modal-section-radio">
                    <input
                      className="modal-section-radio-content"
                      type="radio"
                      name="members"
                      id="members"
                    />
                    All CMOlist members
                  </label>
                </div>
                <div>
                  <label className="modal-section-radio">
                    <input
                      className="modal-section-radio-content"
                      type="radio"
                      name="members"
                      id="onlyNetwork"
                    />
                    Only my networks
                  </label>
                </div>
                <div>
                  <label className="modal-section-checkbox">
                    <input
                      className="modal-section-checkbox-content"
                      type="checkbox"
                      name="myPeers"
                      id="myPeers"
                    />
                    My Peers
                  </label>
                  <label className="modal-section-checkbox">
                    <input
                      className="modal-section-checkbox-content"
                      type="checkbox"
                      name="pagerDutyMarketing"
                      id="pagerDutyMarketing"
                    />
                    PagerDuty-Makerting
                  </label>
                  <label className="modal-section-checkbox">
                    <input
                      className="modal-section-checkbox-content"
                      type="checkbox"
                      name="dropbox"
                      id="dropbox"
                    />
                    Dropbox
                  </label>
                  <label className="modal-section-checkbox">
                    <input
                      className="modal-section-checkbox-content"
                      type="checkbox"
                      name="signalFireMarketing"
                      id="signalFireMarketing"
                    />
                    SignalFire-Marketing
                  </label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="modal-section-separator" md="12">
                <div className="modal-section-title">Title</div>
                <input
                  className="modal-section-title-content"
                  type="text"
                  placeholder="Be specific and imagine you’re asking a question to another person"
                />
              </Col>
              <Col md="10">
                <div className="modal-section-title">Body</div>
                <textarea
                  className="modal-section-body-left-content"
                  type="text"
                  placeholder="Include all the information, @people and @vendors someone would need to answer your question"
                />
              </Col>
              <Col md="2">
                <ul className="modal-section-body-right-content">
                  <li>
                    <img className="modal-section-body-image" />
                    <Button
                      className="modal-section-body-content"
                      variant="link"
                      size="sm"
                    >
                      @Person
                    </Button>
                  </li>
                  <li>
                    <img className="modal-section-body-image" />
                    <Button
                      className="modal-section-body-content"
                      variant="link"
                      size="sm"
                    >
                      @Vendor
                    </Button>
                  </li>
                  <li>
                    <img className="modal-section-body-image" />
                    <Button
                      className="modal-section-body-content"
                      variant="link"
                      size="sm"
                    >
                      Photo
                    </Button>
                  </li>
                  <li>
                    <img className="modal-section-body-image" />
                    <Button
                      className="modal-section-body-content"
                      variant="link"
                      size="sm"
                    >
                      Video
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="modal-section-title">#Topics</div>
                <input
                  className="modal-section-title-content"
                  type="text"
                  placeholder="Choose one or more #topics or #locations that describe what your question is about"
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white"
            variant="outline-primary"
            onClick={props.handleClose}
            size="sm"
            style={{
              borderWidth: "1px",
              fontSize: ".875rem",
              padding: ".25rem .5rem",
            }}
          >
            {props.firstButtonText}
          </Button>
          <Button
            className="btn__homepage-blue"
            variant="primary"
            onClick={props.handleClose}
            size="sm"
          >
            {props.secondButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AskQuestionModal;
