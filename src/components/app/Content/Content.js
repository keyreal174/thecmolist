import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import Article from "../base/Article/Article";
import DiscussionReply from "../base/DiscussionReply/DiscussionReply";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";

import "./content.css";

const Content = ({
  content,
  fetchContent,
  reactions,
  saveCommentToContent,
  saveCommentToReply,
  saveReactionToCallerType,
  match,
}) => {
  useEffect(() => {
    const {
      params: { id },
    } = match;
    const fetch = async () => await fetchContent(id);

    fetch();
  }, []);

  const cdn = "https://d3k6hg21rt7gsh.cloudfront.net/icons";

  const handleSubmit = (comment) => {
    saveCommentToContent(comment);
  };

  const handleSubmitToReply = (reply, comment) => {
    saveCommentToReply({ comment, reply });
  };

  const handleEngagementButtonClick = async (caller, engagementType) => {
    const isContent = !!caller["content_id"];
    const id = isContent ? caller["content_id"] : caller["reply_id"];
    const engagement = engagementType.toLowerCase();

    await saveReactionToCallerType({ id, engagement });
  };

  const numberOfReplies = content && content.replies && content.replies.length;
  const questionId = content && content.content_id;
  const getCheckedForEngagementType = (contentId, engagementType) => {
    let checked = false;

    ((reactions[contentId] && reactions[contentId].reactions) || []).forEach(
      (r) => {
        if (r.type === engagementType) {
          checked = r.checked;
        }
      }
    );
    return checked;
  };

  const getEngagementForId = (contentId, engagementType) => {
    return (
      reactions &&
      reactions[contentId] &&
      reactions[contentId][`num_${engagementType}`]
    );
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
                {...content.content}
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
                    number: getEngagementForId(questionId, "thanks"),
                  },
                  {
                    checked: getCheckedForEngagementType(
                      questionId,
                      "insightful"
                    ),
                    text: "Insightful",
                    icon: `${cdn}/Insightful.png`,
                    number: getEngagementForId(questionId, "insightful"),
                  },
                ]}
                onEngagementButtonClick={handleEngagementButtonClick.bind(
                  this,
                  content
                )}
                style={{ paddingBottom: "10px" }}
              />
              <div className="question-answer-section-replies">{`${numberOfReplies} answers`}</div>
              <div className="question-answers">
                {content.replies &&
                  content.replies.map((reply, index) => {
                    const replyId = reply.reply_id;

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
                            number:
                              reply.comments && reply.comments.length > 0
                                ? reply.comments.length
                                : null,
                          },
                          {
                            checked: getCheckedForEngagementType(
                              replyId,
                              "thanks"
                            ),
                            text: "Thanks",
                            icon: `${cdn}/Thanks.png`,
                            number: getEngagementForId(replyId, "thanks"),
                          },
                          {
                            checked: getCheckedForEngagementType(
                              replyId,
                              "insightful"
                            ),
                            text: "Insightful",
                            icon: `${cdn}/Insightful.png`,
                            number: getEngagementForId(replyId, "insightful"),
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
                {content.related_questions &&
                  content.related_questions.map((relatedQuestion, index) => {
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
    content: state.contentModel.content,
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
