import React from "react";
import Article from "../base/Article/Article";
import "./vendors.scss";

const NetworkFeed = ({ feedData, moreData, fetchData }) => {
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
                {...feed.data}
              />
            );
          })}
        {feedData && feedData.length === 0 && (
          <div className="wrapper article-wrapper">
            <div className="no-feed-data-header">No members here yet.</div>
          </div>
        )}
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
      </React.Fragment>
    </>
  );
};
export default NetworkFeed;
