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
import { Button, Row, Col, Container } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import AddAgency from "./AddAgency";
import AddTechnology from "./AddTechnology";
import EditProfile from "./EditProfile";
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

const addAgencyRequest = (agencyReview) => {
  return axios.post("/api/agencyreview", agencyReview);
};

const addTechnologyRequest = (agency) => {
  return axios.post("/api/technologyreview", agency);
};

const connectUserRequest = (user) => {
  return axios.post("/api/connect_user", user);
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Profile";
    this.state = {
      isMyProfile: false,
      profileFirstName: "",
      profileLastName: "",
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

  addAgency(agencyReview, setAddAgencyModalShow) {
    let self = this;
    addAgencyRequest(agencyReview)
      .then(({ data }) => {
        self.fetchProfile();
        setAddAgencyModalShow(false);
        // reset url to default (agencies tab)
        let windowUrl = window.location.href.substring(
          0,
          window.location.href.lastIndexOf("#")
        );
        window.history.pushState(null, "", windowUrl);
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.log(error);
        setAddAgencyModalShow(false);
      });
  }

  addTechnology(technologyReview, setAddTechnologyModalShow) {
    let self = this;
    addTechnologyRequest(technologyReview)
      .then(({ data }) => {
        self.fetchProfile();
        setAddTechnologyModalShow(false);
        // reset url to #technologies tab
        let windowUrl = window.location.href.substring(
          0,
          window.location.href.lastIndexOf("#")
        );
        windowUrl += "#technologies";
        window.history.pushState(null, "", windowUrl);
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.log(error);
        setAddTechnologyModalShow(false);
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
    let setEditProfileModalShow = (e) => {
      self.setState({ editProfileModalShow: e });
    };
    let setAddAgencyModalShow = (e) => {
      self.setState({ addAgencyModalShow: e });
    };
    let setAddTechnologyModalShow = (e) => {
      self.setState({ addTechnologyModalShow: e });
    };
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
    let noFeedContentButton = <div />;
    if (this.state.profileFirstName.length > 0 && feedData.length === 0) {
      if (activeFilterTitle.includes("Agencies")) {
        if (isMyProfile) {
          noFeedContentCopy =
            "Support and share your favorite agencies with your network";
          noFeedContentButton = (
            <Button
              className="btn-white no-review-button"
              variant="outline-primary"
              onClick={() => setAddAgencyModalShow(true)}
            >
              Share Agency
            </Button>
          );
        } else {
          noFeedContentCopy = `${this.state.profileFirstName} has not yet shared any agencies with the CMOlist community`;
        }
      } else if (activeFilterTitle.includes("Tech")) {
        if (isMyProfile) {
          noFeedContentCopy =
            "Support and share your favorite technologies with your network";
          noFeedContentButton = (
            <Button
              className="btn-white no-review-button"
              variant="outline-primary"
              onClick={() => setAddTechnologyModalShow(true)}
            >
              Share Technology
            </Button>
          );
        } else {
          noFeedContentCopy = `${this.state.profileFirstName} has not yet shared any technologies with the CMOlist community`;
        }
      }
    }

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

            <div className="overview">
              <Row className="border">
                <Col
                  md="8"
                  className="mt-3 mb-4"
                  style={{ marginLeft: "20px" }}
                >
                  <ShowMoreText
                    keepNewLines={true}
                    lines={1}
                    more="See more"
                    less=""
                    width={0}
                  >
                    {this.state.profileHeadline}
                  </ShowMoreText>
                </Col>
                <Col md="4"></Col>
              </Row>
            </div>

            {/* HACK: hardcode this for now (for the demo) */}
            {this.state.profileAbout.length > 0 && (
              <div className="profile-about mt-2">
                <Row className="border">
                  <Col md="12">
                    <h2>About</h2>
                    <table className="about-table">
                      <tr>
                        <td>
                          <strong>Team size</strong>
                        </td>
                        <td>50+</td>
                        <td>
                          <strong>Networking areas</strong>
                        </td>
                        <td>
                          <ShowMoreText
                            keepNewLines={false}
                            lines={1}
                            more="See more"
                            less=""
                            width={0}
                          >
                            B2B SaaS CMOs at late stage or public companies
                          </ShowMoreText>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Business accountability</strong>
                        </td>
                        <td>$10-$100 million</td>
                        <td>
                          <strong>Advising areas</strong>
                        </td>
                        <td>
                          <ShowMoreText
                            keepNewLines={false}
                            lines={1}
                            more="See more"
                            less=""
                            width={0}
                          >
                            Series A/B/ C B2B or B2C companies
                          </ShowMoreText>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Expertise</strong>
                        </td>
                        <td>
                          <span className="about-tag">Leadership</span>,{" "}
                          <span className="about-tag">Advertising</span>,{" "}
                          <span className="about-tag">Public Relations</span>,{" "}
                          <span className="about-tag">Saas</span>
                        </td>
                      </tr>
                    </table>
                  </Col>
                </Row>
              </div>
            )}

            {this.state.profileFirstName && (
              <Filter
                title="Vendors"
                filterIdx={this.state.filterIdx}
                filters={filters}
                onChange={(idx) => setFilterIdx(idx)}
              >
                {isMyProfile && (
                  <div className="filter-btn">
                    {activeFilterTitle.includes("Tech") && (
                      <Button
                        className="btn-white"
                        variant="outline-primary"
                        onClick={() => setAddTechnologyModalShow(true)}
                      >
                        Share Technology
                      </Button>
                    )}
                    {activeFilterTitle.includes("Agencies") && (
                      <Button
                        className="btn-white"
                        variant="outline-primary"
                        onClick={() => setAddAgencyModalShow(true)}
                      >
                        Share Agency
                      </Button>
                    )}
                  </div>
                )}
              </Filter>
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
          <AddAgency
            show={this.state.addAgencyModalShow}
            onSuccess={(agencyreview) =>
              self.addAgency(agencyreview, setAddAgencyModalShow)
            }
            onHide={() => setAddAgencyModalShow(false)}
          />
          <AddTechnology
            show={this.state.addTechnologyModalShow}
            onSuccess={(technologyreview) =>
              self.addTechnology(technologyreview, setAddTechnologyModalShow)
            }
            onHide={() => setAddTechnologyModalShow(false)}
          />

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
              <div className="no-reviews-body">
                {noFeedContentCopy}
                {noFeedContentButton}
              </div>
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
