import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { Alert, Col, Row, Container } from "react-bootstrap";
import clsx from "clsx";
import Layout from "../base/Layout/Layout";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import SimpleTopBanner from "../base/SimpleTopBanner/SimpleTopBanner";
import AddMemberModal from "../base/AddMemberModal/AddMemberModal";
import FollowUserModal from "../Profile/FollowUser"; // VAS move this
import NetworkFeed from "./NetworkFeed";
import MyNetwork from "../Feed/MyNetwork";
import Analytics from "../../util/Analytics";
import { cdn } from "../../util/constants";
import "./network.scss";
import InviteCard from "./Invite";

const Network = (props) => {
  const location = useLocation();
  const fetchData = async () => await props.fetchActiveNetwork();
  const [filterIdx, setFilterIdx] = useState(0);
  const [filters, setFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isAffiliated, setIsAffiliated] = useState(false);
  const [groupName, setGroupName] = useState("");
  const feedData = props.feedData;
  const changeDashboardHeader = (idx) => {
    if (idx < filters.length) {
      setBannerTitle(filters[idx].title);
      setBannerImage(filters[idx].image);
    }
  };
  const initNetworkpage = (profileStats) => {
    let newFilters = [
      { title: "Suggested", slug: "suggested", enabled: true, highlight: true },
      { title: "All", slug: "my-network", enabled: true },
      { title: "My Experts", slug: "my-peers", enabled: true },
    ];
    if (profileStats && profileStats.profile) {
      if (profileStats.profile.isAdminUser) {
        setIsAdminUser(true);
      }

      if (
        profileStats.profile.groups &&
        profileStats.profile.groups.length > 0
      ) {
        setIsAffiliated(true);
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
      } else {
        newFilters = [
          {
            title: "Suggested",
            slug: "suggested",
            enabled: true,
            highlight: true,
          },
          { title: "My Network", slug: "my-network", enabled: true },
        ];
      }
    }
    let idx = 0;
    if (location && location.hash) {
      let networkSlug = location.hash;
      if (location.hash.indexOf("#") === 0) {
        networkSlug = location.hash.substring(1);
      }
      if (networkSlug.length > 0) {
        let existingFilterIndex = newFilters.findIndex(
          (nf) => nf.slug === networkSlug
        );
        if (existingFilterIndex >= 0) {
          idx = existingFilterIndex;
          setGroupName(newFilters[idx].title);
        } else {
          newFilters = newFilters.concat({
            title: networkSlug,
            slug: networkSlug,
            image: `${cdn}/directory.png` || null,
            enabled: true,
          });
          idx = newFilters.length - 1;
          setShowFilters(false);
        }
      }
    }
    setFilters(newFilters);
    setBannerTitle(newFilters[idx].title);
    setBannerImage(newFilters[idx].image);
    setFilterIdx(idx);
    props.changeFilter(newFilters[idx].slug);
    changeDashboardHeader(idx);
  };
  useEffect(() => {
    if (Object.keys(props.profileStats).length === 0) {
      const getProfileStats = async () => props.getProfileStats();
      getProfileStats().then((profileStats) => {
        initNetworkpage(profileStats);
      });
    } else {
      initNetworkpage(props.profileStats);
    }
  }, []);

  const changeFilter = (idx) => {
    setFilterIdx(idx);
    props.changeFilter(filters[idx].slug);
    changeDashboardHeader(idx);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [connectName, setConnectName] = useState("");
  const [connectUsername, setConnectUsername] = useState("");
  const handleInviteModalClick = () => setShowInviteModal(true);
  const handleInviteModalClose = () => setShowInviteModal(false);

  const connectUser = async (payload) => {
    let userName = payload.user;
    Analytics.sendClickEvent(`Followed user ${userName} from network page`);
    try {
      await props.connectUser(payload);
      props.invalidateFeed();
    } catch (err) {
      console.log(`An error occurred connecting with user: ${userName}`);
      console.log(err);
    }
  };

  const disconnectUser = async (payload) => {
    let userName = payload.username;
    Analytics.sendClickEvent(`Unfollowed user ${userName} from network page`);
    try {
      payload.isConnected = false;
      await props.disconnectUser({ user: userName });
      props.invalidateFeed();
    } catch (err) {
      console.log(`An error occurred disconnecting with user: ${userName}`);
      console.log(err);
    }
  };

  const toggleFollowModal = () => {
    setShowFollowModal((value) => !value);
  };

  const onConnectClick = (payload) => {
    connectUser({
      user: payload.username,
      data: [],
    });
  };

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Layout onToggle={handleToggle}>
      <Container>
        <div className="wrapper">
          <Row
            className={clsx(
              "network--simple-top-banner-wrapper",
              mobileMenuOpen && "open"
            )}
          >
            <Col className="network--simple-top-banner" md="8" sm="12">
              <SimpleTopBanner
                // disable for now... buttonText="Invite"
                onClick={handleInviteModalClick}
                title={bannerTitle}
                subtitle={"Members"}
                image={bannerImage}
              />
            </Col>
            <Col className="network--share-content" md="4">
              <div className="mt-3">
                <MyNetwork
                  saveContent={props.saveContent}
                  isAdminUser={isAdminUser}
                  activeGroup={
                    filterIdx < filters.length ? filters[filterIdx].slug : null
                  }
                />
              </div>
            </Col>
          </Row>
          <AddMemberModal
            firstButtonText="Cancel"
            secondButtonText="Send invitation"
            modalTitle="Invite a marketing leader to join you CMOlist peer network"
            modalSubtitle={
              <div>
                Build your <strong>trusted peer network</strong> by inviting and
                connecting only with marketing peers that{" "}
                <strong>you know</strong> and whose{" "}
                <strong>advice you trust</strong>
              </div>
            }
            onClose={handleInviteModalClose}
            onSubmit={props.inviteNewMember}
            show={showInviteModal}
          />
          <FollowUserModal
            show={showFollowModal}
            firstname={connectName}
            username={connectUsername}
            toggle={toggleFollowModal}
            followUser={connectUser}
          />
          {showFilters && (
            <div
              className={clsx(
                "network--filter-wrapper",
                mobileMenuOpen && "open"
              )}
            >
              <Filter
                className="mt-1 network--filter"
                filterIdx={filterIdx}
                filters={filters}
                onChange={(idx) => changeFilter(idx)}
              />
            </div>
          )}
          {isAffiliated && groupName && groupName.length > 0 && (
            <div className="follow-members">
              <Alert variant="info">
                <span role="img" aria-label="Light bulb">
                  ????
                </span>
                {"   "}Use the <b>invite</b> button to invite other {groupName}{" "}
                colleagues
              </Alert>
            </div>
          )}
          <Row>
            {props.activeFeedSubFilters &&
              props.activeFeedSubFilters.length > 0 && (
                <Col className="network--popular-topics" md="4">
                  <PopularTopics
                    heading={"Expertise"}
                    onSubfilterChange={(f) => {
                      props.changeSubFilter(f.slug || f.title);
                    }}
                    topicList={props.activeFeedSubFilters}
                  />
                </Col>
              )}
            <Col
              className={clsx("network--feed", mobileMenuOpen && "open")}
              md={
                props.activeFeedSubFilters &&
                props.activeFeedSubFilters.length > 0
                  ? "8"
                  : "12"
              }
            >
              {props.loadingNetwork ? (
                <div className="mt-3 mb-5">
                  <ActivityIndicator className="element-center feed-activity-indicator" />
                </div>
              ) : (
                <NetworkFeed
                  {...props}
                  connectUser={onConnectClick}
                  disconnectUser={disconnectUser}
                  localConnectedUsers={props.localConnectedUsers}
                  fetchData={fetchData}
                  feedData={feedData}
                />
              )}
            </Col>
          </Row>

          <Footer
            className={clsx("network--footer", mobileMenuOpen && "open")}
          />
        </div>
      </Container>
    </Layout>
  );
};

