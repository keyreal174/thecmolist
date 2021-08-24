import React, { useState } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button } from "react-bootstrap";
import InviteModal from "./InviteModal";
import "./Invite.scss";

const InviteButton = ({
  saveUserInvite,
  lightMode,
  isAdminUser,
  text,
  className,
}) => {
  const [inviteModalShow, setInviteModalShow] = useState(false);

  return (
    <div>
      <Button
        className={clsx(
          lightMode ? "btn-white btn btn-primary invite-btn" : "invite-btn",
          className && className
        )}
        onClick={() => setInviteModalShow(true)}
      >
        {text ? text : "+ Invite"}
      </Button>
      <InviteModal
        show={inviteModalShow}
        onHide={() => setInviteModalShow(false)}
        isAdminUser={isAdminUser}
        onSuccess={(data) => {
          saveUserInvite(data);
          setInviteModalShow(false);
        }}
      />
    </div>
  );
};

const mapState = (state) => ({});

const mapDispatch = (dispatch) => {
  return {
    saveUserInvite: dispatch.userModel.saveInvite,
  };
};

export default connect(mapState, mapDispatch)(InviteButton);
