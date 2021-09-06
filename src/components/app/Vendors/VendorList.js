import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button } from "react-bootstrap";
import VendorListFeed from "./VendorListFeed";
import BlockerText from "../base/BlockerText/BlockerText";
import InviteButton from "../base/Invite/InviteButton";

const VendorList = ({
  vendorList,
  vendorListBlockerText,
  handleInviteModal,
  isAdminUser,
}) => {
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
            <InviteButton
              text="+ Invite"
              className="filter--button filter--button-active active m-0"
              isAdminUser={isAdminUser}
            />
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
    </>
  );
};

export default VendorList;
