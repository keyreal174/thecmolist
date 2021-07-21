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
          <img className="carousel-section-icon" src={Icon1} alt="First Icon" />
          <h3 className="carousel-section-title">
            Get trusted advice from your marketing peers
          </h3>
          <p className="carousel-section-content">
            Exchange frank, private advice with your peers, trusted communities,
            and industry experts
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-center carousel-section">
          <img
            className="carousel-section-icon"
            src={Icon2}
            alt="Second Icon"
          />
          <h3 className="carousel-section-title">
            View marketing stacks and playbooks
          </h3>
          <p className="carousel-section-content">
            Browse proven marketing stacks and playbooks shared by your peers
            and industry experts
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-center carousel-section">
          <img className="carousel-section-icon" src={Icon3} alt="Third Icon" />
          <h3 className="carousel-section-title">
            Stay informed & learn from leading marketers
          </h3>
          <p className="carousel-section-content">
            Network with your peers and follow marketing insights from industry
            experts
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
