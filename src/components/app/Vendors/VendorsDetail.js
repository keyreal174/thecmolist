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

  return (
    <>
      {vendorsDetail && (
        <Row className="vendors--feed--wrapper">
          {vendorsDetail.filters && vendorsDetail.filters.length > 0 && (
            <Col className="vendors--popular-topics" md="4">
              <PopularTopics
                onSubfilterChange={(f) => {
                  // props.changeSubFilter(f.slug || f.title);
                }}
                topicList={vendorsDetail.filters}
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
              vendorsDetail.filters && vendorsDetail.filters.length > 0
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
                    <div key={i}>
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
