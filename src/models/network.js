import axios from "axios";
const networkRequest = (sort, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  if (token) {
    headers.token = token;
  }
  return axios.get(`/api/network?sort=${sort.toLowerCase()}`, { headers });
};

export default {
  name: "networkModel",
  state: {
    feedData: [],
    moreData: false,
    token: null,
    sortOrder: "",
  },
  reducers: {
    setData: (oldState, data) => {
      return {
        ...oldState,
        feedData:
          oldState.token && data.feedData
            ? oldState.feedData.concat(data.feedData)
            : data.feedData,
        moreData: data.feedData && data.feedData.length > 0,
        token: data.token,
        sortOrder: data.sortOrder,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchNetwork(sort, rootState) {
      let token =
        rootState.networkModel.sortOrder === sort
          ? rootState.networkModel.token
          : null; // reset token if sort order changed
      const response = await networkRequest(sort, token);
      const data = response.data;
      data.sortOrder = sort;
      dispatch.networkModel.setData(data);
    },
  }),
};
