import { Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import clsx from "clsx";

import PersonHeader from "../PersonHeader/PersonHeader";

import "./discussionComment.scss";
import RichEditor from "../DraftEditor/RichEditor";

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
  const textAreaEl = useRef(null);

  const handleButtonClick = (e) => {
    let text = comment;
    if (useRichEditor) {
      text = body;
    }
    e.preventDefault();
    onSubmit(text);
    setComment("");
  };

  useEffect(() => {
    if (focusComment && !useRichEditor) {
      textAreaEl.current.focus();
      window.scrollTo(0, 0);
    }
  }, []);

  const handleChange = (content) => {
    setShow(!!body);
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
            setBody={setBody}
            getSuggestions={getSuggestions}
            getTopicSuggestions={getTopicSuggestions}
            toolbar={true}
            handleChange={handleChange}
          />
        </div>
      )}
      {
        <Button
          className={clsx("comment-button", show && "show")}
          onClick={handleButtonClick}
          variant="primary"
        >
          Post
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
