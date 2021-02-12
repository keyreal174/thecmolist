import React from "react";
import { Button } from "react-bootstrap";
import "./CustomCard.scss";

const CustomCard = ({ heading, seeAll, children }) => {
  return (
    <div className="custom-card">
      <div className="custom-card-header">{heading}</div>
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
