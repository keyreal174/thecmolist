import React from "react";
import VendorsFeed from "./VendorsFeed";

const VendorsDetail = (props) => {
  return (
    <>
      {/*<Row>
        {props.activeFeedSubFilters &&
          props.activeFeedSubFilters.length > 0 && (
            <Col className="network--popular-topics" md="4">
              <PopularTopics
                onSubfilterChange={(f) => {
                  props.changeSubFilter(f.slug || f.title);
                }}
                topicList={props.activeFeedSubFilters}
              />
            </Col>
          )}
        <Col
          className={clsx("network--feed", mobileMenuOpen && "open")}
          md={
            props.activeFeedSubFilters &&
            props.activeFeedSubFilters.length > 0
              ? "8"
              : "12"
          }
        >
          {props.loadingNetwork ? (
            <div className="mt-3 mb-5">
              <ActivityIndicator className="element-center feed-activity-indicator" />
            </div>
          ) : (
            <NetworkFeed
              {...props}
              connectUser={onConnectClick}
              disconnectUser={disconnectUser}
              localConnectedUsers={props.localConnectedUsers}
              fetchData={fetchData}
              feedData={feedData}
            />
          )}
        </Col>
          </Row>*/}
    </>
  );
};

export default VendorsDetail;
