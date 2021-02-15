import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Container, Col, Row } from "react-bootstrap";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Answer from "./Answer";
import "./content.scss";

const Content = ({ contentLoading, fetchContent, match, ...rest }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    const {
      params: { id },
    } = match;
    const fetch = async () => {
      try {
        setError("");
        await fetchContent(id);
      } catch (error) {
        setError(error.message);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <Row className="question-answer-section-wrapper">
            {error && (
              <Col md="12">
                <Alert
                  id="error-section"
                  className="mb-0 mt-2"
                  variant="danger"
                >
                  {error}
                </Alert>
              </Col>
            )}
            {contentLoading ? (
              <Col md="12">
                <ActivityIndicator className="element-center question-activity-indicator" />
              </Col>
            ) : (
              <Answer {...rest} setError={setError} />
            )}
          </Row>
          <Row>
            <Col md="12">
              <Footer />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

const mapState = (state) => {
  return {
    content: state.contentModel.content,
    contentLoading: state.contentModel.contentLoading,
    reactions: state.reactionModel.reactions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchContent: dispatch.contentModel.fetchContent,
    saveCommentToContent: dispatch.contentModel.saveCommentToContent,
    saveCommentToReply: dispatch.contentModel.saveCommentToReply,
    saveReactionToCallerType: dispatch.contentModel.saveReactionToCallerType,
  };
};

export default connect(mapState, mapDispatch)(Content);
