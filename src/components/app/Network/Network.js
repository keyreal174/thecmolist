import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import SimpleTopBanner from "../base/SimpleTopBanner/SimpleTopBanner";
import AddMemberModal from "../base/AddMemberModal/AddMemberModal";
import FollowUserModal from "../Profile/FollowUser"; // VAS move this
import NetworkFeed from "./NetworkFeed";
import Analytics from "../../util/Analytics";
import { cdn } from "../../util/constants";
import "./network.scss";

const Network = (props) => {
  const location = useLocation();
  const fetchData = async () => await props.fetchActiveNetwork();
  const [filterIdx, setFilterIdx] = useState(0);
  const [filters, setFilters] = useState([]);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const feedData = props.feedData;
  const changeDashboardHeader = (idx) => {
    if (idx < filters.length) {
      setBannerTitle(filters[idx].title);
      setBannerImage(filters[idx].image);
    }
  };
  useEffect(() => {
    const getProfileStats = async () => props.getProfileStats();
    getProfileStats().then((profileStats) => {
      let newFilters = [
        { title: "All", slug: "my-network", enabled: true },
        { title: "My Peers", slug: "my-peers", enabled: true },
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
          } else {
            newFilters = newFilters.concat({
              title: networkSlug,
              slug: networkSlug,
              image: `${cdn}/directory.png` || null,
              enabled: true,
            });
            idx = newFilters.length - 1;
          }
        }
      }
      setFilters(newFilters);
      setBannerTitle(newFilters[idx].title);
      setBannerImage(newFilters[idx].image);
      setFilterIdx(idx);
      props.changeFilter(newFilters[idx].slug);
      changeDashboardHeader(idx);
    });
  }, []);

  const changeFilter = (idx) => {
    setFilterIdx(idx);
    props.changeFilter(filters[idx].slug);
    changeDashboardHeader(idx);
  };

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [connectName, setConnectName] = useState("");
  const [connectUsername, setConnectUsername] = useState("");
  const handleInviteModalClick = () => setShowInviteModal(true);
  const handleInviteModalClose = () => setShowInviteModal(false);

  const connectUser = async (payload) => {
    let userName = payload.user;
    Analytics.sendClickEvent(`Followed user ${userName} from profile page`);
    try {
      await props.connectUser(payload);
      props.invalidateFeed();
    } catch (err) {
      console.log(`An error occurred connecting with user: ${userName}`);
      console.log(err);
    }
  };

  const toggleFollowModal = () => {
    setShowFollowModal((value) => !value);
  };

  const onConnectClick = (payload) => {
    setConnectName(payload.firstname || payload.username);
    setConnectUsername(payload.username);
    toggleFollowModal();
  };

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <SimpleTopBanner
            buttonText="Invite"
            onClick={handleInviteModalClick}
            title={bannerTitle}
            image={bannerImage}
          />
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
          <div className="mb-4">
            <Filter
              className="mt-1 network--filter"
              filterIdx={filterIdx}
              filters={filters}
              onChange={(idx) => changeFilter(idx)}
            />
          </div>
          <Row>
            {props.activeFeedSubFilters &&
              props.activeFeedSubFilters.length > 0 && (
                <Col md="4">
                  <PopularTopics
                    onSubfilterChange={(f) => {
                      props.changeSubFilter(f.slug || f.title);
                    }}
                    topicList={props.activeFeedSubFilters}
                  />
                </Col>
              )}
            <Col
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
                  fetchData={fetchData}
                  feedData={feedData}
                />
              )}
            </Col>
          </Row>

          <Footer />
        </div>
      </Container>
    </>
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
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(Network);
