import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const AddTopics = ({
  value,
  handleChange,
  handleButtonClick,
  showMore,
  submitAfter,
  topics,
  fetchTopics,
}) => {
  useEffect(() => {
    const fetch = async () => {
      await fetchTopics();
    };
    fetch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAfter();
  };

  return (
    <Form onSubmit={handleSubmit} id="form-add-topics">
      <Row className="onboarding--pill-wrapper">
        <Col md="12">
          <ToggleButtonGroup
            className="d-flex flex-wrap"
            type="checkbox"
            value={value}
            onChange={handleChange}
          >
            {topics.map((p, index) => {
              // if (index < 12 || showMore) {
              return (
                <ToggleButton value={p.name} className="onboarding--pill">
                  {p.name}
                </ToggleButton>
              );
              // }
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
    </Form>
  );
};

const mapState = (state) => {
  return {
    topics: state.topicsModel.topics,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTopics: dispatch.topicsModel.fetchTopics,
  };
};

export default connect(mapState, mapDispatch)(AddTopics);
