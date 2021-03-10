import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import Avatar from "../base/Avatar/Avatar";

const AllMembers = ({ memberList }) => {
  let membersLink = memberList.link || "";
  let list = Array.isArray(memberList) ? memberList : memberList.list;
  return list && list.length > 0 ? (
    <CustomCard heading="All Members" seeAllLink={membersLink}>
      <div className="feed-box-content">
        {list &&
          list.map(({ image, name, role, link }, index) => {
            return (
              <a href={link}>
                <Avatar
                  key={index}
                  image={image}
                  heading={name}
                  subHeading={role}
                />
              </a>
            );
          })}
      </div>
    </CustomCard>
  ) : (
    <div />
  );
};

export default AllMembers;
