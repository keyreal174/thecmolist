import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import VendorCard from "./VendorCard";
import Arrow from "../base/icons/next_arrow.svg";
import "./vendors.scss";

const VendorListFeed = ({ vendor }) => {
  // FIXME: for the beta we disable pagination as the BE returns all data
  // POST BETA remove this
  return (
    <>
      <div className="vendor-list-divider">
        <p>Trending Vendors</p>
      </div>
      <div className="vendor-list-container">
        <div className="vendor-list-info">
          <h1>{vendor.name}</h1>
          <p>{vendor.description}</p>
          <Button
            className="filter--button filter--button-active active m-0 d-flex align-items-center"
            onClick={() => {
              window.location.href = vendor.link;
            }}
          >
            See All
            <img
              src={Arrow}
              alt="Arrow"
              width="16"
              height="20"
              className="ml-2"
            />
          </Button>
        </div>
        <div className="vendor-list-vendors">
          <Row>
            {vendor.vendors
              .filter((_, i) => i < 3)
              .map((item, index) => (
                <Col xl={4} lg={6} md={12} key={index}>
                  <VendorCard item={item} />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
};
export default VendorListFeed;
