import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import Article from "../base/Article/Article";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";

import "./question.css";

const Question = ({ question, fetchQuestion, match }) => {
  useEffect(() => {
    const {
      params: { id },
    } = match;
    const fetch = async () => await fetchQuestion(id);

    fetch();
  }, []);

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Row>
            <Col md="12">
              <Header />
            </Col>
          </Row>
          <Row>
            <Col className="question-anwer-section" md="9">
              <Article className={"mt-1"} {...question.question} />
              <div className="question-anwer-section-replies">{`${
                question.replies && question.replies.length
              } answers`}</div>
              <div>
                {question.replies &&
                  question.replies.map((reply, index) => {
                    return <Article {...reply} key={index} />;
                  })}
              </div>
            </Col>
            <Col className="question-related-section" md="3">
              <div className="question-related-section-title">
                Related Questions
              </div>
              <div className="question-related-section-item">
                {question.related_questions &&
                  question.related_questions.map((relatedQuestion, index) => {
                    return (
                      <a href={relatedQuestion.link} key={index}>
                        {relatedQuestion.title}
                      </a>
                    );
                  })}
              </div>
            </Col>
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
    question: state.questionModel.question,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchQuestion: dispatch.questionModel.fetchQuestion,
  };
};

export default connect(mapState, mapDispatch)(Question);
