import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import Article from "../base/Article/Article";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";

import "./questions.css";

const Questions = ({ question, fetchQuestion, match }) => {
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
            <Col md="9">
              <Article className={"mt-1"} {...question.question} />;
              <div>Comments here</div>
              {JSON.stringify(question.replies, null, 4)}
            </Col>
            <Col md="3">
              {JSON.stringify(question.related_questions, null, 4)}
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

export default connect(mapState, mapDispatch)(Questions);
