import React from "react";
import { Carousel } from "react-bootstrap";
import Icon1 from "./icons/Login-Icon1.svg";
import Icon2 from "./icons/Login-Icon2.svg";
import Icon3 from "./icons/Login-Icon3.svg";
import NextIcon from "./icons/arrow-circle-right.svg";
import PrevIcon from "./icons/arrow-circle-left.svg";
import "./Slider.scss";

const Slider = () => {
  const NextButton = <img src={NextIcon} className="" />;
  const PrevButton = <img src={PrevIcon} className="" />;

  return (
    <Carousel nextIcon={NextButton} prevIcon={PrevButton}>
      <Carousel.Item>
        <div className="text-center carousel-section">
          <img className="carousel-section-icon" src={Icon2} alt="Stack icon" />
          <h3 className="carousel-section-title">
            View and share proven marketing stacks
          </h3>
          <p className="carousel-section-content">
            Browse trusted marketing tools, agencies, and contractors shared by
            leading startups and public companies
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-center carousel-section">
          <img
            className="carousel-section-icon"
            src={Icon3}
            alt="Knowlege icon"
          />
          <h3 className="carousel-section-title">
            Find and contribute marketing knowledge
          </h3>
          <p className="carousel-section-content">
            Ask for advice and contribute your experise to building the
            definitive collection of marketing questions & answers
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-center carousel-section">
          <img
            className="carousel-section-icon"
            src={Icon1}
            alt="Network icon"
          />
          <h3 className="carousel-section-title">
            Connect & collaborate with your peers
          </h3>
          <p className="carousel-section-content">
            Create private spaces to manage and share marketing knowledge with
            your trusted peers or employees
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
