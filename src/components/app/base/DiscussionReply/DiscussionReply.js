import { Button, Col, Form, Row } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import EngagementButtons from "../EngagementButtons/EngagementButtons";

import "./discussionReply.css";

const DiscussionReply = ({
  onSubmit,
  className,
  placeholder,
  value,
  ...props
}) => {
  const [comment, setComment] = useState(value || "");
  const [show, setShow] = useState("");
  const articleBodyContentPresent =
    props.headline || props.articletext || props.images;

  return (
    <div
      className={` comment-article-wrapper ${
        props.onlyComment ? "article-only-comment" : ""
      }`}
    >
      {props.header && (
        <div className="comment-wrapper-header">
          <img
            alt="profile"
            className="article-wrapper-image"
            src={props.header.image}
          />
          <div>
            <div className="article-wrapper-title">
              {props.header.markdown ? (
                <Markdown>{props.header.markdown}</Markdown>
              ) : (
                <a href={props.header.link} className="mr-1 mb-1">
                  {props.header.text}
                </a>
              )}
            </div>
            <div className="article-wrapper-subtitle">
              {props.header.subtext}
            </div>
          </div>
        </div>
      )}
      {articleBodyContentPresent && (
        <div className="comment-body">
          <Row>
            <Col
              sm="10"
              lg="11"
              className={
                props.image && props.image.length > 0 ? "article-body-left" : ""
              }
            >
              <h2 className="article-title">
                {props.headline.markdown ? (
                  <Markdown>{props.headline.markdown}</Markdown>
                ) : (
                  props.headline
                )}
              </h2>
              {props.articletext && props.articletext.length > 0 && (
                <div className="article-text">
                  <ShowMoreText
                    lines={props.articletextlines ? props.articletextlines : 2}
                    keepNewLines={true}
                    more="See more"
                    less=""
                    width={0}
                  >
                    {props.articletext}
                  </ShowMoreText>
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}

      <div
        className={`article-engagement-buttons ${
          props.withMargin ? "article-engagement-buttons-with-margin" : ""
        }`}
      >
        <EngagementButtons
          engagementButtons={props.engagementButtons}
          onEngagementButtonClick={props.onEngagementButtonClick}
        />
      </div>
      {props.children && (
        <Row>
          <Col sm="10" lg="11" style={{ paddingLeft: "0px" }}>
            {props.children}
          </Col>
        </Row>
      )}
      {props.showComment && (
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
      )}
    </div>
  );
};

export default DiscussionReply;
