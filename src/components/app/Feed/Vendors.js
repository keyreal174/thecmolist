import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import Avatar from "../base/Avatar/Avatar";

const Vendors = ({ vendorList }) => {
  let vendorsLink = vendorList.link || "";
  let list = Array.isArray(vendorList) ? vendorList : vendorList.list;
  return list && list.length > 0 ? (
    <CustomCard heading="Vendors" seeAllLink={vendorsLink}>
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

export default Vendors;
