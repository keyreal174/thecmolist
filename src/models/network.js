import axios from "axios";

const networkRequest = (sort, filter, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  let url = `/api/network?sort=${sort.toLowerCase()}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  if (token) {
    headers.token = token;
  }
  return axios.get(url, { headers });
};

export default {
  name: "networkModel",
  state: {
    activeFeed: "",
    activeFilter: "",
    feedData: [],
    loadingNetwork: false,
    moreData: false,
    sortOrder: "",
    token: null,
  },
  reducers: {
    initFeedDataForKey: (oldState, filterKey) => {
      if (!filterKey) {
        throw new Error("Expected filterKey");
      }
      let newState = { ...oldState };
      newState.feedData[filterKey] = {
        title: filterKey,
        token: "",
        data: [],
        moreData: false,
        enabled: true,
      };
      return newState;
    },
    setLoading: (oldState, data) => {
      return {
        ...oldState,
        loadingNetwork: data,
      };
    },
    setFeedDataForKey: (oldState, filter, data) => {
      if (!(filter in oldState.feedData)) {
        throw new Error("No feed data for specified key!");
      }
      let newState = {
        ...oldState,
        activeFilter: filter,
      };
      const feedData = data.feedData;
      const token = data.token;
      const currentFeed = oldState.feedData[filter];
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
    setActiveFilter: (oldState, filterKey) => {
      if (!(filterKey in oldState.feedData)) {
        throw new Error("No feed data for specified key!");
      }
      return {
        ...oldState,
        activeFilter: filterKey,
        activeFeed: oldState.feedData[filterKey].data,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchNetwork(sort, rootState) {
      let token =
        rootState.networkModel.sortOrder === sort
          ? rootState.networkModel.token
          : null; // reset token if sort order changed
      let filter = rootState.networkModel.activeFilter;
      const response = await networkRequest(sort, filter, token);
      const data = response.data;
      data.sortOrder = sort;
      dispatch.networkModel.setFeedDataForKey(filter, data);
    },
    async changeNetworkFilter(filter, rootState) {
      if (!(filter in rootState.networkModel.feedData)) {
        await dispatch.networkModel.initFeedDataForKey(filter);
      }
      let dataForFilter = rootState.networkModel.feedData[filter];
      if (
        dataForFilter &&
        dataForFilter.data &&
        dataForFilter.data.length === 0
      ) {
        try {
          dispatch.networkModel.setLoading(true);
          const response = await networkRequest(
            rootState.networkModel.sortOrder,
            filter.toLowerCase(),
            dataForFilter.token
          );
          const data = response.data;
          dispatch.networkModel.setFeedDataForKey(filter, data);
        } finally {
          dispatch.networkModel.setLoading(false);
        }
      } else {
        dispatch.networkModel.setActiveFilter(filter);
      }
    },
  }),
};
