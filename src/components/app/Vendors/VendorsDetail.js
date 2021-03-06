import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { Button, Row, Col, Container } from "react-bootstrap";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import BlockerText from "../base/BlockerText/BlockerText";
import VendorsFeed from "./VendorsFeed";
import AddVendorButton from "./VendorButton";
import InviteButton from "../base/Invite/InviteButton";

const Category = ({
  name,
  description,
  len,
  isMyProfile,
  getCategoryTitle,
  showVendorBtn,
}) => {
  const history = useHistory();
  return (
    <div className="vendor-detail-category d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center vendor-detail-category-content">
        <span
          className="vendor-detail-category--name cursor-pointer"
          onClick={() => history.push(`/topic/${name}`)}
        >
          #{name}
        </span>
        <span className="vendor-detail-category--description text-capitalize">
          &nbsp;- {description}
        </span>
      </div>
      <p className="vendor-detail-category--description text-capitalize mobile">
        {description}
      </p>
      {len && len > 0 && (isMyProfile || showVendorBtn) ? (
        <div className="add-vendor-button">
          <AddVendorButton getCategoryTitle={getCategoryTitle} />
        </div>
      ) : null}
    </div>
  );
};

const VendorsDetail = ({
  vendorsDetail,
  loadingVendors,
  mobileMenuOpen,
  getCategoryTitle,
  setLimit,
  allowBackButton,
  showCategoryListView,
  filterIdx,
  className,
  isMyProfile,
  showDeletePostModal,
  showVendorBtn,
  isAdminUser,
  vendorType,
}) => {
  const history = useHistory();
  const changeSubFilter = (title) => {
    document.getElementById(title).scrollIntoView({ behavior: "smooth" });
  };

  const links = {
    martech: "/vendors_martech",
    agencies: "/vendors_agencies",
    contractors: "/vendors_contractors",
  };

  return (
    <>
      {vendorsDetail && (
        <>
          <Row className={clsx("vendors--feed--wrapper", className)}>
            {vendorsDetail.categories && vendorsDetail.categories.length > 0 && (
              <Col className="vendors--popular-topics" md="4">
                <PopularTopics
                  onSubfilterChange={(f) => {
                    // Need to check for this changeSubFilter module
                    const new_title =
                      "#" + vendorsDetail.name + f.title.split("#")[1];
                    changeSubFilter(new_title);
                  }}
                  topicList={vendorsDetail.categories.map((c) => ({
                    title: "#" + c.name,
                    count: c.vendors.length || 0,
                  }))}
                  customHeading={
                    <div className="vendors--popular-topics-customhead">
                      {!allowBackButton && (
                        <a
                          onClick={() =>
                            history.push({
                              pathname: vendorType ? links[vendorType] : "",
                              state: { filterIdx },
                            })
                          }
                        >
                          {"< Back"}
                        </a>
                      )}
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
                <div
                  className={clsx(
                    vendorsDetail.blockerText &&
                      "add-vendor-blocker-wrapper vendor-detail-page-wrapper"
                  )}
                >
                  {vendorsDetail.blockerText && (
                    <BlockerText blockerText={vendorsDetail.blockerText}>
                      <InviteButton
                        text="+ Invite"
                        className="filter--button filter--button-active active m-0"
                        isAdminUser={isAdminUser}
                      />
                    </BlockerText>
                  )}
                  {vendorsDetail.categories &&
                    vendorsDetail.categories.map((category, i) => (
                      <div
                        key={i}
                        className="mb-4"
                        id={"#" + vendorsDetail.name + category.name}
                      >
                        <Category
                          name={category.name}
                          description={category.description}
                          getCategoryTitle={() =>
                            getCategoryTitle(category.name)
                          }
                          len={category.vendors?.length || 0}
                          isMyProfile={isMyProfile}
                          showVendorBtn={showVendorBtn}
                        />
                        <VendorsFeed
                          feedData={category.vendors}
                          getCategoryTitle={() =>
                            getCategoryTitle(category.name)
                          }
                          setLimit={(val) => setLimit(val)}
                          description={category.description}
                          showCategoryListView={showCategoryListView}
                          isMyProfile={isMyProfile}
                          showDeletePostModal={showDeletePostModal}
                        />
                      </div>
                    ))}
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default VendorsDetail;
