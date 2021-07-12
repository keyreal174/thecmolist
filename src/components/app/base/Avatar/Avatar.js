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
        <div className={clsx(isConnection && "avatar-content-connections")}>
          <a
            href={link}
            className={clsx("avatar-content-heading", isConnection && "mr-1")}
          >
            <span className="ellipsis-line">{heading}</span>
          </a>
          <p
            className={clsx(
              "avatar-content-subheading ellipsis-line",
              isConnection && "avatar-content-subheading-isConnection"
            )}
          >
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
