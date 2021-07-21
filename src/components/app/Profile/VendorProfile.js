import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import CustomCard from "../base/CustomCard/CustomCard";
import clsx from "clsx";
import Layout from "../base/Layout/Layout";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import Entities from "../base/Entities/Entities";
import Footer from "../base/Footer/Footer";
import Badge from "../base/Badge/Badge";
import Analytics from "../../util/Analytics";
import Util from "../../util/Util";
import { vendorProfileHeader } from "../../util/constants";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";
import "./profile.scss";

import LinkedIn from "./icons/linkedin.svg";
import Twitter from "./icons/twitter.svg";
import Website from "./icons/link.svg";
import Mail from "./icons/mail.svg";
import More from "./icons/more.svg";
import Location from "./icons/location.svg";
import AnswerIcon from "../base/icons/answer.svg";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import PassIcon from "../base/icons/pass.svg";
import PassCheckedIcon from "../base/icons/pass_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";
import PopularTopics from "../base/PopularTopics/PopularTopics";

const RenderList = ({ arr }) => {
  return arr.map((item, index) => (
    <React.Fragment key={index}>
      <a href={`/topic/${item.slug}`}>
        {item.name}
        {index < arr.length - 1 && ","}
      </a>
      {index < arr.length - 1 && <span> </span>}
    </React.Fragment>
  ));
};

const ProfileAbout = ({ description, areasOfExpertise }) => {
  return (
    ((description && description.length > 0) ||
      (areasOfExpertise && areasOfExpertise.length > 0)) && (
      <CustomCard heading="About" className="profile-about mt-2">
        {description && (
          <Row>
            <Col md="12">
              <div className="profile-about--content">
                <ShowMoreText
                  keepNewLines={true}
                  lines={2}
                  more="See more"
                  less="See less"
                  width={0}
                >
                  {description}
                </ShowMoreText>
              </div>
            </Col>
          </Row>
        )}
        {areasOfExpertise && areasOfExpertise.length > 0 && (
          <Row className="profile-about--experience">
            <Col md="6">
              <Form.Label className="profile-about--experience-title">
                Marketing expertise
              </Form.Label>
              <div>
                <RenderList arr={areasOfExpertise} />
              </div>
            </Col>
          </Row>
        )}
      </CustomCard>
    )
  );
};

