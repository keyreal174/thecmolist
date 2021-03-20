import React from "react";
import Article from "../base/Article/Article";
import Badge from "../base/Badge/Badge";
import "./network.scss";

const NetworkFeed = ({
  feedData,
  moreData,
  localConnectedUsers,
  connectUser,
  disconnectUser,
  fetchData,
}) => (
  <>
    <React.Fragment>
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
                  connectUser={connectUser}
                  disconnectUser={disconnectUser}
                />
              }
            />
          );
        })}
      {feedData && feedData.length === 0 && (
        <div className="wrapper article-wrapper">
          <div className="no-feed-data-header">No members here yet.</div>
        </div>
      )}
      {moreData && (
        <div className="mt-2">
          <button
            className="btn btn-white btn__load-more network-feed--button"
            type="button"
            onClick={fetchData}
          >
            Show more
          </button>
        </div>
      )}
    </React.Fragment>
  </>
);

export default NetworkFeed;
