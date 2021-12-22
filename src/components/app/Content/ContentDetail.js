import React, { useEffect, useState } from "react";
import Article from "../base/Article/Article";
import CustomCard from "../base/CustomCard/CustomCard";
import clsx from "clsx";
import { Button, Col } from "react-bootstrap";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";
import DiscussionComment from "../base/DiscussionComment/DiscussionComment";
import Entities from "../base/Entities/Entities";
import EditPostModal from "../base/EditPostModal/EditPostModal";
import RichEditPostModal from "../base/RichEditPostModal/RichEditPostModal";
import { cdn } from "../../util/constants";
import Util from "../../util/Util";

import AnswerIcon from "../base/icons/answer.svg";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";
import AllMembersListModal from "../base/AllMembersList/AllMembersListModal";

const ContentDetail = ({
  content,
  profileStats,
  mobileMenuOpen,
  reactions,
  reactionsById,
  getReactionsById,
  saveCommentToContent,
  saveCommentToReply,
  saveReactionToCallerType,
  setError,
}) => {
  const [focusCommentToggle, setFocusCommentToggle] = useState(true);
  const [showStatModal, setShowStatModal] = useState(false);
  const [statType, setStatType] = useState("");
  const [selectedContentId, setSelectedContentId] = useState(0);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    if (profileStats && profileStats.profile) {
      setIsAdminUser(profileStats.profile.isAdminUser);
    }
  }, [profileStats]);

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
  const contentId = content ? content.content_id : -1;
  const author = content && content.content ? content.content.author : "";

  const handleStatButtonClick = (cId, key) => {
    setShowStatModal(true);
    getReactionsById(cId);
    setSelectedContentId(cId);
    setStatType(key);
  };
  const handleCloseButtonClick = () => {
    setShowStatModal(false);
  };

  const numberOfLikes = getEngagementForId(contentId, "thanks", reactions);
  const numberOfInsightful = getEngagementForId(
    contentId,
    "insightful",
    reactions
  );

  const getListOfStatById = (id, type) => {
    let list;

    if (reactionsById && Object.keys(reactionsById).length) {
      if (reactionsById.content && reactionsById.content.contentId === id) {
        list = reactionsById.content.reactions;
      } else {
        reactionsById.replies &&
          reactionsById.replies.forEach((reply) => {
            if (reply.contentId === id) {
              list = reply.reactions;
            }
          });
      }
      return list ? list[type] : [];
    }
    return [];
  };

  const toggleEditPostModal = () => {
    setShowEditPostModal((value) => !value);
  };

  const badge = (content) => {
    return content?.canEdit ? (
      <Button
        className="edit-content-btn"
        onClick={() => {
          toggleEditPostModal();
          setSelectedContentId(content.content_id);
          setSelectedContent(content);
        }}
      >
        Edit
      </Button>
    ) : null;
  };

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
              number: numberOfLikes,
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
              number: numberOfInsightful,
            },
          ]}
          focusComment={focusCommentToggle}
          onEngagementButtonClick={handleEngagementButtonClick.bind(
            this,
            content
          )}
          numberOfInsightful={numberOfInsightful}
          numberOfLikes={numberOfLikes}
          onStatButtonClick={handleStatButtonClick.bind(this, contentId)}
          style={{ paddingBottom: "10px" }}
          showDiscussionComment={true}
          showStats={true}
          discussionCommentAuthor={author}
          profile={profileStats.profile}
          useRichEditor={true}
          discussionCommentPlaceholder={
            author && author.length > 0 ? `Reply to ${author}` : "Reply"
          }
          handleDiscussionCommentSubmit={handleSubmit}
          badge={badge(content)}
          className="article-wrapper-content-detail"
        >
          {content.entities && content.entities.length > 0 && (
            <Entities entities={content.entities} />
          )}
        </Article>
        <AllMembersListModal
          showStatModal={showStatModal}
          onHide={handleCloseButtonClick}
          statType={statType}
          list={getListOfStatById(selectedContentId, statType)}
        />
        {content && content.replies && content.replies.length > 0 && (
          <div className="question-answer-section-replies">
            {Util.plural(numberOfReplies, "answer", "answers")}
          </div>
        )}
        <div className="question-answers">
          {content &&
            content.replies &&
            content.replies.length > 0 &&
            content.replies.map((reply, index) => {
              const replyId = reply.content_id;
              const replyLikes = getEngagementForId(
                replyId,
                "thanks",
                reactions
              );
              const replyInsightful = getEngagementForId(
                replyId,
                "insightful",
                reactions
              );

              return (
                <Article
                  id={`article-${replyId}`}
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
                      number: replyLikes,
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
                      number: replyInsightful,
                    },
                  ]}
                  onEngagementButtonClick={handleEngagementButtonClick.bind(
                    this,
                    reply
                  )}
                  onStatButtonClick={handleStatButtonClick.bind(this, replyId)}
                  numberOfInsightful={replyInsightful}
                  numberOfLikes={replyLikes}
                  showStats={true}
                  showDiscussionComment={true}
                  discussionCommentAuthor={author}
                  handleDiscussionCommentSubmit={handleSubmitToReply.bind(
                    this,
                    reply
                  )}
                  profile={profileStats.profile}
                  badge={badge(reply)}
                  className="article-wrapper-content-detail"
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
          {/* NOTE: There is a bug with Draft JS and multiple controls: https://github.com/draft-js-plugins/draft-js-plugins/issues/1244*/}
          {content && content.replies && content.replies.length > 0 && (
            <div className="question-your-answer">
              <div className="question-your-answer-text">Your reply</div>
              <DiscussionComment
                profile={profileStats.profile}
                placeholder={
                  author && author.length > 0 ? `Reply to ${author}` : "Reply"
                }
                onSubmit={handleSubmit}
                useRichEditor={true}
              />
            </div>
          )}
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
      {isAdminUser ? (
        <EditPostModal
          show={showEditPostModal}
          handleClose={toggleEditPostModal}
          contentId={selectedContentId}
          content={selectedContent}
        />
      ) : (
        <RichEditPostModal
          show={showEditPostModal}
          handleClose={toggleEditPostModal}
          contentId={selectedContentId}
          content={selectedContent}
        />
      )}
    </>
  );
};

export default ContentDetail;
