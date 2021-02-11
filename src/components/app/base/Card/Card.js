import React from "react";
import "./card.scss";

const Card = ({ children, className, title }) => {
  return (
    <div className={`card--wrapper ${className}`}>
      <div className="card--title">{title}</div>
      <div className="card--children">{children}</div>
    </div>
  );
};

export default Card;
