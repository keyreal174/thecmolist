import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const AllMembersList = ({ list }) => {
  return (
    <>
      {list.length > 0 &&
        list.map(({ image, name, role, link }, index) => {
          return (
            <Link
              to={link}
              key={index}
              onClick={() => {
                window.location.href = link;
              }}
            >
              <Avatar image={image} heading={name} subHeading={role} />
            </Link>
          );
        })}
    </>
  );
};

export default AllMembersList;
