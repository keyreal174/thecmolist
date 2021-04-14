import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Container, Col, Row } from "react-bootstrap";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import ContentDetail from "./ContentDetail";
import clsx from "clsx";
import "./content.scss";

const Content = ({
  contentLoading,
  fetchContent,
  match,
  getProfileStats,
  ...rest
}) => {
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const fetch = async () => await getProfileStats();

    fetch();
  }, []);

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header onToggle={handleToggle} />
          {error && (
            <Row className={clsx("content--error", mobileMenuOpen && "open")}>
              <Col md="12">
                <Alert
                  id="error-section"
                  className="mb-0 mt-2"
                  variant="danger"
                >
                  {error}
                </Alert>
              </Col>
            </Row>
          )}
          <Row
            className={clsx(
              "question-answer-section-wrapper",
              "content--content",
              mobileMenuOpen && "open"
            )}
          >
            {contentLoading ? (
              <Col md="12">
                <ActivityIndicator className="element-center question-activity-indicator" />
              </Col>
            ) : (
              <ContentDetail
                {...rest}
                mobileMenuOpen={mobileMenuOpen}
                setError={setError}
              />
            )}
          </Row>
          <Row className={clsx("content--footer", mobileMenuOpen && "open")}>
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
    profileStats: state.profileModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchContent: dispatch.contentModel.fetchContent,
    saveCommentToContent: dispatch.contentModel.saveCommentToContent,
    saveCommentToReply: dispatch.contentModel.saveCommentToReply,
    saveReactionToCallerType: dispatch.contentModel.saveReactionToCallerType,
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(Content);
