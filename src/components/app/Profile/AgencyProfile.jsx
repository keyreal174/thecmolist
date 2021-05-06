import React from "react";
import axios from "axios";
import Layout from "../base/Layout/Layout";
import Banner from "../base/Banner/Banner";
import Article from "../base/Article/Article";
import Footer from "../base/Footer/Footer";
import Gallery from "../base/Gallery/Gallery";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import EditAgency from "./EditAgency";
import RatingBadgeProfile from "../base/Rating/RatingBadgeProfile";
import RatingCard from "../base/Rating/RatingCard";
import Util from "../../util/Util";
import Analytics from "../../util/Analytics";
import "./profile.scss";

import Website from "./icons/link.svg";

const agencyProfileRequest = (agencyName) => {
  return axios.get(`/api/agency/${agencyName}`, {
    headers: {
      "timezone-offset": new Date().getTimezoneOffset(),
    },
  });
};

const getimageUploadUrlRequest = (fileName, fileType) => {
  return axios.get(
    `/api/image_upload_url?fileName=${fileName}&fileType=${fileType}&displayWidth=200`
  );
};

const uploadImageRequest = (file, url) => {
  return axios.put(url, file, { headers: { "Content-Type": file.type } });
};

const updateAgencyRequest = (profile) => {
  return axios.post("/api/agency", profile);
};

