import React from "react";
import clsx from "clsx";
import "./CustomCard.scss";

const CustomCard = ({ heading, seeAllLink, className, children }) => {
  return (
    <div className={clsx("custom-card", className)}>
      {heading && <div className="custom-card-header">{heading}</div>}
      <div className="custom-card-body">{children}</div>
      {seeAllLink && (
        <div className="custom-card-footer">
          <a
            role="button"
            href={seeAllLink}
            tabIndex="0"
            className="see-all-button"
          >
            See all
          </a>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
