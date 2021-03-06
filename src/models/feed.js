import axios from "axios";

const FEED_KEY_DELIMITER = "%%";

const feedRequest = (filter, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  if (token) {
    headers.token = token;
  }
  let subfilter = "";
  if (filter.indexOf(FEED_KEY_DELIMITER) >= 0) {
    let split = filter.split(FEED_KEY_DELIMITER);
    if (split.length == 2) {
      filter = split[0];
      subfilter = split[1];
    }
  }
  if (subfilter.length > 0) {
    return axios.get(`/api/feed?filter=${filter}&subfilter=${subfilter}`, {
      headers,
    });
  }
  return axios.get(`/api/feed?filter=${filter}`, { headers });
};

export default {
  name: "feedModel",
  state: {
    feedLoading: false,
    dashboardFeedData: {},
    activeFeed: [],
    activeFeedHasMoreData: false,
    activeFeedAbout: {},
    activeFeedMembers: [],
    activeFeedVendors: [],
    activeFeedFeaturedStacks: [],
    activeFeedFeaturedContent: [],
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
        currentFeed.moreData = feedData.length > 5;
        currentFeed.token = token;
        currentFeed.data = currentFeed.data.concat(feedData);
        newState.activeFeedHasMoreData = currentFeed.moreData;
      } else {
        currentFeed.moreData = false;
        newState.activeFeedHasMoreData = false;
      }
      currentFeed.about = data.about || {};
      newState.activeFeedAbout = currentFeed.about;
      if (data.members != null) {
        currentFeed.members = data.members;
        newState.activeFeedMembers = currentFeed.members;
      }
      if (data.vendors != null) {
        currentFeed.vendors = data.vendors;
        newState.activeFeedVendors = currentFeed.vendors;
      }
      if (data.featured_stacks != null) {
        currentFeed.featured_stacks = data.featured_stacks;
        newState.activeFeedFeaturedStacks = currentFeed.featured_stacks;
      }
      if (data.featuredContent != null) {
        currentFeed.featuredContent = data.featuredContent;
        newState.activeFeedFeaturedContent = currentFeed.featuredContent;
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
        activeFeedAbout: rootState.dashboardFeedData[filterKey].about || {},
        activeFeedMembers: rootState.dashboardFeedData[filterKey].members || [],
        activeFeedVendors: rootState.dashboardFeedData[filterKey].vendors || [],
        activeFeedFeaturedStacks:
          rootState.dashboardFeedData[filterKey].featured_stacks || [],
        activeFeedFeaturedContent:
          rootState.dashboardFeedData[filterKey].featuredContent || [],
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
      const response = await feedRequest(
        filterKey.toLowerCase(),
        dataForFilter.token
      );
      const data = response.data;
      dispatch.feedModel.setFeedDataForKey(filterKey, data);
      const filteredData = data.feedData.filter((feed) => "content_id" in feed);
      dispatch.reactionModel.setReactions(filteredData);
    },
    async changeDashboardFilter(payload, rootState) {
      // filter = Group (All Members, etc), subfilter = Type of content (Q/A, Posts, etc)
      let { filter, subfilter } = payload;
      let filterKey = `${filter}${FEED_KEY_DELIMITER}${subfilter}`;
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
          const filteredData = data.feedData.filter(
            (feed) => "content_id" in feed
          );
          dispatch.reactionModel.setReactions(filteredData);
        } finally {
          dispatch.feedModel.setLoading(false);
        }
      } else {
        dispatch.feedModel.setActiveFeed(filterKey);
      }
    },
  }),
};
