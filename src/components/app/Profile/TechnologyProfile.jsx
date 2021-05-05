import React from "react";
import axios from "axios";
import Layout from "../base/Layout/Layout";
import Banner from "../base/Banner/Banner";
import Article from "../base/Article/Article";
import Footer from "../base/Footer/Footer";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import RatingBadgeProfile from "../base/Rating/RatingBadgeProfile";
import Util from "../../util/Util";
import "./profile.scss";

import Website from "./icons/link.svg";

const technologyProfileRequest = (technologyName) => {
  return axios.get(`/api/technology/${technologyName}`, {
    headers: {
      "timezone-offset": new Date().getTimezoneOffset(),
    },
  });
};

class TechnologyProfile extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Technology";
    this.state = {
      technologyName: "",
      technologyImage: "",
      technologyLocation: "",
      technologyDescription: "",
      technologyWebsite: "",
      feedFilter: "",
      feedData: [],
    };
  }

  componentDidMount() {
    this.fetchTechnologyProfile(this.props.match.params.technologyName);
  }

  fetchTechnologyProfile(technologyName) {
    if (!technologyName) technologyName = "";
    technologyProfileRequest(technologyName)
      .then(({ data }) => {
        this.setState({
          technologyName: data.technology.technologyName || "",
          technologyImage: data.technology.image || "",
          technologyLocation: data.technology.location || "",
          technologyDescription: data.technology.description || "",
          technologyWebsite: data.technology.website || "",
          feedData: data.technology.feedData || [],
        });
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.log(error);
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

    let overallNpsScore = 0;
    let allReviewScores = [];
    feedData.forEach((feed) => {
      if (feed.review_scores && feed.review_scores.length > 0) {
        allReviewScores = allReviewScores.concat(feed.review_scores);
      }
    });
    if (allReviewScores.length > 0) {
      overallNpsScore = Util.calculateNpsScore(allReviewScores);
    }

    return (
      <Layout>
        <Container className="height-100">
          <div className="wrapper">
            <Banner>
              {this.state.technologyImage && (
                <div className="square-logo">
                  <img src={this.state.technologyImage} alt="" />
                </div>
              )}
              <div className="btn-wrapper">
                {overallNpsScore > 0 && (
                  <RatingBadgeProfile className="rating-badge-large">
                    {overallNpsScore}
                  </RatingBadgeProfile>
                )}
                {allReviewScores.length > 0 && (
                  <span style={{ color: "white" }}>
                    {allReviewScores.length === 1
                      ? "NPS (1 review)"
                      : `NPS (${allReviewScores.length} reviews)`}
                  </span>
                )}
              </div>
            </Banner>

            <div className="overview">
              <Row className="border">
                <Col md="8" className="mb-2">
                  <h2 className="overview-header mb-1">
                    {this.state.technologyName}
                  </h2>
                  <p className="overview-desc">
                    {this.state.technologyLocation}
                  </p>
                  {this.state.technologyDescription &&
                    this.state.technologyDescription.length > 0 && (
                      <ShowMoreText
                        keepNewLines={true}
                        lines={1}
                        more="See more"
                        less=""
                        width={0}
                      >
                        {this.state.technologyDescription}
                      </ShowMoreText>
                    )}
                </Col>
                <Col md="4">
                  <div className="overview-links">
                    {this.state.technologyWebsite.length > 0 && (
                      <div className="overview-link">
                        <span>
                          <img src={Website} alt="" />
                        </span>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={this.state.technologyWebsite}
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
          {subfilterKeys.length > 0 && (
            <div
              className="overview profile-subfilters"
              style={{
                paddingTop: "5px",
                paddingBottom: "10px",
                paddingLeft: "30px",
              }}
            >
              <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <b style={{ float: "left", paddingTop: "8px" }}>
                  Technologies:&nbsp;
                </b>
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
            </div>
          )}

          <h2 className="profile-section-title">Clients</h2>
          {feedData.map((feed, idx) => {
            let badge = null;
            if (false && feed.review_scores && feed.review_scores.length > 0) {
              let npsScore = Util.calculateAverage(feed.review_scores);
              badge = (
                <RatingBadgeProfile
                  tooltipText={
                    "This represents the blended review score calculated from this user's reviews"
                  }
                >
                  {npsScore}
                </RatingBadgeProfile>
              );
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

export default TechnologyProfile;
