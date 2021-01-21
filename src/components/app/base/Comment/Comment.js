import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import "./comment.css";

const Comment = (props) => {
  const [comment, setComment] = useState("");
  const [show, setShow] = useState("");
  const submit = props.submit;

  return (
    <div className="comment-wrapper">
      <img alt="profile" className="comment-image" src="#" />
      <Form.Control
        as="input"
        className="comment-input"
        id="textarea"
        placeholder="Add a comment..."
        onChange={(e) => {
          const value = e.target.value;
          setComment(value);
          setShow(!!value);
        }}
        value={comment}
      />
      {
        <Button
          className={`comment-button ${show ? "show" : ""}`}
          onClick={() => submit(comment)}
          variant="primary"
        >
          Post
        </Button>
      }
    </div>
  );
};

export default Comment;
