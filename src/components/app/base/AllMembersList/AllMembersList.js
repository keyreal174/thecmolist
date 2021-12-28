import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const AllMembersList = ({ list }) => {
  return (
    <>
      {list.length > 0 &&
        list.map(({ image, name, role, link }, index) => {
          return (
            <Avatar
              key={index}
              image={image}
              heading={name}
              subHeading={role}
              link={link}
            />
          );
        })}
    </>
  );
};

export default AllMembersList;
