import React from "react";
import Article from "../base/Article/Article";
import clsx from "clsx";
import "./vendors.scss";

const VendorsFeed = ({ feedData, moreData }) => {
  // FIXME: for the beta we disable pagination as the BE returns all data
  // POST BETA remove this
  moreData = false;
  return (
    <>
      <React.Fragment>
        {feedData &&
          feedData.map((feed, idx) => {
            return (
              <Article
                key={idx}
                className={clsx(
                  idx && "mt-1",
                  "network-list-item",
                  "vendors--feed-item"
                )}
                {...feed}
              />
            );
          })}
        {feedData && feedData.length === 0 && (
          <div className="wrapper article-wrapper no-feed-data-header">
            <div>No vendors here yet.</div>
          </div>
        )}
        {moreData && (
          <div className="row">
            <div className="col-md-2 mt-2 mx-auto">
              <button className="btn btn__load-more" type="button">
                Show more
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    </>
  );
};
export default VendorsFeed;
