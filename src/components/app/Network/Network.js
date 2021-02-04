import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Banner from "../base/Banner/Banner";
import Filter from "../base/Filter/Filter";
import InviteModal from "../base/ShareModule/InviteModal";
import Article from "../base/Article/Article";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import Analytics from "../../util/Analytics";
import "./network.css";

const renderFeed = (props, fetchData) => {
  const feedData = props.activeFeed;

  return (
    <>
      {feedData &&
        feedData.map((feed, idx) => {
          let badge = null;
          const isLocallyConnected = props.localConnectedUsers.includes(
            feed.username
          );
          const isConnected = feed.isConnected || isLocallyConnected;

          if (!feed.disableConnect) {
            badge = !isConnected ? (
              <button
                className="btn connect-button"
                type="button"
                onClick={() => {
                  props.connectUser(feed);
                }}
              >
                Connect
              </button>
            ) : (
              <span className="connected-label">Connected</span>
            );
          }

          return (
            <Article
              key={idx}
              className={idx !== 0 ? "mt-1" : ""}
              {...feed}
              badge={badge}
            />
          );
        })}
      {props.moreData && (
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
    </>
  );
};

const Network = (props) => {
  const [sortOrder, setSortOrder] = useState("Top");
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const fetchData = async () => await props.fetchNetwork(sortOrder);
  const formFilterChange = (event) => {
    setSortOrder(event.target.value);
    props.fetchNetwork(event.target.value);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [filterIdx, setFilterIdx] = useState(0);
  const [filters, setFilters] = useState([]);
  const changeNetworkFilter = (filter) => {
    props.changeNetworkFilter(filter);
  };
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
      changeNetworkFilter(newFilters[filterIdx].slug);
    });
  }, []);
  const changeFilter = (idx) => {
    setFilterIdx(idx);
    changeNetworkFilter(filters[idx].slug);
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
          <div className="sort">
            <div className="section-break" />
            <span>Sort by:</span>
            <div className="select-wrapper">
              <Form.Control
                as="select"
                defaultValue={sortOrder}
                onChange={formFilterChange}
                custom
              >
                <option>Top</option>
                <option>Recent</option>
                <option>Name</option>
              </Form.Control>
            </div>
          </div>

          {props.loadingNetwork ? (
            <ActivityIndicator />
          ) : (
            renderFeed(props, fetchData)
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
    activeFeed: state.networkModel.activeFeed,
    feedData: state.networkModel.feedData,
    moreData: state.networkModel.moreData,
    localConnectedUsers: state.userModel.localConnectedUsers,
    loadingNetwork: state.networkModel.loadingNetwork,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchNetwork: dispatch.networkModel.fetchNetwork,
    saveUserInvite: dispatch.userModel.saveInvite,
    connectUser: dispatch.userModel.connectUser,
    getProfileStats: dispatch.profileModel.getProfileStats,
    changeNetworkFilter: dispatch.networkModel.changeNetworkFilter,
  };
};

export default connect(mapState, mapDispatch)(Network);
