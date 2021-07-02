import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import VendorCard from "./VendorCard";
import "./vendors.scss";

const VendorsFeed = ({ vendor, getVendorsDetail }) => {
  // FIXME: for the beta we disable pagination as the BE returns all data
  // POST BETA remove this
  return (
    <>
      <div className="vendor-list-divider">
        <p>Trend Vendors</p>
      </div>
      <div className="vendor-list-container">
        <div className="vendor-list-info">
          <h1>{vendor.name}</h1>
          <p>{vendor.description}</p>
          <Button
            className="filter--button filter--button-active active m-0"
            onClick={() => {
              window.location.href = vendor.link;
            }}
          >
            See All
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
export default VendorsFeed;
