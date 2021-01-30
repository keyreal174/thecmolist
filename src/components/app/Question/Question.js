import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import Article from "../base/Article/Article";
import DiscussionReply from "../base/DiscussionReply/DiscussionReply";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";

import "./question.css";

const Question = ({
  question,
  fetchQuestion,
  reactions,
  saveCommentToQuestion,
  saveCommentToReply,
  saveReactionToCallerType,
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
    saveCommentToQuestion(comment);
  };

  const handleSubmitToReply = (reply, comment) => {
    saveCommentToReply({ comment, reply });
  };

  const handleEngagementButtonClick = async (caller, engagementType) => {
    const isQuestion = !!caller["question_id"];
    const id = isQuestion ? caller["question_id"] : caller["reply_id"];
    const callerType = isQuestion ? "question" : "reply";
    const engagement = engagementType.toLowerCase();
    const checked = getCheckedForEngagementType(id, engagement);

    await saveReactionToCallerType({ id, callerType, engagement, checked });
  };

  const numberOfReplies =
    question && question.replies && question.replies.length;
  const numberOfThanks =
    question && question.question && question.question["num_thanks"];
  const numberOfInsightful =
    question && question.question && question.question["num_insightful"];
  const questionId = question && question.question_id;

  const getCheckedForEngagementType = (contentId, engagementType) => {
    let checked = false;

    (reactions || []).forEach((reaction) => {
      if (reaction.content_id === contentId) {
        ((reaction && reaction.reactions) || []).forEach((r) => {
          if (r.type === engagementType) {
            checked = r.checked;
          }
        });
      }
    });
    return checked;
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
                {...question.question}
                engagementButtons={[
                  {
                    checked: true,
                    text: "Answer",
                    icon: `${cdn}/Answer.png`,
                    number: numberOfReplies,
                  },
                  {
                    checked: getCheckedForEngagementType(questionId, "thanks"),
                    text: "Thanks",
                    icon: `${cdn}/Thanks.png`,
                    number: numberOfThanks,
                  },
                  {
                    checked: getCheckedForEngagementType(
                      questionId,
                      "insightful"
                    ),
                    text: "Insightful",
                    icon: `${cdn}/Insightful.png`,
                    number: numberOfInsightful,
                  },
                ]}
                onEngagementButtonClick={handleEngagementButtonClick.bind(
                  this,
                  question
                )}
                style={{ paddingBottom: "10px" }}
              />
              <div className="question-answer-section-replies">{`${numberOfReplies} answers`}</div>
              <div className="question-answers">
                {question.replies &&
                  question.replies.map((reply, index) => {
                    return (
                      <DiscussionReply
                        articletextlines={2}
                        {...reply}
                        key={index}
                        engagementButtons={[
                          {
                            checked: true,
                            text: "Comment",
                            icon: `${cdn}/Comment.png`,
                            number: reply.comments && reply.comments.length,
                          },
                          {
                            checked: getCheckedForEngagementType(
                              reply.reply_id,
                              "thanks"
                            ),
                            text: "Thanks",
                            icon: `${cdn}/Thanks.png`,
                            number: reply["num_thanks"],
                          },
                          {
                            checked: getCheckedForEngagementType(
                              reply.reply_id,
                              "insightful"
                            ),
                            text: "Insightful",
                            icon: `${cdn}/Insightful.png`,
                            number: reply["num_insightful"],
                          },
                        ]}
                        onEngagementButtonClick={handleEngagementButtonClick.bind(
                          this,
                          reply
                        )}
                        onSubmit={handleSubmitToReply.bind(this, reply)}
                        showComment
                        withMargin
                      >
                        {
                          <div className="question-comments-section">
                            {reply.comments &&
                              reply.comments.map((comment) => {
                                return <DiscussionReply {...comment} />;
                              })}
                          </div>
                        }
                      </DiscussionReply>
                    );
                  })}
                <div className="question-your-answer-section">
                  <div>Your answer</div>
                  <DiscussionReply
                    placeholder="Answer John's question..."
                    onSubmit={handleSubmit}
                    showComment
                    onlyComment
                  />
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
                      <div key={index}>
                        <a href={relatedQuestion.link}>
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
    reactions: state.reactionModel.reactions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchQuestion: dispatch.questionModel.fetchQuestion,
    saveCommentToQuestion: dispatch.questionModel.saveCommentToQuestion,
    saveCommentToReply: dispatch.questionModel.saveCommentToReply,
    saveReactionToCallerType: dispatch.questionModel.saveReactionToCallerType,
  };
};

export default connect(mapState, mapDispatch)(Question);
