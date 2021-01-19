import React, { useState, useEffect } from "react";
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
import "./addPostModal.css";

function AddPostModal({
  content,
  firstButtonText,
  getContent,
  handleClose,
  modalTitle,
  secondButtonText,
  shareContent,
  show,
}) {
  const cdnBaseUrl = "https://d3k6hg21rt7gsh.cloudfront.net/icons/";
  const [allMembers, setAllMembers] = useState(false);
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState(content);
  const [onlyMyNetwork, setOnlyMyNetwork] = useState(true);
  const [person, setPerson] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("");
  const [showPersonSection, setShowPersonSection] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState("");

  const handleSubmit = async (e) => {
    const content = {
      allMembers,
      onlyMyNetwork,
      groups,
      title,
      body,
      topics,
      person,
      photo,
      role,
    };

    setError(null);
    e.preventDefault();

    try {
      await shareContent(content);
      handleClose();
      cleanFields();
    } catch (error) {
      setError(error);
    }
  };

  const getGroupsObject = (groups) => {
    let aux = {};

    if (groups && groups.length > 0) {
      groups.forEach(({ name, checked }) => {
        aux[name] = checked;
      });
    }

    return aux;
  };

  const cleanFields = () => {
    setGroups(getGroupsObject(content.groups));
    setTitle("");
    setBody("");
    setTopics("");
    setPerson("");
    setPhoto("");
    setRole("");
    setAllMembers(false);
    setOnlyMyNetwork(true);
    setShowPersonSection(false);
    setShowPhoto(false);
    setShowVideo(false);
  };

  const handleCancel = () => {
    handleClose();
    setError(null);
    cleanFields();
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await getContent();
      } catch (err) {
        setError(err);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (content && content.groups && content.groups.length > 0) {
      const { groups: actualGroups } = content;
      setGroups(getGroupsObject(actualGroups));
    }
  }, [content]);

  const handlePhotoClick = () => {
    const file = document.getElementById("file");

    file.click();
  };

  const handleFileChange = (e) => {
    const preview = document.getElementById("preview");
    const files = e.target.files;

    setPhoto(files[0]);

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      const imageType = /image.*/;

      if (!file.type.match(imageType)) {
        continue;
      }
      const div = document.createElement("div");
      const img = document.createElement("img");
      const divId = Math.ceil(Math.random() * 50);
      const deleteButton = document.createElement("button");

      deleteButton.textContent = "X";
      deleteButton.onSubmit = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const div = document.getElementById(divId);
        div.style.display = "none";
      };

      img.classList.add("modal-image-preview");
      img.file = file;
      div.id = divId;
      deleteButton.classList.add("modal-close-preview-button");

      div.appendChild(deleteButton);
      div.appendChild(img);
      preview.appendChild(div);

      const reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      })(img);
      reader.readAsDataURL(file);
      setShowPhoto(true);
    }
  };
  return (
    <>
      <Modal className="modal" show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton as="h4">
          <Modal.Title className="modal-title">{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
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
                <Col>
                  <div className="modal-section-title">
                    Share this post with
                  </div>
                  <Form.Check
                    className="modal-section-radio-content"
                    name="members"
                    id="allCMOlist"
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
                    id="onlyMyNetwork"
                    label="Only my networks"
                    type="radio"
                    checked={onlyMyNetwork}
                    onClick={() => {
                      setOnlyMyNetwork(true);
                      setAllMembers(false);
                    }}
                  />
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    {Object.keys(groups).map((groupKey, index) => {
                      return (
                        <Form.Check
                          className="modal-section-checkbox-content"
                          defaultChecked={groups[groupKey]}
                          disabled={allMembers}
                          id={groupKey}
                          key={index}
                          label={groupKey}
                          name={groupKey}
                          onChange={(e) => {
                            setGroups({
                              ...groups,
                              [groupKey]: e.target.checked,
                            });
                          }}
                          type="checkbox"
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
                    id="title"
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
                    id="body"
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
                        onClick={() => handlePhotoClick()}
                        variant="link"
                        size="sm"
                      >
                        Photo
                      </Button>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
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
                    <div id="preview" />
                  </div>
                  <div
                    className={`modal-video-wrapper ${
                      showVideo ? "" : "hidden"
                    }`}
                  />
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
                        onChange={(e) => setPerson(e.target.value)}
                        value={person}
                      />
                    </div>
                    <div className="modal-person-section-role">
                      <label htmlFor="role">Role</label>
                      <Form.Control
                        as="input"
                        className="modal-person-section-input"
                        onChange={(e) => setRole(e.target.value)}
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
                    id="topics"
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
            onClick={() => handleCancel()}
          >
            {firstButtonText}
          </Button>
          <Button
            className="btn__homepage-blue"
            variant="primary"
            onClick={handleSubmit}
          >
            {secondButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapState = (state) => {
  return {
    content: state.contentModel.content,
  };
};

const mapDispatch = (dispatch) => {
  return {
    shareContent: dispatch.contentModel.shareContent,
    getContent: dispatch.contentModel.getContent,
  };
};

export default connect(mapState, mapDispatch)(AddPostModal);