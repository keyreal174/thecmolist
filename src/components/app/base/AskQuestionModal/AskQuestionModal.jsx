import React, { useState } from "react";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import "./askQuestionModal.css";

import CompanyIcon from "../icons/company.svg";
import PersonIcon from "../icons/person2.svg";
import PhotoIcon from "../icons/image.svg";
import VideoIcon from "../icons/video.svg";

function AskQuestionModal(props) {
  const [showPersonSection, setShowPersonSection] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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
                    <img
                      alt="person icon"
                      className="modal-section-body-image"
                      src={PersonIcon}
                    />
                    <Button
                      className="modal-section-body-content"
                      onClick={() => setShowPersonSection(true)}
                      size="sm"
                      variant="link"
                    >
                      @Person
                    </Button>
                  </li>
                  <li>
                    <img
                      alt="company icon"
                      className="modal-section-body-image"
                      src={CompanyIcon}
                    />
                    <Button
                      className="modal-section-body-content"
                      onClick={() => setShowPersonSection(true)}
                      size="sm"
                      variant="link"
                    >
                      @Vendor
                    </Button>
                  </li>
                  <li>
                    <img
                      alt="photograph icon"
                      className="modal-section-body-image"
                      src={PhotoIcon}
                    />
                    <Button
                      className="modal-section-body-content"
                      onClick={() => setShowPhoto(true)}
                      variant="link"
                      size="sm"
                    >
                      Photo
                    </Button>
                  </li>
                  <li>
                    <img
                      alt="video icon"
                      className="modal-section-body-image"
                      src={VideoIcon}
                    />
                    <Button
                      className="modal-section-body-content"
                      onClick={() => setShowVideo(true)}
                      variant="link"
                      size="sm"
                    >
                      Video
                    </Button>
                  </li>
                </ul>
              </Col>
              <Col md="12">
                <div
                  className={`modal-image-wrapper ${showPhoto ? "" : "hidden"}`}
                >
                  <img src="#" alt="" />
                  Photo
                </div>
                <div
                  className={`modal-video-wrapper ${showVideo ? "" : "hidden"}`}
                >
                  <img src="#" alt="" />
                  Video
                </div>
              </Col>
              <Col md="12">
                <div
                  className={`modal-person ${
                    showPersonSection ? "" : "hidden"
                  }`}
                >
                  <div className="modal-person-section">
                    <label htmlFor="person">Person</label>
                    <input
                      className="modal-person-section-input"
                      type="text"
                      name="person"
                    />
                  </div>
                  <div className="modal-person-section-role">
                    <label htmlFor="role">Role</label>
                    <input
                      className="modal-person-section-input"
                      type="text"
                      name="role"
                    />
                  </div>
                  <div className="modal-person-section-actions">
                    <Button
                      className="btn-white modal-cancel-button"
                      onClick={() => setShowPersonSection(false)}
                      size="sm"
                      variant="outline-primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn-white modal-cancel-button"
                      onClick={() => setShowPersonSection(false)}
                      size="sm"
                      style={{ marginLeft: "10px" }}
                      variant="outline-primary"
                    >
                      Add Person
                    </Button>
                  </div>
                </div>
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
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={props.handleClose}
            size="sm"
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
