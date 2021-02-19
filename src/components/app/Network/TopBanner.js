import React from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";

const TopBanner = () => {
  return (
    <div className="network-top-banner top-banner-container">
      <CustomCard>
        <div className="py-3 px-1">
          <h3>My Networks Member</h3>
          <Button className="btn-blue mb-2">Invite</Button>
        </div>
      </CustomCard>
    </div>
  );
};

export default TopBanner;
