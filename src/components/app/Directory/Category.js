import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, Container, Row, Col } from "react-bootstrap";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import UserCard from "../base/UserCard/UserCard";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Banner from "../base/Banner/Banner";
import ShareModule from "../base/ShareModule/ShareModule";
import InviteModal from "../base/ShareModule/InviteModal";
import Arrow from "../base/icons/arrow.svg";
import RatingBadgeProfile from "../base/Rating/RatingBadgeProfile";
import Util from "../../util/Util";
import Analytics from "../../util/Analytics";
import "./directory.css";

const categoryDiscussionsRequest = (category) => {
  return (dispatch) => {
    return axios.get(`/api/directory/${category}?filter=discussions`);
  };
};

const categoryReviewsRequest = (category, vendorFilter, token) => {
  let headers = {};
  if (token && token.length > 0) {
    headers = {
      token: token,
      "timezone-offset": new Date().getTimezoneOffset(),
    };
  }
  let requestUrl = `/api/directory/${category}?filter=vendors`;
  if (vendorFilter && vendorFilter.length > 0) {
    requestUrl += `&vendor=${vendorFilter}`;
  }

  return (dispatch) => {
    return axios.get(requestUrl, {
      headers: headers,
    });
  };
};

const saveUserInviteRequest = (data) => {
  return (dispatch) => {
    return axios.post("/api/userinvite", data);
  };
};

