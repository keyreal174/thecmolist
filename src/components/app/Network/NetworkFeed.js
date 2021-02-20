import React from "react";
import Article from "../base/Article/Article";
import { Col, Row } from "react-bootstrap";
import Badge from "./Badge";
import PopularTopics from "../base/PopularTopics/PopularTopics";

const Feed = ({
  feedData,
  moreData,
  localConnectedUsers,
  invalidateFeed,
  connectUser,
  fetchData,
  subfilterKeys,
  feedFilter,
  onSubfilterChange,
  subfilters,
}) => (
  <>
    <Row>
      <Col md="4">
        <PopularTopics
          subfilterKeys={subfilterKeys}
          feedFilter={feedFilter}
          onSubfilterChange={onSubfilterChange}
          subfilters={subfilters}
        />
      </Col>
      <Col md="8">
        {feedData &&
          feedData.map((feed, idx) => {
            return (
              <Article
                key={idx}
                className={idx !== 0 ? "mt-1" : ""}
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

export default Feed;
