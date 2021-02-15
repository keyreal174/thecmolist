import React from "react";
import Article from "../base/Article/Article";
import CustomCard from "../base/CustomCard/CustomCard";
import { Col } from "react-bootstrap";

import AnswerIcon from "../base/icons/answer.svg";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import PassIcon from "../base/icons/pass.svg";
import PassCheckedIcon from "../base/icons/pass_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";

const ContentDetail = ({
  content,
  reactions,
  saveCommentToContent,
  saveCommentToReply,
  saveReactionToCallerType,
  setError,
}) => {
  const cdn = "https://d3k6hg21rt7gsh.cloudfront.net/icons";
  const focusError = () => {
    const errorSection = document.getElementById("error-section");
    window.scrollTo(0, 0);
    errorSection.focus();
  };
  const handleSubmit = async (comment) => {
    try {
      setError("");
      await saveCommentToContent(comment);
    } catch (error) {
      setError(error.message);
      focusError();
    }
  };

  const handleSubmitToReply = async (reply, comment) => {
    try {
      setError("");
      await saveCommentToReply({ comment, reply });
    } catch (error) {
      setError(error.message);
      focusError();
    }
  };

  const handleEngagementButtonClick = async (caller, engagementType) => {
    const id = caller["content_id"];
    const engagement = engagementType.toLowerCase();

    try {
      setError("");
      await saveReactionToCallerType({ id, engagement });
    } catch (error) {
      setError(error.message);
      focusError();
    }
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

  const author = content && content.content && content.content.author;

  return (
    <>
      <Col className="question-answer-section" md="8">
        <Article
          articletextlines={1}
          {...content.content}
          engagementButtons={[
            {
              checked: true,
              text: "Answer",
              icon: AnswerIcon,
              number: numberOfReplies,
            },
            {
              checked: getCheckedForEngagementType(questionId, "pass"),
              text: "Pass",
              icon: PassIcon,
              iconChecked: PassCheckedIcon,
              number: getEngagementForId(questionId, "pass"),
            },
            {
              checked: getCheckedForEngagementType(questionId, "thanks"),
              text: "Thanks",
              icon: ThanksIcon,
              iconChecked: ThanksCheckedIcon,
              number: getEngagementForId(questionId, "thanks"),
            },
            {
              checked: getCheckedForEngagementType(questionId, "insightful"),
              text: "Insightful",
              icon: InsightfulIcon,
              iconChecked: InsightfulCheckedIcon,
              number: getEngagementForId(questionId, "insightful"),
            },
          ]}
          onEngagementButtonClick={handleEngagementButtonClick.bind(
            this,
            content
          )}
          style={{ paddingBottom: "10px" }}
          showDiscussionComment={true}
          discussionCommentAuthor={author}
          discussionCommentPlaceholder={`Answer ${author}'s question...`}
          handleDiscussionCommentSubmit={handleSubmit}
        />
        <div className="question-answer-section-replies">{`${numberOfReplies} answers`}</div>
        <div className="question-answers">
          {content.replies &&
            content.replies.map((reply, index) => {
              const replyId = reply.content_id;

              return (
                <Article
                  articletextlines={2}
                  {...reply.content}
                  className="question-answers--item"
                  key={index}
                  engagementButtons={[
                    {
                      text: "Comment",
                      icon: `${cdn}/Comment.png`,
                      number:
                        reply.comments && reply.comments.length > 0
                          ? reply.comments.length
                          : null,
                    },
                    {
                      checked: getCheckedForEngagementType(replyId, "thanks"),
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
                  showDiscussionComment={true}
                  discussionCommentAuthor={author}
                  handleDiscussionCommentSubmit={handleSubmitToReply.bind(
                    this,
                    reply
                  )}
                >
                  <div className="question-comments-section">
                    {reply.comments &&
                      reply.comments.map((comment, index) => {
                        return (
                          <Article
                            className="article__type-comment"
                            {...comment.content}
                            key={index}
                          />
                        );
                      })}
                  </div>
                </Article>
              );
            })}
        </div>
      </Col>
      {content.related_questions && (
        <Col md="4">
          <CustomCard
            className="question-related-section"
            heading="Related Questions"
          >
            <div className="question-related-section-item">
              {content.related_questions.map((relatedQuestion, index) => {
                return (
                  <div key={index}>
                    <a href={relatedQuestion.link}>{relatedQuestion.title}</a>
                  </div>
                );
              })}
            </div>
          </CustomCard>
        </Col>
      )}
    </>
  );
};

export default ContentDetail;
