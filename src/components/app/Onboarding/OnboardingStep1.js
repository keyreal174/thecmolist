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
            src={trustedIcon}
            alt="Network icon"
          />
          <div className="home--share-item-title">
            World-class network of CMOs
          </div>
          <div className="home--share-item-subtitle">
            Only for heads of marketing from hyper-growth companies. Every
            member is carefully vetted.
          </div>
        </Col>
        <Col className="home--share-item" md="3" sm="12">
          <img
            className="home--share-item-image"
            src={informedIcon}
            alt="Knowledge icon"
          />
          <div className="home--share-item-title">
            Strategic guides and playbooks
          </div>
          <div className="home--share-item-subtitle">
            Access best practices shared by your peers, ranging from strategic
            planning to creating your operating cadence and preparing for an
            IPO.
          </div>
        </Col>
        <Col className="home--share-item" md="3" sm="12">
          <img
            className="home--share-item-image"
            src={knowledgeIcon}
            alt="Stack icon"
          />
          <div className="home--share-item-title">
            Shared directory of trusted vendors
          </div>
          <div className="home--share-item-subtitle">
            Browse & search 1000s of proven consultants, agencies, and
            technology vendors in 80 categories, recommended by other CMOs.
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="12" className="text-center no-solicitation">
          <p>
            <strong>Confidentiality:</strong> By joining, you are pledging
            confidentially to the network. By keeping what’s discussed here
            confidential, everyone is able to share honestly & openly.
          </p>
        </Col>
        <Col
          md="12"
          className="onboarding--button-wrapper d-flex justify-content-center"
        >
          <Button
            className="mt-3 onboarding--button onboarding--button-welcome"
            onClick={changeStep}
            disabled={loading}
          >
            Continue
          </Button>
        </Col>
      </Row>
    </>
  );
};

const WelcomeMessage = ({ loading, firstname, groupName }) => {
  let ready = !loading && firstname && firstname.length > 0;
  if (!ready) {
    return "";
  }
  if (groupName && groupName.length > 0) {
    return `Welcome to the ${groupName} family, ${firstname}`;
  } else {
    return `Welcome to the CMOlist family, ${firstname}`;
  }
};

const OnboardingStep1 = ({
  profile,
  fetchProfile,
  profileStats,
  getProfileStats,
  submitOnboardingStep1,
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [headline, setHeadline] = useState("");
  const [networking, setNetworking] = useState(false);
  const [advising, setAdvising] = useState(false);
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyStage, setCompanyStage] = useState("");
  const [isWelcome, setIsWelcome] = useState(true);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    fetchProfile({
      userName: "",
    });
  }, []);

  useEffect(() => {
    const fetchProfileStats = async () => await getProfileStats();
    fetchProfileStats();
  }, []);

  useEffect(() => {
    if (profile) {
      setFirstname(profile.firstName);
      setTitle(profile.title);
      setCompanyName(profile.company);
      setHeadline(profile.about ? profile.about.description : "");
      let networking = profile.about ? profile.about.networking : true;
      setNetworking(networking);
      let advising = profile.about ? profile.about.advising : true;
      setAdvising(advising);
    }
  }, [profile]);

  useEffect(() => {
    if (
      profileStats &&
      profileStats.profile &&
      profileStats.profile.groups &&
      profileStats.profile.groups.length > 0
    ) {
      setGroupName(profileStats.profile.groups[0].name);
    }
  }, [profileStats]);

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
  const handleSubmit = (e) => {
    e && e.preventDefault();
    setLoading(true);
    const formData = {
      title,
      companyName,
      headline,
      companyIndustry,
      companyStage,
      networking,
      advising,
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
          {isWelcome ? (
            <WelcomeMessage
              loading={loading}
              firstname={firstname}
              groupName={groupName}
            />
          ) : (
            `Create your member profile`
          )}
        </span>
      }
      isWelcome={isWelcome}
    >
      {isWelcome ? (
        <OnboardingWelcome
          loading={loading}
          changeStep={() => {
            // For now as a test we are moving to collecting no user info
            // upfront and just move on to the next step
            // keeping this code alive in case we revert the test.
            handleSubmit();

            // setIsWelcome(false) // uncomment to enable collecting user info
          }}
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
            <Row className="mt-4">
              <Col md="6" sm="12">
                <Form.Label>Open to networking</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Yes"
                    type="radio"
                    name="networking"
                    id="networking-radio-1"
                    checked={networking}
                    onChange={() => setNetworking(true)}
                  />
                  <Form.Check
                    inline
                    label="No"
                    type="radio"
                    name="networking"
                    id="networking-radio-2"
                    checked={!networking}
                    onChange={() => setNetworking(false)}
                  />
                </div>
              </Col>
              <Col md="6" sm="12">
                <Form.Label>Open to advising</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Yes"
                    type="radio"
                    name="advising"
                    id="advising-radio-1"
                    checked={advising}
                    onChange={() => setAdvising(true)}
                  />
                  <Form.Check
                    inline
                    label="No"
                    type="radio"
                    name="advising"
                    id="advising-radio-2"
                    checked={!advising}
                    onChange={() => setAdvising(false)}
                  />
                </div>
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
  profileStats: state.profileModel.profileStats,
});

const mapDispatch = (dispatch) => {
  return {
    fetchProfile: dispatch.profileModel.fetchProfile,
    getProfileStats: dispatch.profileModel.getProfileStats,
    submitOnboardingStep1: dispatch.onboardingModel.submitOnboardingStep1,
  };
};

export default connect(mapState, mapDispatch)(OnboardingStep1);
