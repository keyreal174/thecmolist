import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import Markdown from "markdown-to-jsx";
import Gallery from "../Gallery/Gallery";
import DiscussionComment from "../DiscussionComment/DiscussionComment";
import EngagementButtons from "../EngagementButtons/EngagementButtons";
import "./article.scss";

function Article(props) {
  let articleBodyContentPresent =
    props.image ||
    props.headline ||
    props.subheadlines ||
    props.articletext ||
    props.subtext ||
    props.images;
  let engagementButtons = props.engagementButtons;
  let onEngagementButtonClick = props.onEngagementButtonClick;
  const withMargin = props.withMargin;

  return (
    <div
      className={`article-wrapper ${props.className ? props.className : ""}`}
    >
      {props.header && (
        <div className="article-wrapper-header">
          {props.header.image && (
            <img
              alt="profile"
              className="article-wrapper-image"
              src={props.header.image}
            />
          )}
          <div>
            <div className="article-wrapper-title">
              {props.header.markdown ? (
                <Markdown>{props.header.markdown}</Markdown>
              ) : (
                <a href={props.header.link} className="mr-1 mb-1">
                  {props.header.text}
                </a>
              )}
            </div>
            {props.header.subtext && (
              <div className="article-wrapper-subtitle">
                {props.header.subtext.markdown ? (
                  <Markdown>{props.header.subtext.markdown}</Markdown>
                ) : (
                  <span>{props.header.subtext}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {articleBodyContentPresent && (
        <div>
          <div className="article-body article-wrap">
            <Row>
              {props.image && props.image.length > 0 && (
                <Col sm="2" lg="1">
                  <div className="article-img">
                    <img
                      src={props.image}
                      alt=""
                      className={
                        props.imageDisplay && props.imageDisplay === "square"
                          ? "article-img-square"
                          : ""
                      }
                    />
                  </div>
                </Col>
              )}
              <Col
                sm={props.image && props.image.length > 0 ? "10" : "12"}
                lg={props.image && props.image.length > 0 ? "11" : "12"}
              >
                <h2 className="article-title">
                  {props.headline.markdown ? (
                    <Markdown>{props.headline.markdown}</Markdown>
                  ) : (
                    props.headline
                  )}
                </h2>
                <div>
                  {props.subheadlines && (
                    <div className="article-subheadlines">
                      {props.subheadlines.map((subheadline) => {
                        if (subheadline.markdown) {
                          return (
                            <div className="article-subheadline">
                              <Markdown>{subheadline.markdown}</Markdown>
                            </div>
                          );
                        } else {
                          return (
                            <div className="article-subheadline">
                              {subheadline.link ? (
                                <Link to={subheadline.link}>
                                  {subheadline.text}
                                </Link>
                              ) : (
                                <ShowMoreText
                                  lines={1}
                                  more="See more"
                                  less=""
                                  width={0}
                                >
                                  {subheadline.text}
                                </ShowMoreText>
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
                {props.subtitle && props.subtitle.length > 0 && (
                  <div className="article-subtitle">{props.subtitle}</div>
                )}
                {props.articletext && props.articletext.length > 0 && (
                  <div className="article-text">
                    <ShowMoreText
                      lines={
                        props.articletextlines ? props.articletextlines : 2
                      }
                      keepNewLines={true}
                      more="See more"
                      less=""
                      width={0}
                    >
                      {props.articletext}
                    </ShowMoreText>
                  </div>
                )}
                {props.subtext && (
                  <div className="article-labels">
                    {props.subtext.map((subtxt) => {
                      return (
                        <div className="flex">
                          {subtxt.text.label && (
                            <span className="article-label">
                              {subtxt.label}
                            </span>
                          )}
                          {subtxt.text.markdown ? (
                            <Markdown>{subtxt.text.markdown}</Markdown>
                          ) : (
                            <ShowMoreText
                              lines={1}
                              more="See more"
                              less=""
                              width={0}
                            >
                              {subtxt.text}
                            </ShowMoreText>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                {props.badge && (
                  <div className="article-badge">{props.badge}</div>
                )}
                {props.imagesTitle && (
                  <div className="article-images-title">
                    {props.imagesTitle}
                  </div>
                )}
                <Gallery images={props.images} />
              </Col>
            </Row>
            {props.children && (
              <Row>
                <Col sm="9" lg="11" style={{ paddingLeft: "0px" }}>
                  {props.children}
                </Col>
              </Row>
            )}
          </div>
          <EngagementButtons
            className={`
              ${withMargin ? "article-engagement-buttons__with-margin" : ""}
              ${
                !props.showDiscussionComment
                  ? "article-engagement-buttons__with-border"
                  : ""
              }
            `}
            engagementButtons={engagementButtons}
            onEngagementButtonClick={onEngagementButtonClick}
          />
          {props.showDiscussionComment && (
            <DiscussionComment
              placeholder={props.discussionCommentPlaceholder}
              onSubmit={props.handleDiscussionCommentSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Article;
