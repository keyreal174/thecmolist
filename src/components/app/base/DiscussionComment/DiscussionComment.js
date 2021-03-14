import { Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import PersonHeader from "../PersonHeader/PersonHeader";

import "./discussionComment.scss";

const DiscussionComment = ({
  onSubmit,
  className,
  focusComment,
  placeholder,
  profile,
  value,
  ...props
}) => {
  const [comment, setComment] = useState(value || "");
  const [show, setShow] = useState("");
  const textAreaEl = useRef(null);

  useEffect(() => {
    if (focusComment) {
      textAreaEl.current.focus();
      window.scrollTo(0, 0);
    }
  }, []);

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
      {
        <Button
          className={clsx("comment-button", show && "show")}
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
