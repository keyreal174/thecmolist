import React from "react";
import { Row } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import "./usercard.css";

function UserCard(props) {
  let usercardBodyContentPresent =
    props.image || props.headline || props.subheadlines;
  return (
    <div className={`usercard-wrapper ${props.className}`}>
      {usercardBodyContentPresent && (
        <div className="usercard-body usercard-wrap" style={{ float: "left" }}>
          <Row>
            <div className="usercard-img" style={{ float: "left" }}>
              <img
                src={props.image}
                alt=""
                className={
                  props.imageDisplay && props.imageDisplay === "square"
                    ? "usercard-img-square"
                    : ""
                }
              />
            </div>
            {props.subheadlines && (
              <div className="usercard-subheadlines">
                {props.headline && (
                  <div className="usercard-title">
                    <Markdown>{props.headline.markdown}</Markdown>
                  </div>
                )}
                {props.subheadlines.map((subheadline) => {
                  return (
                    <div className="usercard-subheadline">
                      <Markdown>{subheadline.markdown}</Markdown>
                    </div>
                  );
                })}
              </div>
            )}
          </Row>
          {props.children && <Row>{props.children}</Row>}
        </div>
      )}
    </div>
  );
}

export default UserCard;
