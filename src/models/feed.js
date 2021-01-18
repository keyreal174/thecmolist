import axios from "axios";

const dashboardRequest = () => {
  return axios.get("/api/feed_dashboard", {
    headers: {
      "timezone-offset": new Date().getTimezoneOffset(),
    },
  });
};

const feedRequest = (filter, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  if (token) {
    headers.token = token;
  }
  return axios.get(`/api/feed?filter=${filter}`, { headers });
};

const saveContent = (data) => {
  return axios.post("/api/feed", data);
};

const getContent = () => {
  return axios.get(`/api/feed/`);
};

export default {
  name: "feedModel",
  state: {
    dashboardData: {},
    feedData: [
      {
        title: "All",
        token: "",
        data: [],
        moreData: false,
        enabled: true,
      },
      {
        title: "Vendors",
        token: "",
        data: [],
        moreData: false,
        enabled: true,
      },
      {
        title: "News",
        token: "",
        data: [],
        moreData: false,
        enabled: true,
      },
      {
        title: "Discussions",
        token: "",
        data: [],
        moreData: false,
        enabled: true,
      },
      {
        title: "Members",
        token: "",
        data: [],
        moreData: false,
        enabled: true,
      },
    ],
    filterIdx: 0,
    showNux: false,
  },
  reducers: {
    setDashboardData: (rootState, dashboardData) => {
      return {
        ...rootState,
        dashboardData: dashboardData,
      };
    },
    setFeedData: (rootState, data) => {
      let newState = {
        ...rootState,
      };
      const feedData = data.feedData;
      const token = data.token;
      const filterIdx = rootState.filterIdx;
      const filter = rootState.feedData[filterIdx].title;
      for (let i = 0; i < rootState.feedData.length; i++) {
        if (rootState.feedData[i].title === filter) {
          let currentFeed = rootState.feedData[i];
          if (feedData != null && feedData.length > 0) {
            currentFeed.moreData = true;
            currentFeed.token = token;
            currentFeed.data = currentFeed.data.concat(feedData);
          } else {
            currentFeed.moreData = false;
          }
          newState.feedData = rootState.feedData.slice();
          break;
        }
      }
      return newState;
    },
    setFilterIndex: (rootState, filterIdx) => {
      return {
        ...rootState,
        filterIdx: filterIdx,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchDashboard() {
      const response = await dashboardRequest();
      const data = response.data;
      dispatch.feedModel.setDashboardData(data);
    },
    async fetchFeed(_, rootState) {
      const filterIdx = rootState.feedModel.filterIdx;
      const filter = rootState.feedModel.feedData[filterIdx].title;
      const fetchToken = rootState.feedModel.feedData[filterIdx].token;
      const response = await feedRequest(filter.toLowerCase(), fetchToken);
      const data = response.data;
      dispatch.feedModel.setFeedData(data);
    },
    async changeFilterIndex(filterIdx) {
      dispatch.feedModel.setFilterIndex(filterIdx);
    },
  }),
};
