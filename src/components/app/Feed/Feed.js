import React, { useState, Fragment } from "react";
import axios from "axios";
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
import Analytics from "../../util/Analytics";
import Arrow from "../base/icons/arrow.svg";
import "./feed.css";

const feedRequest = (filter, token) => {
  return (dispatch) => {
    return axios.get(`/api/feed?filter=${filter}`, {
      headers: {
        token: token,
        "timezone-offset": new Date().getTimezoneOffset(),
      },
    });
  };
};

const dashboardRequest = () => {
  return (dispatch) => {
    return axios.get("/api/feed_dashboard", {
      headers: {
        "timezone-offset": new Date().getTimezoneOffset(),
      },
    });
  };
};

const saveUserInviteRequest = (data) => {
  return (dispatch) => {
    return axios.post("/api/userinvite", data);
  };
};

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
              topLevel.data.data.map((child) => {
                return (
                  <div className="feed-sub-category">
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

class Feed extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Feed";
    this.state = {
      filterIdx: 0,
      dashboardData: {},
      feedData: [
        {
          title: "All",
          token: "",
          data: [],
          moreData: false,
          enabled: true,
        },
        {
          title: "Vendors",
          token: "",
          data: [],
          moreData: false,
          enabled: true,
        },
        {
          title: "News",
          token: "",
          data: [],
          moreData: false,
          enabled: true,
        },
        {
          title: "Discussions",
          token: "",
          data: [],
          moreData: false,
          enabled: true,
        },
        {
          title: "Members",
          token: "",
          data: [],
          moreData: false,
          enabled: true,
        },
      ],
      showDashboard: true,
      fetchedInitialFeed: false,
      showNux: false,
      nuxDismissed: false,
      inviteModalShow: false,
    };
  }

  componentDidMount() {
    this.fetchDashboard();
  }

  onLoadMoreClick(e) {
    e.preventDefault();
    e.target && e.target.blur && e.target.blur();
    this.fetchFeed();
  }

  fetchFeed() {
    let filter = this.state.feedData[this.state.filterIdx].title;
    let token = this.state.feedData[this.state.filterIdx].token;
    this.props.feedRequest(filter.toLowerCase(), token).then(({ data }) => {
      let feedData = null;
      let token = null;
      if (data.feedData && data.feedData.length > 0) {
        feedData = data.feedData;
        token = data.token;
      }
      let showNux = "showNux" in data ? data.showNux : false;

      for (let i = 0; i < this.state.feedData.length; i++) {
        if (this.state.feedData[i].title === filter) {
          let currentFeed = this.state.feedData[i];
          if (feedData != null && feedData.length > 0) {
            currentFeed.moreData = true;
            currentFeed.token = token;
            currentFeed.data = currentFeed.data.concat(feedData);
          } else {
            currentFeed.moreData = false;
          }
          this.setState({
            feedData: this.state.feedData.slice(),
            showNux: !this.state.nuxDismissed ? showNux : false,
          });
          break;
        }
      }
    });
  }

  fetchDashboard() {
    let self = this;
    this.props.dashboardRequest().then(({ data }) => {
      self.setState({
        dashboardData: data,
      });
    });
  }

  sendUserInvite(inviteList) {
    this.props.saveUserInviteRequest(inviteList).then(({ data }) => {
      console.log(data);
    });
  }

  renderDashboard() {
    let self = this;
    let dashboardData = this.state.dashboardData;
    let dashboardLoading = !dashboardData.directory;
    let profileData =
      dashboardData.profile && dashboardData.profile.first_name
        ? dashboardData.profile
        : {};
    let moduleShowMore = (filter) => {
      let idx = -1;
      for (let i = 0; i < self.state.feedData.length; i++) {
        if (self.state.feedData[i].title.toLowerCase() === filter) {
          idx = i;
          break;
        }
      }
      if (idx > 0) {
        self.setState({ filterIdx: idx, showDashboard: false }, () => {
          if (self.state.feedData[self.state.filterIdx].data.length === 0)
            self.fetchFeed();
        });
      }
    };

    return dashboardLoading ? (
      <div className="mt-3 mb-5">
        <ActivityIndicator className="element-center feed-activity-indicator" />
      </div>
    ) : (
      <div>
        <Row>
          <Col md="3" style={{ paddingRight: "0px" }}>
            {profileData && (
              <div
                style={{
                  border: "1px solid #cccccc",
                  padding: "10px",
                  background: "white",
                }}
              >
                <div className="article-img">
                  <img
                    className="element-center"
                    src={profileData.image}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>
                    {profileData.first_name} {profileData.last_name}
                  </span>
                  <img
                    alt="verified"
                    className="feed-profile-check"
                    src="https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg"
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ color: "#777", fontSize: "15px" }}>
                    {profileData.title} at {profileData.company}
                  </span>
                </div>
                <div className="feed-profile-card-divider" />
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "17px",
                    marginLeft: "-5px",
                  }}
                >
                  <span>Community Contribution</span>
                </div>
                <div
                  style={{
                    paddingLeft: "20px",
                    fontSize: "13px",
                  }}
                >
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td>Connections</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Posts</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Views</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Invitations</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    fontWeight: 600,
                    marginTop: "5px",
                  }}
                >
                  <Button
                    className="button-as-link"
                    onClick={() => {
                      Analytics.sendClickEvent(
                        "Clicked top subscribers on feed page"
                      );
                      window.location.href = "/network";
                    }}
                  >
                    Top contributors
                  </Button>
                </div>
              </div>
            )}

            {dashboardData.directory && (
              <RenderCategories directoryData={dashboardData.directory} />
            )}
          </Col>
          <Col md="9">
            {dashboardData.modules &&
              dashboardData.modules.map((module) => {
                return (
                  <div>
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
                            let newDashboardData = Object.assign(
                              {},
                              this.state.dashboardData
                            );
                            module.subscribed = true;
                            self.setState({ dashboardData: newDashboardData });
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
                        <a
                          href="/#"
                          onClick={() => moduleShowMore(module.filter)}
                        >
                          Show more
                          <img alt="arrow" src={Arrow} />
                        </a>
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

  renderFeed() {
    let self = this;
    let filters =
      this.state && this.state.feedData
        ? this.state.feedData.map((fd) => {
            return {
              title: fd.title,
              enabled: fd.enabled,
            };
          })
        : [];
    let feedData =
      this.state && this.state.feedData
        ? this.state.feedData[this.state.filterIdx].data
        : [];
    let moreData =
      this.state && this.state.feedData
        ? this.state.feedData[this.state.filterIdx].moreData
        : false;
    let setFilterIdx = (idx) => {
      self.setState({ filterIdx: idx }, () => {
        if (self.state.feedData[self.state.filterIdx].data.length === 0)
          self.fetchFeed();
      });
    };
    return (
      <div>
        <Filter
          className="pb-2"
          filterIdx={this.state.filterIdx}
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
                onClick={this.onLoadMoreClick.bind(this)}
              >
                Show more
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    let showDashboard = this.state.showDashboard;
    let showFeed = !this.state.showDashboard;
    return (
      <>
        <Container className="height-100">
          <div className="wrapper">
            <Header />
            <ShareModule
              onInvite={() => {
                Analytics.sendClickEvent("Clicked Invite from feed page");
                this.setState({ inviteModalShow: true });
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
                    this.setState({
                      showDashboard: true,
                    });
                  }}
                >
                  Dashboard
                </Button>
              )}
              <span>&nbsp;|&nbsp;</span>
              {!showDashboard ? (
                <span style={{ fontWeight: 600, lineHeight: "25px" }}>
                  Feed
                </span>
              ) : (
                <Button
                  className="button-as-link"
                  style={{ paddingTop: "0px", paddingBottom: "0px" }}
                  onClick={() => {
                    if (!this.state.fetchedInitialFeed) {
                      this.fetchFeed();
                    }
                    this.setState({
                      showDashboard: false,
                      fetchedInitialFeed: true,
                    });
                  }}
                >
                  Feed
                </Button>
              )}
            </div>

            {showDashboard && this.renderDashboard()}
            {showFeed && this.renderFeed()}

            <InviteModal
              show={this.state.inviteModalShow}
              onHide={() => this.setState({ inviteModalShow: false })}
              onSuccess={(data) => {
                this.sendUserInvite(data);
                this.setState({ inviteModalShow: false });
              }}
            />

            {/* wrapper */}
          </div>

          <Footer />
        </Container>
      </>
    );
  }
}

export default connect(null, {
  feedRequest,
  dashboardRequest,
  saveUserInviteRequest,
})(Feed);
