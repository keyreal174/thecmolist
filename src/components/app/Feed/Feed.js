import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
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

function RenderCategories(props) {
  const [activeCategory, setActiveCategory] = useState(0);
  let renderDirectory = (topLevel, idx) => {
    return (
      <div key={idx}>
        <div
          className={`feed-top-category ${
            topLevel.title.length > 25 ? "feed-top-category-lh" : ""
          }`}
          onClick={() => setActiveCategory(idx)}
        >
          {topLevel.title}&nbsp;
          <a href={topLevel.link}>
            <svg
              style={{ marginTop: "-3px" }}
              color="#0175B0"
              width="11"
              height="11"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
              ></path>
            </svg>
          </a>
        </div>
        <CSSTransition
          in={activeCategory === idx}
          timeout={300}
          classNames="feed-transition"
        >
          <div>
            {activeCategory === idx &&
              topLevel.data.data &&
              topLevel.data.data.map((child, idx) => {
                return (
                  <div className="feed-sub-category" key={idx}>
                    <a href={child.link}>{child.title}</a>
                  </div>
                );
              })}
          </div>
        </CSSTransition>
      </div>
    );
  };
  let renderLeadershipLink = (item, idx) => {
    return (
      <div key={idx} className="feed-leader-link">
        <a href={item.link}>{item.title}</a>
      </div>
    );
  };
  let leadershipLinks = [
    {
      title: "Hiring & Recruiters",
      link: "https://forum.thecmolist.com/c/leadership/hiring/95",
    },
    {
      title: "Management & Mentorship",
      link: "https://forum.thecmolist.com/c/leadership/management/96",
    },
    {
      title: "Advising & Board Opportunities",
      link: "https://forum.thecmolist.com/c/leadership/advising-boards/97",
    },
  ];

  return (
    <Fragment>
      <div className="feed-category-box">
        <div className="feed-category-box-title">Leadership</div>
        {leadershipLinks.map((link, idx) => {
          return renderLeadershipLink(link, idx);
        })}
      </div>
      <div className="feed-category-box">
        <div className="feed-category-box-title">Marketing</div>
        {props.directoryData &&
          props.directoryData.map((directory, idx) => {
            return renderDirectory(directory, idx);
          })}
        <div
          style={{
            textAlign: "center",
            fontSize: "15px",
            fontWeight: 600,
            marginTop: "15px",
            marginBottom: "10px",
            lineHeight: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <a href="mailto:hello@thecmolist.com?subject=New category">
            Have a suggestion for a category?
          </a>
        </div>
      </div>
    </Fragment>
  );
}

function RenderDashboard(props) {
  let dashboardData = props.dashboardData;
  let dashboardLoading = !dashboardData.directory;
  let profileData =
    dashboardData.profile && dashboardData.profile.first_name
      ? dashboardData.profile
      : {};
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
        <Col md="9">
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
          <div class="col-md-2 mt-2 mx-auto">
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
  const OnComponentDidMount = (func) => useEffect(func, []);
  OnComponentDidMount(() => {
    const fetchDashboard = async () => props.fetchDashboard();
    const getProfileStats = async () => props.getProfileStats();
    fetchDashboard();
    getProfileStats();
  });

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
    profileStats: state.profileStatsModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDashboard: dispatch.feedModel.fetchDashboard,
    fetchFeed: dispatch.feedModel.fetchFeed,
    changeFilterIndex: dispatch.feedModel.changeFilterIndex,
    saveUserInvite: dispatch.userModel.saveInvite,
    getProfileStats: dispatch.profileStatsModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(Feed);
