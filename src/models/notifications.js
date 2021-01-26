import axios from "axios";
const notificationsRequest = (sort, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  if (token) {
    headers.token = token;
  }
  return axios.get(`/api/notifications?sort=${sort.toLowerCase()}`, {
    headers,
  });
};

export default {
  name: "notificationsModel",
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
    async fetchNotifications(sort, rootState) {
      let token =
        rootState.notificationsModel.sortOrder === sort
          ? rootState.notificationsModel.token
          : null; // reset token if sort order changed
      const response = await notificationsRequest(sort, token);
      const data = response.data;
      data.sortOrder = sort;
      dispatch.notificationsModel.setData(data);
    },
  }),
};
