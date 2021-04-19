import React, { useState } from "react";
import Article from "../base/Article/Article";
import CustomCard from "../base/CustomCard/CustomCard";
import clsx from "clsx";
import { Col } from "react-bootstrap";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";
import DiscussionComment from "../base/DiscussionComment/DiscussionComment";

import AnswerIcon from "../base/icons/answer.svg";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";
import { cdn } from "../../util/constants";

const ContentDetail = ({
  content,
  profileStats,
  mobileMenuOpen,
  reactions,
  saveCommentToContent,
  saveCommentToReply,
  saveReactionToCallerType,
  setError,
}) => {
  const [focusCommentToggle, setFocusCommentToggle] = useState(true);
  const focusError = () => {
    const errorSection = document.getElementById("error-section");
    window.scrollTo(0, 0);
    errorSection.focus();
  };
  const handleSubmit = async (comment) => {
    try {
      setError("");
      await saveCommentToContent(comment);
      window.setTimeout(
        () => window.scrollTo(0, document.body.scrollHeight),
        100
      );
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

  const handleEngagementButtonClick = async (
    caller,
    engagementType,
    engagementText
  ) => {
    const id = caller["content_id"];
    const engagement = engagementText.toLowerCase();
    if (engagementType === "Answer") {
      setFocusCommentToggle(!focusCommentToggle);
    } else {
      try {
        setError("");
        await saveReactionToCallerType({ id, engagement });
      } catch (error) {
        setError(error.message);
        focusError();
      }
    }
  };

  const numberOfReplies =
    content && content.replies ? content.replies.length : 0;
  const contentId = content && content.content_id;
  const author = content && content.content ? content.content.author : "";

  return (
    <>
      <Col
        className={clsx("question-answer-section", mobileMenuOpen && "open")}
        md="8"
      >
        <Article
          {...content.content}
          engagementButtons={[
            {
              checked: true,
              text: content.replyText || "Reply",
              type: "Answer",
              icon: AnswerIcon,
              number: numberOfReplies,
            },
            {
              checked: getCheckedForEngagementType(
                contentId,
                "thanks",
                reactions
              ),
              text: "Like",
              type: "Reaction",
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
              type: "Reaction",
              icon: InsightfulIcon,
              iconChecked: InsightfulCheckedIcon,
              number: getEngagementForId(contentId, "insightful", reactions),
            },
          ]}
          focusComment={focusCommentToggle}
          onEngagementButtonClick={handleEngagementButtonClick.bind(
            this,
            content
          )}
          style={{ paddingBottom: "10px" }}
          showDiscussionComment={true}
          discussionCommentAuthor={author}
          profile={profileStats.profile}
          useRichEditor={true}
          discussionCommentPlaceholder={
            author && author.length > 0
              ? `Answer ${author}'s question...`
              : "Answer this question..."
          }
          handleDiscussionCommentSubmit={handleSubmit}
        />
        {content && content.replies && content.replies.length > 0 && (
          <div className="question-answer-section-replies">{`${numberOfReplies} answers`}</div>
        )}
        <div className="question-answers">
          {content &&
            content.replies &&
            content.replies.length > 0 &&
            content.replies.map((reply, index) => {
              const replyId = reply.content_id;

              return (
                <Article
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
                      text: "Like",
                      type: "Reaction",
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
                      type: "Reaction",
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
          {/* Disable due to following bug: https://github.com/draft-js-plugins/draft-js-plugins/issues/1244*/}
          {/* {content && content.replies && content.replies.length > 0 && (
            <div className="question-your-answer">
              <div className="question-your-answer-text">Your answer</div>
              <DiscussionComment
                profile={profileStats.profile}
                placeholder={
                  author && author.length > 0
                    ? `Answer ${author}'s question...`
                    : "Answer this question..."
                }
                onSubmit={handleSubmit}
                useRichEditor={true}
              />
            </div>
          )} */}
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
