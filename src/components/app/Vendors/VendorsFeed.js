import React from "react";
import clsx from "clsx";
import { Button } from "react-bootstrap";
import Article from "../base/Article/Article";
import VendorConnections from "./VendorConnections";
import AddVendorButton from "./VendorButton";
import "./vendors.scss";

const VendorsFeed = ({
  feedData,
  getCategoryTitle,
  setLimit,
  description,
  showCategoryListView,
  isMyProfile,
  showDeletePostModal,
}) => {
  const badge = (feed) => {
    return showCategoryListView ? (
      isMyProfile ? (
        <>
          <span
            className="cursor-pointer noselect desktop-delete"
            onClick={() => showDeletePostModal(feed)}
          >
            ✖
          </span>
          <span
            className="cursor-pointer noselect mobile-delete"
            onClick={() => showDeletePostModal(feed)}
          >
            Delete
          </span>
        </>
      ) : (
        <a
          className="m-0 add-mystack-btn"
          onClick={() => {
            getCategoryTitle();
            setLimit(1);
          }}
        >
          + My Stack
        </a>
      )
    ) : null;
  };

  return (
    <>
      <React.Fragment>
        {feedData &&
          feedData.map((feed, idx) => {
            return (
              <Article
                key={idx}
                className={clsx(
                  idx && "mt-3",
                  "network-list-item",
                  "vendors--feed-item"
                )}
                badge={badge(feed)}
                {...feed}
              >
                {feed.connections && feed.connections.length > 0 && (
                  <VendorConnections connections={feed.connections} />
                )}
              </Article>
            );
          })}
        {feedData && feedData.length === 0 && (
          <div className="wrapper no-vendor-list-header d-flex align-items-center justify-content-between">
            <div className="mr-4 flex-grow-1">
              <i>
                Your peers have not yet shared any{" "}
                <span className="text-capitalize">{description}</span> vendors
              </i>
            </div>
            <AddVendorButton getCategoryTitle={getCategoryTitle} />
          </div>
        )}
      </React.Fragment>
    </>
  );
};
export default VendorsFeed;
