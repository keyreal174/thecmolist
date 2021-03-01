import React, { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import CustomCard from "../base/CustomCard/CustomCard";
import {
  Col,
  Row,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import "./onboardingStep2.scss";
import { useHistory } from "react-router";

const OnboardingStep2 = () => {
  const pils = [
    "leadership",
    "marketing",
    "advertising",
    "seo",
    "digital-strategy",
    "corporate-communications",
    "brand",
    "saas",
    "media-planning",
    "ecommerce",
    "blockchain",
    "media-planning",
    "martech",
    "news",
    "ecommerce-marketing",
    "b2b",
    "content-marketing",
    "design",
    "event-marketing",
    "inbound-marketing",
    "social-media-marketing",
    "marketing-analytics",
    "influencer-marketing",
  ];

  const [showMore, setShowMore] = useState(false);
  const handleButtonClick = () => {
    setShowMore(!showMore);
  };

  const [value, setValue] = useState([
    "leadership",
    "marketing",
    "advertising",
    "news",
    "ecommerce-marketing",
  ]);
  const handleChange = (value) => setValue(value);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("submiting values:", value);
    history.push("/feed");
    setLoading(false);
  };
  return (
    <OnboardingLayout
      now={100}
      title="One last step: select marketing topics you would like to discouss to learn about form your peers"
    >
      <>
        <CustomCard className="onboarding--card">
          <Row className="onboarding--pill-wrapper">
            <Col md="12">
              <ToggleButtonGroup
                className="d-flex flex-wrap"
                type="checkbox"
                value={value}
                onChange={handleChange}
              >
                {pils.map((p, index) => {
                  if (index < 13 || showMore) {
                    return (
                      <ToggleButton
                        value={p}
                        className="onboarding--pill"
                      >{`#${p}`}</ToggleButton>
                    );
                  }
                })}
              </ToggleButtonGroup>
            </Col>
          </Row>
          <Row className="position-relative">
            <Col md="12" className="d-flex justify-content-center">
              <div className="onboarding--divider"></div>
              <Button
                variant="link"
                className="onboarding--show-more"
                onClick={handleButtonClick}
              >
                {showMore ? "Show Less" : "Show more"}
              </Button>
            </Col>
          </Row>
        </CustomCard>
        <Row>
          <Col className="d-flex justify-content-end" md="12">
            <Button
              className="mt-3 onboarding--done"
              onClick={handleSubmit}
              disabled={loading}
            >
              Done
            </Button>
          </Col>
        </Row>
      </>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;
