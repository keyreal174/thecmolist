import React from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import ShowMoreText from "react-show-more-text";
import "./Avatar.scss";

const Avatar = ({ image, heading, subHeading, text, isConnection, link }) => {
  const history = useHistory();
  const goStack = () => {
    isConnection
      ? history.push({
          pathname: link,
          state: {
            myStack: true,
          },
        })
      : history.push(link);
  };

  return (
    <div className="avatar-wrapper">
      <div className="avatar-thumb">
        <a onClick={goStack} className="cursor-pointer">
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
            onClick={goStack}
            className={clsx(
              "avatar-content-heading cursor-pointer",
              isConnection && "mr-1"
            )}
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
