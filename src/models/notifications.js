import axios from "axios";
const notificationsRequest = (token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  if (token) {
    headers.token = token;
  }
  return axios.get(`/api/notifications`, {
    headers,
  });
};

export default {
  name: "notificationsModel",
  state: {
    feedData: [],
    moreData: false,
    token: null,
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
      };
    },
  },
  effects: (dispatch) => ({
    async fetchNotifications(_, rootState) {
      let token = rootState.notificationsModel.token;
      const response = await notificationsRequest(token);
      const data = response.data;
      dispatch.notificationsModel.setData(data);
    },
  }),
};
