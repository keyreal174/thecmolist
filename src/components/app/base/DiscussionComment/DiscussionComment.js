import React, { useState, useEffect, useRef } from "react";
import PersonHeader from "../PersonHeader/PersonHeader";
import RichEditor from "../DraftEditor/RichEditor";
import clsx from "clsx";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { cdn } from "../../../util/constants";

import "./discussionComment.scss";

const DiscussionComment = ({
  className,
  focusComment,
  getSuggestions,
  getTopicSuggestions,
  onSubmit,
  placeholder,
  profile,
  useRichEditor,
  value,
  ...props
}) => {
  const [comment, setComment] = useState(value || "");
  const [show, setShow] = useState("");
  const [body, setBody] = useState("");
  const [reStateToggle, setReStateToggle] = useState(false);
  const [isPersonVendor, setIsPersonVendor] = useState(false);
  const textAreaEl = useRef(null);
  const richeditorEl = useRef(null);

  const handleButtonClick = (e) => {
    let text = comment;
    if (useRichEditor) {
      text = body;
    }
    e.preventDefault();
    onSubmit(text);
    setComment("");
    setBody("");
    setReStateToggle(!reStateToggle);
    setShow(false);
  };

  useEffect(() => {
    if (focusComment) {
      if (!useRichEditor) {
        textAreaEl.current.focus();
        window.scrollTo(0, 0);
      } else {
        richeditorEl.current && richeditorEl.current.focus();
        window.scrollTo(0, 0);
      }
    }
  }, []);

  useEffect(() => {
    richeditorEl.current && richeditorEl.current.focus();
  }, [focusComment]);

  const handleChange = () => {
    setShow(!!body);
  };

  const handlePersonVendor = () => {
    setIsPersonVendor(true);
  };

  return (
    <div
      className={clsx(
        "comment-wrapper",
        className,
        props.withMargin && "comment-wrapper-with-margin"
      )}
    >
      {profile && (
        <PersonHeader
          className="comment--image"
          profile={profile}
          onlyImage={true}
        />
      )}
      {!useRichEditor && (
        <Form.Control
          as="textarea"
          className="comment-input"
          id="textarea"
          placeholder={placeholder ? placeholder : "Add a comment..."}
          onChange={(e) => {
            const value = e.target.value;
            setComment(value);
            setShow(!!value);
          }}
          value={comment}
          ref={textAreaEl}
          rows={1}
        />
      )}
      {useRichEditor && (
        <div className="comment--rich-editor">
          <RichEditor
            getSuggestions={getSuggestions}
            getTopicSuggestions={getTopicSuggestions}
            handleChange={handleChange}
            isPersonVendor={isPersonVendor}
            setBody={setBody}
            placeholder={placeholder ? placeholder : ""}
            setIsPersonVendor={() => setIsPersonVendor(false)}
            toolbar={true}
            ref={richeditorEl}
            stateToggle={reStateToggle}
          />
          <div className="comment--buttons">
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
                <span className="modal-section-body-text">@Vendor</span>
              </div>
            </Button>
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
                <span className="modal-section-body-text">@Person</span>
              </div>
            </Button>
          </div>
        </div>
      )}
      {
        <Button
          className={clsx("comment-button", show && "show")}
          onClick={handleButtonClick}
          variant="primary"
        >
          Reply
        </Button>
      }
    </div>
  );
};

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch) => {
  return {
    getSuggestions: dispatch.suggestionsModel.getSuggestions,
    getTopicSuggestions: dispatch.suggestionsModel.getTopicSuggestions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionComment);
