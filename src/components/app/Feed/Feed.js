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

function RenderDashboard(props) {
  let dashboardData = props.dashboardData;
  let dashboardLoading = !dashboardData.directory;
  let moduleShowMore = (filter) => {};
  let { profileStats } = props;

  let buildYourNetworkItems = dashboardData.buildYourNetwork;
  let peopleInSimilarRoles = dashboardData.peopleInSimilarRoles;
  let newMembers = dashboardData.newMembers;
  return dashboardLoading ? (
    <div className="mt-3 mb-5">
      <ActivityIndicator className="element-center feed-activity-indicator" />
    </div>
  ) : (
    <div>
      <Row>
        <Col md="3" style={{ paddingRight: "0px" }}>
          <ProfileStats profileStats={profileStats} />
        </Col>
        <Col md="6">
          {dashboardData.modules &&
            dashboardData.modules.map((module, idx) => {
              return (
                <div key={idx}>
                  <div className="feed-dashboard-header">
                    <span style={{ fontSize: "18px", fontWeight: 600 }}>
                      {module.title}
                    </span>
                    {module.subscribed ? (
                      <span className="feed-subscribed-label">
                        Subscribed ✓
                      </span>
                    ) : (
                      <a
                        href="/#"
                        className="btn__homepage btn__homepage-blue btn__nux_share"
                        style={{ float: "right", width: "220px" }}
                        onClick={() => {
                          Analytics.sendClickEvent(
                            "Clicked subscribed to: " +
                              module.title +
                              " from feed page"
                          );
                        }}
                      >
                        Subscribe to weekly summary
                      </a>
                    )}
                  </div>
                  {module.data &&
                    module.data.map((feed, idx) => {
                      return (
                        <Article
                          key={idx}
                          className="feed-dashboard-cell"
                          {...feed}
                        />
                      );
                    })}
                  <div className="feed-dashboard-show-more">
                    <div
                      style={{
                        textAlign: "center",
                        width: "100%",
                        paddingTop: "10px",
                      }}
                    >
                      <Button
                        style={{
                          color: "#0175b0",
                          textDecoration: "none",
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                        }}
                        onClick={() => moduleShowMore(module.filter)}
                      >
                        Show more
                        <img alt="arrow" src={Arrow} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </Col>
        <Col md="3" className="feed-right-container">
          <div className="feed-box">
            <div className="feed-box-title">Build your network</div>
            <div className="feed-box-content">
              {buildYourNetworkItems.map((item, index) => {
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
              {peopleInSimilarRoles.map(({ name, role }, index) => {
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
              {newMembers.map(({ name, role }, index) => {
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
      </Row>
    </div>
  );
}

const Feed = (props) => {
  const subSelectors = [
    "Questions & Answers",
    "Projects & Vendors",
    "Articles & News",
    "All",
  ];

  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [activeSelector, setActiveSelector] = useState(0);
  useEffect(() => {
    const fetchDashboard = async () => props.fetchDashboard();
    const getProfileStats = async () => props.getProfileStats();
    fetchDashboard();
    getProfileStats();
  }, []);

  let filters = [
    { title: "All members", enabled: true },
    { title: "My Peers", enabled: true },
    { title: "My Experts", enabled: true },
    { title: "SignalFire-CMOs", enabled: true },
  ];

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
              filterIdx={0}
              filters={filters}
              onChange={(idx) => console.log(idx)}
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
                      {sel}
                    </span>
                  ) : (
                    <Button
                      className="button-as-link"
                      style={{ paddingTop: "0px", paddingBottom: "0px" }}
                      onClick={() => {
                        setActiveSelector(idx);
                      }}
                    >
                      {sel}
                    </Button>
                  )}
                </Fragment>
              );
            })}
          </div>

          {props.dashboardData && (
            <RenderDashboard
              profileStats={props.profileStats}
              dashboardData={props.dashboardData}
            />
          )}

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
    dashboardData: state.feedModel.dashboardData,
    feedData: state.feedModel.feedData,
    filterIdx: state.feedModel.filterIdx,
    profileStats: state.profileModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDashboard: dispatch.feedModel.fetchDashboard,
    fetchFeed: dispatch.feedModel.fetchFeed,
    changeFilterIndex: dispatch.feedModel.changeFilterIndex,
    saveUserInvite: dispatch.userModel.saveInvite,
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(Feed);
