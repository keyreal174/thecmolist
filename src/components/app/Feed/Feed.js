import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import Entities from "../base/Entities/Entities";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import InviteModal from "../base/ShareModule/InviteModal";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import ProfileStats from "../ProfileStats/ProfileStats";
import AskQuestion from "../base/AskQuestion/AskQuestion";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";
import { useHistory } from "react-router";

import MyNetwork from "./MyNetwork";
import BuildYourNetwork from "./BuildYourNetwork";
import AllMembers from "./AllMembers";
import Vendors from "./Vendors";
import AboutSpace from "./AboutSpace";
import TopBanner from "./TopBanner";

import Analytics from "../../util/Analytics";
import Util from "../../util/Util";
import { cdn } from "../../util/constants";
import AnswerIcon from "../base/icons/answer.svg";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";

import "./feed.scss";
import clsx from "clsx";

function RenderRightContainer({
  feedTitle,
  buildYourNetworkItems,
  feedAbout,
  memberList,
  vendorList,
  saveContent,
  isGroupOrTopic,
}) {
  return (
    <Col md="3" className="feed-right-container">
      {!isGroupOrTopic ? (
        <Fragment>
          <MyNetwork
            title={feedTitle && feedTitle.length > 0 ? feedTitle : "-"}
            saveContent={saveContent}
          />
          {buildYourNetworkItems && buildYourNetworkItems.length > 0 && (
            <BuildYourNetwork buildYourNetworkItems={buildYourNetworkItems} />
          )}
        </Fragment>
      ) : (
        <AboutSpace about={feedAbout} />
      )}
      <AllMembers memberList={memberList} />
      <Vendors vendorList={vendorList} />
    </Col>
  );
}

