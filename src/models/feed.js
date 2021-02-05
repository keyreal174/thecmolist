import axios from "axios";

const feedRequest = (filter, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  if (token) {
    headers.token = token;
  }
  return axios.get(`/api/feed?filter=${filter}`, { headers });
};

export default {
  name: "feedModel",
  state: {
    feedLoading: false,
    dashboardFeedData: {},
    activeFeed: [],
    activeFilter: "",
  },
  reducers: {
    initFeedDataForKey: (rootState, filterKey) => {
      if (!filterKey) {
        throw new Error("Expected filterKey");
      }
      let newState = { ...rootState };
      newState.dashboardFeedData[filterKey] = {
        title: filterKey,
        token: "",
        data: [],
        moreData: false,
        enabled: true,
      };
      return newState;
    },
    setFeedDataForKey: (rootState, filterKey, data) => {
      if (!(filterKey in rootState.dashboardFeedData)) {
        throw new Error("No feed data for specified key!");
      }
      let newState = {
        ...rootState,
        activeFilter: filterKey,
      };
      const feedData = data.feedData;
      const token = data.token;
      const currentFeed = rootState.dashboardFeedData[filterKey];
      if (feedData != null && feedData.length > 0) {
        currentFeed.moreData = true;
        currentFeed.token = token;
        currentFeed.data = currentFeed.data.concat(feedData);
      } else {
        currentFeed.moreData = false;
      }
      newState.activeFeed = currentFeed.data.slice();
      return newState;
    },
    setActiveFeed: (rootState, filterKey) => {
      if (!(filterKey in rootState.dashboardFeedData)) {
        throw new Error("No feed data for specified key!");
      }
      return {
        ...rootState,
        activeFilter: filterKey,
        activeFeed: rootState.dashboardFeedData[filterKey].data,
      };
    },
    setLoading: (rootState, loading) => {
      return {
        ...rootState,
        feedLoading: loading,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchActiveFeed(_, rootState) {
      const filterKey = rootState.feedModel.activeFilter;
      const dataForFilter = rootState.feedModel.dashboardFeedData[filterKey];
      console.log(dataForFilter, "--------------------------");
      const response = await feedRequest(
        filterKey.toLowerCase(),
        dataForFilter.token
      );
      const data = response.data;
      dispatch.feedModel.setFeedDataForKey(filterKey, data);
    },
    async changeDashboardFilter(payload, rootState) {
      // filter = Group (All Members, etc), subfilter = Type of content (Q/A, Posts, etc)
      let { filter, subfilter } = payload;
      let filterKey = `${filter}_${subfilter}`;
      if (!(filterKey in rootState.feedModel.dashboardFeedData)) {
        dispatch.feedModel.initFeedDataForKey(filterKey);
      }
      let dataForFilter = rootState.feedModel.dashboardFeedData[filterKey];
      if (dataForFilter.data.length == 0) {
        // kick off a fetch for this
        try {
          dispatch.feedModel.setLoading(true);
          const response = await feedRequest(
            filterKey.toLowerCase(),
            dataForFilter.token
          );
          const data = response.data;
          dispatch.feedModel.setFeedDataForKey(filterKey, data);
        } finally {
          dispatch.feedModel.setLoading(false);
        }
      } else {
        dispatch.feedModel.setActiveFeed(filterKey);
      }
    },
  }),
};
