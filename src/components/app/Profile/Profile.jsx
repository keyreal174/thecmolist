import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import { useHistory, useLocation } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import CustomCard from "../base/CustomCard/CustomCard";
import Layout from "../base/Layout/Layout";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import Entities from "../base/Entities/Entities";
import Footer from "../base/Footer/Footer";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";
import AddVendorsModal from "../base/AddVendors/AddVendorsModal";
import AddSkillsModal from "../base/AddSkills/AddSkillsModal";
import VendorsDetail from "../Vendors/VendorsDetail";
import BlockerText from "../base/BlockerText/BlockerText";
import DeletePost from "./DeletePost";
import FollowUserModal from "./FollowUser";
import Util from "../../util/Util";
import Analytics from "../../util/Analytics";
import {
  cdn,
  profileImage as profileBackgroundImage,
} from "../../util/constants";
import {
  companyStageOptions,
  companyIndustryOptions,
} from "../ProfileEdit/ProfileEditOptions";
import "./profile.scss";

import AnswerIcon from "../base/icons/answer.svg";
import Follows from "../base/icons/follows.svg";
import LinkedIn from "./icons/linkedin.svg";
import Website from "./icons/link.svg";
import Mail from "./icons/mail.svg";
import Education from "./icons/education.svg";
import Location from "./icons/location.svg";
import Group from "../../app/base/icons/group.svg";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";
import More from "./icons/more.svg";
import AllMembersListModal from "../base/AllMembersList/AllMembersListModal";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";

const RenderList = ({ arr }) => {
  if (arr) {
    return arr.map((item, index) => (
      <React.Fragment key={index}>
        <Link to={`/topic/${item.slug}`}>
          {item.name}
          {index < arr.length - 1 && ","}
        </Link>
        {index < arr.length - 1 && <span> </span>}
      </React.Fragment>
    ));
  } else {
    return <React.Fragment />;
  }
};

