import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import InviteModal from "../base/ShareModule/InviteModal";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import TopBanner from "./TopBanner";
import Feed from "./Feed";
import Analytics from "../../util/Analytics";
import "./network.scss";

const Network = (props) => {
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const fetchData = async () => await props.fetchActiveNetwork();
  const [filterIdx, setFilterIdx] = useState(0);
  const [filters, setFilters] = useState([]);

  const [feedFilter, setFeedFilter] = useState("");
  //const [subfilters, setSubfilters] = useState({});
  //const [subfilterKeys, setSubfilterKeys] = useState([]);
  const [feedData, setFeedData] = useState(props.feedData || []);

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

  const createSubfilters = (feedData) => {
    let newFeedData = feedData.slice();
    newFeedData.forEach((feed) => {
      feed.subfilters = {};
      let feed_data = feed.data;
      feed_data &&
        feed_data.forEach((data) => {
          data &&
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

  useEffect(() => {
    props.feedData && createSubfilters(props.feedData);
  }, [props.feedData]);

  const subfilterKeys = [
    "Baidu Advertising",
    "Packaging Design",
    "SEM",
    "Saas",
    "Latam",
    "TV Advertising",
    "Out of Home advertising",
    "Mobile & App Marketing",
    "LinkedIn Advertising",
  ];
  const subfilters = {
    "Baidu Advertising": 1,
    "Packaging Design": 1,
    SEM: 2,
    Saas: 1,
    Latam: 3,
    "TV Advertising": 4,
    "Out of Home advertising": 1,
    "Mobile & App Marketing": 2,
    "LinkedIn Advertising": 1,
  };

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <TopBanner />
          <div className="mt-4 mb-4">
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
            <Feed
              {...props}
              fetchData={fetchData}
              subfilterKeys={subfilterKeys}
              feedFilter={feedFilter}
              onSubfilterChange={() => {
                console.log("subfilter change");
              }}
              subfilters={subfilters}
              feedData={feedData}
            />
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
