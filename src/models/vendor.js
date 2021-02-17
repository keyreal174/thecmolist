import axios from "axios";

export const profileRequest = (userName) => {
  return axios.get(`/api/vendor/${userName ? userName : ""}`, {
    headers: {
      "timezone-offset": new Date().getTimezoneOffset(),
    },
  });
};

export const saveProfileRequest = (data) => {
  return axios.post("/api/vendor", data);
};

export const deletePostRequest = (id) => {
  return axios.delete(`/api/post/${id}`);
};

export const getProfileStatsRequest = () => {
  return axios.get(`/api/profilestats/`);
};

export default {
  name: "vendorModel",
  state: {
    profile: {},
  },
  reducers: {
    updateProfile: (oldState, data) => {
      return {
        ...oldState,
        profile: data,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchProfile(userName) {
      try {
        const response = await profileRequest(userName);
        const { profile } = response.data;
        dispatch.vendorModel.updateProfile(profile);
        dispatch.reactionModel.setReactions(profile.feedData);
      } catch (err) {
        throw new Error("Could not get profile");
      }
    },
  }),
};
