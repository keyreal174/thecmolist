import React from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import InviteButton from "../base/InviteButton/InviteButton";

const InviteCard = () => {
  return (
    <CustomCard className="invite-card">
      <div className="text-center">
        <p className="mb-3 mt-1">
          Invite other trusted marketing leaders to grow your network
        </p>
        <InviteButton />
      </div>
    </CustomCard>
  );
};

export default InviteCard;
