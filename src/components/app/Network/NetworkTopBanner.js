import React from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";

const NetworkTopBanner = (props) => {
  return (
    <div className="network-top-banner top-banner-container mt-3">
      <CustomCard className="mb-0">
        <div className="py-3 px-1">
          {props.image && props.image.length > 0 && (
            <div className="network-top-banner-img">
              <img src={props.image} alt="Logo" width="100" height="100" />
            </div>
          )}
          <h3>{props.title}</h3>
          <Button className="btn-blue mb-2 mt-3">Invite</Button>
        </div>
      </CustomCard>
    </div>
  );
};

export default NetworkTopBanner;
