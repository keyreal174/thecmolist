import React, { useState, useEffect, Suspense } from "react";
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
import {
  AsyncTypeahead,
  Typeahead,
  TypeaheadMenu,
} from "react-bootstrap-typeahead";
import clsx from "clsx";
import { cdn } from "../../../util/constants";
import "./addPostModal.scss";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import RichEditor from "../DraftEditor/RichEditor";

function AddPostModal({
  contentType,
  profileStats,
  getProfileStats,
  handleClose,
  onSubmit,
  show,
  activeGroup,
  suggestions,
  getSuggestions,
  getTopicSuggestions,
}) {
  // visibility related state
  const [publicVisibility, setPublicVisibility] = useState(false);
  const [peersVisibility, setPeersVisibility] = useState(false);
  const [networkVisibility, setNetworkVisibility] = useState(true);

  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [person, setPerson] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("");
  const [showPersonSection, setShowPersonSection] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [firstButtonText, setFirstButtonText] = useState("Cancel");
  const [modalTitle, setModalTitle] = useState("Ask a marketing question");
  const [titleHeading, setTitleHeading] = useState("Title");
  const [titlePlaceholder, setTitlePlaceholder] = useState(
    "Be specific and imagine you're asking a question to another person"
  );
  const [descriptionSubheading, setDescriptionSubheading] = useState("");
  const [secondButtonText, setSecondButtonText] = useState("Ask a question");
  const [isLoading, setIsLoading] = useState(false);
  const [isPersonVendor, setIsPersonVendor] = useState(false);

  // Typeahead values for #topic
  const [options, setOptions] = useState([
    { name: "#martech", type: "topic", slug: "martech" },
    { name: "#social", type: "topic", slug: "social" },
    { name: "#brand", type: "topic", slug: "brand" },
    { name: "#advertising", type: "topic", slug: "advertising" },
    {
      name: "#performancemarketing",
      type: "topic",
      slug: "performancemarketing",
    },
  ]);
  const [isTypeLoading, setIsTypeLoading] = useState(false);

  const handleSearch = async (query) => {
    setIsTypeLoading(true);
    const data = await getTopicSuggestions(query);
    const options = data.map((i, index) => ({
      id: index,
      slug: i.slug,
      name: i.name,
    }));

    setOptions(options);
    setIsTypeLoading(false);
  };

  const handleSubmit = async (e) => {
    const content = {
      contentType,
      publicVisibility,
      peersVisibility,
      networkVisibility,
      groups,
      title,
      body,
      topics,
      person,
      photo,
      role,
    };
    if (groups) {
      content.groups = groups.filter((g) => g.checked).map((g) => g.slug);
    }

    setError("");
    setIsLoading(true);
    e.preventDefault();

    try {
      await onSubmit(content);
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
      handleClose();
      cleanFields();
    }
  };

  const cleanFields = () => {
    setTitle("");
    setBody("");
    setTopics([]);
    setPerson("");
    setPhoto("");
    setRole("");
    setPublicVisibility(false);
    setPeersVisibility(false);
    setNetworkVisibility(true);
    setShowPersonSection(false);
    setShowPhoto(false);
    setShowVideo(false);
  };

  const handleCancel = () => {
    handleClose();
    setError("");
    cleanFields();
  };

  const setPreselectedGroup = (postGroups) => {
    if (activeGroup) {
      if (activeGroup === "my-network") {
        setPublicVisibility(true);
        setPeersVisibility(false);
        setNetworkVisibility(false);
        if (postGroups && postGroups.length > 0) {
          show &&
            postGroups &&
            postGroups.length > 0 &&
            setGroups(postGroups.map((g) => ({ ...g, checked: true })));
        }
      } else if (activeGroup === "my-peers") {
        setPublicVisibility(false);
        setPeersVisibility(true);
        setNetworkVisibility(false);
      } else {
        if (postGroups && postGroups.length > 0) {
          setPublicVisibility(false);
          setPeersVisibility(false);
          setNetworkVisibility(true);
          postGroups.forEach((g) => {
            if (g.slug === activeGroup) {
              g.checked = true;
            } else {
              g.checked = false;
            }
          });
          setGroups(postGroups.slice());
        }
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await getProfileStats();
      } catch (err) {
        setError(err.toString());
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (
      profileStats &&
      profileStats.profile &&
      profileStats.profile.groups &&
      profileStats.profile.groups.length > 0
    ) {
      let groupsObj = profileStats.profile.groups.map((g) => ({
        ...g,
        checked: true,
      }));
      setGroups(groupsObj);
      setPreselectedGroup(groupsObj);
    }
  }, [profileStats]);

  useEffect(() => {
    if (contentType === "question") {
      setTitleHeading("Title");
      setTitlePlaceholder(
        "Be specific and imagine you're asking a question to another person"
      );
      setModalTitle("Ask a marketing question");
      setSecondButtonText("Post Question");
    } else if (contentType === "project") {
      setTitleHeading("Title");
      setModalTitle("Share a marketing playbook or insight");
      setTitlePlaceholder(" ");
      setSecondButtonText("Post");
    } else if (contentType === "article") {
      setTitleHeading("Article URL");
      setTitlePlaceholder("http://");
      setModalTitle("Share marketing news or article");
      setSecondButtonText("Post Article");
    }
  }, [contentType]);

  useEffect(() => {
    if (show) {
      setPreselectedGroup(groups);
    }
  }, [show]);

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
      deleteButton.type = "button";
      deleteButton.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const div = document.getElementById(divId);
        div.remove();
        setShowPhoto(false);
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

  const handleClosePersonSection = () => {
    setShowPersonSection(false);
    setPerson("");
    setRole("");
  };

  const handlePersonVendor = (type) => {
    setIsPersonVendor(true);
  };
  return (
    <>
      <Modal
        className="modal add-post-modal"
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton as="h4">
          <Modal.Title className="modal-title">{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form id="form-add-post-modal" onSubmit={handleSubmit}>
              <Row>
                {error && error.length > 0 && (
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
                  <div className="share-group-checkbox">
                    <Form.Check
                      name="members"
                      id="public"
                      type="radio"
                      checked={publicVisibility}
                      onClick={() => {
                        setPublicVisibility(true);
                        setPeersVisibility(false);
                        setNetworkVisibility(false);
                        // set all groups to true
                        if (groups) {
                          setGroups(
                            groups.map((g) => ({
                              ...g,
                              checked: true,
                            }))
                          );
                        }
                      }}
                    />
                    <label htmlFor="public">
                      Public
                      <span>(visible to all CMO list members)</span>
                    </label>
                  </div>
                  <div className="share-group-checkbox">
                    <Form.Check
                      name="members"
                      id="allnetwork"
                      type="radio"
                      checked={peersVisibility}
                      onClick={() => {
                        setPublicVisibility(false);
                        setPeersVisibility(true);
                        setNetworkVisibility(false);
                        // set all groups to false
                        if (groups) {
                          setGroups(
                            groups.map((g) => ({
                              ...g,
                              checked: false,
                            }))
                          );
                        }
                      }}
                    />
                    <label htmlFor="allnetwork">
                      My Followers
                      <span>(visible only to your Followers)</span>
                    </label>
                  </div>
                  <div className="share-group-checkbox">
                    <Form.Check
                      name="members"
                      id="selectnetwork"
                      type="radio"
                      checked={networkVisibility}
                      onClick={() => {
                        setPublicVisibility(false);
                        setPeersVisibility(false);
                        setNetworkVisibility(true);
                      }}
                    />
                    <label htmlFor="selectnetwork">
                      Select networks
                      <span>(visible only to selected networks)</span>
                    </label>
                  </div>
                  <div className="network-checkbox-group">
                    {groups &&
                      groups.map((group, index) => {
                        return (
                          <CustomCheckBox
                            className="modal-section-checkbox-content"
                            checked={group.checked}
                            disabled={!networkVisibility}
                            id={group.name}
                            key={index}
                            label={group.name}
                            name={group.name}
                            onChange={(e) => {
                              let idx = groups.findIndex(
                                (g) => g.slug === group.slug
                              );
                              if (idx >= 0) {
                                groups[idx].checked = e;
                                setGroups(groups.slice());
                              }
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
                  <div className="modal-section-title">{titleHeading}</div>
                  <Form.Control
                    as="input"
                    className="modal-section-title-content"
                    id="title"
                    placeholder={titlePlaceholder}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required={true}
                  />
                </Col>
                <div className="modal-rich-editor-section d-flex col-md-12 px-0">
                  <Col md="9" sm="12">
                    <div className="modal-section-title">
                      Description <span>{descriptionSubheading}</span>
                    </div>
                    <RichEditor
                      setBody={setBody}
                      getSuggestions={getSuggestions}
                      getTopicSuggestions={getTopicSuggestions}
                      isPersonVendor={isPersonVendor}
                      setIsPersonVendor={() => setIsPersonVendor(false)}
                      toolbar={true}
                    />
                  </Col>
                  <Col md="3" sm="12">
                    <ul className="modal-section-body-right-content">
                      <li className="modal-section-list-item">
                        <Button
                          className="modal-section-body-content"
                          onClick={() => handlePersonVendor("Person")}
                          size="sm"
                          variant="light"
                        >
                          <div>
                            <img
                              alt="person icon"
                              className="modal-section-body-image"
                              src={`${cdn}/person.png`}
                            />
                            @Person
                          </div>
                        </Button>
                      </li>

                      <li className="modal-section-list-item">
                        <Button
                          className="modal-section-body-content"
                          onClick={() => handlePersonVendor("Vendor")}
                          size="sm"
                          variant="light"
                        >
                          <div>
                            <img
                              alt="company icon"
                              className="modal-section-body-image"
                              src={`${cdn}/company.png`}
                            />
                            @Vendor
                          </div>
                        </Button>
                      </li>
                      <li className="modal-section-list-item">
                        <Button
                          className="modal-section-body-content"
                          onClick={() => handlePhotoClick()}
                          variant="light"
                          size="sm"
                          disabled
                        >
                          <div>
                            <img
                              alt="photograph icon"
                              className="modal-section-body-image"
                              src={`${cdn}/image.png`}
                            />
                            Photo
                          </div>
                        </Button>
                        <input
                          type="file"
                          id="file"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </li>
                      <li className="modal-section-list-item">
                        <Button
                          className="modal-section-body-content"
                          onClick={() => setShowVideo(true)}
                          variant="light"
                          size="sm"
                          disabled
                        >
                          <div>
                            <img
                              alt="video icon"
                              className="modal-section-body-image"
                              src={`${cdn}/video.png`}
                            />
                            Video
                          </div>
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </div>
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
                        placeholder="Chose a CMOList member"
                        value={person}
                      />
                    </div>
                    <div className="modal-person-section-role">
                      <label htmlFor="role">Role</label>
                      <Form.Control
                        as="input"
                        className="modal-person-section-input"
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Chose one or more topics about the role of the person in this post"
                        value={role}
                      />
                    </div>
                    <div className="modal-person-section-actions">
                      <Button
                        className="btn-white modal-cancel-button"
                        onClick={handleClosePersonSection}
                        size="sm"
                        variant="outline-primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="btn-white modal-cancel-button"
                        onClick={handleClosePersonSection}
                        size="sm"
                        style={{ marginLeft: "10px" }}
                        variant="outline-primary"
                      >
                        + Add Person
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="modal-section-title">#Topics</div>
                  <AsyncTypeahead
                    id="async-global-search"
                    isLoading={isTypeLoading}
                    labelKey="name"
                    multiple
                    minLength={0}
                    onSearch={handleSearch}
                    options={options}
                    emptyLabel=""
                    renderMenu={(results, menuProps) => {
                      if (!results.length) {
                        return null;
                      }
                      return (
                        <TypeaheadMenu
                          options={results}
                          labelKey="name"
                          {...menuProps}
                        />
                      );
                    }}
                    onChange={(selectedOption) => {
                      setTopics(selectedOption);
                    }}
                    placeholder="Choose one or more #topics that describe what your campaign or update is about"
                    renderMenuItemChildren={(option) => (
                      <React.Fragment>
                        <span>{option.name}</span>
                      </React.Fragment>
                    )}
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white modal-cancel-button standard-btn"
            variant="outline-primary"
            onClick={() => handleCancel()}
            disabled={isLoading}
          >
            {firstButtonText}
          </Button>
          <Button
            className="btn__homepage-blue modal-ok-button standard-btn"
            disabled={isLoading}
            variant="primary"
            type="submit"
            form="form-add-post-modal"
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
    profileStats: state.profileModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProfileStats: dispatch.profileModel.getProfileStats,
    getSuggestions: dispatch.suggestionsModel.getSuggestions,
    getTopicSuggestions: dispatch.suggestionsModel.getTopicSuggestions,
  };
};

export default connect(mapState, mapDispatch)(AddPostModal);
