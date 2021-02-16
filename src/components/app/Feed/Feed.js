import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import Banner from "../base/Banner/Banner";
import InviteModal from "../base/ShareModule/InviteModal";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import ProfileStats from "../ProfileStats/ProfileStats";
import AskQuestion from "../base/AskQuestion/AskQuestion";

import MyNetwork from "./MyNetwork";
import BuildYourNetwork from "./BuildYourNetwork";
import AllMembers from "./AllMembers";
import Vendors from "./Vendors";
import AboutSpace from "./AboutSpace";
import TopBanner from "./TopBanner";

import Analytics from "../../util/Analytics";
import Util from "../../util/Util";
import "./feed.scss";

const cdn = "https://d3k6hg21rt7gsh.cloudfront.net/icons";

function RenderRightContainer({
  buildYourNetworkItems,
  peopleInSimilarRoles,
  newMembers,
  saveContent,
  isGroup,
}) {
  return (
    <Col md="3" className="feed-right-container">
      {!isGroup ? (
        <Fragment>
          <MyNetwork saveContent={saveContent} />
          <BuildYourNetwork buildYourNetworkItems={buildYourNetworkItems} />
        </Fragment>
      ) : (
        <AboutSpace />
      )}
      <AllMembers peopleInSimilarRoles={peopleInSimilarRoles} />
      <Vendors newMembers={newMembers} />
    </Col>
  );
}

function RenderFeed({ feedData, moreData, fetchActiveFeed }) {
  let onLoadMoreClick = (e) => {
    e.preventDefault();
    e.target && e.target.blur && e.target.blur();
    fetchActiveFeed();
  };
  let feedMoreData = feedData.length > 0 && moreData;
  return (
    <div>
      {feedData &&
        feedData.map((feed, idx) => {
          return (
            <Article
              key={idx}
              className={
                idx !== 0 ? "mt-1 feed-dashboard-cell" : "feed-dashboard-cell"
              }
              {...feed}
              engagementButtons={[
                {
                  checked: true,
                  text: "Answer",
                  icon: `${cdn}/Answer.png`,
                },
                {
                  checked: true,
                  text: "Thanks",
                  icon: `${cdn}/Thanks.png`,
                  number: feed.num_thanks || 0,
                },
                {
                  checked: true,
                  text: "Insightful",
                  icon: `${cdn}/Insightful.png`,
                  number: feed.num_insightful || 0,
                },
              ]}
              onEngagementButtonClick={() => console.log("a")}
            />
          );
        })}

      {feedData.length === 0 && (
        <div className="wrapper article-wrapper">
          <div className="no-feed-data-header">No content yet</div>
        </div>
      )}
      {feedMoreData && (
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

function RenderDashboard(props) {
  const feedLoading = props.feedLoading;
  const profileStats = props.profileStats;
  return (
    <Row>
      <Col md="3" style={{ paddingRight: "0px" }}>
        {profileStats && <ProfileStats profileStats={profileStats} />}
      </Col>
      <Col md="6">
        <AskQuestion />
        {feedLoading ? (
          <div className="mt-3 mb-5">
            <ActivityIndicator className="element-center feed-activity-indicator" />
          </div>
        ) : (
          <RenderFeed
            moreData={props.moreData}
            feedData={props.feedData}
            fetchActiveFeed={props.fetchActiveFeed}
          />
        )}
      </Col>
      <RenderRightContainer
        buildYourNetworkItems={profileStats.buildYourNetwork}
        peopleInSimilarRoles={profileStats.peopleInSimilarRoles}
        newMembers={profileStats.newMembers}
        saveContent={props.saveContent}
        isGroup={props.isGroup}
      />
    </Row>
  );
}

const Feed = (props) => {
  const location = useLocation();
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
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const changeDashboardHeader = (idx) => {
    if (idx < filters.length) {
      setBannerTitle(filters[idx].title);
      setBannerImage(
        filters[idx].image ||
          "https://d3k6hg21rt7gsh.cloudfront.net/directory.png"
      );
    }
  };
  const changeDashboardFilter = async (filter, subfilter) =>
    props.changeDashboardFilter({ filter, subfilter });
  const changeFilter = (idx) => {
    setFilterIdx(idx);
    changeDashboardFilter(filters[idx].slug, subSelectors[activeSelector].slug);
    changeDashboardHeader(idx);
    // rewrite the url
    if (idx < 3) {
      window.history.pushState({}, filters[idx].name, "/feed");
      setIsGroup(false);
    } else {
      setIsGroup(true);
      window.history.pushState(
        {},
        filters[idx].name,
        `/group/${filters[idx].slug}`
      );
    }
  };
  const changeSubFilter = (idx) => {
    setActiveSelector(idx);
    changeDashboardFilter(filters[filterIdx].slug, subSelectors[idx].slug);
  };
  useEffect(() => {
    if (location && location.pathname && location.pathname.includes("group")) {
      setIsGroup(true);
    }
    const getProfileStats = async () => props.getProfileStats();
    getProfileStats().then((profileStats) => {
      let newFilters = [
        { title: "My Network", slug: "my-network", enabled: true },
        { title: "My Peers", slug: "my-peers", enabled: true },
        { title: "My Experts", slug: "my-experts", enabled: true },
      ];
      if (profileStats && profileStats.profile && profileStats.profile.groups) {
        newFilters = newFilters.concat(
          profileStats.profile.groups.map((group) => {
            return {
              title: group.name,
              slug: group.slug,
              image: group.image || null,
              enabled: true,
            };
          })
        );
      }
      setFilters(newFilters);
      let groupIdx = -1;
      if (window.location.href.includes("/group/")) {
        let groupSlug = Util.parsePath(window.location.href).trailingPath;
        groupIdx = newFilters.findIndex((f) => f.slug === groupSlug);
      }
      let idx = groupIdx > 0 ? groupIdx : filterIdx;
      setFilterIdx(idx);
      setBannerTitle(newFilters[idx].title);
      setBannerImage(
        newFilters[idx].image ||
          "https://d3k6hg21rt7gsh.cloudfront.net/directory.png"
      );
      changeDashboardFilter(
        newFilters[idx].slug,
        subSelectors[activeSelector].slug
      );
    });
  }, []);

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <CSSTransition in={isGroup} timeout={500} classNames="top-banner">
            <div>
              {isGroup && <TopBanner saveContent={props.saveContent} />}
            </div>
          </CSSTransition>
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
            moreData={props.moreData}
            feedData={props.activeFeed}
            saveContent={props.saveContent}
            fetchActiveFeed={props.fetchActiveFeed}
            isGroup={isGroup}
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
    moreData: state.feedModel.moreData,
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
    saveContent: dispatch.contentModel.saveContent,
  };
};

export default connect(mapState, mapDispatch)(Feed);