const mapState = (state) => {
  return {
    activeFilter: state.networkModel.activeFilter,
    activeSubFilter: state.networkModel.activeSubFilter,
    activeFeedSubFilters: state.networkModel.activeFeedSubFilters,
    feedData: state.networkModel.activeFeed,
    moreData: state.networkModel.activeFeedHasMoreData,
    localConnectedUsers: state.userModel.localConnectedUsers,
    loadingNetwork: state.networkModel.loadingNetwork,
    profileStats: state.profileModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchActiveNetwork: dispatch.networkModel.fetchActiveNetwork,
    changeFilter: dispatch.networkModel.changeFilter,
    changeSortOrder: dispatch.networkModel.changeSortOrder,
    changeSubFilter: dispatch.networkModel.changeSubFilter,
    invalidateFeed: dispatch.networkModel.invalidateFeed,
    inviteNewMember: dispatch.networkModel.inviteNewMember,
    saveUserInvite: dispatch.userModel.saveInvite,
    connectUser: dispatch.userModel.connectUser,
    disconnectUser: dispatch.userModel.disconnectUser,
    getProfileStats: dispatch.profileModel.getProfileStats,
    saveContent: dispatch.contentModel.saveContent,
  };
};

export default connect(mapState, mapDispatch)(Network);
