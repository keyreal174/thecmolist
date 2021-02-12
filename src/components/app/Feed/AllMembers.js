import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import Avatar from "../base/Avatar/Avatar";

const AllMembers = ({ peopleInSimilarRoles }) => {
  return (
    <CustomCard heading="All Members">
      <div className="feed-box-content">
        {peopleInSimilarRoles &&
          peopleInSimilarRoles.map(({ image, name, role }, index) => {
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

export default AllMembers;
