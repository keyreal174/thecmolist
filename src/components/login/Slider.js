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
            Find the best marketing tools and agencies
          </h3>
          <p className="carousel-section-content">
            View proven & emerging marketing vendors shared by leading startups
            and public companies
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-center carousel-section">
          <img
            className="carousel-section-icon"
            src={Icon3}
            alt="Knowledge icon"
          />
          <h3 className="carousel-section-title">
            Ask for advice and search knowledge
          </h3>
          <p className="carousel-section-content">
            Post marketing questions and search answers shared by the world's
            best marketers
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
            Accelerate your marketing career
          </h3>
          <p className="carousel-section-content">
            Network with other top marketers and find career, advisor, and board
            opportunities
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