class AgencyProfile extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Agency";
    this.state = {
      agencyName: "",
      agencyImage: "",
      agencyLocation: "",
      agencyDescription: "",
      agencyWebsite: "",
      agencyWork: [],
      feedFilter: "",
      feedData: [],
      canEditProfile: false,
      editProfileModalShow: false,
      subscribedToAgency: false,
    };
  }

  componentDidMount() {
    this.fetchAgencyProfile(this.props.match.params.agencyName);
  }

  fetchAgencyProfile(agencyName) {
    if (!agencyName) agencyName = "";
    agencyProfileRequest(agencyName)
      .then(({ data }) => {
        this.setState({
          agencyName: data.agency.agencyName || "",
          agencyImage: data.agency.image || "",
          agencyLocation: data.agency.location || "",
          agencyDescription: data.agency.description || "",
          agencyWebsite: data.agency.website || "",
          agencyWork: data.agency.work || [],
          feedData: data.agency.feedData || [],
          canEditProfile: data.agency.canEditProfile || false,
        });
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.log(error);
      });
  }

  updateAgency(profile) {
    updateAgencyRequest(profile)
      .then(({ data }) => {
        window.location.reload(false);
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.log(error);
      });
  }

  uploadProfileImage(file, callback) {
    getimageUploadUrlRequest(file.name, file.type)
      .then(({ data }) => {
        uploadImageRequest(file, data.signedRequest)
          .then(() => {
            callback(data.url);
          })
          .catch((err) => {
            console.log(err);
            callback(false);
          });
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  }

  render() {
    let self = this;
    let feedFilter = this.state.feedFilter;
    let feedData = [];
    let subfilters = {};
    if (this.state && this.state.feedData && this.state.feedData.length > 0) {
      feedData = this.state.feedData[0].data;
      // calculate subfilters with counts
      feedData.forEach((data) => {
        data.subheadlines.forEach((sh) => {
          if (sh.categorytitles && Array.isArray(sh.categorytitles)) {
            sh.categorytitles.forEach((categoryTitle) => {
              if (!(categoryTitle in subfilters)) {
                subfilters[categoryTitle] = 0;
              }
              subfilters[categoryTitle] += 1;
            });
          }
        });
      });
      // filter data
      if (feedFilter.length > 0) {
        feedData = feedData.filter((data) => {
          for (let i = 0; i < data.subheadlines.length; i++) {
            let sh = data.subheadlines[i];
            if (sh.categorytitles) {
              for (let j = 0; j < sh.categorytitles.length; j++) {
                if (sh.categorytitles[j] && sh.categorytitles[j] === feedFilter)
                  return true;
              }
            }
          }
          return false;
        });
      }
    }
    let subfilterKeys = Object.keys(subfilters);
    let onSubfilterChange = (key) => {
      self.setState({
        feedFilter: key === self.state.feedFilter ? "" : key,
      });
    };

    let averageReviewScores = 0;
    let overallNpsScore = 0;
    let allReviewScores = [];
    feedData.forEach((feed) => {
      if (feed.review_scores && feed.review_scores.length > 0) {
        allReviewScores = allReviewScores.concat(feed.review_scores);
      }
    });
    if (allReviewScores.length > 0) {
      averageReviewScores = Util.calculateAverage(allReviewScores);
      overallNpsScore = Util.calculateNpsScore(allReviewScores);
    }

    let agencyOwner = this.state.canEditProfile;
    let agencyViewer =
      this.state.agencyName.length > 0 && !this.state.canEditProfile;
    let setEditProfileModalShow = (e) => {
      self.setState({ editProfileModalShow: e });
    };

    return (
      <Layout>
        <Container className="height-100">
          <div className="wrapper">
            <Banner>
              {this.state.agencyImage && (
                <div className="square-logo">
                  <img src={this.state.agencyImage} alt="" />
                </div>
              )}
              {agencyOwner && (
                <div className="btn-wrapper">
                  <Button
                    className="btn-white edit-profile"
                    variant="outline-primary"
                    onClick={() => setEditProfileModalShow(true)}
                  >
                    Edit Agency
                  </Button>
                </div>
              )}
              {agencyViewer && (
                <div className="btn-wrapper">
                  <Button
                    style={{ minWidth: "200px" }}
                    className="btn-white edit-profile"
                    variant="outline-primary"
                    onClick={() =>
                      (window.location.href = "/profile#addagency")
                    }
                  >
                    Review this vendor
                  </Button>
                  <br />
                  <Button
                    style={{ minWidth: "200px" }}
                    className="btn-white edit-profile"
                    variant="outline-primary"
                    onClick={() => {
                      Analytics.sendClickEvent(
                        `Subscribed to agency: ${this.state.agencyName}`
                      );
                      self.setState({ subscribedToAgency: true });
                    }}
                  >
                    {this.state.subscribedToAgency
                      ? "Subscribed"
                      : "Subscribe to updates"}
                  </Button>
                </div>
              )}
            </Banner>

            <div className="overview">
              <Row className="border">
                <Col md="8" className="mb-2">
                  <h2 className="overview-header mb-1">
                    {this.state.agencyName}
                  </h2>
                  <p className="overview-desc">{this.state.agencyLocation}</p>
                  {this.state.agencyDescription &&
                    this.state.agencyDescription.length > 0 && (
                      <ShowMoreText
                        keepNewLines={true}
                        lines={1}
                        more="See more"
                        less=""
                        width={0}
                      >
                        {this.state.agencyDescription}
                      </ShowMoreText>
                    )}
                </Col>
                <Col md="4">
                  <div className="overview-links">
                    {this.state.agencyWebsite.length > 0 && (
                      <div className="overview-link">
                        <span>
                          <img src={Website} alt="" />
                        </span>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={this.state.agencyWebsite}
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div
            className="overview"
            style={{
              paddingTop: "5px",
              paddingBottom: "10px",
              paddingLeft: "30px",
            }}
          >
            {allReviewScores.length > 1 && (
              <Row className="mb-3">
                <Col md="1" style={{ minWidth: "100px", paddingTop: "8px" }}>
                  <b>Ratings</b>
                </Col>
                <Col md="10">
                  <RatingCard
                    averageRating={averageReviewScores}
                    numReviews={allReviewScores.length}
                    npsScore={overallNpsScore}
                  />
                </Col>
              </Row>
            )}
            {allReviewScores.length <= 1 && (
              <Row className="mb-3">
                <Col md="1" style={{ minWidth: "100px", paddingTop: "8px" }}>
                  <b>Ratings</b>
                </Col>
                <Col md="10">
                  <span style={{ paddingTop: "8px", display: "inline-block" }}>
                    Not enough ratings yet
                  </span>
                </Col>
              </Row>
            )}

            {this.state.agencyWork.length > 0 && (
              <Row className="mb-1">
                <Col md="1" style={{ minWidth: "100px", paddingTop: "8px" }}>
                  <b>Work</b>
                </Col>
                <Col md="10">
                  <Gallery images={this.state.agencyWork} />
                </Col>
              </Row>
            )}

            <Row>
              <Col md="1" style={{ minWidth: "100px", paddingTop: "8px" }}>
                <b>Services</b>
              </Col>
              <Col md="10">
                {subfilterKeys.length > 0 && (
                  <div style={{ paddingRight: "10px" }}>
                    {subfilterKeys.map((subfilter, idx) => (
                      <Link
                        className={
                          subfilter === feedFilter
                            ? "subfilter active"
                            : "subfilter"
                        }
                        onClick={() => onSubfilterChange(subfilter)}
                      >
                        {idx !== 0 ? " " : ""}
                        {subfilter} ({subfilters[subfilter]})
                      </Link>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </div>

          {/* Modals */}
          {agencyOwner && (
            <EditAgency
              show={this.state.editProfileModalShow}
              onSuccess={(agency) =>
                self.updateAgency(agency, setEditProfileModalShow)
              }
              onHide={() => setEditProfileModalShow(false)}
              onImageChange={(file, callback) =>
                self.uploadProfileImage(file, callback)
              }
              agencySlug={this.props.match.params.agencyName}
              agencyName={this.state.agencyName}
              agencyImage={this.state.agencyImage}
              agencyLocation={this.state.agencyLocation}
              agencyDescription={this.state.agencyDescription}
              agencyWebsite={this.state.agencyWebsite}
              agencyWork={this.state.agencyWork}
            />
          )}

          <h2 className="profile-section-title">Clients</h2>
          {feedData.map((feed, idx) => {
            let badge = null;
            if (false && feed.review_scores && feed.review_scores.length > 0) {
              let npsScore = Util.calculateAverage(feed.review_scores);
              badge = (
                <RatingBadgeProfile
                  npsScore={npsScore}
                  tooltipText={
                    "This represents the blended review score calculated from this user's reviews"
                  }
                />
              );
            } else {
              if (agencyViewer) {
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
                        let userName = feed.reviewer;
                        Analytics.sendClickEvent(
                          `Thanked ${userName} for review ${this.props.match.params.agencyName} from agency profile page`
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
              <Article
                className={idx !== 0 ? "mt-1" : ""}
                {...feed}
                badge={badge}
              />
            );
          })}

          <Footer />
        </Container>
      </Layout>
    );
  }
}

export default AgencyProfile;
