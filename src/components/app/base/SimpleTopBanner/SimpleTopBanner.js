import React from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../CustomCard/CustomCard";
import "./simpleTopBanner.scss";

const NetworkTopBanner = ({ buttonText, className, onClick, image, title }) => {
  return (
    <div className={`simple-top-banner simple-top-banner mt-3 ${className}`}>
      <CustomCard className="simple-top-banner--wrapper mb-0">
        <div className="py-3 px-1">
          {image && image.length > 0 && (
            <div className="simple-top-banner--img">
              <img src={image} alt="Logo" width="100" height="100" />
            </div>
          )}
          <h3 className="simple-top-banner--text">{title}</h3>
          {buttonText && (
            <Button
              className="simple-top-banner--button btn-blue mb-2 mt-3"
              onClick={onClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </CustomCard>
    </div>
  );
};

export default NetworkTopBanner;
