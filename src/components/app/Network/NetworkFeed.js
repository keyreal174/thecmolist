import React from "react";
import Article from "../base/Article/Article";
import { Col, Row } from "react-bootstrap";
import Badge from "./Badge";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import "./network.scss";

const NetworkFeed = ({
  feedData,
  moreData,
  localConnectedUsers,
  invalidateFeed,
  connectUser,
  fetchData,
  onSubfilterChange,
  subfilters,
}) => (
  <>
    <Row>
      {subfilters && subfilters.length > 0 && (
        <Col md="4">
          <PopularTopics
            onSubfilterChange={onSubfilterChange}
            topicList={subfilters}
          />
        </Col>
      )}
      <Col md={subfilters && subfilters.length > 0 ? "8" : "12"}>
        {feedData &&
          feedData.map((feed, idx) => {
            return (
              <Article
                key={idx}
                className={
                  idx !== 0 ? "mt-1 network-list-item" : "network-list-item"
                }
                {...feed}
                badge={
                  <Badge
                    localConnectedUsers={localConnectedUsers}
                    feed={feed}
                    invalidateFeed={invalidateFeed}
                    connectUser={connectUser}
                  />
                }
              />
            );
          })}
        {moreData && (
          <div className="row">
            <div className="col-md-2 mt-2 mx-auto">
              <button
                className="btn btn__load-more"
                type="button"
                onClick={fetchData}
              >
                Show more
              </button>
            </div>
          </div>
        )}
      </Col>
    </Row>
  </>
);

export default NetworkFeed;
