import React from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";

const NetworkTopBanner = () => {
  return (
    <div className="network-top-banner top-banner-container mt-3">
      <CustomCard className="mb-0">
        <div className="py-3 px-1">
          <h3>My Networks Member</h3>
          <Button className="btn-blue mb-2 mt-3">Invite</Button>
        </div>
      </CustomCard>
    </div>
  );
};

export default NetworkTopBanner;
