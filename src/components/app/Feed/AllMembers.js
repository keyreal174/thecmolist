import React from "react";
import AllMembersList from "../base/AllMembersList/AllMembersList";
import CustomCard from "../base/CustomCard/CustomCard";

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
