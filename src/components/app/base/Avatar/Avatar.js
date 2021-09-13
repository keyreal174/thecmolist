import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import ShowMoreText from "react-show-more-text";
import "./Avatar.scss";

const Avatar = ({ image, heading, subHeading, text, isConnection, link }) => {
  return (
    <div className="avatar-wrapper">
      <div className="avatar-thumb">
        <Link
          className="cursor-pointer"
          to={{
            pathname: link,
            state: isConnection ? { myStack: true } : null,
          }}
        >
          <img
            className="rounded-circle"
            src={image}
            width="39"
            height="39"
            alt="avatar"
          />
        </Link>
      </div>
      <div className="avatar-content">
        <div className={clsx(isConnection && "avatar-content-connections")}>
          <Link
            className={clsx(
              "avatar-content-heading cursor-pointer",
              isConnection && "mr-1"
            )}
            to={{
              pathname: link,
              state: isConnection ? { myStack: true } : null,
            }}
          >
            <span className="ellipsis-line">{heading}</span>
          </Link>
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
