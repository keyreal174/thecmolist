import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";

const Vendors = ({ newMembers }) => {
  return (
    <CustomCard heading="All Members">
      <div className="feed-box-content">
        {newMembers &&
          newMembers.map(({ name, role }, index) => {
            return (
              <div
                className="feed-box-content-item feed-box-content-item-special"
                key={index}
              >
                <div className="feed-box-content-name">{name}</div>
                <div className="feed-box-content-role">{role}</div>
              </div>
            );
          })}
      </div>
    </CustomCard>
  );
};

export default Vendors;
