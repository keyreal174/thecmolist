import React, { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import { connect } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import "./onboardingStep1.scss";
import trustedIcon from "../../home/svg/trusted.svg";
import knowledgeIcon from "../../home/svg/knowledge.svg";
import informedIcon from "../../home/svg/informed.svg";
import {
  companyStageOptions,
  companyIndustryOptions,
} from "../ProfileEdit/ProfileEditOptions";

const OnboardingWelcome = ({ loading, changeStep }) => {
  return (
    <>
      <Row className="home--share-items-wrapper">
        <Col className="home--share-item" md="3" sm="12">
          <img
            className="home--share-item-image"
            src={knowledgeIcon}
            alt="Stack icon"
          />
          <div className="home--share-item-title">
            Find the best marketing tools and agencies
          </div>
          <div className="home--share-item-subtitle">
            View proven & emerging marketing vendors shared by leading startups
            and public companies
          </div>
        </Col>
        <Col className="home--share-item" md="3" sm="12">
          <img
            className="home--share-item-image"
            src={informedIcon}
            alt="Knowledge icon"
          />
          <div className="home--share-item-title">
            Ask for advice and search knowledge
          </div>
          <div className="home--share-item-subtitle">
            Post marketing questions and search answers shared by the world's
            best marketers
          </div>
        </Col>
        <Col className="home--share-item" md="3" sm="12">
          <img
            className="home--share-item-image"
            src={trustedIcon}
            alt="Network icon"
          />
          <div className="home--share-item-title">
            Accelerate your marketing career
          </div>
          <div className="home--share-item-subtitle">
            Network with other top marketers and find career, advisor, and board
            opportunities
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="12" className="text-center no-solicitation">
          <p>
            CMOlist is a trusted space for marketing leaders, please do{" "}
            <b>not</b> solicit other members.
          </p>
        </Col>
        <Col
          md="12"
          className="onboarding--button-wrapper d-flex justify-content-center"
        >
          <Button
            className="mt-3 onboarding--button onboarding--button-welcome"
            onClick={changeStep}
            disable={loading}
          >
            Continue
          </Button>
        </Col>
      </Row>
    </>
  );
};

const OnboardingStep1 = ({ profile, fetchProfile, submitOnboardingStep1 }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [headline, setHeadline] = useState("");
  const [networkingYes, setNetworkingYes] = useState("");
  const [networkingNo, setNetworkingNo] = useState("");
  const [advisingYes, setAdvisingYes] = useState("");
  const [advisingNo, setAdvisingNo] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyStage, setCompanyStage] = useState("");
  const [isWelcome, setIsWelcome] = useState(true);

  useEffect(() => {
    fetchProfile({
      userName: "",
    });
  }, []);

  useEffect(() => {
    if (profile) {
      setFirstname(profile.firstName);
      setTitle(profile.title);
      setCompanyName(profile.company);
      setHeadline(profile.about ? profile.about.description : "");
      let networking = profile.about ? profile.about.networking : true;
      setNetworkingYes(networking);
      setNetworkingNo(!networking);
      let advising = profile.about ? profile.about.advising : true;
      setAdvisingYes(advising);
      setAdvisingNo(!advising);
    }
  }, [profile]);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleCompanyNameChange = (e) => {
    const { value } = e.target;
    setCompanyName(value);
  };
  const handleHeadlineChange = (e) => {
    const { value } = e.target;
    setHeadline(value);
  };
  const handleNetworkingYesChange = () => {
    setNetworkingYes(true);
    setNetworkingNo(false);
  };
  const handleNetworkingNoChange = () => {
    setNetworkingYes(false);
    setNetworkingNo(true);
  };
  const handleAdvisingYesChange = () => {
    setAdvisingYes(true);
    setAdvisingNo(false);
  };
  const handleAdvisingNoChange = () => {
    setAdvisingYes(false);
    setAdvisingNo(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title,
      companyName,
      headline,
      companyIndustry,
      companyStage,
      networking: networkingYes ? true : false,
      advising: advisingYes ? true : false,
    };
    submitOnboardingStep1(formData);
    history.push("onboarding_step2" + window.location.search);
    setLoading(false);
  };

  return (
    <OnboardingLayout
      now={isWelcome ? 0 : 50}
      title={
        <span
          className="layout--title"
          style={{ textAlign: "center", display: "block" }}
        >
          {isWelcome
            ? !loading
              ? `Hello ${firstname}, welcome to CMOlist!`
              : ""
            : `Create your member profile`}
        </span>
      }
      isWelcome={isWelcome}
    >
      {isWelcome ? (
        <OnboardingWelcome
          loading={loading}
          changeStep={() => setIsWelcome(false)}
        />
      ) : (
        <>
          <form
            className="onboarding--form fadeAndSlideElementInFast"
            id="onboarding_step-1"
            name="onboarding_step-1"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Row>
              <Col md="6">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="onboarding--input"
                  type="text"
                  required
                  name="title"
                  onChange={handleTitleChange}
                  value={title}
                />
              </Col>
              <Col md="6">
                <Form.Label>Company name</Form.Label>
                <Form.Control
                  className="onboarding--input"
                  type="text"
                  required
                  name="companyName"
                  onChange={handleCompanyNameChange}
                  value={companyName}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <Form.Label>Company Industry</Form.Label>
                <Form.Control
                  as="select"
                  className="onboarding--select"
                  value={companyIndustry}
                  onChange={(e) => setCompanyIndustry(e.target.value)}
                  required
                >
                  <option value="">Select your Company Industry</option>
                  {companyIndustryOptions.map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {i.description}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col sm="12" md="6">
                <Form.Label>Company Stage</Form.Label>
                <Form.Control
                  as="select"
                  className="onboarding--select"
                  value={companyStage}
                  onChange={(e) => setCompanyStage(e.target.value)}
                  required
                >
                  <option value="">Select your Company Stage</option>
                  {companyStageOptions.map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {i.description}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col md="12" className="onboarding--bio">
                <Form.Label>Bio (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  className="onboarding--text-area"
                  placeholder="E.g., professional marketing leader passionate about consumer Internet, SaaS, and disruptivemarketplaces. Industry expertise: mobile, consumer Internet, social media, enterprise software."
                  rows={3}
                  name="headline"
                  onChange={handleHeadlineChange}
                  value={headline}
                />
              </Col>
            </Row>
          </form>
          <Row>
            <Col
              md="12"
              className="onboarding--button-wrapper d-flex justify-content-end"
            >
              <Button
                className="mt-3 onboarding--button"
                form="onboarding_step-1"
                type="submit"
                disable={loading}
              >
                Continue
              </Button>
            </Col>
          </Row>
        </>
      )}
    </OnboardingLayout>
  );
};

const mapState = (state) => ({
  profile: state.profileModel.profile,
});

const mapDispatch = (dispatch) => {
  return {
    fetchProfile: dispatch.profileModel.fetchProfile,
    submitOnboardingStep1: dispatch.onboardingModel.submitOnboardingStep1,
  };
};

export default connect(mapState, mapDispatch)(OnboardingStep1);
