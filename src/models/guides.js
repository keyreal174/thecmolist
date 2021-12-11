import axios from "axios";
const guidesRequest = (token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  if (token) {
    headers.token = token;
  }
  return axios.get(`/api/guides`, {
    headers,
  });
};

export default {
  name: "guidesModel",
  state: {
    guideList: [],
    loadingGuides: false,
    token: null,
  },
  reducers: {
    setGuideList: (oldState, data) => {
      return {
        ...oldState,
        guideList: data.guideList,
        token: data.token,
      };
    },
    setLoading: (oldState, data) => {
      return {
        ...oldState,
        loadingGuides: data,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchGuides(_, rootState) {
      let token = rootState.guidesModel.token;
      dispatch.guidesModel.setLoading(true);
      const response = await guidesRequest(token);
      const data = response.data;
      dispatch.guidesModel.setGuideList(data);
      dispatch.guidesModel.setLoading(false);
    },
  }),
};
