import React, { useState } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button } from "react-bootstrap";
import VendorListFeed from "./VendorListFeed";
import BlockerText from "../base/BlockerText/BlockerText";
import InviteModal from "../base/ShareModule/InviteModal";

const VendorList = ({ vendorList, vendorListBlockerText, saveUserInvite }) => {
  const [inviteModalShow, setInviteModalShow] = useState(false);

  const AddInviteButton = () => (
    <Button
      className="filter--button filter--button-active active m-0"
      onClick={() => {
        setInviteModalShow(true);
      }}
    >
      + Invite
    </Button>
  );

  return (
    <>
      <div
        className={clsx(
          vendorListBlockerText &&
            "add-vendor-blocker-wrapper vendor-list-page-wrapper"
        )}
      >
        {vendorListBlockerText && (
          <BlockerText blockerText={vendorListBlockerText}>
            <AddInviteButton />
          </BlockerText>
        )}
        {vendorList &&
          vendorList.map((vendor, i) => (
            <VendorListFeed key={i} vendor={vendor} />
          ))}
        {vendorList && vendorList.length === 0 && (
          <div className="wrapper article-wrapper no-feed-data-header">
            <div>No vendors here yet.</div>
          </div>
        )}
      </div>
      <InviteModal
        show={inviteModalShow}
        onHide={() => setInviteModalShow(false)}
        onSuccess={(data) => {
          saveUserInvite(data);
          setInviteModalShow(false);
        }}
      />
    </>
  );
};

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {
    saveUserInvite: dispatch.userModel.saveInvite,
  };
};

export default connect(mapState, mapDispatch)(VendorList);
