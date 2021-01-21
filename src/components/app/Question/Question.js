import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import Article from "../base/Article/Article";
import Comment from "../base/Comment/Comment";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";

import "./question.css";

const Question = ({
  question,
  fetchQuestion,
  saveCommentToQuestion,
  match,
}) => {
  useEffect(() => {
    const {
      params: { id },
    } = match;
    const fetch = async () => await fetchQuestion(id);

    fetch();
  }, []);

  const cdn = "https://d3k6hg21rt7gsh.cloudfront.net/icons";

  const handleSubmit = (comment) => {
    const {
      params: { id },
    } = match;
    saveCommentToQuestion(id, comment);
  };

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Row>
            <Col md="12">
              <Header />
            </Col>
          </Row>
          <Row className="question-answer-section-wrapper">
            <Col className="question-answer-section" md="8">
              <Article
                articletextlines={1}
                className={"mt-1"}
                {...question.question}
                engagementButtons={[
                  { text: "Answer", icon: `${cdn}/Answer.png` },
                  { text: "Thanks", icon: `${cdn}/Thanks.png` },
                  { text: "Insighful", icon: `${cdn}/Insightful.png` },
                ]}
                onEngagementButtonClick={(i) => console.log(i)}
              />
              <div className="question-answer-section-replies">{`${
                question.replies && question.replies.length
              } answers`}</div>
              <div>
                {question.replies &&
                  question.replies.map((reply, index) => {
                    return (
                      <Article
                        articletextlines={2}
                        {...reply}
                        key={index}
                        engagementButtons={[
                          { text: "Comment", icon: `${cdn}/Comment.png` },
                          { text: "Thanks", icon: `${cdn}/Thanks.png` },
                          { text: "Insighful", icon: `${cdn}/Insightful.png` },
                        ]}
                        onEngagementButtonClick={(i) => console.log(i)}
                      >
                        <Comment
                          className="question-article-comment"
                          onSubmit={handleSubmit}
                        />
                      </Article>
                    );
                  })}
                <div className="question-your-answer-section">
                  <div>Your answer</div>
                  <Comment className="" />
                </div>
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
                      <div>
                        <a href={relatedQuestion.link} key={index}>
                          {relatedQuestion.title}
                        </a>
                      </div>
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
    saveCommentToQuestion: dispatch.questionModel.saveCommentToQuestion,
  };
};

export default connect(mapState, mapDispatch)(Question);
