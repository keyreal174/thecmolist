import React from "react";
import clsx from "clsx";
import "./CustomCard.scss";

const CustomCard = ({ heading, seeAll, className, children }) => {
  return (
    <div className={clsx("custom-card", className)}>
      {heading && <div className="custom-card-header">{heading}</div>}
      <div className="custom-card-body">{children}</div>
      {seeAll && (
        <div className="custom-card-footer">
          <a role="button" tabIndex="0" className="see-all-button">
            See all
          </a>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
