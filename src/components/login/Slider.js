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
          <img
            className="carousel-section-icon"
            src={Icon1}
            alt="Network icon"
          />
          <h3 className="carousel-section-title">
            World-class network of CMOs
          </h3>
          <p className="carousel-section-content">
            Only for heads of marketing from hyper-growth companies. Every
            member is carefully vetted.
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
            Strategic guides and playbooks
          </h3>
          <p className="carousel-section-content">
            Access best practices shared by your peers, ranging from strategic
            planning to creating your operating cadence and preparing for an
            IPO.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-center carousel-section">
          <img className="carousel-section-icon" src={Icon2} alt="Stack icon" />
          <h3 className="carousel-section-title">
            Shared directory of trusted vendors
          </h3>
          <p className="carousel-section-content">
            Browse & search 1000s of proven consultants, agencies, and
            technology vendors in 80 categories, recommended by other CMOs.
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
