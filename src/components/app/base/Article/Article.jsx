import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import Markdown from "markdown-to-jsx";
import clsx from "clsx";
import Gallery from "../Gallery/Gallery";
import DiscussionComment from "../DiscussionComment/DiscussionComment";
import EngagementButtons from "../EngagementButtons/EngagementButtons";
import "./article.scss";

const RenderMarkdownTruncated = ({ numLines, markdown }) => {
  let [expanded, setExpanded] = useState(false);
  let markdownSanitized = "";
  // small strings don't need truncation
  if ((markdown.match(/ /g) || []).length < 40) {
    expanded = true;
    window.setTimeout(() => setExpanded(true), 0);
  } else {
    markdownSanitized = markdown.replace(/\n- /g, "<br />");
    markdownSanitized = markdownSanitized.replace(/\n\n/g, "<br />");
  }
  return expanded ? (
    <Markdown>{markdown}</Markdown>
  ) : (
    <ShowMoreText
      anchorClass="article-show-more"
      lines={numLines}
      more="See more"
      less=""
      width={0}
      onClick={() => setExpanded(true)}
    >
      <Markdown>{markdownSanitized}</Markdown>
    </ShowMoreText>
  );
};

function Article(props) {
  let articleBodyContentPresent =
    props.image ||
    props.headline ||
    props.subheadlines ||
    props.articletext ||
    props.subtext ||
    props.images;
  const engagementButtons = props.engagementButtons;
  const onEngagementButtonClick = props.onEngagementButtonClick;
  const withMargin = props.withMargin;

  return (
    <div
      className={`article-wrapper ${props.className ? props.className : ""}`}
    >
      <div>
        <div className="article-wrapper-container d-flex justify-content-between">
          <div className="flex-fill overflow-hidden">
            {props.header && (
              <div className="article-wrapper-header">
                {props.header.image && (
                  <Link to={props.contentlink ? props.contentlink : ""}>
                    <img
                      alt="image"
                      className="article-wrapper-image"
                      src={props.header.image}
                    />
                  </Link>
                )}
                <div>
                  <div className="article-wrapper-title">
                    {props.header.markdown ? (
                      <Markdown>{props.header.markdown}</Markdown>
                    ) : (
                      <Link to={props.header.link}>{props.header.text}</Link>
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
                  <div className="d-flex">
                    {props.image && props.image.length > 0 && (
                      <div className="article--image mr-3">
                        <div className="article-img">
                          <Link to={props.contentlink ? props.contentlink : ""}>
                            <img
                              src={props.image}
                              alt=""
                              className={
                                props.imageDisplay &&
                                props.imageDisplay === "square"
                                  ? "article-img-square"
                                  : ""
                              }
                            />
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className={clsx(
                        "article--content flex-grow-1",
                        props.badge && "article-has-badge"
                      )}
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
                            {props.subheadlines.map((subheadline, idx) => {
                              if (subheadline.markdown) {
                                return (
                                  <div
                                    key={idx}
                                    className="article-subheadline"
                                  >
                                    <Markdown>{subheadline.markdown}</Markdown>
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    key={idx}
                                    className="article-subheadline"
                                  >
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
                      {props.articletext && props.articletext.markdown && (
                        <div className="article-text article-blue-link">
                          {props.articletextlines ? (
                            <RenderMarkdownTruncated
                              numLines={props.articletextlines}
                              markdown={props.articletext.markdown}
                            />
                          ) : (
                            <Markdown>{props.articletext.markdown}</Markdown>
                          )}
                        </div>
                      )}
                      {props.articletext && props.articletext.length > 0 && (
                        <div className="article-text">
                          <ShowMoreText
                            lines={
                              props.articletextlines
                                ? props.articletextlines
                                : 2
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
                          {props.subtext.map((subtxt, index) => {
                            return (
                              <div className="flex" key={index}>
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
                      {props.imagesTitle && (
                        <div className="article-images-title">
                          {props.imagesTitle}
                        </div>
                      )}
                      <Gallery images={props.images} />
                    </div>
                  </div>
                  {props.children && (
                    <Row>
                      <Col sm="12" lg="12">
                        {props.children}
                      </Col>
                    </Row>
                  )}
                </div>
              </div>
            )}
          </div>
          <div>
            {props.badge && <div className="article-badge">{props.badge}</div>}
          </div>
        </div>
        {articleBodyContentPresent && (
          <div>
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
              numberOfInsightful={props.numberOfInsightful}
              numberOfLikes={props.numberOfLikes}
              onStatButtonClick={props.onStatButtonClick}
              showStats={props.showStats}
            />
            {props.showDiscussionComment && (
              <DiscussionComment
                focusComment={props.focusComment}
                onSubmit={props.handleDiscussionCommentSubmit}
                placeholder={props.discussionCommentPlaceholder}
                profile={props.profile}
                useRichEditor={props.useRichEditor}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Article;
