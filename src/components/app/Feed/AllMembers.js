import React from "react";
import { Link } from "react-router-dom";
import CustomCard from "../base/CustomCard/CustomCard";
import Avatar from "../base/Avatar/Avatar";

export const AllMembersList = ({ list }) => {
  return (
    <>
      {list.length > 0 &&
        list.map(({ image, name, role, link }, index) => {
          return (
            <Link to={link} key={index}>
              <Avatar image={image} heading={name} subHeading={role} />
            </Link>
          );
        })}
    </>
  );
};

const AllMembers = ({ memberList }) => {
  let membersHeading = memberList.heading || "All Members";
  let membersLink = memberList.link || "";
  let list = Array.isArray(memberList) ? memberList : memberList.list;

  return list && list.length > 0 ? (
    <CustomCard heading={membersHeading} seeAllLink={membersLink}>
      <div className="feed-box-content">
        <AllMembersList list={list} />
      </div>
    </CustomCard>
  ) : (
    <div />
  );
};

export default AllMembers;
