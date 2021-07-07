import React from "react";
import clsx from "clsx";
import ShowMoreText from "react-show-more-text";
import "./Avatar.scss";

const Avatar = ({ image, heading, subHeading, text, isConnection, link }) => {
  return (
    <div className="avatar-wrapper">
      <div className="avatar-thumb">
        <a href={link}>
          <img
            className="rounded-circle"
            src={image}
            width="39"
            height="39"
            alt="avatar"
          />
        </a>
      </div>
      <div className="avatar-content">
        <div className={clsx(isConnection && "d-flex align-items-center")}>
          <a href={link}>
            <h6
              className={clsx(
                "avatar-content-heading mb-1",
                isConnection && "mr-1"
              )}
            >
              {heading}
            </h6>
          </a>
          <p
            className={clsx(
              "avatar-content-subheading",
              isConnection && "mb-1"
            )}
          >
            {isConnection && " - "}
            {subHeading}
          </p>
        </div>
        {isConnection && (
          <p className="avatar-content-text font-italic">{text}</p>
        )}
      </div>
    </div>
  );
};

export default Avatar;
