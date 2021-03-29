import React from "react";
import { Button } from "react-bootstrap";
import "./engagementButtons.scss";

export const getCheckedForEngagementType = (
  contentId,
  engagementType,
  reactions
) => {
  let checked = false;

  (
    (reactions && reactions[contentId] && reactions[contentId].reactions) ||
    []
  ).forEach((r) => {
    if (r.type === engagementType) {
      checked = r.checked;
    }
  });
  return checked;
};

export const getEngagementForId = (contentId, engagementType, reactions) => {
  return (
    reactions &&
    reactions[contentId] &&
    reactions[contentId][`num_${engagementType}`]
  );
};

const EngagementButtons = ({
  className,
  engagementButtons,
  onEngagementButtonClick,
}) => {
  return engagementButtons && engagementButtons.length ? (
    <div className={`engagement-buttons ${className}`}>
      {engagementButtons &&
        engagementButtons.map(
          ({ text, type, icon, iconChecked, number, checked }, index) => {
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
                  onClick={onEngagementButtonClick.bind(this, type, text)}
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
