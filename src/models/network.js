import axios from "axios";

const networkRequest = (sort, filter, subfilter, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  let url = "/api/network?";
  if (sort) {
    url += `sort=${sort.toLowerCase()}`;
  }
  if (filter) {
    if (sort) {
      url += "&";
    }
    url += `filter=${filter}`;
  }
  if (subfilter) {
    if (!filter) {
      throw new Error("Cannot have a subfilter without a filter");
    }
    url += `&subfilter=${subfilter}`;
  }
  if (token) {
    headers.token = token;
  }
  return axios.get(url, { headers });
};

export default {
  name: "networkModel",
  state: {
    loadingNetwork: false,
    feedData: {},
    activeFeed: [],
    activeFeedHasMoreData: false,
    activeFeedSubFilters: [],
    activeFilter: "",
    activeFeedSubFilter: "",
    sortOrder: "Top",
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
    setFeedDataForKey: (oldState, filterKey, data) => {
      if (!(filterKey in oldState.feedData)) {
        throw new Error("No feed data for specified key!");
      }
      let newState = {
        ...oldState,
        activeFilter: filterKey,
        sortOrder: data.sortOrder,
      };
      const feedData = data.feedData;
      const token = data.token;
      const currentFeed = oldState.feedData[filterKey];
      if (feedData != null && feedData.length > 0) {
        currentFeed.moreData = true;
        currentFeed.token = token;
        currentFeed.data = currentFeed.data.concat(feedData);
        newState.activeFeedHasMoreData = true;
      } else {
        currentFeed.moreData = false;
        newState.activeFeedHasMoreData = false;
      }
      if (data.filters != null) {
        currentFeed.filters = data.filters;
        newState.activeFeedSubFilters = currentFeed.filters;
      }
      newState.activeFeed = currentFeed.data.slice();
      return newState;
    },
    clearFeedData: (oldState) => {
      let newState = {
        ...oldState,
        feedData: {},
      };
      Object.keys(oldState.feedData).forEach((k) => {
        if (k === oldState.activeFilter) {
          newState.feedData[k] = oldState.feedData[k];
        }
      });
      return newState;
    },
    setActiveFilter: (oldState, filterKey) => {
      if (!(filterKey in oldState.feedData)) {
        throw new Error("No feed data for specified key!");
      }
      return {
        ...oldState,
        activeFilter: filterKey,
        activeFeedSubFilter: "",
        activeFeed: oldState.feedData[filterKey].data,
        activeFeedSubFilters: oldState.feedData[filterKey].filters || [],
      };
    },
    setActiveSubFilter: (oldState, activeFeedSubFilter) => {
      return {
        ...oldState,
        activeFeedSubFilter,
      };
    },
    setActiveSortOrder: (oldState, sortOrder) => {
      return {
        ...oldState,
        sortOrder,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchActiveNetwork(_, rootState) {
      try {
        const {
          activeFilter,
          activeSubFilter,
          sortOrder,
        } = rootState.networkModel;
        const dataForFilter =
          rootState.feedModel.dashboardFeedData[activeFilter];
        dispatch.networkModel.setLoading(true);
        const response = await networkRequest(
          sortOrder,
          activeFilter,
          activeSubFilter,
          dataForFilter.token
        );
        let data = response.data;
        data.sortOrder = sortOrder;
        dispatch.networkModel.setFeedDataForKey(activeFilter, response.data);
      } catch (error) {
        throw new Error("Can not fetch active network");
      } finally {
        dispatch.networkModel.setLoading(false);
      }
    },
    async changeFilter(filterKey, rootState) {
      const filterExists = filterKey in rootState.networkModel.feedData;
      if (filterExists) {
        dispatch.networkModel.setActiveFilter(filterKey);
      } else {
        dispatch.networkModel.initFeedDataForKey(filterKey);
        try {
          dispatch.networkModel.setLoading(true);
          const { sortOrder } = rootState.networkModel;
          const response = await networkRequest(
            sortOrder,
            filterKey.toLowerCase(),
            "",
            null
          );
          let data = response.data;
          data.sortOrder = sortOrder;
          dispatch.networkModel.setFeedDataForKey(filterKey, data);
        } finally {
          dispatch.networkModel.setLoading(false);
        }
      }
    },
    async changeSubFilter(subfilter, rootState) {
      try {
        const { activeFilter, sortOrder } = rootState.networkModel;
        dispatch.networkModel.clearFeedData();
        dispatch.networkModel.setActiveSubFilter(subfilter);
        dispatch.networkModel.setLoading(true);
        const response = await networkRequest(
          sortOrder,
          activeFilter,
          subfilter,
          null
        );
        let data = response.data;
        dispatch.networkModel.setFeedDataForKey(activeFilter, data);
      } catch (error) {
        throw new Error("Can not change sort order");
      } finally {
        dispatch.networkModel.setLoading(false);
      }
    },
    async changeSortOrder(sort, rootState) {
      try {
        const { activeFilter, activeSubFilter } = rootState.networkModel;
        dispatch.networkModel.clearFeedData();
        dispatch.networkModel.setLoading(true);
        const response = await networkRequest(
          sort,
          activeFilter,
          activeSubFilter,
          null
        );
        let data = response.data;
        data.sortOrder = sort;
        dispatch.networkModel.setFeedDataForKey(activeFilter, data);
      } catch (error) {
        throw new Error("Can not change sort order");
      } finally {
        dispatch.networkModel.setLoading(false);
      }
    },
    async invalidateFeed() {
      dispatch.networkModel.clearFeedData();
    },
  }),
};
