import React from "react";
import "./CustomCard.scss";

const CustomCard = ({ heading, seeAll, className, children }) => {
  return (
    <div className={`custom-card ${className}`}>
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
