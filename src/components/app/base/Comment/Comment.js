import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import "./comment.css";

const Comment = ({ onSubmit, className, placeholder, value }) => {
  const [comment, setComment] = useState(value || "");
  const [show, setShow] = useState("");

  return (
    <div className={`comment-wrapper ${className}`}>
      <img alt="profile" className="comment-image" src="#" />
      <Form.Control
        as="input"
        className="comment-input"
        id="textarea"
        placeholder={placeholder ? placeholder : "Add a comment..."}
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

export default Comment;