function RenderFeed({
  changeReaction,
  feedData,
  fetchActiveFeed,
  moreData,
  profileStats,
  reactions,
}) {
  let onLoadMoreClick = (e) => {
    e.preventDefault();
    e.target && e.target.blur && e.target.blur();
    fetchActiveFeed();
  };
  let feedMoreData = feedData.length > 0 && moreData;

  const history = useHistory();

  const handleEngagementButtonClick = async (
    caller,
    engagementType,
    engagementText
  ) => {
    const parentId = caller["parent_content_id"];
    const id = caller["content_id"];
    const engagement = engagementText.toLowerCase();

    if (engagementType === "Answer") {
      if ("parent_content_id" in caller) {
        history.push(`/content/${parentId}`);
      } else {
        history.push(`/content/${id}`);
      }
    } else {
      try {
        await changeReaction({ id, engagement });
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div className="feed--wrapper">
      {feedData &&
        feedData.map((feed, idx) => {
          const contentId = feed && "content_id" in feed ? feed.content_id : 0;

          return (
            <Article
              key={idx}
              className={
                idx !== 0 ? "mt-1 feed-dashboard-cell" : "feed-dashboard-cell"
              }
              {...feed.content}
              engagementButtons={[
                {
                  checked: true,
                  text: feed.replyText || "Reply",
                  type: "Answer",
                  icon: AnswerIcon,
                  number: getEngagementForId(contentId, "answer", reactions),
                },
                {
                  checked: getCheckedForEngagementType(
                    contentId,
                    "thanks",
                    reactions
                  ),
                  text: "Like",
                  type: "Reaction",
                  icon: ThanksIcon,
                  iconChecked: ThanksCheckedIcon,
                  number: getEngagementForId(contentId, "thanks", reactions),
                },
                {
                  checked: getCheckedForEngagementType(
                    contentId,
                    "insightful",
                    reactions
                  ),
                  text: "Insightful",
                  type: "Reaction",
                  icon: InsightfulIcon,
                  iconChecked: InsightfulCheckedIcon,
                  number: getEngagementForId(
                    contentId,
                    "insightful",
                    reactions
                  ),
                },
              ]}
              onEngagementButtonClick={handleEngagementButtonClick.bind(
                this,
                feed
              )}
              profile={profileStats.profile}
              showDiscussionComment={false}
            >
              {feed.parent_content && <Article {...feed.parent_content} />}
              {feed.entities?.length > 0 && (
                <Entities entities={feed.entities} />
              )}
            </Article>
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
  const { className, feedLoading, profileStats, saveContent } = props;

  return (
    <div className={className}>
      <Col className="feed--profile-stats" md="3">
        <div className="feed--sticky-content">
          {profileStats && <ProfileStats profileStats={profileStats} />}
        </div>
      </Col>

      <Col className="feed--feed" md="6">
        <AskQuestion className="feed--ask-question" saveContent={saveContent} />
        {feedLoading ? (
          <div className="mt-3 mb-5">
            <ActivityIndicator className="element-center feed-activity-indicator" />
          </div>
        ) : (
          <RenderFeed
            changeReaction={props.changeReaction}
            feedData={props.feedData}
            fetchActiveFeed={props.fetchActiveFeed}
            moreData={props.moreData}
            profileStats={profileStats}
            reactions={props.reactions}
          />
        )}
      </Col>
      <RenderRightContainer
        feedTitle={props.feedTitle}
        buildYourNetworkItems={profileStats.buildYourNetwork}
        feedAbout={props.feedAbout}
        memberList={props.memberList}
        vendorList={props.vendorList}
        saveContent={props.saveContent}
        isGroupOrTopic={props.isGroupOrTopic}
      />
    </div>
  );
}

const Feed = (props) => {
  const location = useLocation();
  const subSelectors = [
    { title: "All", slug: "all" },
    { title: "Questions & Answers", slug: "question" },
    { title: "Updates & Insights", slug: "project" },
    { title: "Articles & News", slug: "article" },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topic, setTopic] = useState({});
  const [topicFollowed, setTopicFollowed] = useState(false);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [activeSelector, setActiveSelector] = useState(0);
  const [filterIdx, setFilterIdx] = useState(0);
  const [groupFilterStartIdx, setGroupFilterStartIdx] = useState(0);
  const [filters, setFilters] = useState([]);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [isTopic, setIsTopic] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const changeDashboardHeader = (idx) => {
    if (idx < filters.length) {
      setBannerTitle(filters[idx].title);
      setBannerImage(filters[idx].image || `${cdn}/directory.png`);
    }
  };
  const changeDashboardFilter = async (filter, subfilter) =>
    props.changeDashboardFilter({ filter, subfilter });
  const changeFilter = (idx) => {
    setFilterIdx(idx);
    changeDashboardFilter(filters[idx].slug, subSelectors[activeSelector].slug);
    changeDashboardHeader(idx);
    // rewrite the url
    if (idx < groupFilterStartIdx) {
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

  const initFeedPage = (profileStats, isTopicPage) => {
    let newFilters = [
      { title: "All", slug: "my-network", enabled: true },
      { title: "My Peers", slug: "my-peers", enabled: true },
    ];
    setGroupFilterStartIdx(newFilters.length);
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
    if (!isTopicPage) {
      setFilters(newFilters);
      let groupIdx = -1;
      if (window.location.href.includes("/group/")) {
        let groupSlug = Util.parsePath(window.location.href).trailingPath;
        groupIdx = newFilters.findIndex((f) => f.slug === groupSlug);
        setIsGroup(groupIdx > 0);
      }
      let idx = groupIdx > 0 ? groupIdx : filterIdx;
      setFilterIdx(idx);
      setBannerTitle(newFilters[idx].title);
      setBannerImage(newFilters[idx].image || `${cdn}/directory.png`);
      changeDashboardFilter(
        newFilters[idx].slug,
        subSelectors[activeSelector].slug
      );
    } else {
      // topics are a simple case. Just add one filter (the topic) and set it to 0
      // the filter view is hidden by default for topic
      let topicSlug = Util.parsePath(window.location.href).trailingPath;
      setFilters([
        {
          title: topicSlug,
          slug: topicSlug,
          enabled: true,
        },
      ]);
      setFilterIdx(0);
      setBannerTitle(topicSlug);

      setBannerImage(`${cdn}/directory.png`);
      changeDashboardFilter(topicSlug, subSelectors[activeSelector].slug);
    }
  };

  // init whenever the isTopic prop changes
  useEffect(() => {
    let pageLocationIsTopic = props.isTopic || false;
    setIsTopic(pageLocationIsTopic);
    if (Object.keys(props.profileStats).length === 0) {
      const getProfileStats = async () => props.getProfileStats();
      getProfileStats().then((profileStats) =>
        initFeedPage(profileStats, pageLocationIsTopic)
      );
    } else {
      initFeedPage(props.profileStats, pageLocationIsTopic);
    }
  }, [props.isTopic]);

  useEffect(() => {
    const profileStats = props.profileStats;
    const topicSlug = Util.parsePath(window.location.href).trailingPath;
    let auxTopic =
      profileStats &&
      profileStats.profile &&
      profileStats.profile.spaces &&
      profileStats.profile.spaces.find((t) => t.slug === topicSlug);

    if (auxTopic) {
      auxTopic.followed = true;
      setTopicFollowed(true);
    } else {
      setTopicFollowed(false);
      auxTopic = {
        name: `#${topicSlug}`,
        slug: topicSlug,
      };
      auxTopic.followed = false;
    }
    setTopic(auxTopic);
  }, [props.profileStats]);

  const handleTopicFollowClick = (slug) => {
    const newFollowed = !topicFollowed;
    setTopicFollowed(newFollowed);
    setTopic({
      ...topic,
      followed: newFollowed,
    });
    props.followTopic(slug);
    props.getProfileStats();
  };

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header onToggle={handleToggle} />
          <CSSTransition in={isGroup} timeout={500} classNames="top-banner">
            <div>
              {(isGroup || isTopic) && (
                <TopBanner
                  title={bannerTitle}
                  subtitle={"Workspace"}
                  image={bannerImage}
                  saveContent={props.saveContent}
                  followTopic={handleTopicFollowClick}
                  topic={topic}
                />
              )}
            </div>
          </CSSTransition>

          {!isTopic && (
            <div style={{ width: "100%" }}>
              <Filter
                className={clsx("mt-4 feed--filters", mobileMenuOpen && "open")}
                filterIdx={filterIdx}
                filters={filters}
                onChange={(idx) => changeFilter(idx)}
              />
            </div>
          )}

          <div className="feed-divider">
            <div className="section-break" />
            <div className="section-subselectors">
              {subSelectors.map((sel, idx) => {
                return (
                  <Fragment key={idx}>
                    {idx === 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      <span>&nbsp;|&nbsp;</span>
                    )}
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
          </div>
          <RenderDashboard
            className={clsx("feed--dashboard", mobileMenuOpen && "open")}
            feedTitle={bannerTitle}
            profileStats={props.profileStats}
            feedData={props.activeFeed}
            feedLoading={props.feedLoading}
            moreData={props.activeFeedHasMoreData}
            feedAbout={props.activeFeedAbout}
            memberList={props.activeFeedMembers}
            vendorList={props.activeFeedVendors}
            saveContent={props.saveContent}
            fetchActiveFeed={props.fetchActiveFeed}
            reactions={props.reactions}
            changeReaction={props.changeReaction}
            isGroupOrTopic={isGroup || isTopic}
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

        <Footer className={clsx("feed--footer", mobileMenuOpen && "open")} />
      </Container>
    </>
  );
};

const mapState = (state) => {
  return {
    activeFeed: state.feedModel.activeFeed,
    activeFeedAbout: state.feedModel.activeFeedAbout,
    activeFeedHasMoreData: state.feedModel.activeFeedHasMoreData,
    activeFeedMembers: state.feedModel.activeFeedMembers,
    activeFeedVendors: state.feedModel.activeFeedVendors,
    feedLoading: state.feedModel.feedLoading,
    filterIdx: state.feedModel.filterIdx,
    profileStats: state.profileModel.profileStats,
    reactions: state.reactionModel.reactions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    changeDashboardFilter: dispatch.feedModel.changeDashboardFilter,
    changeReaction: dispatch.reactionModel.changeReaction,
    fetchActiveFeed: dispatch.feedModel.fetchActiveFeed,
    followTopic: dispatch.topicsModel.followTopic,
    getProfileStats: dispatch.profileModel.getProfileStats,
    saveContent: dispatch.contentModel.saveContent,
    saveUserInvite: dispatch.userModel.saveInvite,
  };
};

export default connect(mapState, mapDispatch)(Feed);
