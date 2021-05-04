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
  showStats = true,
  numberOfViews,
  numberOfLikes,
  numberOfInsightfull,
}) => {
  return engagementButtons && engagementButtons.length ? (
    <div className={`engagement-buttons--wrapper ${className}`}>
      <div className="engagement-buttons--items">
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
                    className={`engagement-buttons--item ${
                      checked ? "checked" : ""
                    }`}
                    variant="light"
                    onClick={onEngagementButtonClick.bind(this, type, text)}
                  >
                    <img
                      alt={`Icon for button ${index}`}
                      className="engagement-buttons--item-image"
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
      {engagementButtons && showStats && (
        <div className="engagement-buttons--stats">
          {numberOfViews && (
            <Button variant="link">{`${numberOfViews} Views`}</Button>
          )}
          {numberOfLikes && (
            <Button variant="link">{`${numberOfLikes} Likes`}</Button>
          )}
          {numberOfInsightfull && (
            <Button variant="link">{`${numberOfInsightfull} Insightfull`}</Button>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default EngagementButtons;
