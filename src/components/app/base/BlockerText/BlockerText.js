import React from "react";
import "./BlockerText.scss";

const BlockerText = ({ blockerText, children }) => {
  return (
    <div>
      <div className="add-vendor-blocker-modal">
        <p>{blockerText}</p>
        <div className="filter-btn-group">{children}</div>
      </div>
      <div className="add-vendor-blocker-opacity"></div>
    </div>
  );
};

export default BlockerText;
