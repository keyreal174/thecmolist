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
import AddIntro from "../base/AddIntro/AddIntro";
import InviteForm from "../base/Invite/InviteForm";

const OnboardingStep2 = ({ getProfileStats, profileStats }) => {
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const history = useHistory();

  const isAfilliated =
    profileStats &&
    profileStats.profile &&
    profileStats.profile.groups &&
    profileStats.profile.groups.length > 0;

  const getTitle = () => {
    if (showFinalStep) {
      if (isAfilliated) {
        return "Finally...";
      } else {
        return "Finally: please invite one other marketer whose advice you trust";
      }
    } else if (step === 1) {
      return "Step 1 of 3: Select topics you would like to learn more about from your peers";
    } else if (step === 2) {
      return "Step 2 of 3: Share three of your favorite marketing tools or agencies with your peers";
    }
    return "";
  };

  const getSubTitle = () => {
    if (showFinalStep) {
      if (isAfilliated) {
        return "";
      } else {
        return "Learn from their marketing stack and be able to ask them for advice";
      }
    } else {
      return "You can also add or update this information later";
    }
  };

  useEffect(() => {
    const fetchProfileStats = async () => await getProfileStats();
    fetchProfileStats();
  }, []);

  const finalizeOnboarding = (e) => {
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
  };

  const finishFinalStep = (e) => {
    e && e.preventDefault();
    setLoading(false);
    setShowFinalStep(true);
  };

  return (
    <OnboardingLayout
      now={step === 1 ? 75 : 100}
      title={getTitle()}
      subtitle={getSubTitle()}
    >
      <>
        <CSSTransition
          in={showFinalStep}
          timeout={400}
          classNames="list-transition"
        >
          {showFinalStep ? (
            <CustomCard className="onboarding--card">
              {isAfilliated ? (
                <AddIntro
                  submitBefore={() => setLoading(true)}
                  submitAfter={() => finalizeOnboarding()}
                />
              ) : (
                <div className="onboarding--card-invite">
                  <InviteForm
                    makeOptional
                    hideHeader={true}
                    hideSubmitButton={true}
                    submitAfter={() => finalizeOnboarding()}
                  />
                </div>
              )}
            </CustomCard>
          ) : (
            <div />
          )}
        </CSSTransition>
        {!showFinalStep &&
          (step === 1 ? (
            <CustomCard className="onboarding--card fadeAndSlideElementInFast">
              <div className="onboarding--card-content">
                <AddTopics submitAfter={() => setStep(2)} />
              </div>
            </CustomCard>
          ) : (
            <CustomCard className="onboarding--card fadeAndSlideElementInFast">
              <div className="onboarding--card-content p-4">
                {/* <AddSkills submitAfter={() => handleSubmit()} /> */}
                <AddVendors
                  submitBefore={() => setLoading(true)}
                  submitAfter={() => finishFinalStep()}
                />
              </div>
            </CustomCard>
          ))}
        <Row>
          <Col
            className="onboarding--done-wrapper d-flex justify-content-end"
            md="12"
          >
            {showFinalStep && !isAfilliated && (
              <Button
                className="mt-3 btn-white modal-cancel-button onboarding--button-skip"
                onClick={() => finalizeOnboarding()}
                style={{ marginRight: "10px" }}
              >
                Skip
              </Button>
            )}
            {showFinalStep ? (
              <Button
                className="mt-3 onboarding--button"
                disabled={loading}
                type="submit"
                form={isAfilliated ? "form-add-intro" : "invite-modal"}
              >
                {isAfilliated ? "Done" : "Invite"}
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
  profileStats: state.profileModel.profileStats,
});

const mapDispatch = (dispatch) => {
  return {
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(OnboardingStep2);