const ProfileIntro = ({
  profileCity,
  profileState,
  profileMail,
  profileLinkedin,
  profileTwitter,
  profileWebsite,
  profileIndustry,
}) => {
  return (
    <Col xl="4" md="12" sm="12">
      <CustomCard heading="Intro" className="profile--right-section">
        <div className="right-section--details">
          {profileCity && (
            <div className="right-section--live right-section--item">
              <img
                className="right-section--item-img"
                alt="location"
                src={Location}
              />
              Location{" "}
              <strong>
                {profileCity}
                {`${
                  profileState && profileState.length > 0
                    ? ", " + profileState
                    : ""
                }`}
              </strong>
            </div>
          )}
          {profileMail && (
            <div className="right-section--email right-section--item">
              <img className="right-section--item-img" alt="mail" src={Mail} />
              Email <strong>{profileMail.replace("mailto:", "")}</strong>
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
          {profileTwitter && (
            <div className="right-section--twitter right-section--item">
              <img
                className="right-section--item-img"
                alt="twitter"
                src={Twitter}
              />
              <a href={profileTwitter}>Twitter</a>
            </div>
          )}
          {profileWebsite && (
            <div className="right-section--website right-section--item">
              <img
                className="right-section--item-img"
                alt="Company Website"
                src={Website}
              />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={
                  profileWebsite.startsWith("http")
                    ? profileWebsite
                    : "https://" + profileWebsite
                }
              >
                Website
              </a>
            </div>
          )}
          {profileIndustry && (
            <div className="right-section--live right-section--item">
              <img
                className="right-section--item-img"
                alt="location"
                src={Location}
              />
              Industry <strong>{profileIndustry}</strong>
            </div>
          )}
        </div>
      </CustomCard>
    </Col>
  );
};

const ProfileOverview = ({
  profileBackgroundUrl,
  profileImage,
  profileName,
  profileWebsite,
  profileTitle,
  profileCompany,
}) => {
  const history = useHistory();
  return (
    <Col xl="8" md="12" sm="12">
      <div className={clsx("profile--left-section")}>
        <img
          src={profileBackgroundUrl}
          className="left-section--image"
          alt="profile"
        />
        {profileImage && (
          <div className="logo-wrapper">
            <img src={profileImage} alt="" />
          </div>
        )}

        {profileName && (
          <div className="overview-summary">
            <h2 className="overview-header mb-1">
              {profileName}&nbsp;
              {profileWebsite.length > 0 && (
                <span className="overview-link-button">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      profileWebsite.startsWith("http")
                        ? profileWebsite
                        : "https://" + profileWebsite
                    }
                  ></a>
                </span>
              )}
            </h2>
            <div className="overview-subheadline">
              {profileTitle &&
                (profileTitle === "Company"
                  ? "Agency"
                  : profileTitle === "Product"
                  ? "Tool"
                  : "Contractor")}
            </div>
          </div>
        )}
        <React.Fragment>
          {profileName && (
            <div className="btn-wrapper d-flex">
              <Button
                className="btn-white edit-profile"
                variant="primary"
                onClick={() =>
                  history.push(
                    `/vendor_edit/${
                      Util.parsePath(window.location.href).trailingPath
                    }`
                  )
                }
              >
                Edit
              </Button>
              <Button
                className="edit-profile edit-profile-more"
                variant="outline-secondary"
              >
                <img alt="More icon" src={More} />
              </Button>
            </div>
          )}
        </React.Fragment>
      </div>
    </Col>
  );
};

const VendorProfile = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileUserName, setProfileUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [profileCompany, setProfileCompany] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileState, setProfileState] = useState("");
  const [profileLinkedin, setProfileLinkedin] = useState("");
  const [profileTwitter, setProfileTwitter] = useState("");
  const [profileMail, setProfileMail] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [profileIndustry, setProfileIndustry] = useState("");
  const [profileAreasOfExpertise, setProfileAreasOfExpertise] = useState([]);

  const [profileWebsite, setProfileWebsite] = useState("");
  const [feedData, setFeedData] = useState([]);
  const [followedUser, setFollowedUser] = useState(false);

  const [filterIdx, setFilterIdx] = useState(0);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [postSlug, setPostSlug] = useState("");
  const [filters, setFilters] = useState([]);
  const [feedFilter, setFeedFilter] = useState("");
  const [subfilterKeys, setSubfilterKeys] = useState([]);
  const [subfilters, setSubfilters] = useState({});
  const [filteredFeedData, setFilteredFeedData] = useState([]);
  const [hasDataOnCurrentFeed, setHasDataOnCurrentFeed] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = "Profile";
    props.fetchVendor(Util.parsePath(window.location.href).trailingPath);
  }, []);

  useEffect(() => {
    if (props.profile && Object.keys(props.profile).length > 0) {
      setProfileName(props.profile.name || "");
      setProfileUserName(props.profile.userName || "");
      setProfileImage(props.profile.image || "");
      setProfileTitle(props.profile.title || "");
      setProfileCompany(props.profile.company || "");
      setProfileCity(props.profile.city || "");
      setProfileState(props.profile.state || "");
      setProfileLinkedin(props.profile.linkedin || "");
      setProfileTwitter(props.profile.twitter || "");
      setProfileWebsite(props.profile.website || "");
      setProfileMail(props.profile.mail || "");
      setProfileDescription(props.profile.description || "");
      setProfileIndustry(props.profile.industry || "");
      setProfileAreasOfExpertise(props.profile.areasOfExpertise || []);
      setFeedData(props.profile.feedData || []);
      setFollowedUser(props.profile.followedUser);
      props.profile.feedData && createSubfilters(props.profile.feedData);
    }
  }, [props.profile]);

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
    setPostSlug(feed.slug);
  };

  const closeDeletePostModal = () => {
    setShowDeletePost(false);
  };

  const FadeTransition = (props) => (
    <CSSTransition {...props} classNames="profile-article-transition" />
  );

  const setFilterId = (idx) => {
    let prevFeedData = feedData.slice();
    prevFeedData[filterIdx].subfilter = "";
    setFeedData(prevFeedData);
    setFilterIdx(idx);
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
    let userName = payload.username;
    Analytics.sendClickEvent(
      `Followed user ${userName} from vendor profile page`
    );
    try {
      await props.connectUser({ user: userName });
    } catch (err) {
      console.log(`An error occurred connecting with user: ${userName}`);
      console.log(err);
    }
  };

  const disconnectUser = async (payload) => {
    let userName = payload.username;
    Analytics.sendClickEvent(
      `Unfollowed user ${userName} from vendor profile page`
    );
    try {
      payload.isConnected = false;
      await props.disconnectUser({ user: userName });
    } catch (err) {
      console.log(`An error occurred disconnecting with user: ${userName}`);
      console.log(err);
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
        setTopicsList(
          Object.keys(subfilters)
            .map((s) => ({
              title: s,
              count: subfilters[s],
            }))
            .sort((a, b) => b.count - a.count)
        );
        let feedFilter = currentFeed.subfilter || "";
        setFeedFilter(feedFilter);
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
  const reactions = props.reactions;
  const profileBackgroundUrl = vendorProfileHeader;

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Layout onToggle={handleToggle}>
      <Container className="height-100">
        <div className={clsx("wrapper", mobileMenuOpen && "open")}>
          <Row className="profile--wrapper">
            <ProfileOverview
              profileBackgroundUrl={profileBackgroundUrl}
              profileImage={profileImage}
              profileName={profileName}
              profileWebsite={profileWebsite}
              profileTitle={profileTitle}
              profileCompany={profileCompany}
              followedUser={followedUser}
            />
            <ProfileIntro
              profileCity={profileCity}
              profileState={profileState}
              profileMail={profileMail}
              profileLinkedin={profileLinkedin}
              profileTwitter={profileTwitter}
              profileWebsite={profileWebsite}
              profileIndustry={profileIndustry}
            />
          </Row>
          <ProfileAbout
            description={profileDescription}
            areasOfExpertise={profileAreasOfExpertise}
          />
          <div className="vendor-profile-filter-and-addvendor">
            {profileName && (
              <Filter
                className="profile--filters"
                filterIdx={filterIdx}
                filters={filters}
                onChange={(idx) => setFilterId(idx)}
              ></Filter>
            )}
          </div>
        </div>

        {profileName && hasDataOnCurrentFeed && (
          <Row className={clsx("profile--feed", mobileMenuOpen && "open")}>
            {topicsList.length > 0 && (
              <Col xl="4" className="profile--popular-topics">
                <PopularTopics
                  heading={"Popular #topics and Spaces"}
                  onSubfilterChange={onSubfilterChange}
                  topicList={topicsList}
                />
              </Col>
            )}
            <Col xl={topicsList.length > 0 ? "8" : "12"} md="12">
              <TransitionGroup enter={enableAnimations} exit={enableAnimations}>
                {filteredFeedData.map((feed, idx) => {
                  return (
                    <FadeTransition key={idx}>
                      <Article
                        key={idx}
                        className={clsx(
                          "profile--article-item",
                          idx !== 0 && "mt-1"
                        )}
                        {...feed.content}
                        engagementButtons={
                          feed.content_id && [
                            {
                              checked: true,
                              text: feed.replyText || "Reply",
                              type: "Answer",
                              icon: AnswerIcon,
                              number: getEngagementForId(
                                feed.content_id,
                                "answer",
                                reactions
                              ),
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
                        onEngagementButtonClick={handleEngagementButtonClick.bind(
                          this,
                          feed
                        )}
                        badge={
                          feed.content.username ? (
                            <Badge
                              localConnectedUsers={props.localConnectedUsers}
                              feed={feed.content}
                              connectUser={connectUser}
                              disconnectUser={disconnectUser}
                            />
                          ) : null
                        }
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
            </Col>
          </Row>
        )}
        {profileName && !hasDataOnCurrentFeed && (
          <div
            className={clsx(
              "wrapper article-wrapper no-feed-data-header",
              mobileMenuOpen && "open"
            )}
          >
            <div>{profileName} hasn't shared anything here yet</div>
          </div>
        )}
        <Footer className={clsx("profile--footer", mobileMenuOpen && "open")} />
      </Container>
    </Layout>
  );
};

const mapState = (state) => {
  return {
    profile: state.vendorModel.profile,
    reactions: state.reactionModel.reactions,
    localConnectedUsers: state.userModel.localConnectedUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchVendor: dispatch.vendorModel.fetchVendor,
    changeReaction: dispatch.reactionModel.changeReaction,
    connectUser: dispatch.userModel.connectUser,
    disconnectUser: dispatch.userModel.disconnectUser,
  };
};

export default connect(mapState, mapDispatch)(VendorProfile);
