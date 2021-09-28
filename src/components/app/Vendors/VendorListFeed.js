import React from "react";
import { useHistory } from "react-router";
import { Button, Col, Row } from "react-bootstrap";
import clsx from "clsx";
import Article from "../base/Article/Article";
import VendorConnections from "./VendorConnections";
import VendorCard from "./VendorCard";
import Arrow from "../base/icons/next_arrow.svg";
import "./vendors.scss";

const SeeAllBtn = ({ vendor, filterIdx }) => {
  const history = useHistory();

  return (
    <Button
      className="filter--button-active active m-0 d-flex align-items-center"
      onClick={() => {
        history.push({
          pathname: vendor.link,
          state: {
            filterIdx: filterIdx,
          },
        });
      }}
    >
      See All
      <img src={Arrow} alt="Arrow" width="16" height="20" className="ml-2" />
    </Button>
  );
};

const VendorListFeed = ({ vendor, filterIdx, index }) => {
  return (
    <>
      {index !== 0 && <div className="vendor-list-divider"></div>}
      <div className="vendor-list-container">
        <div className="vendor-list-info">
          <h1>{vendor.name}</h1>
          <p>{vendor.description}</p>
        </div>
        <div className="vendor-list-divider mobile">
          <p>Trending Vendors</p>
        </div>
        <div className="vendor-list-vendors">
          <Row className="vendor-list-vendors-desktop">
            {vendor.vendors
              .filter((_, i) => i < 3)
              .map((item, index) => (
                <Col xl={4} lg={6} md={6} sm={12} key={index}>
                  <Article
                    key={index}
                    className={clsx("network-list-item", "vendors--feed-item")}
                    {...item}
                  >
                    {item.connections &&
                      item.connections.list &&
                      item.connections.list.length > 0 && (
                        <VendorConnections
                          num_connections={item.connections.num_connections}
                          connections={item.connections.list}
                        />
                      )}
                  </Article>
                </Col>
              ))}
          </Row>
          <div className="vendor-list-vendors-mobile">
            {vendor.vendors
              .filter((_, i) => i < 3)
              .map((item, index) => (
                <Article
                  key={index}
                  className={clsx(
                    index && "mt-3",
                    "network-list-item",
                    "vendors--feed-item"
                  )}
                  {...item}
                >
                  {item.connections &&
                    item.connections.list &&
                    item.connections.list.length > 0 && (
                      <VendorConnections
                        num_connections={item.connections.num_connections}
                        connections={item.connections.list}
                      />
                    )}
                </Article>
              ))}
          </div>
        </div>
      </div>
      <div className="vendor-list-button-wrapper">
        <SeeAllBtn vendor={vendor} filterIdx={filterIdx} />
      </div>
    </>
  );
};
export default VendorListFeed;