const Profile = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [canShowStack, setCanShowStack] = useState(false);
  const [canShowSkills, setCanShowSkills] = useState(false);
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [profileUserName, setProfileUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [profileCompany, setProfileCompany] = useState("");
  const [profileCompanyIndustry, setProfileCompanyIndustry] = useState("");
  const [profileCompanyStage, setProfileCompanyStage] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileState, setProfileState] = useState("");
  const [profileCountry, setProfileCountry] = useState("");
  const [profileHeadline, setProfileHeadline] = useState("");
  const [profileLinkedin, setProfileLinkedin] = useState("");
  const [profileWebsite, setProfileWebsite] = useState("");
  const [profileMail, setProfileMail] = useState("");
  const [profileAbout, setProfileAbout] = useState([]);
  const [profileNumFollowing, setProfileNumFollowing] = useState([]);
  const [profileNumFollowers, setProfileNumFollowers] = useState([]);
  const [feedData, setFeedData] = useState([]);
  const [connectedUser, setConnectedUser] = useState(false);
  const [followedUser, setFollowedUser] = useState(false);

  const [filterIdx, setFilterIdx] = useState(0);
  const [filterTitle, setFilterTitle] = useState("");
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [postSlug, setPostSlug] = useState("");
  const [filters, setFilters] = useState([]);
  const [feedFilter, setFeedFilter] = useState("");
  const [subfilters, setSubfilters] = useState({});
  const [topicList, setTopicList] = useState([]);
  const [filteredFeedData, setFilteredFeedData] = useState([]);
  const [hasDataOnCurrentFeed, setHasDataOnCurrentFeed] = useState(false);

  const [showDeletePost, setShowDeletePost] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showCategoryListView, setShowCategoryListView] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [limit, setLimit] = useState(null);

  const [showMemberModal, setShowMemberModal] = useState(false);
  const [statType, setStatType] = useState("");
  const [followingList, setFollowingList] = useState([]);

  const userName = Util.parsePath(window.location.href).trailingPath;

  const reactions = props.reactions;

  useEffect(() => {
    document.title = "Profile";
    props.fetchProfile({
      userName: Util.parsePath(window.location.href).trailingPath,
    });
  }, []);

  useEffect(() => {
    if (props.profile && Object.keys(props.profile).length > 0) {
      setIsMyProfile(props.profile.isMyProfile || "");
      setCanShowSkills(props.profile.canShowSkills || "");
      setCanShowStack(props.profile.canShowStack || "");
      setProfileFirstName(props.profile.firstName || "");
      setProfileLastName(props.profile.lastName || "");
      setProfileUserName(props.profile.userName || "");
      setProfileImage(props.profile.image || "");
      setProfileTitle(props.profile.title || "");
      setProfileCompany(props.profile.company || "");
      setProfileCompanyStage(props.profile.companyStage || "");
      setProfileCompanyIndustry(props.profile.companyIndustry || "");
      setProfileCity(props.profile.city || "");
      setProfileState(props.profile.state || "");
      setProfileCountry(props.profile.country || "");
      setProfileHeadline(props.profile.headline || "");
      setProfileLinkedin(props.profile.linkedin || "");
      setProfileWebsite(props.profile.website || "");
      setProfileMail(props.profile.mail || "");
      setProfileAbout(props.profile.about || {});
      setFeedData(props.profile.feedData || []);
      setConnectedUser(props.profile.connectedUser);
      setFollowedUser(props.profile.followedUser);
      setProfileNumFollowing(props.profile.num_following);
      setProfileNumFollowers(props.profile.num_followers);
      props.profile.feedData && createSubfilters(props.profile.feedData);

      const profileFeedData = props.profile.feedData || [];
      const feedtext = window.location.href.split("#")[1];
      const id = profileFeedData.findIndex(
        (item) =>
          (item.title === "My Expertise" && feedtext === "expertise") ||
          (item.title === "My Stack" && feedtext === "stack")
      );
      if (!filterIdx) setFilterIdx(id === -1 ? 0 : id);

      const exp_id = profileFeedData.findIndex(
        (item) => item.title === "My Expertise" && feedtext === "expertise"
      );
      if (exp_id !== -1) setFilterTitle("My Expertise");
    }
  }, [props.profile]);

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.myStack &&
      props.profile &&
      Object.keys(props.profile).length > 0 &&
      props.profile.feedData
    ) {
      const id = props.profile.feedData.findIndex(
        (item) => item.title === "My Stack"
      );
      setFilterIdx(id);
    }
  }, [location, props.profile]);

  const createSubfilters = (feedDa) => {
    let newFeedData = feedDa.slice();
    newFeedData.forEach((feed) => {
      feed.subfilters = {};
      let feed_data = feed.data;
      feed_data.forEach((data) => {
        if (data.content && data.content.collections) {
          let collectionsForContent = data.content.collections;
          collectionsForContent.forEach((collectionTitle) => {
            if (!(collectionTitle in feed.subfilters)) {
              feed.subfilters[collectionTitle] = 0;
            }
            feed.subfilters[collectionTitle] += 1;
          });
        }
      });
    });
    setFeedData(newFeedData);
  };

  const showDeletePostModal = (feed) => {
    setShowDeletePost(true);
    setPostSlug(feed.content_id);
  };

  const closeDeletePostModal = () => {
    setShowDeletePost(false);
  };

  const FadeTransition = (props) => (
    <CSSTransition
      {...props}
      timeout={50}
      classNames="profile-article-transition"
    />
  );

  const setFilterId = (idx) => {
    let prevFeedData = feedData.slice();
    prevFeedData[filterIdx].subfilter = "";
    setFeedData(prevFeedData);
    setFilterIdx(idx);
    setFilterTitle(feedData[idx]?.title);
    setHasDataOnCurrentFeed(
      feedData[idx] && feedData[idx].data && feedData[idx].data.length > 0
    );
  };

  const onSubfilterChange = (key) => {
    let prevFeedData = feedData.slice();
    let prevFeedFilter = prevFeedData[filterIdx].subfilter;
    prevFeedData[filterIdx].subfilter =
      key.title === prevFeedFilter ? "" : key.title;
    setFeedData(prevFeedData);
  };

  const connectUser = async (payload) => {
    Analytics.sendClickEvent(`Followed user ${userName} from profile page`);
    try {
      await props.connectUser(payload);
      setEnableAnimations(false);
      setConnectedUser(true);
    } catch (err) {
      console.log(`An error occurred connecting with user: ${userName}`);
      console.log(err);
    }
  };

  const toggleFollowModal = () => {
    setShowFollowModal((value) => !value);
  };

  const handleDisconnectButtonClick = async () => {
    const disconnect = props.disconnectUser;
    const userName = Util.parsePath(window.location.href).trailingPath;

    if (disconnect) {
      try {
        await disconnect({ user: userName });
        setConnectedUser(false);
      } catch (err) {
        console.log(
          `An error occurred disconnecting with user: ${userName}`,
          err.toString()
        );
      }
    }
  };

  useEffect(() => {
    if (feedData.length > 0) {
      const f = feedData.map((feed) => ({
        title: feed.title,
        enabled: feed.enabled || false,
      }));
      setFilters(f);

      let currentFeed = feedData[filterIdx];
      let feed_data = currentFeed.data;
      // subfilters
      if (currentFeed) {
        let subfilters = currentFeed.subfilters || {};
        setSubfilters(subfilters);
        let feedFilter = currentFeed.subfilter || "";
        setFeedFilter(feedFilter);
        setShowCategoryListView(currentFeed.showCategoryListView);
        setTopicList(
          Object.keys(subfilters)
            .map((s) => ({
              title: s,
              count: subfilters[s],
            }))
            .sort((a, b) => b.count - a.count)
        );
        if (feedFilter.length > 0) {
          feed_data = feed_data.filter((data) => {
            if (data.content && data.content.collections) {
              let collectionsForContent = data.content.collections;
              for (let j = 0; j < collectionsForContent.length; j++) {
                if (
                  collectionsForContent[j] &&
                  collectionsForContent[j] === feedFilter
                )
                  return true;
              }
            }
            return false;
          });
        }
      }
      setHasDataOnCurrentFeed(
        currentFeed && currentFeed.data && currentFeed.data.length > 0
      );
      setFilteredFeedData(feed_data);
    }
  }, [feedData]);

  const profileData = {};

  const handleEngagementButtonClick = async (
    caller,
    engagementType,
    engagementText
  ) => {
    const parentId = caller["parent_content_id"];
    const id = caller["content_id"];
    const engagement = engagementText.toLowerCase();

    if (engagementType === "Answer") {
      if (parentId) {
        history.push(`/content/${parentId}`);
      } else {
        history.push(`/content/${id}`);
      }
    } else {
      try {
        await props.changeReaction({ id, engagement });
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleAddVendorModal = (contentAdded) => {
    if (showAddVendor && contentAdded) {
      // i.e. we're closing the dialog, trigger a refresh in case
      // some content was added
      props.fetchProfile({
        userName: Util.parsePath(window.location.href).trailingPath,
      });
    }
    setLimit(0);
    setShowAddVendor((value) => !value);
  };

  const toggleAddSkillModal = () => {
    if (showAddSkill) {
      // i.e. we're closing the dialog, trigger a refresh in case
      // some content was added
      props.fetchProfile({
        userName: Util.parsePath(window.location.href).trailingPath,
      });
    }
    setShowAddSkill((value) => !value);
  };

  const AddVendorButton = ({ isVendor }) => (
    <Button
      className="filter--button filter--button-active active m-0 max-content"
      onClick={() => {
        !isVendor ? toggleAddSkillModal() : toggleAddVendorModal();
        setCategoryTitle("");
      }}
    >
      {!isVendor ? "+ Add Expertise" : "+ Add Vendor"}
    </Button>
  );

  const XBadge = ({ feed }) => {
    return isMyProfile ? (
      <>
        <span
          className="cursor-pointer noselect desktop-delete"
          onClick={() => showDeletePostModal(feed)}
        >
          ✖
        </span>
        <span
          className="cursor-pointer noselect mobile-delete"
          onClick={() => showDeletePostModal(feed)}
        >
          Delete
        </span>
      </>
    ) : null;
  };

  let feedBlockerText = null;
  let feedBlockerAddVendor = false;
  if (feedData[filterIdx]) {
    if (
      feedData[filterIdx].blockerText &&
      feedData[filterIdx].blockerText.length > 0
    ) {
      feedBlockerText = feedData[filterIdx].blockerText;
    }
    if ("blockerAddVendor" in feedData[filterIdx]) {
      feedBlockerAddVendor = feedData[filterIdx].blockerAddVendor;
    }
  }

  const getProfileFollowing = async (e) => {
    e.preventDefault();
    const response = await props.fetchProfileFollowing({
      userName: Util.parsePath(window.location.href).trailingPath,
    });
    setShowMemberModal(true);
    setStatType("Following");
    setFollowingList(response);
  };

  const getProfileFollowers = async (e) => {
    e.preventDefault();
    const response = await props.fetchProfileFollowers({
      userName: Util.parsePath(window.location.href).trailingPath,
    });
    setShowMemberModal(true);
    setStatType("Followers");
    setFollowingList(response);
  };

  const handleCloseMemberModal = () => {
    setShowMemberModal((value) => !value);
  };

  return (
    <Layout onToggle={handleToggle}>
      <div>
        <Container className={clsx("wrapper", mobileMenuOpen && "open")}>
          <Row className="profile--wrapper">
            <Col xl="8" md="12" sm="12">
              <div className="profile--left-section">
                <img
                  src={profileBackgroundImage}
                  className="left-section--image"
                  alt="profile"
                />
                {profileImage && (
                  <div className="logo-wrapper">
                    <img src={profileImage} alt="" />
                  </div>
                )}

                {profileFirstName && (
                  <div className="overview-summary">
                    <h2 className="overview-header mb-1">
                      {profileFirstName}&nbsp;
                      {profileLastName}&nbsp;
                    </h2>
                    <div className="overview-subheadline">
                      {profileTitle} at {profileCompany}
                    </div>
                  </div>
                )}
                {isMyProfile ? (
                  <div className="btn-wrapper">
                    <Button
                      className="btn-white edit-profile"
                      variant="outline-primary"
                      onClick={() => history.push("/profile_edit")}
                    >
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <React.Fragment>
                    {profileFirstName && (
                      <div className="btn-wrapper d-flex">
                        {!connectedUser ? (
                          <Button
                            className="btn badge--connect-button mr-3"
                            variant="primary"
                            onClick={() => toggleFollowModal()}
                          >
                            Follow
                          </Button>
                        ) : (
                          <Button
                            className="btn badge--connected-button mr-3"
                            variant="primary"
                            onClick={handleDisconnectButtonClick}
                          >
                            Following
                          </Button>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                )}
              </div>
            </Col>

            <Col xl="4" md="12" sm="12">
              <CustomCard heading="Intro" className="profile--right-section">
                <div className="right-section--details">
                  {profileCompany && (
                    <div className="right-section--job right-section--item">
                      <img
                        className="right-section--item-img"
                        alt="Work"
                        src={Education}
                      />
                      {`${profileTitle} at `}
                      <strong>{profileCompany}</strong>
                    </div>
                  )}
                  {profileCity && profileCity.length > 0 && (
                    <div className="right-section--live right-section--item">
                      <img
                        className="right-section--item-img"
                        alt="Location"
                        src={Location}
                      />
                      Lives in{" "}
                      <strong>
                        {profileCity}, {profileState}
                      </strong>
                    </div>
                  )}
                  {profileData.followers && (
                    <div className="right-section--followers right-section--item">
                      <img
                        className="right-section--item-img"
                        alt="Followers"
                        src={Group}
                      />
                      Followed by{" "}
                      <strong>{`${profileData.followers} people`}</strong>
                    </div>
                  )}
                  {profileMail && (
                    <div className="right-section--email right-section--item">
                      <img
                        className="right-section--item-img"
                        alt="Email"
                        src={Mail}
                      />
                      <a href={"mailto:" + profileMail}>Email</a>
                    </div>
                  )}
                  {profileLinkedin && (
                    <div className="right-section--linkdin right-section--item">
                      <img
                        className="right-section--item-img"
                        alt="LinkedIn"
                        src={LinkedIn}
                      />
                      <a href={profileLinkedin}>Linkedin</a>
                    </div>
                  )}
                  {profileWebsite && profileWebsite.length > 0 && (
                    <div className="right-section--website right-section--item">
                      <img
                        className="right-section--item-img"
                        alt="Website"
                        src={Website}
                      />
                      <a href={profileWebsite}>Website</a>
                    </div>
                  )}
                  {profileNumFollowing && (
                    <div className="right-section--website right-section--item">
                      <img
                        className="right-section--item-img"
                        alt="Follows"
                        src={Follows}
                      />
                      <a href="#" onClick={getProfileFollowing}>
                        {profileNumFollowing} Following
                      </a>
                    </div>
                  )}
                  {profileNumFollowers && (
                    <div className="right-section--website right-section--item">
                      <img
                        className="right-section--item-img"
                        alt="Follows"
                        src={Follows}
                      />
                      <a href="#" onClick={getProfileFollowers}>
                        {Util.plural(
                          profileNumFollowers,
                          "Follower",
                          "Followers"
                        )}
                      </a>
                    </div>
                  )}
                </div>
              </CustomCard>
            </Col>
          </Row>
          {Object.keys(profileAbout).length > 0 && (
            <CustomCard heading="About" className="profile-about">
              {profileAbout.description && profileAbout.description.length > 0 && (
                <Row>
                  <Col md="12">
                    <div className="profile-about--content">
                      <ShowMoreText
                        keepNewLines={true}
                        lines={3}
                        more="See more"
                        less="See less"
                        width={0}
                      >
                        {profileAbout.description}
                      </ShowMoreText>
                    </div>
                  </Col>
                </Row>
              )}
              {(profileCompanyIndustry.length > 0 ||
                profileCompanyStage.length > 0) && (
                <Row className="profile-about--experience">
                  {profileCompanyIndustry && (
                    <Col md="6">
                      <Form.Label className="profile-about--experience-title">
                        Company Industry
                      </Form.Label>
                      <div>
                        <span>
                          {
                            companyIndustryOptions.find(
                              (o) => o.slug === profileCompanyIndustry
                            )?.description
                          }
                        </span>
                      </div>
                    </Col>
                  )}
                  {profileCompanyStage && (
                    <Col md="6">
                      <Form.Label className="profile-about--experience-title">
                        Company Stage
                      </Form.Label>
                      <div>
                        <span>
                          {
                            companyStageOptions.find(
                              (o) => o.slug === profileCompanyStage
                            )?.description
                          }
                        </span>
                      </div>
                    </Col>
                  )}
                </Row>
              )}
              <Row className="profile-about--experience">
                {profileAbout.areasOfExpertise && (
                  <Col md="6">
                    <Form.Label className="profile-about--experience-title">
                      Marketing expertise
                    </Form.Label>
                    <div>
                      {profileAbout.areasOfExpertise &&
                      profileAbout.areasOfExpertise.length > 0 ? (
                        <RenderList arr={profileAbout.areasOfExpertise} />
                      ) : (
                        <span>None shared</span>
                      )}
                    </div>
                  </Col>
                )}
                {profileAbout.areasOfInterest && (
                  <Col md="6">
                    <Form.Label className="profile-about--experience-title">
                      Marketing interests
                    </Form.Label>
                    <div>
                      {profileAbout.areasOfInterest &&
                      profileAbout.areasOfInterest.length > 0 ? (
                        <RenderList arr={profileAbout.areasOfInterest} />
                      ) : (
                        <span>None shared</span>
                      )}
                    </div>
                  </Col>
                )}
              </Row>
              <Row className="profile-about--open">
                <Col md="6">
                  <Form.Label className="profile-about--open-title">
                    Open to networking
                  </Form.Label>
                  <div>
                    <span className="profile-about--open-content">
                      {profileAbout.networking ? "Yes" : "No"}
                    </span>
                  </div>
                </Col>
                <Col md="6">
                  <Form.Label className="profile-about--open-title">
                    Open to advising
                  </Form.Label>
                  <div>
                    <span className="profile-about--open-content">
                      {profileAbout.advising ? "Yes" : "No"}
                    </span>
                  </div>
                </Col>
              </Row>
            </CustomCard>
          )}
          <div className="vendor-profile-filter-and-addvendor">
            {profileFirstName && (
              <Filter
                className="profile--filters"
                filterIdx={filterIdx}
                filters={filters}
                onChange={(idx) => setFilterId(idx)}
              ></Filter>
            )}
            {isMyProfile &&
              (filterTitle === "My Expertise" ? (
                <div className="filter-btn-group flex-grow-1 text-right mb-3 pb-0 max-content">
                  <AddVendorButton />
                </div>
              ) : (
                <div className="filter-btn-group flex-grow-1 text-right mb-3 pb-0 max-content">
                  <AddVendorButton isVendor={true} />
                </div>
              ))}
          </div>
        </Container>

        {props.profile.loading ? (
          <div className="mt-3 mb-5">
            <ActivityIndicator className="element-center feed-activity-indicator" />
          </div>
        ) : (
          <>
            {profileFirstName &&
              hasDataOnCurrentFeed &&
              (showCategoryListView ? (
                <div
                  className={clsx(
                    feedBlockerText &&
                      "add-vendor-blocker-wrapper profile-page-blocker-wrapper"
                  )}
                >
                  {feedBlockerText && (
                    <BlockerText blockerText={feedBlockerText}>
                      <AddVendorButton isVendor={feedBlockerAddVendor} />
                    </BlockerText>
                  )}
                  {filteredFeedData.map((feed, idx) => {
                    return (
                      <>
                        <div key={idx} className="mb-4">
                          <VendorsDetail
                            className={"profile--vendors--feed--wrapper"}
                            vendorsDetail={feed}
                            mobileMenuOpen={mobileMenuOpen}
                            loadingVendors={false}
                            getCategoryTitle={(title) => {
                              setCategoryTitle(title);
                              setShowAddVendor((value) => !value);
                            }}
                            setLimit={(val) => setLimit(val)}
                            allowBackButton={true}
                            showCategoryListView={true}
                            isMyProfile={isMyProfile}
                            showDeletePostModal={showDeletePostModal}
                          />
                          {idx < filteredFeedData.length - 1 && (
                            <div className="vendor-detail-divider"></div>
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              ) : (
                <Container>
                  <Row
                    className={clsx("profile--feed", mobileMenuOpen && "open")}
                  >
                    <Col xl="4" className="profile--popular-topics">
                      {topicList && topicList.length > 0 && (
                        <PopularTopics
                          heading={"Popular #topics and Spaces"}
                          topicList={topicList}
                          onSubfilterChange={onSubfilterChange}
                        />
                      )}
                    </Col>
                    <Col xl={topicList.length > 0 ? "8" : "12"} md="12">
                      {props.loading ? (
                        <div className="mt-3 mb-5">
                          <ActivityIndicator className="element-center feed-activity-indicator" />
                        </div>
                      ) : (
                        <div
                          className={clsx(
                            feedBlockerText && "add-vendor-blocker-wrapper"
                          )}
                        >
                          {feedBlockerText && (
                            <BlockerText blockerText={feedBlockerText}>
                              <AddVendorButton
                                isVendor={feedBlockerAddVendor}
                              />
                            </BlockerText>
                          )}
                          <TransitionGroup
                            enter={enableAnimations}
                            exit={enableAnimations}
                          >
                            {filteredFeedData.map((feed, idx) => {
                              return (
                                <FadeTransition key={idx}>
                                  <Article
                                    key={idx}
                                    className={clsx(
                                      "profile--article-item",
                                      idx !== 0 && "mt-1",
                                      isMyProfile && "isMyProfile"
                                    )}
                                    {...feed.content}
                                    badge={<XBadge feed={feed} />}
                                    engagementButtons={
                                      feed.content_id && [
                                        {
                                          checked: true,
                                          text: feed.replyText || "Reply",
                                          type: "Answer",
                                          icon: AnswerIcon,
                                          number:
                                            feed.comments &&
                                            feed.comments.length > 0
                                              ? feed.comments.length
                                              : null,
                                        },
                                        {
                                          checked: getCheckedForEngagementType(
                                            feed.content_id,
                                            "thanks",
                                            reactions
                                          ),
                                          text: "Like",
                                          type: "Reaction",
                                          icon: ThanksIcon,
                                          iconChecked: ThanksCheckedIcon,
                                          number: getEngagementForId(
                                            feed.content_id,
                                            "thanks",
                                            reactions
                                          ),
                                        },
                                        {
                                          checked: getCheckedForEngagementType(
                                            feed.content_id,
                                            "insightful",
                                            reactions
                                          ),
                                          text: "Insightful",
                                          type: "Reaction",
                                          icon: InsightfulIcon,
                                          iconChecked: InsightfulCheckedIcon,
                                          number: getEngagementForId(
                                            feed.content_id,
                                            "insightful",
                                            reactions
                                          ),
                                        },
                                      ]
                                    }
                                    focusComment={true}
                                    onEngagementButtonClick={handleEngagementButtonClick.bind(
                                      this,
                                      feed
                                    )}
                                  >
                                    {feed.parent_content && (
                                      <Article {...feed.parent_content} />
                                    )}
                                    {feed.entities?.length > 0 && (
                                      <Entities entities={feed.entities} />
                                    )}
                                  </Article>
                                </FadeTransition>
                              );
                            })}
                          </TransitionGroup>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Container>
              ))}
            {profileFirstName && !hasDataOnCurrentFeed && (
              <div
                className={clsx(
                  "wrapper article-wrapper no-feed-data-header",
                  mobileMenuOpen && "open"
                )}
              >
                <div>{profileFirstName} hasn't shared anything here yet</div>
              </div>
            )}
          </>
        )}

        <DeletePost
          show={showDeletePost}
          closeModal={closeDeletePostModal}
          deletePost={props.deletePost}
          slug={postSlug}
        />
        <FollowUserModal
          show={showFollowModal}
          firstname={profileFirstName}
          username={profileUserName}
          toggle={toggleFollowModal}
          followUser={connectUser}
        />
        <Footer className={clsx("profile--footer", mobileMenuOpen && "open")} />
      </div>
      <AddVendorsModal
        show={showAddVendor}
        handleClose={toggleAddVendorModal}
        categoryTitle={categoryTitle}
        limit={limit}
      />
      <AddSkillsModal show={showAddSkill} handleClose={toggleAddSkillModal} />
      <AllMembersListModal
        showStatModal={showMemberModal}
        onHide={handleCloseMemberModal}
        statType={statType}
        list={followingList}
      />
    </Layout>
  );
};

const mapState = (state) => {
  return {
    profile: state.profileModel.profile,
    reactions: state.reactionModel.reactions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    changeReaction: dispatch.reactionModel.changeReaction,
    connectUser: dispatch.userModel.connectUser,
    deletePost: dispatch.profileModel.deletePost,
    disconnectUser: dispatch.userModel.disconnectUser,
    fetchProfile: dispatch.profileModel.fetchProfile,
    saveProfile: dispatch.profileModel.saveProfile,
    fetchProfileFollowing: dispatch.profileModel.fetchProfileFollowing,
    fetchProfileFollowers: dispatch.profileModel.fetchProfileFollowers,
  };
};

export default connect(mapState, mapDispatch)(Profile);
