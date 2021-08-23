import React, { useState, useEffect } from "react";
import OnboardingLayout from "./OnboardingLayout";
import CustomCard from "../base/CustomCard/CustomCard";
import { Alert, Col, Form, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./onboardingStep2.scss";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import AddVendors from "../base/AddVendors/AddVendors";
import AddSkills from "../base/AddSkills/AddSkills";
import AddTopics from "../base/AddTopics/AddTopics";

const OnboardingStep2 = ({
  categories,
  getCategories,
  submitOnboardingStep2,
  getProfileStats,
  profileStats,
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
    const fetchProfileStats = async () => await getProfileStats();
    fetchProfileStats();
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
    e && e.preventDefault();
    const isAfilliated =
      profileStats &&
      profileStats.profile &&
      profileStats.profile.groups &&
      profileStats.profile.groups.length > 0;
    let shouldShow = isAfilliated ? intro.length === 0 && !showGetIntro : false;
    setLoading(false);
    if (shouldShow) {
      setShowGetIntro(true);
    } else {
      if (intro.length === 0 && isAfilliated) {
        setIntroError("Please enter an introduction");
      } else {
        setIntroError("");
        setLoading(true);
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
          history.push({
            pathname: redirectUrl,
            state: { onboarded: true },
          });
        });
      }
    }
  };

  const handleAddTopicsSubmit = async () => {
    // map value to slug
    let userCategories = [];
    value.forEach((v) => {
      let category = categories.filter((c) => c.value === v);
      if (category.length > 0) {
        userCategories.push(category[0].slug || category[0].value);
      }
    });
    await submitOnboardingStep2({
      categories: userCategories,
      intro: intro,
      options: selectedOptions,
    });
  };

  return (
    <OnboardingLayout
      now={step === 1 ? 75 : 100}
      title={
        showGetIntro
          ? "Finally..."
          : step === 1
          ? "Select topics you would like to learn more about from your peers"
          : "One last step: Share 3 of your favorite marketing tools or agencies with your peers"
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
              <div className="onboarding--card-content">
                <AddTopics
                  value={value}
                  pils={pils}
                  showMore={showMore}
                  handleChange={handleChange}
                  handleButtonClick={handleButtonClick}
                  handleAddTopicsSubmit={handleAddTopicsSubmit}
                  submitAfter={() => setStep(2)}
                />
              </div>
            </CustomCard>
          ) : (
            <CustomCard className="onboarding--card fadeAndSlideElementInFast">
              <div className="onboarding--card-content p-4">
                {/* <AddSkills submitAfter={() => handleSubmit()} /> */}
                <AddVendors
                  submitBefore={() => setLoading(true)}
                  submitAfter={() => handleSubmit()}
                />
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
                form={step === 1 ? "form-add-topics" : "form-add-vendors"}
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
  profileStats: state.profileModel.profileStats,
});

const mapDispatch = (dispatch) => {
  return {
    getCategories: dispatch.onboardingModel.getCategories,
    submitOnboardingStep2: dispatch.onboardingModel.submitOnboardingStep2,
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(OnboardingStep2);
