import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert, Button, Form, Modal, Row, Col } from "react-bootstrap";

const AddIntro = ({
  groupName,
  submitOnboardingIntro,
  submitBefore,
  submitAfter,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [intro, setIntro] = useState("");
  const [introError, setIntroError] = useState("");
  const introOptions = [
    "Ask and answer marketing leadership questions",
    "Benchmark against what your peer companies are doing",
    "View and share strategic marketing guides/playbooks",
    "Join or host AMA sessions",
    "Find and share trusted consultants",
    "Find and share trusted agencies and tech vendors",
    "Meet and network with other CMOs in your industry",
    "Get and give career advice, find advisor/board roles",
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
            <Form.Label className="onboarding--label">
              {groupName && groupName.length > 0
                ? `How can other ${groupName} members help you be more successful and learn from you?`
                : "How can other CMOlist members help you be more successful and learn from you?"}
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
        <Row className="onboarding--pill-wrapper">
          <Col>
            <Form.Label className="onboarding--label">
              Share one of your top priorities for the year with your peers
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
