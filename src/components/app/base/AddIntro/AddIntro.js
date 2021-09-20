import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert, Button, Form, Modal, Row, Col } from "react-bootstrap";

const AddIntro = ({ submitOnboardingIntro, submitBefore, submitAfter }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [intro, setIntro] = useState("");
  const [introError, setIntroError] = useState("");
  const introOptions = [
    "Get marketing advice",
    "Build my marketing network",
    "Stay in touch with my peers",
    "Share my expertise",
    "Learn about new marketing trends",
    "Find advisor or board roles",
  ];

  const handleAddIntroSubmit = async () => {
    await submitOnboardingIntro({
      intro: intro,
      options: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (intro.length === 0) {
      setIntroError("Please enter an introduction");
    } else {
      submitBefore && submitBefore();
      await handleAddIntroSubmit();
      submitAfter && submitAfter();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} id="form-add-intro">
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
                        selectedOptions.filter((o) => o !== e.target.value)
                      );
                    }
                  }}
                />
              </div>
              <span>{o}</span>
            </Col>
          ))}
        </Row>
        <Row className="onboarding--pill-wrapper no-gutter">
          <Col>
            <Form.Label>Please introduce yourself to your peers</Form.Label>
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
      </Form>
    </>
  );
};

const mapState = (state) => ({});
const mapDispatch = (dispatch) => {
  return {
    submitOnboardingIntro: dispatch.onboardingModel.submitOnboardingIntro,
  };
};

export default connect(mapState, mapDispatch)(AddIntro);
