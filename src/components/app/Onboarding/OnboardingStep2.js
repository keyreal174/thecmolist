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
  const [groupName, setGroupName] = useState("");
  const history = useHistory();

  const isAfilliated =
    profileStats &&
    profileStats.profile &&
    profileStats.profile.groups &&
    profileStats.profile.groups.length > 0;
  if (isAfilliated && groupName.length === 0) {
    setGroupName(profileStats.profile.groups[0].name);
  }

  const getTitle = () => {
    if (showFinalStep) {
      if (isAfilliated) {
        return "Connect with your fellow CMOs";
      } else {
        return "Connect with your fellow CMOs";
      }
    } else if (step === 1) {
      return "Select topics you would like to learn more about or discuss with other CMOs";
    } else if (step === 2) {
      return "One last step: Share your favorite marketing tools, agencies, or consultants with your peers";
    }
    return "";
  };

  const getSubTitle = () => {
    if (showFinalStep) {
      if (isAfilliated) {
        return "";
      } else {
        return "";
      }
    } else {
      return "You can also add or update this information later";
    }
  };

  const finalizeOnboarding = (e) => {
    setLoading(true);
    // refresh profile stats
    getProfileStats().then(() => {
      setLoading(false);
      let redirectUrl = "/";
      if (window.location.search) {
        redirectUrl = window.location.search.replace("?r=", "");
        try {
          redirectUrl = window.atob(redirectUrl);
        } catch (e) {
          console.log("Unexpected - url not encoded: " + redirectUrl);
        }
      }
      const redirectUrlParsed = new URL(
        redirectUrl,
        `
        ${window.location.protocol}//${window.location.host}`
      );
      history.push({
        pathname: redirectUrlParsed.pathname,
        hash: redirectUrlParsed.hash,
        state: { onboarded: true },
      });
    });
  };

  const finishFinalStep = (e) => {
    e && e.preventDefault();
    setLoading(false);
    setShowFinalStep(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <OnboardingLayout
      now={step === 1 ? 75 : 100}
      title={getTitle()}
      subtitle={getSubTitle()}
      step={showFinalStep ? 3 : 2}
    >
      <>
        <CSSTransition
          in={showFinalStep}
          timeout={400}
          classNames="list-transition"
        >
          {showFinalStep ? (
            <CustomCard className="onboarding--card">
              <AddIntro
                groupName={groupName}
                submitBefore={() => setLoading(true)}
                submitAfter={() => finalizeOnboarding()}
              />
            </CustomCard>
          ) : (
            <div />
          )}
        </CSSTransition>
        {!showFinalStep &&
          (step === 1 ? (
            <CustomCard className="onboarding--card fadeAndSlideElementInFast">
              <div className="onboarding--card-content">
                <AddTopics
                  submitAfter={() => {
                    // we are running a test now where we skip showing
                    // add vendors during onboarding
                    const isTreatedForSkipAddVendorsTest = true;
                    if (isTreatedForSkipAddVendorsTest) {
                      finishFinalStep();
                    } else {
                      if (isAfilliated) {
                        finishFinalStep();
                      } else {
                        setStep(2);
                      }
                    }
                  }}
                />
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
            {showFinalStep ? (
              <Button
                className="mt-3 onboarding--button"
                disabled={loading}
                type="submit"
                form={"form-add-intro"}
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
  profileStats: state.profileModel.profileStats,
});

const mapDispatch = (dispatch) => {
  return {
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(OnboardingStep2);
