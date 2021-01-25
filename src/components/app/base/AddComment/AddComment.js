import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import Markdown from "markdown-to-jsx";
import Gallery from "../Gallery/Gallery";
import { Link } from "react-router-dom";

import "./addComment.css";

const AddComment = ({ onSubmit, className, placeholder, value, ...props }) => {
  const [comment, setComment] = useState(value || "");
  const [show, setShow] = useState("");
  console.log(props);
  let articleBodyContentPresent =
    props.image ||
    props.headline ||
    props.subheadlines ||
    props.articletext ||
    props.subtext ||
    props.images;
  return (
    <div className="article-wrapper">
      {props.header && (
        <div className="article-wrapper-header">
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
        <div className="article-body article-wrap">
          <Row>
            <Col
              sm="10"
              lg="11"
              className={
                props.image && props.image.length > 0 ? "article-body-left" : ""
              }
            >
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
              <Gallery images={props.images} />
            </Col>
          </Row>
        </div>
      )}
      <div className="article-engagement-buttons">
        {props.engagementButtons &&
          props.engagementButtons.map(({ text, icon }, index) => {
            return (
              <div key={text}>
                <Button
                  variant="light"
                  onClick={props.onEngagementButtonClick.bind(this, text)}
                  style={{ margin: "0 10px" }}
                >
                  <img
                    alt={`Icon for button ${index}`}
                    src={icon}
                    style={{
                      paddingRight: "5px",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  <span>{text}</span>
                </Button>
              </div>
            );
          })}
      </div>
      {props.children && (
        <Row>
          <Col sm="10" lg="11" style={{ paddingLeft: "0px" }}>
            {props.children}
          </Col>
        </Row>
      )}
      {props.showComment && (
        <div className={`comment-wrapper ${className}`}>
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

export default AddComment;
