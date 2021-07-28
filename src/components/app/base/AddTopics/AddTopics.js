import React from "react";
import {
  BUtton,
  Col,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const AddTopics = ({
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

export default AddTopics;
