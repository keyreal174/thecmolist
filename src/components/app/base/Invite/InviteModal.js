import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Close from "../icons/close.svg";
import "./Invite.scss";
import InviteForm from "./InviteForm";

const InviteModal = (props) => {
  return (
    <>
      <Modal
        dialogClassName="invite-module-modal"
        show={props.show}
        backdrop="static"
        keyboard={false}
        onHide={props.onHide}
        centered
      >
        <Modal.Header className="align-items-center">
          <Modal.Title>Nominate CMO for Membership</Modal.Title>
          <img
            src={Close}
            alt="close"
            className="cursor-pointer"
            onClick={() => props.onHide()}
          />
        </Modal.Header>
        <Modal.Body>
          <InviteForm {...props} submitAfter={props.onHide} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InviteModal;
