import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import Markdown from "markdown-to-jsx";
import Article from "../base/Article/Article";
import CustomCard from "../base/CustomCard/CustomCard";
import clsx from "clsx";
import "./vendors.scss";

const VendorsFeed = ({ vendor }) => {
  // FIXME: for the beta we disable pagination as the BE returns all data
  // POST BETA remove this
  return (
    <>
      <div className="vendor-list-divider">
        <p>Trend Vendors</p>
      </div>
      <div className="vendor-list-container">
        <div className="vendor-list-info">
          <h1>{vendor.name}</h1>
          <p>{vendor.description}</p>
          <Button
            className="filter--button filter--button-active active m-0"
            onClick={() => {
              window.location.href = vendor.link;
            }}
          >
            See All
          </Button>
        </div>
        <div className="vendor-list-vendors">
          <Row>
            {vendor.vendors
              .filter((_, i) => i < 3)
              .map((item, index) => (
                <Col md={4} sm={12} key={index}>
                  <CustomCard>
                    <div className="avatar-thumb text-center mr-0 mb-2">
                      <img
                        className="rounded-circle"
                        src={item.image}
                        width="39"
                        height="39"
                        alt="avatar"
                      />
                    </div>
                    <h2 className="article-title text-center">
                      {item.headline.markdown ? (
                        <Markdown>{item.headline.markdown}</Markdown>
                      ) : (
                        item.headline
                      )}
                    </h2>
                    <div className="text-center">
                      {item.subheadlines && (
                        <div
                          className="article-subheadlines mr-0"
                          style={{ maxWidth: "100%" }}
                        >
                          {item.subheadlines.map((subheadline, idx) => {
                            if (subheadline.markdown) {
                              return (
                                <div key={idx} className="article-subheadline">
                                  <Markdown>{subheadline.markdown}</Markdown>
                                </div>
                              );
                            } else {
                              return (
                                <div key={idx} className="article-subheadline">
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
                    <div className="vendor-article-text">
                      <ShowMoreText
                        keepNewLines={true}
                        lines={2}
                        more="See more"
                        less="See less"
                        width={0}
                      >
                        {item.articletext}
                      </ShowMoreText>
                    </div>
                  </CustomCard>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
};
export default VendorsFeed;
