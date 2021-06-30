import React, { useEffect } from "react";
import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import VendorsFeed from "./VendorsFeed";

const VendorsDetail = ({ props, mobileMenuOpen }) => {
  useEffect(() => {
    const fetchData = async () => await props.fetchVendorsDetail();
    fetchData();
  }, []);

  return (
    <>
      <Row className="vendors--feed--wrapper">
        {props.activeFeedSubFilters && props.activeFeedSubFilters.length > 0 && (
          <Col className="vendors--popular-topics" md="4">
            <PopularTopics
              onSubfilterChange={(f) => {
                props.changeSubFilter(f.slug || f.title);
              }}
              topicList={props.activeFeedSubFilters}
            />
          </Col>
        )}
        <Col
          className={clsx("vendors--feed", mobileMenuOpen && "open")}
          md={
            props.activeFeedSubFilters && props.activeFeedSubFilters.length > 0
              ? "8"
              : "12"
          }
        >
          {props.loadingVendors ? (
            <div className="mt-3 mb-5">
              <ActivityIndicator className="element-center feed-activity-indicator" />
            </div>
          ) : (
            <VendorsFeed {...props} feedData={props.vendorsDetail} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default VendorsDetail;