class Category extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Directory";
    this.state = {
      categoryData: {
        discussions: {
          data: [],
        },
        vendors: [],
      },
      discussionFilterIdx: 0,
      vendorFilterIdx: 0,
      inviteModalShow: false,
      subscribedDiscussions: false,
      subscribedVendors: false,
      enableAnimations: true,
    };
  }

  componentDidMount() {
    this.fetchCategory(this.props.match.params.category);
  }

  fetchCategory(category) {
    let self = this;
    // fetch discussions
    this.props.categoryDiscussionsRequest(category).then(({ data }) => {
      let categoryData = Object.assign({}, self.state.categoryData);
      categoryData.discussions = data.discussions;
      self.setState({
        categoryData: categoryData,
      });
    });

    // fetch vendors
    this.props.categoryReviewsRequest(category).then(({ data }) => {
      let categoryData = Object.assign({}, self.state.categoryData);
      categoryData.vendors = data.vendors;
      categoryData.vendors.forEach((vendor) => {
        vendor.moreData = true;
      });
      self.setState({
        categoryData: categoryData,
      });
    });
  }

  fetchMoreVendors(vendorFilterIdx) {
    let self = this;
    let category = this.props.match.params.category;
    if (vendorFilterIdx < this.state.categoryData.vendors.length) {
      let vendorData = this.state.categoryData.vendors[vendorFilterIdx];
      this.props
        .categoryReviewsRequest(category, vendorData.title, vendorData.token)
        .then(({ data }) => {
          if (data.vendors && data.vendors.length > 0) {
            let returnedVendorList = data.vendors[0];
            let categoryData = Object.assign({}, self.state.categoryData);
            let vendors = categoryData.vendors;
            for (let i = 0; i < vendors.length; i++) {
              if (vendors[i].title === returnedVendorList.title) {
                if (
                  returnedVendorList.data != null &&
                  returnedVendorList.data.length > 0
                ) {
                  vendors[i].moreData = true;
                  vendors[i].token = returnedVendorList.token;
                  vendors[i].data = vendors[i].data.concat(
                    returnedVendorList.data
                  );
                } else {
                  vendors[i].moreData = false;
                }
                self.setState({
                  categoryData: categoryData,
                });
                break;
              }
            }
          }
        });
    }
  }

  sendUserInvite(inviteList) {
    this.props.saveUserInviteRequest(inviteList).then(({ data }) => {
      console.log(data);
    });
  }

  render() {
    let categoryData = this.state ? this.state.categoryData : [];
    let self = this;
    let discussionFilters = []; // eslint-disable-line no-unused-vars
    let categoryTitle = categoryData.title;
    if (!categoryTitle) {
      categoryTitle = categoryData.discussions
        ? categoryData.discussions.categoryTitle
        : "";
    }
    if (
      categoryData.discussions &&
      categoryData.discussions.data &&
      categoryData.discussions.data.length > 0
    ) {
      discussionFilters = categoryData.discussions.data.map((feed) => {
        return {
          title: feed.title,
          enabled: feed.data.length > 0,
        };
      });
    }
    let discussionFeedData =
      categoryData.discussions &&
      categoryData.discussions.data &&
      categoryData.discussions.data.length > 0
        ? categoryData.discussions.data[this.state.discussionFilterIdx].data
        : [];
    let setDiscussionFilterIdx = (idx) => {
      self.setState({ discussionFilterIdx: idx });
    };

    let vendorFilters = [];
    if (categoryData.vendors && categoryData.vendors.length > 0) {
      vendorFilters = categoryData.vendors.map((feed) => {
        return {
          title: feed.title,
          enabled: feed.data.length > 0,
        };
      });
    }
    let vendorFeedData = [];
    let vendorMoreData = false;
    let noFeedContentCopy = null;
    let noFeedContentButton = null;
    if (categoryData.vendors && categoryData.vendors.length > 0) {
      vendorFeedData = categoryData.vendors[this.state.vendorFilterIdx].data;
      vendorMoreData =
        categoryData.vendors[this.state.vendorFilterIdx].moreData;
      let activeFilterTitle =
        categoryData.vendors[this.state.vendorFilterIdx].title;
      if (vendorFeedData.length === 0) {
        if (activeFilterTitle.includes("Tech")) {
          noFeedContentCopy =
            "Support and share your favorite technologies with your network";
          noFeedContentButton = (
            <Button
              className="btn-white no-review-button"
              variant="outline-primary"
              onClick={() => (window.location.href = "/profile#addtechnology")}
            >
              Share Technology
            </Button>
          );
        } else {
          noFeedContentCopy =
            "Support and share your favorite agencies with your network";
          noFeedContentButton = (
            <Button
              className="btn-white no-review-button"
              variant="outline-primary"
              onClick={() => (window.location.href = "/profile#addagency")}
            >
              Share Agency
            </Button>
          );
        }
      }
    }
    let setVendorFilterIdx = (idx) => {
      self.setState({ vendorFilterIdx: idx });
    };

    const FadeTransition = (props) => (
      <CSSTransition {...props} classNames="profile-article-transition" />
    ); // define here to pass props down from parent -> child
    return (
      <>
        <Container className="height-100">
          <Header />
          <div className="wrapper">
            <Banner>
              <div className="square-logo">
                <img
                  src="https://d3k6hg21rt7gsh.cloudfront.net/directory.png"
                  alt=""
                />
              </div>
            </Banner>
            <div className="overview">
              <Row className="border">
                <Col md="10" className="mb-2">
                  {categoryTitle && categoryTitle.length > 0 && (
                    <h2 className="overview-header mb-1">{categoryTitle}</h2>
                  )}
                </Col>
              </Row>
            </div>

            {categoryTitle && categoryTitle.length > 0 && (
              <ShareModule
                sponsorHeading={`Sponsor and invite experts about ${categoryTitle} to your network`}
                questionHeading={`Ask your network about ${categoryTitle}`}
                shareHeading={`Share your experience about ${categoryTitle} with your network `}
                newPostLink={
                  categoryData.discussions &&
                  categoryData.discussions.new_post_link
                    ? categoryData.discussions.new_post_link
                    : ""
                }
                onInvite={() => {
                  Analytics.sendClickEvent("Clicked Invite from Category page");
                  this.setState({ inviteModalShow: true });
                }}
              />
            )}

            {/* Discussions section */}
            <Filter
              title="Discussions"
              // filters={discussionFilters} // disable filters for now
              onChange={(idx) => setDiscussionFilterIdx(idx)}
            >
              {discussionFeedData.length > 0 && (
                <div>
                  {this.state.subscribedDiscussions ? (
                    <span className="directory-connected-label">
                      Subscribed ✓
                    </span>
                  ) : (
                    <a
                      href="/#"
                      className="btn__homepage btn__homepage-blue btn__nux_share"
                      style={{ float: "right", width: "220px" }}
                      onClick={() => {
                        Analytics.sendClickEvent(
                          "Clicked subscribed to discussions from category page: " +
                            categoryTitle
                        );
                        self.setState({
                          enableAnimations: false,
                          subscribedDiscussions: true,
                        });
                      }}
                    >
                      Subscribe to weekly summary
                    </a>
                  )}
                </div>
              )}
            </Filter>
            <TransitionGroup
              enter={this.state.enableAnimations}
              exit={this.state.enableAnimations}
            >
              {discussionFeedData.map((feed, idx) => {
                return (
                  <FadeTransition key={idx}>
                    <Article
                      key={idx}
                      className="discussion-article"
                      {...feed}
                    />
                  </FadeTransition>
                );
              })}
            </TransitionGroup>
            {discussionFeedData.length > 0 && (
              <div className="col-md-12 discussion-show-more">
                {categoryData.discussions.link && (
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      paddingTop: "10px",
                    }}
                  >
                    <a href={categoryData.discussions.link}>
                      Show more
                      <img alt="arrow" src={Arrow} />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Vendors section */}
            <Filter
              title="Vendors"
              filters={vendorFilters}
              onChange={(idx) => setVendorFilterIdx(idx)}
              sortable={false}
            >
              {vendorFeedData.length > 0 && (
                <div>
                  {this.state.subscribedVendors ? (
                    <span className="directory-connected-label">
                      Subscribed ✓
                    </span>
                  ) : (
                    <a
                      href="/#"
                      className="btn__homepage btn__homepage-blue btn__nux_share"
                      style={{ float: "right", width: "220px" }}
                      onClick={() => {
                        Analytics.sendClickEvent(
                          "Clicked subscribed to vendors from category page: " +
                            categoryTitle
                        );
                        self.setState({
                          enableAnimations: false,
                          subscribedVendors: true,
                        });
                      }}
                    >
                      Subscribe to weekly summary
                    </a>
                  )}
                </div>
              )}
            </Filter>

            {vendorFeedData.map((feed, idx) => {
              let badge = null;
              if (feed.review_scores && feed.review_scores.length > 1) {
                let npsScore = Util.calculateNpsScore(feed.review_scores);
                let npsHistogram = Util.calculateNpsHistogram(
                  feed.review_scores
                );
                let tooltip = (
                  <div>
                    <span className="ratings-popup-header">
                      NPS Score ({npsHistogram.total}{" "}
                      {npsHistogram.total > 1 ? "reviews" : "review"})
                    </span>
                    <hr className="ratings-popup-hr" />
                    <small>
                      <span className="ratings-popup-header">Positive:</span>{" "}
                      {Math.round(
                        (npsHistogram.promoters / npsHistogram.total) * 100
                      )}
                      %<br />
                      <span className="ratings-popup-header">
                        Neutral:
                      </span>{" "}
                      {Math.round(
                        (npsHistogram.neutral / npsHistogram.total) * 100
                      )}
                      %<br />
                      <span className="ratings-popup-header">
                        Negative:
                      </span>{" "}
                      {Math.round(
                        (npsHistogram.detractors / npsHistogram.total) * 100
                      )}
                      %<br />
                    </small>
                  </div>
                );
                badge = (
                  <RatingBadgeProfile
                    className="rating-badge-category"
                    tooltipText={tooltip}
                    npsScore={npsScore}
                  >
                    <div style={{ paddingTop: "2px" }}>
                      <progress
                        class="progress progress-success"
                        value={npsHistogram.promoters}
                        max={npsHistogram.total}
                      ></progress>
                      <progress
                        class="progress progress-warning"
                        value={npsHistogram.neutral}
                        max={npsHistogram.total}
                      ></progress>
                      <progress
                        class="progress progress-danger"
                        value={npsHistogram.detractors}
                        max={npsHistogram.total}
                      ></progress>
                    </div>
                  </RatingBadgeProfile>
                );
              }
              return (
                <Article
                  articletextlines={1}
                  key={idx}
                  className={idx !== 0 ? "mt-1" : ""}
                  {...feed}
                  badge={badge}
                >
                  {feed.users && feed.users.length > 0 && (
                    <div
                      style={{
                        width: "100%",
                        "margin-left":
                          feed.image && feed.image.length > 0 ? "70px" : "0px",
                      }}
                    >
                      {feed.users.map((user, idx) => (
                        <UserCard
                          className={idx === 0 ? "ml-1" : ""}
                          {...user}
                        />
                      ))}
                    </div>
                  )}
                </Article>
              );
            })}

            {!noFeedContentCopy && vendorMoreData && (
              <div className="row">
                <div class="col-md-2 mt-2 mx-auto">
                  <button
                    className="btn btn__load-more"
                    type="button"
                    onClick={() =>
                      this.fetchMoreVendors(this.state.vendorFilterIdx)
                    }
                  >
                    Show more
                  </button>
                </div>
              </div>
            )}

            {noFeedContentCopy && (
              <div className="wrapper article-wrapper">
                <div className="no-reviews-header">No reviews yet</div>
                <div className="no-reviews-body">
                  {noFeedContentCopy}
                  {noFeedContentButton}
                </div>
              </div>
            )}

            <InviteModal
              show={this.state.inviteModalShow}
              onHide={() => this.setState({ inviteModalShow: false })}
              onSuccess={(data) => {
                this.sendUserInvite(data);
                this.setState({ inviteModalShow: false });
              }}
            />

            <Footer />
          </div>
        </Container>
      </>
    );
  }
}

export default connect(null, {
  categoryDiscussionsRequest,
  categoryReviewsRequest,
  saveUserInviteRequest,
})(Category);
