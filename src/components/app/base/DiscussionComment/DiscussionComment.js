import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";

import "./discussionComment.css";

const DiscussionComment = ({
  onSubmit,
  className,
  placeholder,
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
      <img
        alt="profile"
        className="comment-image"
        src="https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ=="
      />
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
