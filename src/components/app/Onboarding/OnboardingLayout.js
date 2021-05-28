import React from "react";
import { Container, Col, ProgressBar, Row } from "react-bootstrap";
import Logo from "../base/Header/svgs/logo.svg";
import "./onboardingLayout.scss";
import clsx from "clsx";

const OnboardingLayout = ({ children, now, title, subtitle }) => {
  return (
    <Container>
      <Row className={clsx("layout--header", !now && "layout--header-welcome")}>
        <div className="layout--header-background"></div>
        <Col md="12" className="layout--header-logo">
          <span>
            <img src={Logo} alt="CMOList brand logo" width="170" />
            <span className="header--tag">Beta</span>
          </span>
        </Col>
        {now > 0 && (
          <Col md="12">
            <div className="d-flex justify-content-around">
              <div className={`${now >= 50 ? "font-weight-bold" : ""}`}>
                Create your profile
              </div>
              <div className={`${now === 100 ? "font-weight-bold" : ""}`}>
                Personalize your experience
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span className="mr-3 font-weight-bold">Start</span>
              <ProgressBar
                now={now}
                className="w-100 mt-1"
                style={{ height: 15 }}
              />
              <span className="ml-3 font-weight-bold">Finish</span>
            </div>
          </Col>
        )}
      </Row>
      <Row className="layout--title">
        <Col md="12">{title}</Col>
        {subtitle && (
          <Col md="12" className="layout--subtitle">
            {subtitle}
          </Col>
        )}
      </Row>
      <Row className="layout--children">
        <Col md="12">{children}</Col>
      </Row>
    </Container>
  );
};

export default OnboardingLayout;
