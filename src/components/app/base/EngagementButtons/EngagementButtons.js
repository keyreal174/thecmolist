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

const EngagementStats = ({
  numberOfInsightful,
  numberOfLikes,
  onStatButtonClick,
  showStats,
}) => {
  return (
    <div className="engagement-stats--wrapper">
      {showStats && (
        <>
          <EngagementStat
            handleClick={onStatButtonClick}
            value={numberOfLikes}
            text="Likes"
          />
          <EngagementStat
            handleClick={onStatButtonClick}
            value={numberOfInsightful}
            text="Insightful"
          />
        </>
      )}
    </div>
  );
};

const EngagementStat = ({ handleClick, value, text }) => {
  const textToLowerCase = text && text.toLowerCase();
  let displayText = "";
  if (!text || !value) {
    return <span />;
  }
  if (text && text.length > 0) {
    displayText = " ".concat(text);
    if (value === 1 && displayText.endsWith("s")) {
      displayText = displayText.slice(0, -1);
    }
  }
  return (
    <>
      {value && (
        <Button
          className="engagement-stat--wrapper"
          onClick={(contentId) => handleClick(textToLowerCase, contentId)}
          variant="link"
        >
          <span>
            <strong className="engagement-stat--value">{value}</strong>
            {displayText}
          </span>
        </Button>
      )}
    </>
  );
};

const EngagementButtons = ({
  className,
  engagementButtons,
  numberOfInsightful,
  numberOfLikes,
  onEngagementButtonClick,
  onStatButtonClick,
  showStats,
}) => {
  return engagementButtons && engagementButtons.length ? (
    <div className={`engagement-buttons--wrapper ${className}`}>
      <EngagementStats
        numberOfInsightful={numberOfInsightful}
        numberOfLikes={numberOfLikes}
        onStatButtonClick={onStatButtonClick}
        showStats={showStats}
      />
      <div className="engagement-buttons--items">
        {engagementButtons.map(
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
    </div>
  ) : null;
};

export default EngagementButtons;
