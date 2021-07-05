import React from "react";
import clsx from "clsx";
import ShowMoreText from "react-show-more-text";
import "./Avatar.scss";

const Avatar = ({ image, heading, subHeading, text, isConnection }) => {
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
        <div className={clsx(isConnection && "d-flex align-items-center")}>
          <h6
            className={clsx(
              "avatar-content-heading mb-1",
              isConnection && "mr-1"
            )}
          >
            {heading}
            {isConnection && " - "}
          </h6>
          <p
            className={clsx(
              "avatar-content-subheading",
              isConnection && "mb-1"
            )}
          >
            {subHeading}
          </p>
        </div>
        {isConnection && (
          <p className="avatar-content-text">
            <ShowMoreText lines={1} more="See more" less="" width={0}>
              {text}
            </ShowMoreText>
          </p>
        )}
      </div>
    </div>
  );
};

export default Avatar;
