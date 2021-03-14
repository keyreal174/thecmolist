import React from "react";
import Article from "../base/Article/Article";
import CustomCard from "../base/CustomCard/CustomCard";
import { Col } from "react-bootstrap";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";

import AnswerIcon from "../base/icons/answer.svg";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import PassIcon from "../base/icons/pass.svg";
import PassCheckedIcon from "../base/icons/pass_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";
import { cdn } from "../../util/constants";

const ContentDetail = ({
  content,
  profileStats,
  reactions,
  saveCommentToContent,
  saveCommentToReply,
  saveReactionToCallerType,
  setError,
}) => {
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

  const numberOfReplies =
    content && content.replies ? content.replies.length : 0;
  const contentId = content && content.content_id;
  const author = content && content.content ? content.content.author : "";

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
              checked: getCheckedForEngagementType(
                contentId,
                "pass",
                reactions
              ),
              text: "Pass",
              icon: PassIcon,
              iconChecked: PassCheckedIcon,
              number: getEngagementForId(contentId, "pass", reactions),
            },
            {
              checked: getCheckedForEngagementType(
                contentId,
                "thanks",
                reactions
              ),
              text: "Thanks",
              icon: ThanksIcon,
              iconChecked: ThanksCheckedIcon,
              number: getEngagementForId(contentId, "thanks", reactions),
            },
            {
              checked: getCheckedForEngagementType(
                contentId,
                "insightful",
                reactions
              ),
              text: "Insightful",
              icon: InsightfulIcon,
              iconChecked: InsightfulCheckedIcon,
              number: getEngagementForId(contentId, "insightful", reactions),
            },
          ]}
          focusComment={true}
          onEngagementButtonClick={handleEngagementButtonClick.bind(
            this,
            content
          )}
          style={{ paddingBottom: "10px" }}
          showDiscussionComment={true}
          discussionCommentAuthor={author}
          profile={profileStats.profile}
          discussionCommentPlaceholder={
            author && author.length > 0
              ? `Answer ${author}'s question...`
              : "Answer this question..."
          }
          handleDiscussionCommentSubmit={handleSubmit}
        />
        {content && content.replies && (
          <div className="question-answer-section-replies">{`${numberOfReplies} answers`}</div>
        )}
        <div className="question-answers">
          {content &&
            content.replies &&
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
                      checked: getCheckedForEngagementType(
                        replyId,
                        "thanks",
                        reactions
                      ),
                      text: "Thanks",
                      icon: ThanksIcon,
                      iconChecked: ThanksCheckedIcon,
                      number: getEngagementForId(replyId, "thanks", reactions),
                    },
                    {
                      checked: getCheckedForEngagementType(
                        replyId,
                        "insightful",
                        reactions
                      ),
                      text: "Insightful",
                      icon: InsightfulIcon,
                      iconChecked: InsightfulCheckedIcon,
                      number: getEngagementForId(
                        replyId,
                        "insightful",
                        reactions
                      ),
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
                  profile={profileStats.profile}
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
                  <div
                    className="question-related-section-item-text"
                    key={index}
                  >
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
