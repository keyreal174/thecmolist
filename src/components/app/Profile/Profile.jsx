import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import Header from "../base/Header/Header";
import Banner from "../base/Banner/Banner";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import Footer from "../base/Footer/Footer";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import Util from "../../util/Util";
import RatingBadgeProfile from "../base/Rating/RatingBadgeProfile";
import Analytics from "../../util/Analytics";
import "./profile.css";

import LinkedIn from "./icons/linkedin.svg";
import Website from "./icons/link.svg";
import Chat from "./icons/mail.svg";

const getimageUploadUrlRequest = (fileName, fileType) => {
  return axios.get(
    `/api/image_upload_url?fileName=${fileName}&fileType=${fileType}&displayWidth=200`
  );
};

const uploadImageRequest = (file, url) => {
  return axios.put(url, file, { headers: { "Content-Type": file.type } });
};

const connectUserRequest = (user) => {
  return axios.post("/api/connect_user", user);
};

const ShowAList = ({ arr }) => {
  return arr.map((item, index) => (
    <React.Fragment key={index}>
      <a href="#">{item}</a>
      {index < arr.length - 1 && <span>{", "}</span>}
    </React.Fragment>
  ));
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Profile";
    this.state = {
      isMyProfile: false,
      profileFirstName: "",
      profileLastName: "",
      profileUserName: "",
      profileImage: "",
      profileTitle: "",
      profileCompany: "",
      profileCity: "",
      profileState: "",
      profileCountry: "",
      profileHeadline: "",
      profileLinkedin: "",
      profileWebsite: "",
      profileMail: "",
      profileAbout: [],
      feedData: [],
      connectedUser: false,
      editProfileModalShow: false,
      addAgencyModalShow: false,
      addTechnologyModalShow: false,
      filterIdx: 0,
      enableAnimations: true,
    };
  }

  componentDidMount() {
    this.props.fetchProfile(Util.parsePath(window.location.href).trailingPath);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.profile) {
      if (
        JSON.stringify(nextProps.profile) !== JSON.stringify(this.props.profile)
      ) {
        let dialogState = {};
        let urlParsed = Util.parsePath(window.location.href);
        if (urlParsed.hash) {
          let urlHash = urlParsed.hash;
          let matchTitle = "";
          if (nextProps.profile.isMyProfile && urlHash.includes("addagency")) {
            dialogState.addAgencyModalShow = true;
            matchTitle = "Agencies";
          } else if (
            nextProps.profile.isMyProfile &&
            urlHash.includes("addtechnology")
          ) {
            dialogState.addTechnologyModalShow = true;
            matchTitle = "Tech";
          } else if (
            nextProps.profile.isMyProfile &&
            urlHash.includes("editprofile")
          ) {
            dialogState.editProfileModalShow = true;
          } else if (
            urlHash.includes("agencies") ||
            urlHash.includes("technologies")
          ) {
            if (urlHash.includes("agencies")) {
              matchTitle = "Agencies";
            } else if (urlHash.includes("technologies")) {
              matchTitle = "Tech";
            }
          }
          if (matchTitle.length > 0 && nextProps.profile.feedData) {
            for (let i = 0; i < nextProps.profile.feedData.length; i++) {
              const filterTitle = nextProps.profile.feedData[i].title;
              if (filterTitle && filterTitle.includes(matchTitle)) {
                dialogState.filterIdx = i;
                break;
              }
            }
          }
        }

        this.setState(
          {
            isMyProfile: nextProps.profile.isMyProfile,
            profileFirstName: nextProps.profile.firstName || "",
            profileLastName: nextProps.profile.lastName || "",
            profileUserName: nextProps.profile.userName || "",
            profileImage: nextProps.profile.image || "",
            profileTitle: nextProps.profile.title || "",
            profileCompany: nextProps.profile.company || "",
            profileCity: nextProps.profile.city || "",
            profileState: nextProps.profile.state || "",
            profileCountry: nextProps.profile.country || "",
            profileHeadline: nextProps.profile.headline || "",
            profileLinkedin: nextProps.profile.linkedin || "",
            profileWebsite: nextProps.profile.website || "",
            profileMail: nextProps.profile.mail || "",
            profileAbout: nextProps.profile.about || [],
            feedData: nextProps.profile.feedData || [],
            connectedUser: nextProps.profile.connectedUser || false,
            ...dialogState,
          },
          () => {
            this.createSubfilters();
          }
        );
      }
    }
  }

  createSubfilters() {
    let newFeedData = this.state.feedData.slice();
    newFeedData.forEach((feed) => {
      feed.subfilters = {};
      let feedData = feed.data;
      feedData.forEach((data) => {
        data.subheadlines.forEach((sh) => {
          if (sh.categorytitles && Array.isArray(sh.categorytitles)) {
            sh.categorytitles.forEach((categoryTitle) => {
              if (!(categoryTitle in feed.subfilters)) {
                feed.subfilters[categoryTitle] = 0;
              }
              feed.subfilters[categoryTitle] += 1;
            });
          }
        });
      });
    });
    this.setState({
      feedData: newFeedData,
    });
  }

  connectUser() {
    let self = this;
    let userName = Util.parsePath(window.location.href).trailingPath;
    Analytics.sendClickEvent(
      `Connected with user ${userName} from profile page`
    );
    connectUserRequest({ user: userName })
      .then(({ data }) => {
        self.setState({
          enableAnimations: false,
          connectedUser: true,
        });
      })
      .catch((e) => {
        console.log(`An error occurred connecting with user: ${userName}`);
        console.log(e);
      });
  }

  render() {
    let filters = [];
    let activeFilterTitle = "";
    let feedData = [];
    let feedFilter = "";
    let subfilterKeys = [];
    let subfilters = {};
    if (this.state && this.state.feedData && this.state.feedData.length > 0) {
      filters = this.state.feedData.map((feed) => {
        return {
          title: feed.title,
          enabled: feed.enabled || false,
        };
      });
      let currentFeed = this.state.feedData[this.state.filterIdx];
      activeFilterTitle = currentFeed.title;
      feedData = currentFeed.data;
      // subfilters
      if (currentFeed) {
        subfilters = currentFeed.subfilters || {};
        subfilterKeys = Object.keys(subfilters);
        feedFilter = currentFeed.subfilter || "";
        if (feedFilter.length > 0) {
          feedData = feedData.filter((data) => {
            for (let i = 0; i < data.subheadlines.length; i++) {
              let sh = data.subheadlines[i];
              if (sh.categorytitles) {
                for (let j = 0; j < sh.categorytitles.length; j++) {
                  if (
                    sh.categorytitles[j] &&
                    sh.categorytitles[j] === feedFilter
                  )
                    return true;
                }
              }
            }
            return false;
          });
        }
      }
    }
    let self = this;
    let setFilterIdx = (idx) => {
      // clear subfilter
      let prevFeedData = self.state.feedData.slice();
      prevFeedData[self.state.filterIdx].subfilter = "";
      self.setState({
        feedData: prevFeedData,
        filterIdx: idx,
      });
    };
    let isMyProfile = self.state.isMyProfile;
    let isVerified = true;
    let onSubfilterChange = (key) => {
      let prevFeedData = self.state.feedData.slice();
      let prevFeedFilter = prevFeedData[self.state.filterIdx].subfilter;
      prevFeedData[self.state.filterIdx].subfilter =
        key === prevFeedFilter ? "" : key;
      self.setState({
        feedData: prevFeedData,
      });
    };
    let noFeedContentCopy = null;

    const FadeTransition = (props) => (
      <CSSTransition {...props} classNames="profile-article-transition" />
    ); // define here to pass props down from parent -> child
    return (
      <>
        <Container className="height-100">
          <Header />
          <div className="wrapper">
            <Banner className="profile-banner" n>
              {this.state.profileImage && (
                <div className="logo-wrapper">
                  <img src={this.state.profileImage} alt="" />
                </div>
              )}

              {this.state.profileFirstName && (
                <div className="overview-summary">
                  <h2 className="overview-header mb-1">
                    {this.state.profileFirstName}&nbsp;
                    {this.state.profileLastName}&nbsp;
                    {isVerified && (
                      <img
                        alt="verified"
                        className="profile-check"
                        src="https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg"
                      />
                    )}
                  </h2>
                  <div className="overview-subheadline">
                    {this.state.profileTitle} at {this.state.profileCompany}
                  </div>
                  <p className="overview-desc">
                    {this.state.profileCity}, {this.state.profileState}
                  </p>
                  <div className="overview-link-buttons">
                    {this.state.profileLinkedin.length > 0 && (
                      <span className="overview-link-button">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={this.state.profileLinkedin}
                        >
                          <img
                            className="overview-link-img"
                            src={LinkedIn}
                            alt=""
                          />
                        </a>
                      </span>
                    )}
                    {this.state.profileWebsite.length > 0 && (
                      <span className="overview-link-button">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={this.state.profileWebsite}
                        >
                          <img
                            className="overview-link-img"
                            src={Website}
                            alt=""
                          />
                        </a>
                      </span>
                    )}
                    {this.state.profileMail.length > 0 && (
                      <span className="overview-link-button">
                        <a href={this.state.profileMail}>
                          <img
                            className="overview-link-img"
                            src={Chat}
                            alt=""
                          />
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              )}
              {isMyProfile && (
                <div className="btn-wrapper">
                  <Button
                    className="btn-white edit-profile"
                    variant="outline-primary"
                    onClick={() => this.props.history.push("/profile/edit")}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
              {!isMyProfile && this.state.profileFirstName && (
                <div className="btn-wrapper">
                  {!this.state.connectedUser ? (
                    <Button
                      className="btn-white edit-profile"
                      variant="outline-primary"
                      onClick={() => {
                        self.connectUser();
                      }}
                    >
                      Connect
                    </Button>
                  ) : (
                    <span className="profile-connected-label">Connected</span>
                  )}
                </div>
              )}
            </Banner>

            {Object.keys(this.state.profileAbout).length > 0 && (
              <div className="profile-about mt-2 px-4">
                <Row>
                  <Col md="12">
                    <h2 className="mb-3 mt-2">About</h2>
                    <ShowMoreText
                      keepNewLines={true}
                      lines={2}
                      more="See more"
                      less="See less"
                      width={0}
                    >
                      {this.state.profileAbout.description}
                    </ShowMoreText>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Label>Marketing expertise</Form.Label>
                    <div>
                      <ShowAList
                        arr={this.state.profileAbout.areasOfExpertise}
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <Form.Label>Marketing interests</Form.Label>
                    <div>
                      <ShowAList
                        arr={this.state.profileAbout.areasOfInterest}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Label>Open to networking</Form.Label>
                    <div>
                      <span>
                        {this.state.profileAbout.networking ? "Yes" : "No"}
                      </span>
                    </div>
                  </Col>
                  <Col md="6">
                    <Form.Label>Open to advising</Form.Label>
                    <div>
                      <span>
                        {this.state.profileAbout.advising ? "Yes" : "No"}
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            <div
              className="d-flex m-auto pt-4 pb-2 align-items-center"
              style={{ width: "60%" }}
            >
              <Form.Control placeholder="" className="mr-3" />
              <Button
                className="btn__homepage btn__homepage-blue btn__nux_share"
                style={{ float: "right", width: "220px" }}
              >
                Search {this.state.profileUserName}'s knowledge
              </Button>
            </div>

            {this.state.profileFirstName && (
              <Filter
                title="Vendors"
                filterIdx={this.state.filterIdx}
                filters={filters}
                onChange={(idx) => setFilterIdx(idx)}
              ></Filter>
            )}
          </div>
          {subfilterKeys.length > 0 && (
            <div className="profile-subfilters">
              <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                {subfilterKeys.map((subfilter, idx) => (
                  <Link
                    className={
                      subfilter === feedFilter
                        ? "profile-subfilter active"
                        : "profile-subfilter"
                    }
                    onClick={() => {
                      onSubfilterChange(subfilter);
                    }}
                  >
                    {idx !== 0 ? " " : ""}
                    {subfilter} ({subfilters[subfilter]})
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div style={{ clear: "both" }}></div>

          <TransitionGroup
            enter={this.state.enableAnimations}
            exit={this.state.enableAnimations}
          >
            {feedData.map((feed, idx) => {
              let badge = null;
              if (
                isMyProfile &&
                feed.review_scores &&
                feed.review_scores.length > 0
              ) {
                let reviewVendor = "agency";
                if (activeFilterTitle.includes("Tech")) {
                  reviewVendor = "technology";
                }
                let npsScore = Util.calculateAverage(feed.review_scores);
                badge = (
                  <RatingBadgeProfile
                    npsScore={npsScore}
                    tooltipText={`You rated this ${reviewVendor} a ${npsScore} (not visible to others)`}
                  />
                );
              } else {
                if (!isMyProfile) {
                  if (feed.invited) {
                    badge = (
                      <span className="profile-connected-label">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Done ✓
                      </span>
                    );
                  } else {
                    badge = (
                      <Button
                        className="btn-white edit-profile"
                        variant="outline-primary"
                        onClick={() => {
                          let userName = Util.parsePath(window.location.href)
                            .trailingPath;
                          Analytics.sendClickEvent(
                            `Thanked ${userName} for review ${feed.slug} from profile page`
                          );
                          let newFeedData = this.state.feedData.slice();
                          feed.invited = true;
                          self.setState({
                            enableAnimations: false,
                            feedData: newFeedData,
                          });
                        }}
                      >
                        Say thanks{" "}
                        <span role="img" aria-label="Thanks">
                          🙏
                        </span>
                      </Button>
                    );
                  }
                }
              }
              return (
                <FadeTransition key={idx}>
                  <Article
                    key={idx}
                    className={idx !== 0 ? "mt-1" : ""}
                    {...feed}
                    badge={badge}
                  />
                </FadeTransition>
              );
            })}
          </TransitionGroup>

          {noFeedContentCopy && (
            <div className="wrapper article-wrapper">
              <div className="no-reviews-header">No reviews yet</div>
              <div className="no-reviews-body">{noFeedContentCopy}</div>
            </div>
          )}

          <Footer />
        </Container>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    profile: state.profileModel.profile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProfile: dispatch.profileModel.fetchProfile,
    saveProfile: dispatch.profileModel.saveProfile,
  };
};

export default connect(mapState, mapDispatch)(withRouter(Profile));
