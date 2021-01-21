import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import "./comment.css";

const Comment = ({ onSubmit, className, placeholder }) => {
  const [comment, setComment] = useState("");
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
            console.log(comment);
            onSubmit(comment);
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
