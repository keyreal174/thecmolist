import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Article from "../base/Article/Article";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";

import "./questions.css";

const Questions = ({ question, saveQuestion, fetchQuestion }) => {
  useEffect(() => {
    const MOCKED_ID = 10; // Removed this number when no mocked
    const fetch = async () => await fetchQuestion(MOCKED_ID);

    fetch();
  }, []);
  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <Article className={"mt-1"} {...question} />;
        </div>
        <Footer />
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
    saveQuestion: dispatch.questionModel.saveQuestion,
    fetchQuestion: dispatch.questionModel.fetchQuestion,
  };
};

export default connect(mapState, mapDispatch)(Questions);
