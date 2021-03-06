import React, { useEffect, useState } from "react";
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
  categories,
  getCategories,
  submitOnboardingTopics,
  submitAfter,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCategoriesChange = (value) => setSelectedCategories(value);

  useEffect(() => {
    const fetchCategories = async () => await getCategories();
    fetchCategories().then(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }, []);

  useEffect(() => {
    const preSelectedCategories = categories
      .filter((c) => c.selected)
      .map((c) => c.value);
    setSelectedCategories(preSelectedCategories);
  }, [categories]);

  const handleAddTopicsSubmit = async () => {
    // map value to slug
    let userCategories = [];
    selectedCategories.forEach((v) => {
      let category = categories.filter((c) => c.value === v);
      if (category.length > 0) {
        userCategories.push(category[0].slug || category[0].value);
      }
    });
    await submitOnboardingTopics({
      categories: userCategories,
    });
  };

  const handleShowMoreButtonClick = (e) => {
    setShowMore(!showMore);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddTopicsSubmit();
    submitAfter();
  };

  const minTopics = 30;
  const pils = categories.map((c) => c.value);
  return (
    <Form onSubmit={handleSubmit} id="form-add-topics">
      <Row className="onboarding--pill-wrapper">
        <Col md="12">
          <ToggleButtonGroup
            className="d-flex flex-wrap"
            type="checkbox"
            value={selectedCategories}
            onChange={handleCategoriesChange}
          >
            {pils.map((p, index) => {
              if (index < minTopics || showMore) {
                return (
                  <ToggleButton
                    key={index}
                    value={p}
                    className="onboarding--pill"
                  >
                    {`#${p}`}
                  </ToggleButton>
                );
              }
            })}
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row className="position-relative">
        <Col md="12" className="d-flex justify-content-center">
          <div className="onboarding--divider"></div>
          {pils && pils.length > minTopics && (
            <Button
              variant="link"
              className="onboarding--show-more"
              onClick={handleShowMoreButtonClick}
            >
              {showMore ? "Show Less" : "Show More (30)"}
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

const mapState = (state) => {
  return {
    categories: state.onboardingModel.categories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCategories: dispatch.onboardingModel.getCategories,
    submitOnboardingTopics: dispatch.onboardingModel.submitOnboardingTopics,
  };
};

export default connect(mapState, mapDispatch)(AddTopics);
