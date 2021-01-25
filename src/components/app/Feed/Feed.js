import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import ShareModule from "../base/ShareModule/ShareModule";
import InviteModal from "../base/ShareModule/InviteModal";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import ProfileStats from "../ProfileStats/ProfileStats";
import Analytics from "../../util/Analytics";
import Arrow from "../base/icons/arrow.svg";
import "./feed.css";

function RenderDashboard(props) {
  let dashboardData = props.dashboardData;
  let dashboardLoading = !dashboardData.directory;
  let moduleShowMore = (filter) => {
    let idx = -1;
    for (let i = 0; i < props.feedData.length; i++) {
      if (props.feedData[i].title.toLowerCase() === filter) {
        idx = i;
        break;
      }
    }
    if (idx > 0) {
      props.changeFilterIndex(idx).then(() => {
        if (props.feedData[idx].data.length === 0) {
          props.fetchFeed();
        }
      });
      props.setShowDashboard && props.setShowDashboard(false);
    }
  };
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
        <Col md="3" style={{ paddingRight: "0px" }}>
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

function RenderFeed(props) {
  let filters = props.feedData
    ? props.feedData.map((fd) => {
        return {
          title: fd.title,
          enabled: fd.enabled,
        };
      })
    : [];
  let feedData =
    props && props.feedData ? props.feedData[props.filterIdx].data : [];
  let moreData =
    props && props.feedData ? props.feedData[props.filterIdx].moreData : false;
  let setFilterIdx = (idx) => {
    props.changeFilterIndex(idx).then(() => {
      if (props.feedData[idx].data.length === 0) {
        props.fetchFeed();
      }
    });
  };
  let onLoadMoreClick = (e) => {
    e.preventDefault();
    e.target && e.target.blur && e.target.blur();
    props.fetchFeed();
  };
  return (
    <div>
      <Filter
        className="pb-2"
        filterIdx={props.filterIdx}
        filters={filters}
        onChange={(idx) => setFilterIdx(idx)}
      />

      {feedData.map((feed, idx) => {
        return <Article className={idx !== 0 ? "mt-1" : ""} {...feed} />;
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
    </div>
  );
}

const Feed = (props) => {
  const [showDashboard, setShowDashboard] = useState(true);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  useEffect(() => {
    const fetchDashboard = async () => props.fetchDashboard();
    const getProfileStats = async () => props.getProfileStats();
    fetchDashboard();
    getProfileStats();
  }, []);

  const showFeed = !showDashboard;
  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <ShareModule
            onInvite={() => {
              Analytics.sendClickEvent("Clicked Invite from feed page");
              setInviteModalShow(true);
            }}
          />

          <div className="feed-divider">
            <div className="section-break" />
            <span>&nbsp;</span>
            {showDashboard ? (
              <span style={{ fontWeight: 600, lineHeight: "25px" }}>
                Dashboard
              </span>
            ) : (
              <Button
                className="button-as-link"
                style={{ paddingTop: "0px", paddingBottom: "0px" }}
                onClick={() => {
                  setShowDashboard(true);
                }}
              >
                Dashboard
              </Button>
            )}
            <span>&nbsp;|&nbsp;</span>
            {!showDashboard ? (
              <span style={{ fontWeight: 600, lineHeight: "25px" }}>Feed</span>
            ) : (
              <Button
                className="button-as-link"
                style={{ paddingTop: "0px", paddingBottom: "0px" }}
                onClick={() => {
                  setShowDashboard(false);
                  props.fetchFeed();
                }}
              >
                Feed
              </Button>
            )}
          </div>

          {showDashboard &&
            RenderDashboard({
              ...props,
              setShowDashboard: (e) => setShowDashboard(e),
            })}
          {showFeed && RenderFeed(props)}

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
