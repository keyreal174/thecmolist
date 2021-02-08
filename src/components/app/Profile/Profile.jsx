import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import Header from "../base/Header/Header";
import Banner from "../base/Banner/Banner";
import Filter from "../base/Filter/Filter";
import Article from "../base/Article/Article";
import Footer from "../base/Footer/Footer";
import DeletePost from "./DeletePost";
import FollowUserModal from "./FollowUser";
import Util from "../../util/Util";
import Analytics from "../../util/Analytics";
import "./profile.css";

import LinkedIn from "./icons/linkedin.svg";
import Website from "./icons/link.svg";
import Chat from "./icons/mail.svg";

const RenderList = ({ arr }) => {
  return arr.map((item, index) => (
    <React.Fragment key={index}>
      <a href="#">{item}</a>
      {index < arr.length - 1 && <span> </span>}
    </React.Fragment>
  ));
};

const Profile = (props) => {
  const history = useHistory();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [profileUserName, setProfileUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [profileCompany, setProfileCompany] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileState, setProfileState] = useState("");
  const [profileCountry, setProfileCountry] = useState("");
  const [profileHeadline, setProfileHeadline] = useState("");
  const [profileLinkedin, setProfileLinkedin] = useState("");
  const [profileWebsite, setProfileWebsite] = useState("");
  const [profileMail, setProfileMail] = useState("");
  const [profileAbout, setProfileAbout] = useState([]);
  const [feedData, setFeedData] = useState([]);
  const [connectedUser, setConnectedUser] = useState(false);
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

  const [showDeletePost, setShowDeletePost] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  let isVerified = true;

  useEffect(() => {
    document.title = "Profile";
    props.fetchProfile(Util.parsePath(window.location.href).trailingPath);
  }, []);

  useEffect(() => {
    if (props.profile && Object.keys(props.profile).length > 0) {
      setIsMyProfile(props.profile.isMyProfile || "");
      setProfileFirstName(props.profile.firstName || "");
      setProfileLastName(props.profile.lastName || "");
      setProfileUserName(props.profile.userName || "");
      setProfileImage(props.profile.image || "");
      setProfileTitle(props.profile.title || "");
      setProfileCompany(props.profile.company || "");
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
      props.profile.feedData && createSubfilters(props.profile.feedData);
    }
  }, [props.profile]);

  const createSubfilters = (feedDa) => {
    let newFeedData = feedDa.slice();
    newFeedData.forEach((feed) => {
      feed.subfilters = {};
      let feed_data = feed.data;
      feed_data.forEach((data) => {
        data.subheadlines &&
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
    prevFeedData[filterIdx].subfilter = key === prevFeedFilter ? "" : key;
    setFeedData(prevFeedData);
  };

  const connectUser = async () => {
    let userName = Util.parsePath(window.location.href).trailingPath;
    Analytics.sendClickEvent(
      `Connected with user ${userName} from profile page`
    );
    try {
      await props.connectUser({ username: userName });
      setEnableAnimations(false);
      setConnectedUser(true);
    } catch (err) {
      console.log(`An error occurred connecting with user: ${userName}`);
      console.log(err);
    }
  };

  const followUser = async (payload) => {
    let userName = Util.parsePath(window.location.href).trailingPath;
    Analytics.sendClickEvent(`Followed user ${userName} from profile page`);
    try {
      await props.followUser(payload);
      setEnableAnimations(false);
      setFollowedUser(true);
    } catch (err) {
      console.log(`An error occurred connecting with user: ${userName}`);
      console.log(err);
    }
  };

  const toggleFollowModal = () => {
    setShowFollowModal((value) => !value);
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
        let subfilterKeys = Object.keys(subfilters);
        setSubfilterKeys(subfilterKeys);
        let feedFilter = currentFeed.subfilter || "";
        setFeedFilter(feedFilter);
        if (feedFilter.length > 0) {
          feed_data = feed_data.filter((data) => {
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
      setHasDataOnCurrentFeed(
        currentFeed && currentFeed.data && currentFeed.data.length > 0
      );
      setFilteredFeedData(feed_data);
    }
  }, [feedData]);

  return (
    <>
      <Container className="height-100">
        <Header />
        <div className="wrapper">
          <Banner className="profile-banner" n>
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
                  {isVerified && (
                    <img
                      alt="verified"
                      className="profile-check"
                      src="https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg"
                    />
                  )}
                </h2>
                <div className="overview-subheadline">
                  {profileTitle} at {profileCompany}
                </div>
                <p className="overview-desc">
                  {profileCity}, {profileState}
                </p>
                <div className="overview-link-buttons">
                  {profileLinkedin.length > 0 && (
                    <span className="overview-link-button">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={profileLinkedin}
                      >
                        <img
                          className="overview-link-img"
                          src={LinkedIn}
                          alt=""
                        />
                      </a>
                    </span>
                  )}
                  {profileWebsite.length > 0 && (
                    <span className="overview-link-button">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={profileWebsite}
                      >
                        <img
                          className="overview-link-img"
                          src={Website}
                          alt=""
                        />
                      </a>
                    </span>
                  )}
                  {profileMail.length > 0 && (
                    <span className="overview-link-button">
                      <a href={profileMail}>
                        <img className="overview-link-img" src={Chat} alt="" />
                      </a>
                    </span>
                  )}
                </div>
              </div>
            )}
            {isMyProfile ? (
              <div className="btn-wrapper">
                <Button
                  className="btn-white edit-profile"
                  variant="outline-primary"
                  onClick={() => history.push("/profile/edit")}
                >
                  Edit Profile
                </Button>
              </div>
            ) : (
              <React.Fragment>
                {profileFirstName && (
                  <div className="btn-wrapper d-flex flex-column">
                    {!connectedUser ? (
                      <Button
                        className="btn-white edit-profile mb-2"
                        variant="outline-primary"
                        onClick={() => {
                          connectUser();
                        }}
                      >
                        + Connect
                      </Button>
                    ) : (
                      <span className="profile-connected-label mb-2">
                        Connected
                      </span>
                    )}
                    {!followedUser ? (
                      <Button
                        className="btn-white edit-profile"
                        variant="outline-primary"
                        onClick={() => toggleFollowModal()}
                      >
                        + Follow
                      </Button>
                    ) : (
                      <span className="profile-connected-label mb-2">
                        Followed
                      </span>
                    )}
                  </div>
                )}
              </React.Fragment>
            )}
          </Banner>

          {Object.keys(profileAbout).length > 0 && (
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
                    {profileAbout.description}
                  </ShowMoreText>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Label>Marketing expertise</Form.Label>
                  <div>
                    <RenderList arr={profileAbout.areasOfExpertise} />
                  </div>
                </Col>
                <Col md="6">
                  <Form.Label>Marketing interests</Form.Label>
                  <div>
                    <RenderList arr={profileAbout.areasOfInterest} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Label>Open to networking</Form.Label>
                  <div>
                    <span>{profileAbout.networking ? "Yes" : "No"}</span>
                  </div>
                </Col>
                <Col md="6">
                  <Form.Label>Open to advising</Form.Label>
                  <div>
                    <span>{profileAbout.advising ? "Yes" : "No"}</span>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          {profileFirstName && (
            <Filter
              filterIdx={filterIdx}
              filters={filters}
              onChange={(idx) => setFilterId(idx)}
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

        <TransitionGroup enter={enableAnimations} exit={enableAnimations}>
          {filteredFeedData.map((feed, idx) => {
            let badge = null;
            if (isMyProfile) {
              badge = (
                <span
                  className="cursor-pointer noselect"
                  onClick={() => showDeletePostModal(feed)}
                >
                  ✖️
                </span>
              );
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
        {profileFirstName && !hasDataOnCurrentFeed && (
          <div className="wrapper article-wrapper">
            <div className="no-feed-data-header">
              {profileFirstName} hasn't shared anything in{" "}
              {filters[filterIdx] ? filters[filterIdx].title : "this category"}{" "}
              yet
            </div>
          </div>
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
          followUser={followUser}
        />
        <Footer />
      </Container>
    </>
  );
};

const mapState = (state) => {
  return {
    profile: state.profileModel.profile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProfile: dispatch.profileModel.fetchProfile,
    saveProfile: dispatch.profileModel.saveProfile,
    deletePost: dispatch.profileModel.deletePost,
    connectUser: dispatch.userModel.connectUser,
    followUser: dispatch.userModel.followUser,
  };
};

export default connect(mapState, mapDispatch)(Profile);
