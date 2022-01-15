import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AddPostModal from "../AddPostModal/AddPostModal";
import "./sharemodule.scss";

function ShareModule(props) {
  let newPostClick = () => {
    window.location.href =
      props.newPostLink && props.newPostLink.length > 0
        ? props.newPostLink
        : "https://forum.thecmolist.com/new-topic";
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <table className="mt-3 share-module-table">
      <tbody>
        <tr>
          <th>
            <div className="share-module-heading">
              <span>
                {props.sponsorHeading || "Nominate and invite other CMOs"}
              </span>
            </div>
          </th>
          <th className="share-module-mid-cell">
            <div
              className="share-module-heading"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <span>
                {props.questionHeading || "Add a question for your network"}
              </span>
            </div>
          </th>
          <th>
            <div className="share-module-heading">
              <span>
                {props.shareHeading ||
                  "Share your experience with your network"}
              </span>
            </div>
          </th>
        </tr>
        <tr>
          <td>
            <div style={{ textAlign: "center" }}>
              <span>(3 invitations remaining)</span>
            </div>
          </td>
          <td className="share-module-mid-cell">
            <Form.Control
              as="textarea"
              rows="1"
              className="share-module-textarea"
              onClick={newPostClick}
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <Button
              onClick={() => {
                props.onInvite && props.onInvite();
              }}
              className="btn-white share-module-center"
              variant="outline-primary"
            >
              Invite
            </Button>
          </td>
          <td className="share-module-mid-cell">
            <Button
              onClick={handleShow}
              className="btn-white share-module-center"
              variant="outline-primary"
            >
              Ask a question
            </Button>
            <AddPostModal
              firstButtonText={"Cancel"}
              handleClose={handleClose}
              modalTitle="Ask a marketing question"
              secondButtonText={"Ask a question"}
              show={show}
            />
          </td>
          <td>
            <div>
              <a
                href="/profile#addagency"
                className="btn__homepage btn__homepage-white btn__share-module-share"
                style={{ float: "left", marginLeft: "15px" }}
              >
                Share Agency
              </a>
              <a
                href="/profile#addtechnology"
                className="btn__homepage btn__homepage-white btn__share-module-share"
                style={{ float: "right", marginRight: "15px" }}
              >
                Share Technology
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ShareModule;
