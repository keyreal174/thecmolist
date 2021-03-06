import React from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../CustomCard/CustomCard";
import bannerBackground from "./svgs/banner-background.svg";
import bannerBackgroundSmall from "./svgs/banner-background-small.svg";
import "./simpleTopBanner.scss";

const NetworkTopBanner = ({
  buttonText,
  className,
  onClick,
  image,
  subtitle,
  title,
}) => {
  return (
    <div className={`simple-top-banner mt-3 ${className}`}>
      <CustomCard className="simple-top-banner--wrapper mb-0">
        <div className="py-3 px-1">
          {image && image.length > 0 && (
            <div className="simple-top-banner--img">
              <img src={image} alt="Logo" width="100" height="100" />
            </div>
          )}
          <h3 className="simple-top-banner--text">{title}</h3>
          {title && title.length > 0 && subtitle && subtitle.length > 0 && (
            <div className="simple-top-banner--subtitle">{subtitle}</div>
          )}
          {buttonText && (
            <Button
              className="simple-top-banner--button btn-white mb-2 mt-3"
              onClick={onClick}
            >
              {buttonText}
            </Button>
          )}
          <img
            className="simple-top-banner--background-image"
            alt="top banner background"
            src={
              window.innerWidth < 768 ? bannerBackgroundSmall : bannerBackground
            }
          />
        </div>
      </CustomCard>
    </div>
  );
};

export default NetworkTopBanner;
