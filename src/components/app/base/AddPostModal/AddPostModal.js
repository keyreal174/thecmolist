import React, { useState } from "react";
import { Button, Container, Form, Modal, Row, Col } from "react-bootstrap";
import "./addPostModal.css";

function AddPostModal(props) {
  const cdnBaseUrl = "https://d3k6hg21rt7gsh.cloudfront.net/icons/";
  const [showPersonSection, setShowPersonSection] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [allMembers, setAllMembers] = useState(false);
  const [onlyMyNetwork, setOnlyMyNetwork] = useState(true);
  const groups = {
    "My Peers": true,
    "PagerDuty-Makerting": true,
    Dropbox: false,
    "SignalFire-Marketing": false,
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topics, setTopics] = useState("");
  const [person, setPerson] = useState("");
  const [role, setRole] = useState("");
  const submit = () => {
    // handle props submit and send to service
    debugger;
    props.handleClose();
  };
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
                    {Object.keys(groups).map((groupKey) => {
                      return (
                        <Form.Check
                          className="modal-section-checkbox-content"
                          disabled={allMembers}
                          name={groupKey}
                          label={groupKey}
                          type="checkbox"
                          defaultChecked={groups[groupKey]}
                        />
                      );
                    })}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="modal-section-separator" md="12">
                  <div className="modal-section-title">Title</div>
                  <Form.Control
                    as="input"
                    className="modal-section-title-content"
                    placeholder="Be specific and imagine you’re asking a question to another person"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Col>
                <Col md="10">
                  <div className="modal-section-title">Body</div>
                  <Form.Control
                    as="textarea"
                    className="modal-section-body-left-content"
                    placeholder="Include all the information, @people and @vendors someone would need to answer your question"
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                  />
                </Col>
                <Col md="2">
                  <ul className="modal-section-body-right-content">
                    <li>
                      <img
                        alt="person icon"
                        className="modal-section-body-image"
                        src={cdnBaseUrl + "person.png"}
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
                        src={cdnBaseUrl + "company.png"}
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
                        src={cdnBaseUrl + "image.png"}
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
                        src={cdnBaseUrl + "video.png"}
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
                      <Form.Control
                        as="input"
                        className="modal-person-section-input"
                        onChange={(person) => setPerson(person)}
                        value={person}
                      />
                    </div>
                    <div className="modal-person-section-role">
                      <label htmlFor="role">Role</label>
                      <Form.Control
                        as="input"
                        className="modal-person-section-input"
                        onChange={(role) => setRole(role)}
                        value={role}
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
                  <Form.Control
                    as="input"
                    className="modal-section-title-content"
                    placeholder="Choose one or more #topics or #locations that describe what your question is about"
                    onChange={(e) => setTopics(e.target.value)}
                    value={topics}
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
            onClick={() => submit()}
          >
            {props.secondButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPostModal;
