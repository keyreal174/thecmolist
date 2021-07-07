import React from "react";
import clsx from "clsx";
import { Button } from "react-bootstrap";
import Article from "../base/Article/Article";
import VendorConnections from "./VendorConnections";
import "./vendors.scss";

const VendorsFeed = ({ feedData, getCategoryTitle, name }) => {
  // FIXME: for the beta we disable pagination as the BE returns all data
  // POST BETA remove this
  let moreData = false;

  const AddVendorButton = () => (
    <Button
      className="filter--button filter--button-active active m-0"
      style={{ borderRadius: 20, opacity: 0.8, whiteSpace: "nowrap" }}
      onClick={getCategoryTitle}
    >
      + Add Vendor
    </Button>
  );

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
              >
                {feed.connections && feed.connections.length > 0 && (
                  <VendorConnections connections={feed.connections} />
                )}
              </Article>
            );
          })}
        {feedData && feedData.length === 0 && (
          <div className="wrapper no-vendor-list-header d-flex align-items-center">
            <div className="mr-4 mb-3">
              Your peers have not yet shared any{" "}
              <span className="text-capitalize">{name}</span> vendors
            </div>
            <AddVendorButton />
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
