import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

export default function ({
  contactMe,
  postVisibility,
  onPostVisibilityChanged,
  onContactMeChanged,
}) {
  return (
    <Fragment>
      <Form.Label style={{ fontWeight: 700, fontSize: "16px" }}>
        Who can see this review?
      </Form.Label>
      <div>
        <Form.Check
          checked={postVisibility === "public"}
          name="postVisibilityForm"
          type="radio"
          id="post-public"
          onChange={() => {
            onPostVisibilityChanged("public");
          }}
          label="Your network and other marketing leaders"
        />
      </div>
      <div>
        <Form.Check
          checked={postVisibility === "network"}
          name="postVisibilityForm"
          type="radio"
          id="post-network"
          onChange={() => {
            onPostVisibilityChanged("network");
          }}
          label="Only your network"
        />
      </div>
      <div>
        <Form.Check
          checked={postVisibility === "anon"}
          name="postVisibilityForm"
          type="radio"
          id="post-anon"
          onChange={() => {
            onPostVisibilityChanged("anon");
          }}
          label="Anonymous (shown only on the agency’s profile without your name)"
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Form.Check
          checked={contactMe}
          type="checkbox"
          id="mkt-contact-me"
          onChange={() => {
            onContactMeChanged(!contactMe);
          }}
          label="Other marketing leaders can contacting me for feedback about this agency"
        />
      </div>
    </Fragment>
  );
}
