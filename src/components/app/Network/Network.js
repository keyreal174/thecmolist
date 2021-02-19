import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Col, Form, Row } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Banner from "../base/Banner/Banner";
import Filter from "../base/Filter/Filter";
import InviteModal from "../base/ShareModule/InviteModal";
import Article from "../base/Article/Article";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import Analytics from "../../util/Analytics";
import "./network.css";

const Badge = ({ localConnectedUsers, feed, invalidateFeed, connectUser }) => {
  let badge = null;
  const isLocallyConnected = localConnectedUsers.includes(feed.username);
  const isConnected = feed.isConnected || isLocallyConnected;

  if (!feed.disableConnect) {
    badge = isConnected ? (
      <span className="connected-label">Connected</span>
    ) : (
      <button
        className="btn connect-button"
        type="button"
        onClick={() => {
          invalidateFeed();
          connectUser(feed);
        }}
      >
        Connect
      </button>
    );
  }

  return badge;
};
const Feed = ({
  feedData,
  moreData,
  localConnectedUsers,
  invalidateFeed,
  connectUser,
  fetchData,
}) => {
  return (
    <>
      <Row>
        <Col md="4">Popular Topics</Col>
        <Col md="8">
          {feedData &&
            feedData.map((feed, idx) => {
              return (
                <Article
                  key={idx}
                  className={idx !== 0 ? "mt-1" : ""}
                  {...feed}
                  badge={
                    <Badge
                      localConnectedUsers={localConnectedUsers}
                      feed={feed}
                      invalidateFeed={invalidateFeed}
                      connectUser={connectUser}
                    />
                  }
                />
              );
            })}
          {moreData && (
            <div className="row">
              <div className="col-md-2 mt-2 mx-auto">
                <button
                  className="btn btn__load-more"
                  type="button"
                  onClick={fetchData}
                >
                  Show more
                </button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

const Network = (props) => {
  const [sortOrder, setSortOrder] = useState("Top");
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const fetchData = async () => await props.fetchActiveNetwork();
  const formFilterChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    props.changeSortOrder(value);
  };
  const [filterIdx, setFilterIdx] = useState(0);
  const [filters, setFilters] = useState([]);
  useEffect(() => {
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
              enabled: true,
            };
          })
        );
      }
      setFilters(newFilters);
      props.changeFilter(newFilters[filterIdx].slug);
    });
  }, []);
  const changeFilter = (idx) => {
    setFilterIdx(idx);
    props.changeFilter(filters[idx].slug);
  };
  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <Banner
            title="CMOlist Members"
            img="https://d3k6hg21rt7gsh.cloudfront.net/directory.png"
          />
          <div>
            <Filter
              className="mt-1"
              filterIdx={filterIdx}
              filters={filters}
              onChange={(idx) => changeFilter(idx)}
            />
          </div>
          {props.loadingNetwork ? (
            <div className="mt-3 mb-5">
              <ActivityIndicator className="element-center feed-activity-indicator" />
            </div>
          ) : (
            <Feed {...props} fetchData={fetchData} />
          )}

          <InviteModal
            show={inviteModalShow}
            onHide={() => setInviteModalShow(false)}
            onSuccess={(data) => {
              props.saveUserInvite(data);
              setInviteModalShow(false);
            }}
          />

          <Footer />
        </div>
      </Container>
    </>
  );
};

const mapState = (state) => {
  return {
    activeFilter: state.networkModel.activeFilter,
    feedData: state.networkModel.activeFeed,
    moreData: state.networkModel.moreData,
    localConnectedUsers: state.userModel.localConnectedUsers,
    loadingNetwork: state.networkModel.loadingNetwork,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchActiveNetwork: dispatch.networkModel.fetchActiveNetwork,
    changeFilter: dispatch.networkModel.changeFilter,
    changeSortOrder: dispatch.networkModel.changeSortOrder,
    invalidateFeed: dispatch.networkModel.invalidateFeed,
    saveUserInvite: dispatch.userModel.saveInvite,
    connectUser: dispatch.userModel.connectUser,
    getProfileStats: dispatch.profileModel.getProfileStats,
  };
};

export default connect(mapState, mapDispatch)(Network);
