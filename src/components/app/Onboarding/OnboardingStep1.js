import React from "react";
import OnboardingLayout from "./OnboardingLayout";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./onboardingStep1.scss";

const OnboardingStep1 = () => {
  return (
    <OnboardingLayout
      now={50}
      title={
        "First set up your profile to help you discover and connect with your marketing peers"
      }
    >
      <>
        <Form className="onboarding--form">
          <Row>
            <Col md="6">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="onboarding--input"
                type="text"
                required
              />
            </Col>
            <Col md="6">
              <Form.Label>Company name</Form.Label>
              <Form.Control
                className="onboarding--input"
                type="text"
                required
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
              />
            </Col>
            <Col md="6">
              <Form.Label>Company Stage</Form.Label>
              <Form.Control
                className="onboarding--input"
                type="text"
                required
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
                />
                <Form.Check
                  className="onboarding--radio"
                  type="radio"
                  label="No"
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
                />
                <Form.Check
                  className="onboarding--radio"
                  type="radio"
                  label="No"
                />
              </div>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col md="12" className="d-flex justify-content-end">
            <Button className="onboarding--button">Continue</Button>
          </Col>
        </Row>
      </>
    </OnboardingLayout>
  );
};

export default OnboardingStep1;
