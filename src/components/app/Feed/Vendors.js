import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import Avatar from "../base/Avatar/Avatar";

const Vendors = ({ newMembers }) => {
  return (
    <CustomCard heading="497 Vendors" seeAll>
      <div className="feed-box-content">
        {newMembers &&
          newMembers.map(({ image, name, role }, index) => {
            return (
              <Avatar
                key={index}
                image={image}
                heading={name}
                subHeading={role}
              />
            );
          })}
      </div>
    </CustomCard>
  );
};

export default Vendors;
