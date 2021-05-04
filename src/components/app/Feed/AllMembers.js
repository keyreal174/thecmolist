import React from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import Avatar from "../base/Avatar/Avatar";

export const AllMembersList = ({ list }) => {
  return (
    <>
      {list &&
        list.map(({ image, name, role, link }, index) => {
          return (
            <a href={link} key={index}>
              <Avatar image={image} heading={name} subHeading={role} />
            </a>
          );
        })}
    </>
  );
};

const AllMembers = ({ memberList }) => {
  let membersLink = memberList.link || "";
  let list = Array.isArray(memberList) ? memberList : memberList.list;

  return list && list.length > 0 ? (
    <CustomCard heading="All Members" seeAllLink={membersLink}>
      <div className="feed-box-content">
        <AllMembersList list={list} />
      </div>
    </CustomCard>
  ) : (
    <div />
  );
};

export default AllMembers;
