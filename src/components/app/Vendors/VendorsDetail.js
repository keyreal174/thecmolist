import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { Button, Row, Col } from "react-bootstrap";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import BlockerText from "../base/BlockerText/BlockerText";
import VendorsFeed from "./VendorsFeed";
import AddVendorButton from "./VendorButton";

const Category = ({
  name,
  description,
  len,
  isMyProfile,
  getCategoryTitle,
}) => {
  return (
    <div className="vendor-detail-category d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <span className="vendor-detail-category--name">#{name}</span>
        <span className="vendor-detail-category--description text-capitalize">
          &nbsp;- {description}
        </span>
      </div>
      {len && len > 0 && isMyProfile ? (
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
  allowBackButton,
  showCategoryListView,
  filterIdx,
  className,
  handleInviteModal,
  isMyProfile,
  showDeletePostModal,
}) => {
  const AddInviteButton = () => (
    <Button
      className="filter--button filter--button-active active m-0"
      onClick={() => {
        handleInviteModal();
      }}
    >
      + Invite
    </Button>
  );

  const history = useHistory();
  const changeSubFilter = (title) => {
    document.getElementById(title).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {vendorsDetail && (
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
                            pathname: "/vendors",
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
                  vendorsDetail.blockerText && "add-vendor-blocker-wrapper"
                )}
              >
                {vendorsDetail.blockerText && (
                  <BlockerText blockerText={vendorsDetail.blockerText}>
                    <AddInviteButton />
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
                        getCategoryTitle={() => getCategoryTitle(category.name)}
                        len={category.vendors?.length || 0}
                        isMyProfile={isMyProfile}
                      />
                      <VendorsFeed
                        feedData={category.vendors}
                        getCategoryTitle={() => getCategoryTitle(category.name)}
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
      )}
    </>
  );
};

export default VendorsDetail;
