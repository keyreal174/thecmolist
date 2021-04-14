import React, { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import { connect } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import "./onboardingStep1.scss";

const OnboardingStep1 = ({ submitOnboardingStep1 }) => {
  const history = useHistory();
  const handleSubmit = (e) => {
    setLoading(true);
    const formData = {
      title,
      companyName,
      companyIndustry,
      companyStage,
      headline,
      networking: networkingYes ? true : false,
      adviding: advidingYes ? true : false,
    };
    submitOnboardingStep1(formData);
    history.push("onboarding_step2");
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyStage, setCompanyStage] = useState("");
  const [headline, setHeadline] = useState("");
  const [networkingYes, setNetworkingYes] = useState("");
  const [networkingNo, setNetworkingNo] = useState("");
  const [advidingYes, setAdvidingYes] = useState("");
  const [advidingNo, setAdvidingNo] = useState("");

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleCompanyNameChange = (e) => {
    const { value } = e.target;
    setCompanyName(value);
  };
  const handleCompanyIndustryChange = (e) => {
    const { value } = e.target;
    setCompanyIndustry(value);
  };
  const handleCompanyStageChange = (e) => {
    const { value } = e.target;
    setCompanyStage(value);
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
  const handleAdvidingYesChange = () => {
    setAdvidingYes(true);
    setAdvidingNo(false);
  };
  const handleAdvidingNoChange = () => {
    setAdvidingYes(false);
    setAdvidingNo(true);
  };

  return (
    <OnboardingLayout
      now={50}
      title={
        "First set up your profile to help you discover and connect with your marketing peers"
      }
    >
      <>
        <form
          className="onboarding--form"
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
            <Col md="6">
              <Form.Label>Company industry</Form.Label>
              <Form.Control
                className="onboarding--input"
                type="text"
                required
                name="companyIndustry"
                onChange={handleCompanyIndustryChange}
                value={companyIndustry}
              />
            </Col>
            <Col md="6">
              <Form.Label>Company Stage</Form.Label>
              <Form.Control
                className="onboarding--input"
                type="text"
                required
                name="companyStage"
                onChange={handleCompanyStageChange}
                value={companyStage}
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Form.Label>Headline(optional)</Form.Label>
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
          <Row>
            <Col>
              <Form.Label>Open to networking</Form.Label>
              <div className="d-flex">
                <Form.Check
                  className="onboarding--radio"
                  type="radio"
                  label="Yes"
                  required
                  name="networking"
                  onChange={handleNetworkingYesChange}
                  checked={networkingYes}
                />
                <Form.Check
                  className="onboarding--radio"
                  type="radio"
                  label="No"
                  required
                  name="networking"
                  onChange={handleNetworkingNoChange}
                  checked={networkingNo}
                />
              </div>
            </Col>
            <Col>
              <Form.Label>Open to adviding</Form.Label>
              <div className="d-flex">
                <Form.Check
                  className="onboarding--radio"
                  type="radio"
                  label="Yes"
                  required
                  name="adviding"
                  onChange={handleAdvidingYesChange}
                  checked={advidingYes}
                />
                <Form.Check
                  className="onboarding--radio"
                  type="radio"
                  label="No"
                  required
                  name="adviding"
                  onChange={handleAdvidingNoChange}
                  checked={advidingNo}
                />
              </div>
            </Col>
          </Row>
        </form>
        <Row>
          <Col md="12" className="d-flex justify-content-end">
            <Button
              className="onboarding--button"
              form="onboarding_step-1"
              type="submit"
              disable={loading}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </>
    </OnboardingLayout>
  );
};

const mapState = () => ({});

const mapDispatch = (dispatch) => {
  return {
    submitOnboardingStep1: dispatch.onboardingModel.submitOnboardingStep1,
  };
};

export default connect(mapState, mapDispatch)(OnboardingStep1);
