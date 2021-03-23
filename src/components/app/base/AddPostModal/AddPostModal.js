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
  suggestions,
  getSuggestions,
  getTopicSuggestions,
}) {
  const [allMembers, setAllMembers] = useState(false);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [groups, setGroups] = useState({});
  const [onlyMyNetwork, setOnlyMyNetwork] = useState(true);
  const [publicV, setPublicV] = useState(false);
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
  const [options, setOptions] = useState([]);
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

  const groupNameToSlug = (g) => {
    if (profileStats && profileStats.profile && profileStats.profile.groups) {
      let profileGroups = profileStats.profile.groups;
      let gIdx = profileGroups.findIndex((psg) => psg.name === g);
      if (gIdx >= 0 && profileGroups[gIdx].slug) {
        return profileGroups[gIdx].slug;
      }
    }
    return g;
  };
  const handleSubmit = async (e) => {
    const content = {
      contentType,
      allMembers,
      onlyMyNetwork,
      publicV,
      groups,
      title,
      body,
      topics,
      person,
      photo,
      role,
    };
    if (groups) {
      content.groups = Object.keys(groups)
        .filter((g) => groups[g])
        .map(groupNameToSlug);
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

  const getGroupsObject = (groups) => {
    let aux = {};

    if (groups && groups.length > 0) {
      groups.forEach(({ name, checked }) => {
        // for the beta we will set all groups to be checked
        aux[name] = true;
        // REMOVE this line post beta
        //aux[name] = checked;
      });
    }

    return aux;
  };

  const cleanFields = () => {
    setTitle("");
    setBody("");
    setTopics([]);
    setPerson("");
    setPhoto("");
    setRole("");
    setAllMembers(false);
    setOnlyMyNetwork(true);
    setPublicV(false);
    setShowPersonSection(false);
    setShowPhoto(false);
    setShowVideo(false);
  };

  const handleCancel = () => {
    handleClose();
    setError("");
    cleanFields();
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
      const { groups: actualGroups } = profileStats.profile;
      setGroups(getGroupsObject(actualGroups));
    }
  }, [profileStats]);

  useEffect(() => {
    if (contentType === "question") {
      setTitleHeading("Title");
      setTitlePlaceholder(
        "Be specific and imagine you're asking a question to another person"
      );
      setModalTitle("Ask a marketing question");
      setSecondButtonText("Ask Question");
    } else if (contentType === "project") {
      setTitleHeading("Title");
      setTitlePlaceholder(
        "Be specific and imagine you're describing this project to another person"
      );
      setModalTitle("Share a marketing project launch or experience");
      setSecondButtonText("Share Experience");
    } else if (contentType === "article") {
      setTitleHeading("Article URL");
      setTitlePlaceholder("http://");
      setModalTitle("Share marketing news or article");
      setSecondButtonText("Share Article");
    }
  }, [contentType]);

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
      <Modal className="modal" show={show} onHide={handleClose} size="lg">
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
                      checked={publicV}
                      onClick={() => {
                        setPublicV(true);
                        setAllMembers(false);
                        setOnlyMyNetwork(false);
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
                      checked={allMembers}
                      onClick={() => {
                        setPublicV(false);
                        setAllMembers(true);
                        setOnlyMyNetwork(false);
                        // set all groups to true
                        if (groups) {
                          let newGroups = { ...groups };
                          let groupKeys = Object.keys(groups);
                          groupKeys.forEach((name) => {
                            newGroups[name] = true;
                          });
                          setGroups(newGroups);
                        }
                      }}
                    />
                    <label htmlFor="allnetwork">
                      All networks
                      <span>
                        (visible to your Peers and all members of any networks
                        you belong to)
                      </span>
                    </label>
                  </div>
                  <div className="share-group-checkbox">
                    <Form.Check
                      name="members"
                      id="selectnetwork"
                      type="radio"
                      checked={onlyMyNetwork}
                      onClick={() => {
                        setPublicV(false);
                        setAllMembers(false);
                        setOnlyMyNetwork(true);
                      }}
                    />
                    <label htmlFor="selectnetwork">
                      Select networks
                      <span>
                        (visible only to members of selected networks)
                      </span>
                    </label>
                  </div>
                  <div
                    className="network-checkbox-group"
                    style={{ display: "flex", marginBottom: "10px" }}
                  >
                    {groups &&
                      Object.keys(groups).map((groupKey, index) => {
                        return (
                          <CustomCheckBox
                            className="modal-section-checkbox-content"
                            checked={groups[groupKey]}
                            disabled={allMembers}
                            id={groupKey}
                            key={index}
                            label={groupKey}
                            name={groupKey}
                            onChange={(e) => {
                              setGroups({
                                ...groups,
                                [groupKey]: e,
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
                <Col md="9">
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
                <Col md="3">
                  <ul className="modal-section-body-right-content">
                    <li>
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
                    <li>
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
                    <li>
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
                    <li>
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
                    minLength={1}
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
                    placeholder="Choose one or more #topics or #locations that describe what your question is about"
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
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={() => handleCancel()}
            disabled={isLoading}
          >
            {firstButtonText}
          </Button>
          <Button
            className="btn__homepage-blue modal-ok-button"
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
