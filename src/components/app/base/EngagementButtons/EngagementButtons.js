import React from "react";
import { Button } from "react-bootstrap";
import "./engagementButtons.scss";

const EngagementButtons = ({
  className,
  engagementButtons,
  onEngagementButtonClick,
}) => {
  return (
    <div className={`engagement-buttons ${className}`}>
      {engagementButtons &&
        engagementButtons.map(({ text, icon, number, checked }, index) => {
          return (
            <div key={text}>
              <Button
                className={`engagement-buttons-button ${
                  checked ? "checked" : ""
                }
                  ${
                    text === "Answer"
                      ? "engagement-buttons-button__higlighted"
                      : ""
                  }`}
                variant="light"
                onClick={onEngagementButtonClick.bind(this, text)}
              >
                <img
                  alt={`Icon for button ${index}`}
                  className="engagement-buttons-image"
                  src={icon}
                />
                <span>{text}</span>
                {number > 0 && <span>{` (${number}) `}</span>}
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default EngagementButtons;
