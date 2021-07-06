import React, { useEffect } from "react";
import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import VendorsFeed from "./VendorsFeed";

const Category = ({ name, description }) => {
  return (
    <div className="vendor-detail-category">
      <span className="vendor-detail-category--name">{name}</span>
      <span className="vendor-detail-category--description">
        &nbsp;- {description}
      </span>
    </div>
  );
};

const VendorsDetail = ({
  vendorsDetail,
  fetchVendorsDetail,
  loadingVendors,
  mobileMenuOpen,
}) => {
  useEffect(() => {
    const fetchData = async () => await fetchVendorsDetail();
    fetchData();
  }, []);

  const changeSubFilter = (title) => {
    document.getElementById(title).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {vendorsDetail && (
        <Row className="vendors--feed--wrapper">
          {vendorsDetail.categories && vendorsDetail.categories.length > 0 && (
            <Col className="vendors--popular-topics" md="4">
              <PopularTopics
                onSubfilterChange={(f) => {
                  // Need to check for this changeSubFilter module
                  changeSubFilter(f.title);
                }}
                topicList={vendorsDetail.categories.map((c) => ({
                  title: c.name,
                  count: c.vendors.length || 0,
                }))}
                customHeading={
                  <div className="vendors--popular-topics-customhead">
                    <a onClick={() => window.history.back()}>{"< Back"}</a>
                    <h2>{vendorsDetail.name}</h2>
                    <p>{vendorsDetail.description}</p>
                  </div>
                }
              />
            </Col>
          )}
          <Col
            className={clsx("vendors--feed", mobileMenuOpen && "open")}
            md={
              vendorsDetail.categories && vendorsDetail.categories.length > 0
                ? "8"
                : "12"
            }
          >
            {loadingVendors ? (
              <div className="mt-3 mb-5">
                <ActivityIndicator className="element-center feed-activity-indicator" />
              </div>
            ) : (
              <div>
                {vendorsDetail.categories &&
                  vendorsDetail.categories.map((category, i) => (
                    <div key={i} className="mb-4" id={category.name}>
                      <Category
                        name={category.name}
                        description={category.description}
                      />
                      <VendorsFeed feedData={category.vendors} />
                    </div>
                  ))}
              </div>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default VendorsDetail;
