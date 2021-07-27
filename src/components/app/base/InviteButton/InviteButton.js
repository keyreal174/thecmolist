import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import InviteModal from "../ShareModule/InviteModal";
import "./InviteButton.scss";

const InviteButton = ({ saveUserInvite }) => {
  const [inviteModalShow, setInviteModalShow] = useState(false);

  return (
    <div>
      <Button className="invite-btn" onClick={() => setInviteModalShow(true)}>
        + Invite
      </Button>
      <InviteModal
        show={inviteModalShow}
        onHide={() => setInviteModalShow(false)}
        onSuccess={(data) => {
          saveUserInvite(data);
          setInviteModalShow(false);
        }}
      />
    </div>
  );
};

const mapState = (state) => {};

const mapDispatch = (dispatch) => {
  return {
    saveUserInvite: dispatch.userModel.saveInvite,
  };
};

export default connect(mapState, mapDispatch)(InviteButton);
