import React from "react";
import { Button } from "react-bootstrap";
import "./engagementButtons.scss";

const EngagementButtons = ({
  className,
  engagementButtons,
  onEngagementButtonClick,
}) => {
  return engagementButtons && engagementButtons.length ? (
    <div className={`engagement-buttons ${className}`}>
      {engagementButtons &&
        engagementButtons.map(
          ({ text, icon, iconChecked, number, checked }, index) => {
            let auxIcon = icon;
            if (checked && iconChecked) {
              auxIcon = iconChecked;
            }
            return (
              <div key={text}>
                <Button
                  className={`engagement-buttons-button ${
                    checked ? "checked" : ""
                  }`}
                  variant="light"
                  onClick={onEngagementButtonClick.bind(this, text)}
                >
                  <img
                    alt={`Icon for button ${index}`}
                    className="engagement-buttons-image"
                    src={auxIcon}
                  />
                  <span>{text}</span>
                  {number > 0 && <span>{` (${number}) `}</span>}
                </Button>
              </div>
            );
          }
        )}
    </div>
  ) : null;
};

export default EngagementButtons;
