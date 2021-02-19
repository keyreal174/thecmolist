import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import Avatar from "../base/Avatar/Avatar";

const AllMembers = ({ memberList }) => {
  let membersLink = memberList.link || "";
  let list = Array.isArray(memberList) ? memberList : memberList.list;
  return list && memberList.list ? (
    <CustomCard heading="All Members" seeAllLink={membersLink}>
      <div className="feed-box-content">
        {list &&
          list.map(({ image, name, role }, index) => {
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
  ) : (
    <div />
  );
};

export default AllMembers;
