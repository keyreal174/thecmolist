import React, { useState, useEffect } from "react";
import OnboardingLayout from "./OnboardingLayout";
import CustomCard from "../base/CustomCard/CustomCard";
import {
  Alert,
  Col,
  Form,
  Row,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import "./onboardingStep2.scss";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import AddVendors from "../base/AddVendors/AddVendors";
import AddSkills from "../base/AddSkills/AddSkills";
const RenderCMOList = ({
  value,
  handleChange,
  pils,
  handleButtonClick,
  showMore,
}) => {
  return (
    <>
      <Row className="onboarding--pill-wrapper">
        <Col md="12">
          <ToggleButtonGroup
            className="d-flex flex-wrap"
            type="checkbox"
            value={value}
            onChange={handleChange}
          >
            {pils.map((p, index) => {
              if (index < 12 || showMore) {
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
    </>
  );
};

const OnboardingStep2 = ({
  categories,
  getCategories,
  submitOnboardingStep2,
  getProfileStats,
}) => {
  const [value, setValue] = useState([]);
  const [introError, setIntroError] = useState("");
  const [intro, setIntro] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showGetIntro, setShowGetIntro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const introOptions = [
    "Get marketing advice",
    "Build my marketing network",
    "Stay in touch with my peers",
    "Share my expertise",
    "Learn about new marketing trends",
    "Find advisor or board roles",
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
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
    if (intro.length === 0 && !showGetIntro) {
      setShowGetIntro(true);
    } else {
      if (intro.length === 0) {
        setIntroError("Please enter an introduction");
      } else {
        setIntroError("");
        setLoading(true);
        // map value to slug
        let userCategories = [];
        value.forEach((v) => {
          let category = categories.filter((c) => c.value === v);
          if (category.length > 0) {
            userCategories.push(category[0].slug || category[0].value);
          }
        });
        submitOnboardingStep2({
          categories: userCategories,
          intro: intro,
          options: selectedOptions,
        });
        // refresh profile stats
        getProfileStats().then(() => {
          setLoading(false);
          let redirectUrl = "/feed";
          if (window.location.search) {
            redirectUrl = window.location.search.replace("?r=", "");
            try {
              redirectUrl = window.atob(redirectUrl);
            } catch (e) {
              console.log("Unexpected - url not encoded: " + redirectUrl);
            }
          }
          history.push(redirectUrl);
        });
      }
    }
  };

  return (
    <OnboardingLayout
      now={step === 1 ? 75 : 100}
      title={
        showGetIntro
          ? "One last step..."
          : step === 1
          ? "Please select three areas of expertise for which you could provide advice to your trusted peers"
          : "Please share five or more of your most impactful marketing tools with your trusted peers"
      }
      subtitle={
        showGetIntro
          ? null
          : "You can also add or update this information later"
      }
    >
      <>
        <CSSTransition
          in={showGetIntro}
          timeout={400}
          classNames="list-transition"
        >
          {showGetIntro ? (
            <CustomCard className="onboarding--card">
              <Row className="onboarding--pill-head">
                <Col>
                  <Form.Label>
                    How can CMOlist help you be more successful?
                  </Form.Label>
                </Col>
              </Row>
              <Row className="onboarding--pill-mid">
                {introOptions.map((o, idx) => (
                  <Col key={idx} md="6" sm="12" className="d-flex mb-2">
                    <div className="onboarding--pill-check">
                      <Form.Check
                        className=""
                        type="checkbox"
                        label=""
                        name={o}
                        value={o}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOptions(
                              selectedOptions.concat([e.target.value])
                            );
                          } else {
                            setSelectedOptions(
                              selectedOptions.filter(
                                (o) => o !== e.target.value
                              )
                            );
                          }
                        }}
                      />
                    </div>
                    <span>{o}</span>
                  </Col>
                ))}
              </Row>
              <Row className="onboarding--pill-wrapper">
                <Col>
                  <Form.Label>
                    Please introduce yourself to your peers
                  </Form.Label>
                  {introError && introError.length > 0 && (
                    <Alert className="mb-1 mt-1" variant="danger">
                      {introError}
                    </Alert>
                  )}

                  <Form.Control
                    as="textarea"
                    className="profile--textarea"
                    rows="3"
                    placeholder=""
                    value={intro}
                    onChange={(e) => {
                      setIntroError("");
                      setIntro(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </CustomCard>
          ) : (
            <div />
          )}
        </CSSTransition>
        {!showGetIntro &&
          (step === 1 ? (
            <CustomCard className="onboarding--card fadeAndSlideElementInFast">
              <div className="p-4">
                <AddSkills submitAfter={() => setStep(2)} />
              </div>
            </CustomCard>
          ) : (
            <CustomCard className="onboarding--card fadeAndSlideElementInFast">
              <div className="p-4">
                <AddVendors submitAfter={() => setShowGetIntro(true)} />
              </div>
            </CustomCard>
          ))}
        <Row>
          <Col
            className="onboarding--done-wrapper d-flex justify-content-end"
            md="12"
          >
            {showGetIntro ? (
              <Button
                className="mt-3 onboarding--button"
                onClick={handleSubmit}
                disabled={loading}
              >
                Done
              </Button>
            ) : (
              <Button
                className="mt-3 onboarding--button"
                disabled={loading}
                type="submit"
                form={step === 1 ? "form-add-skills" : "form-add-vendors"}
              >
                Continue
              </Button>
            )}
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
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(OnboardingStep2);
