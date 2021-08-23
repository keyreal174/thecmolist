import React from "react";
import clsx from "clsx";
import "./CustomCard.scss";

const CustomCard = ({
  heading,
  subheading,
  customHeading,
  seeAllLink,
  className,
  children,
}) => {
  return (
    <div className={clsx("custom-card", className)}>
      {customHeading ? (
        <div className="custom-card-header">{customHeading}</div>
      ) : (
        <>
          {heading && (
            <div className="custom-card-header">
              {heading}

              {subheading && (
                <div className="custom-card-subheading">{subheading}</div>
              )}
            </div>
          )}
        </>
      )}
      <div className="custom-card-body">{children}</div>
      {seeAllLink && (
        <div className="custom-card-footer">
          <a
            role="button"
            href={seeAllLink}
            tabIndex="0"
            className="see-all-button"
          >
            See all
          </a>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
