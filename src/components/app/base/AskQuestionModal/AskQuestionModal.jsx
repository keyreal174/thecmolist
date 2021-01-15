import React, { useState } from "react";
import { Button, Container, Form, Modal, Row, Col } from "react-bootstrap";
import "./askQuestionModal.css";

import CompanyIcon from "../icons/company.svg";
import PersonIcon from "../icons/person2.svg";
import PhotoIcon from "../icons/image.svg";
import VideoIcon from "../icons/video.svg";

function AskQuestionModal(props) {
  const [showPersonSection, setShowPersonSection] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [allMembers, setAllMembers] = useState(false);
  const [onlyMyNetwork, setOnlyMyNetwork] = useState(true);
  const [myPeers, setMyPeers] = useState(true);
  const [pagerDuty, setPagerDuty] = useState(true);
  const [dropbox, setDropbox] = useState(false);
  const [signalFire, setSignalFire] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topics, setTopics] = useState("");
  const [person, setPerson] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
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
            <Form>
              <Row>
                <Col>
                  <div className="modal-section-title">
                    Share this post with
                  </div>
                  <Form.Check
                    className="modal-section-radio-content"
                    name="members"
                    label="All CMOlist members"
                    type="radio"
                    checked={allMembers}
                    onClick={() => {
                      setAllMembers(true);
                      setOnlyMyNetwork(false);
                    }}
                  />
                  <Form.Check
                    className="modal-section-radio-content"
                    name="members"
                    label="Only my networks"
                    type="radio"
                    checked={onlyMyNetwork}
                    onClick={() => {
                      setOnlyMyNetwork(true);
                      setAllMembers(false);
                    }}
                  />
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <Form.Check
                      className="modal-section-checkbox-content"
                      disabled={allMembers}
                      name="members"
                      label="My peers"
                      type="checkbox"
                      checked={myPeers}
                      onClick={() => setMyPeers(!myPeers)}
                    />
                    <Form.Check
                      className="modal-section-checkbox-content"
                      disabled={allMembers}
                      name="members"
                      label="PagerDuty-Makerting"
                      type="checkbox"
                      checked={pagerDuty}
                      onClick={() => setPagerDuty(!pagerDuty)}
                    />
                    <Form.Check
                      className="modal-section-checkbox-content"
                      disabled={allMembers}
                      name="members"
                      label="Dropbox"
                      type="checkbox"
                      checked={dropbox}
                      onClick={() => setDropbox(!dropbox)}
                    />
                    <Form.Check
                      className="modal-section-checkbox-content"
                      name="members"
                      disabled={allMembers}
                      label="SignalFire-Marketing"
                      type="checkbox"
                      checked={signalFire}
                      onClick={() => setSignalFire(!signalFire)}
                    />
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
                    className={`modal-image-wrapper ${
                      showPhoto ? "" : "hidden"
                    }`}
                  >
                    <img src="#" alt="" />
                    Photo
                  </div>
                  <div
                    className={`modal-video-wrapper ${
                      showVideo ? "" : "hidden"
                    }`}
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
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={props.handleClose}
          >
            {props.firstButtonText}
          </Button>
          <Button
            className="btn__homepage-blue"
            variant="primary"
            onClick={props.handleClose}
          >
            {props.secondButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AskQuestionModal;
