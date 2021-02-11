import React from "react";
import "./CustomCard.scss";

const CustomCard = ({ heading, children }) => {
  return (
    <div className="custom-card">
      <div className="custom-card-header">{heading}</div>
      <div className="custom-card-body">{children}</div>
    </div>
  );
};

export default CustomCard;
