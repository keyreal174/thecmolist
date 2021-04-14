import React, { useState, useEffect } from "react";
import OnboardingLayout from "./OnboardingLayout";
import CustomCard from "../base/CustomCard/CustomCard";
import {
  Col,
  Row,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import "./onboardingStep2.scss";
import { useHistory } from "react-router";

const OnboardingStep2 = ({
  categories,
  getCategories,
  submitOnboardingStep2,
}) => {
  const [value, setValue] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchCategories = async () => await getCategories();
    fetchCategories();
  }, []);

  useEffect(() => {
    const selectedValues = categories
      .filter((c) => c.selected)
      .map((c) => c.value);
    setValue(selectedValues);
  }, [categories]);

  const pils = categories.map((c) => c.value);

  const handleButtonClick = () => {
    setShowMore(!showMore);
  };

  const handleChange = (value) => setValue(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    submitOnboardingStep2(value);
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
          <Col
            className="onboarding--done-wrapper d-flex justify-content-end"
            md="12"
          >
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

const mapState = (state) => ({
  categories: state.onboardingModel.categories,
});

const mapDispatch = (dispatch) => {
  return {
    getCategories: dispatch.onboardingModel.getCategories,
    submitOnboardingStep2: dispatch.onboardingModel.submitOnboardingStep2,
  };
};

export default connect(mapState, mapDispatch)(OnboardingStep2);
