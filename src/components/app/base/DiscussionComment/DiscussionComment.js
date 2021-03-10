import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";

import PersonHeader from "../PersonHeader/PersonHeader";

import "./discussionComment.scss";

const DiscussionComment = ({
  onSubmit,
  className,
  placeholder,
  profile,
  value,
  ...props
}) => {
  const [comment, setComment] = useState(value || "");
  const [show, setShow] = useState("");
  return (
    <div
      className={`comment-wrapper ${className} ${
        props.withMargin ? "comment-wrapper-with-margin" : ""
      }`}
    >
      {profile && (
        <PersonHeader
          className="comment--image"
          profile={profile}
          onlyImage={true}
        />
      )}
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
        rows={1}
      />
      {
        <Button
          className={`comment-button ${show ? "show" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onSubmit(comment);
            setComment("");
          }}
          variant="primary"
        >
          Post
        </Button>
      }
    </div>
  );
};

export default DiscussionComment;
