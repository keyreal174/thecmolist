import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import Banner from "../base/Banner/Banner";
import InviteModal from "../base/ShareModule/InviteModal";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import ProfileStats from "../ProfileStats/ProfileStats";
import Analytics from "../../util/Analytics";
import Arrow from "../base/icons/arrow.svg";
import "./feed.css";

function RenderRightContainer({
  buildYourNetworkItems,
  peopleInSimilarRoles,
  newMembers,
}) {
  return (
    <Col md="3" className="feed-right-container">
      <div className="feed-box">
        <div className="feed-box-title">Build your network</div>
        <div className="feed-box-content">
          {buildYourNetworkItems &&
            buildYourNetworkItems.map((item, index) => {
              return (
                <div className="feed-box-content-item" key={index}>
                  {item.checked ? (
                    <span className="feed-box-content-icon">✓</span>
                  ) : (
                    <input type="checkbox" defaultChecked={item.checked} />
                  )}
                  <span
                    className={`feed-box-content-text ${
                      item.checked ? "feed-box-content-text-checked" : ""
                    }`}
                  >
                    {item.content}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="feed-box feed-box-margin-top">
        <div className="feed-box-title">People in similar roles</div>
        <div className="feed-box-content">
          {peopleInSimilarRoles &&
            peopleInSimilarRoles.map(({ name, role }, index) => {
              return (
                <div
                  className="feed-box-content-item feed-box-content-item-special"
                  key={index}
                >
                  <div className="feed-box-content-name">{name}</div>
                  <div className="feed-box-content-role">{role}</div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="feed-box feed-box-margin-top">
        <div className="feed-box-title">New members</div>
        <div className="feed-box-content">
          {newMembers &&
            newMembers.map(({ name, role }, index) => {
              return (
                <div
                  className="feed-box-content-item feed-box-content-item-special"
                  key={index}
                >
                  <div className="feed-box-content-name">{name}</div>
                  <div className="feed-box-content-role">{role}</div>
                </div>
              );
            })}
        </div>
      </div>
    </Col>
  );
}

function RenderFeed({ feedData, fetchActiveFeed }) {
  let onLoadMoreClick = (e) => {
    e.preventDefault();
    e.target && e.target.blur && e.target.blur();
    fetchActiveFeed();
  };
  let moreData = true;
  return (
    <Col md="6">
      {feedData &&
        feedData.map((feed, idx) => {
          return (
            <Article
              key={idx}
              className={
                idx !== 0 ? "mt-1 feed-dashboard-cell" : "feed-dashboard-cell"
              }
              {...feed}
            />
          );
        })}

      {moreData && (
        <div className="row">
          <div className="col-md-2 mt-2 mx-auto">
            <button
              className="btn btn__load-more"
              type="button"
              onClick={onLoadMoreClick}
            >
              Show more
            </button>
          </div>
        </div>
      )}
    </Col>
  );
}

function RenderDashboard(props) {
  const feedLoading = props.feedLoading;
  const profileStats = props.profileStats;
  return (
    <Row>
      <Col md="3" style={{ paddingRight: "0px" }}>
        {profileStats && <ProfileStats profileStats={profileStats} />}
      </Col>
      {feedLoading ? (
        <Col md="6">
          <div className="mt-3 mb-5">
            <ActivityIndicator className="element-center feed-activity-indicator" />
          </div>
        </Col>
      ) : (
        <RenderFeed
          feedData={props.feedData}
          fetchActiveFeed={props.fetchActiveFeed}
        />
      )}
      <RenderRightContainer
        buildYourNetworkItems={profileStats.buildYourNetwork}
        peopleInSimilarRoles={profileStats.peopleInSimilarRoles}
        newMembers={profileStats.newMembers}
      />
    </Row>
  );
}

const Feed = (props) => {
  const subSelectors = [
    { title: "Questions & Answers", slug: "qa" },
    { title: "Projects & Vendors", slug: "projects" },
    { title: "Articles & News", slug: "articles" },
    { title: "All", slug: "all" },
  ];
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [activeSelector, setActiveSelector] = useState(0);
  const [filterIdx, setFilterIdx] = useState(0);
  const [filters, setFilters] = useState([]);
  const changeDashboardFilter = async (filter, subfilter) =>
    props.changeDashboardFilter({ filter, subfilter });
  useEffect(() => {
    const getProfileStats = async () => props.getProfileStats();
    getProfileStats().then((profileStats) => {
      let newFilters = [
        { title: "All members", slug: "all-members", enabled: true },
        { title: "My Peers", slug: "my-peers", enabled: true },
        { title: "My Experts", slug: "my-experts", enabled: true },
      ];
      if (profileStats && profileStats.groups) {
        newFilters = newFilters.concat(
          profileStats.groups.map((group) => {
            return {
              title: group.name,
              slug: group.slug,
              enabled: true,
            };
          })
        );
      }
      setFilters(newFilters);
      changeDashboardFilter(
        newFilters[filterIdx].slug,
        subSelectors[activeSelector].slug
      );
    });
  }, []);
  const changeFilter = (idx) => {
    setFilterIdx(idx);
    changeDashboardFilter(filters[idx].slug, subSelectors[activeSelector].slug);
  };
  const changeSubFilter = (idx) => {
    setActiveSelector(idx);
    changeDashboardFilter(filters[filterIdx].slug, subSelectors[idx].slug);
  };

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <Banner
            title="CMOlist"
            img="https://d3k6hg21rt7gsh.cloudfront.net/directory.png"
          >
            <div className="btn-wrapper d-flex flex-column">
              <Button
                className="btn-white modal-primary-button mb-2"
                variant="outline-primary"
              >
                Ask Question
              </Button>
              <Button
                className="btn-white modal-primary-button mb-2"
                variant="outline-primary"
              >
                Share Experience
              </Button>
              <Button
                className="btn-white modal-primary-button mb-2"
                variant="outline-primary"
              >
                Share Article
              </Button>
            </div>
          </Banner>

          <div style={{ width: "100%" }}>
            <Filter
              className="mt-1"
              filterIdx={filterIdx}
              filters={filters}
              onChange={(idx) => changeFilter(idx)}
            />
          </div>

          <div className="feed-divider">
            <div className="section-break" />
            {subSelectors.map((sel, idx) => {
              return (
                <Fragment key={idx}>
                  {idx === 0 ? <span>&nbsp;</span> : <span>&nbsp;|&nbsp;</span>}
                  {idx === activeSelector ? (
                    <span style={{ fontWeight: 600, lineHeight: "25px" }}>
                      {sel.title}
                    </span>
                  ) : (
                    <Button
                      className="button-as-link"
                      style={{ paddingTop: "0px", paddingBottom: "0px" }}
                      onClick={() => {
                        changeSubFilter(idx);
                      }}
                    >
                      {sel.title}
                    </Button>
                  )}
                </Fragment>
              );
            })}
          </div>

          <RenderDashboard
            profileStats={props.profileStats}
            feedData={props.activeFeed}
            fetchActiveFeed={props.fetchActiveFeed}
          />

          <InviteModal
            show={inviteModalShow}
            onHide={() => setInviteModalShow(false)}
            onSuccess={(data) => {
              props.saveUserInvite(data);
              setInviteModalShow(false);
            }}
          />

          {/* wrapper */}
        </div>

        <Footer />
      </Container>
    </>
  );
};

const mapState = (state) => {
  return {
    feedLoading: state.feedModel.feedLoading,
    activeFeed: state.feedModel.activeFeed,
    feedData: state.feedModel.feedData,
    filterIdx: state.feedModel.filterIdx,
    profileStats: state.profileModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchActiveFeed: dispatch.feedModel.fetchActiveFeed,
    changeDashboardFilter: dispatch.feedModel.changeDashboardFilter,
    saveUserInvite: dispatch.userModel.saveInvite,
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(Feed);
