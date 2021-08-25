import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import "./Invite.scss";

const InfoRow = ({ setUserName, setUserEmail, required }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Row>
      <Col className="invite-modal--input" xs={6}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          className="invite-module-input"
          type="text"
          placeholder="First name"
          value={name}
          required={required}
          onChange={(e) => {
            setName(e.target.value);
            setUserName(e.target.value);
          }}
        />
      </Col>
      <Col className="invite-modal--input" xs={6}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="invite-module-input"
          type="email"
          placeholder="name@company.com"
          value={email}
          required={required}
          onChange={(e) => {
            setEmail(e.target.value);
            setUserEmail(e.target.value);
          }}
        />
      </Col>
    </Row>
  );
};

function InviteForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [message, setMessage] = useState(
    "Please join me on CMOlist, a new professional network that enables marketing leaders to support each other by sharing proven marketing stacks, best practices, and new insights."
  );
  const [collection, setCollection] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  let closeDialog = (e) => {
    e.preventDefault();
    let data = {
      info: [
        { name: name, email: email },
        { name: name1, email: email1 },
      ],
      message,
      collection,
    };

    if (Object.keys(data).length > 0) {
      props.saveUserInvite(data);
    }

    props.submitAfter && props.submitAfter();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopyButtonText("Copied ✓");
  };

  useEffect(() => {
    const fetch = async () => {
      await props.getProfileStats();
    };

    fetch();
  }, []);

  useEffect(() => {
    if (props.profileStats) {
      setInviteLink(props.profileStats.inviteLink || "");
    }
  }, [props.profileStats]);

  useEffect(() => {
    if (props.show) {
      setCopyButtonText("Copy");
    }
  }, [props.show]);

  return (
    <div className="invite-module">
      <div>
        <Fragment>
          {!props.hideHeader && (
            <p className="modal-description">
              Invite your <strong>trusted peers</strong> to view their{" "}
              <strong>marketing stacks</strong> and learn from their{" "}
              <strong>advice</strong>
            </p>
          )}
          <form id="invite-modal" onSubmit={closeDialog}>
            <InfoRow
              setUserName={setName}
              setUserEmail={setEmail}
              required={true}
            />
            <InfoRow
              setUserName={setName1}
              setUserEmail={setEmail1}
              required={false}
            />
            <Row>
              <Col xs={12}>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={message}
                  required={true}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Col>
            </Row>
            {props.isAdminUser && (
              <Row>
                <Col xs={12}>
                  <Form.Label>Collections</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Collections"
                    rows="1"
                    value={collection}
                    required={false}
                    onChange={(e) => setCollection(e.target.value)}
                  />
                </Col>
              </Row>
            )}
          </form>
        </Fragment>
        {!props.hideSubmitButton && (
          <div className="btn-groups">
            <Button
              className="btn-white modal-primary-button"
              variant="outline-primary"
              form="invite-modal"
              type="submit"
            >
              Send
            </Button>
          </div>
        )}
      </div>
      <div className="invite-module-footer">
        <div className="w-100">
          <Form.Label>Send a Share Link</Form.Label>
          <p>Invite marketing leaders to CMOlist using this Share Link</p>
          <div className="d-flex invite-link-wrapper">
            <Form.Control
              type="input"
              value={inviteLink}
              required={true}
              onChange={(e) => console.log(inviteLink)}
              disabled
            />
            <Button
              className="btn-white"
              variant="outline-primary"
              onClick={copyToClipboard}
            >
              {copyButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    profileStats: state.profileModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProfileStats: dispatch.profileModel.getProfileStats,
    saveUserInvite: dispatch.userModel.saveInvite,
  };
};

export default connect(mapState, mapDispatch)(InviteForm);
