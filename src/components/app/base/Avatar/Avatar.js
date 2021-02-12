import React from "react";
import "./Avatar.scss";

const Avatar = ({ image, heading, subHeading }) => {
  return (
    <div className="avatar-wrapper">
      <div className="avatar-thumb">
        <img
          className="rounded-circle"
          src={image}
          width="39"
          height="39"
          alt="avatar"
        />
      </div>
      <div className="avatar-content">
        <h6 className="avatar-content-heading mb-1">{heading}</h6>
        <p className="avatar-content-subheading">{subHeading}</p>
      </div>
    </div>
  );
};

export default Avatar;
