import React from "react";
import { Button } from "react-bootstrap";
import "./engagementButtons.css";

const EngagementButtons = ({ engagementButtons, onEngagementButtonClick }) => {
  return (
    <div className="engagement-buttons">
      {engagementButtons &&
        engagementButtons.map(({ text, icon, number }, index) => {
          return (
            <div key={text}>
              <Button
                className="engagement-buttons-button"
                variant="light"
                onClick={onEngagementButtonClick.bind(this, text)}
                style={{ margin: "0 10px 0 0" }}
              >
                <img
                  alt={`Icon for button ${index}`}
                  className="engagement-buttons-image"
                  src={icon}
                />
                <span>{text}</span>
                {number && <span>{` (${number}) `}</span>}
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default EngagementButtons;
