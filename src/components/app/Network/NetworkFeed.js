import React, { useEffect, useRef } from "react";
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
}) => {
  const loadMoreRef = useRef(null);
  const loadMoreScroll = (entries) => {
    if (entries && entries.length > 0) {
      const target = entries[0];
      if (target.isIntersecting) {
        console.log("Feed network fetch data");
        fetchData();
      }
    }
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(loadMoreScroll, options);
    if (loadMoreRef && loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => loadMoreRef.current && observer.unobserve(loadMoreRef.current);
  }, [loadMoreRef]);
  return (
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
          <div className="wrapper article-wrapper no-feed-data-header">
            <div>No members here yet.</div>
          </div>
        )}
        {moreData && (
          <div className="mt-2">
            <button
              className="btn btn-white btn__load-more network-feed--button invisible"
              type="button"
              onClick={fetchData}
              ref={loadMoreRef}
            >
              Show more
            </button>
          </div>
        )}
      </React.Fragment>
    </>
  );
};
export default NetworkFeed;
