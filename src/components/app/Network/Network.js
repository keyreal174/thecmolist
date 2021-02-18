import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Container, Form } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import InviteModal from "../base/ShareModule/InviteModal";
import Article from "../base/Article/Article";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import TagLists from "../base/TagLists/TagLists";

import TopBanner from "./TopBanner";
import Analytics from "../../util/Analytics";
import "./network.scss";

const renderFeed = (props, fetchData) => {
  const feedData = props.feedData;
  const moreData = props.moreData;

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
                  props.invalidateFeed();
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
  const [subfilters, setSubfilters] = useState({});
  const [subfilterKeys, setSubfilterKeys] = useState([]);
  const [feedFilter, setFeedFilter] = useState("");
  const [filteredFeedData, setFilteredFeedData] = useState([]);

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

  const [feedData, setFeedData] = useState([]);
  const [feedfilters, setFeedFilters] = useState([]);

  useEffect(() => {
    if (props.feedData) {
      createSubfilters(props.feedData);
    }
  }, [props.feedData]);

  const createSubfilters = (feedDa) => {
    let newFeedData = feedDa.slice();
    newFeedData.forEach((feed) => {
      feed.subfilters = {};
      feed.subheadlines &&
        feed.subheadlines.forEach((sh) => {
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
    setFeedData(newFeedData);
  };

  useEffect(() => {
    if (feedData.length > 0) {
      const f = feedData.map((feed) => ({
        title: feed.title,
        enabled: feed.enabled || false,
      }));
      setFeedFilters(f);

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
      // setHasDataOnCurrentFeed(
      //   currentFeed && currentFeed.data && currentFeed.data.length > 0
      // );
      setFilteredFeedData(feed_data);
    }
  }, [feedData]);

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <TopBanner />
          <div className="mb-4">
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
            <Row>
              <Col md={4}>
                <TagLists
                  subfilterKeys={subfilterKeys}
                  subfilters={subfilters}
                  feedFilter={feedFilter}
                  onSubfilterChange={() => console.log("=====")}
                />
              </Col>
              <Col md={8}>{renderFeed(props, fetchData)}</Col>
            </Row>
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
