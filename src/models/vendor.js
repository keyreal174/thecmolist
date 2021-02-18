import axios from "axios";

export const vendorProfileRequest = (userName) => {
  return axios.get(`/api/vendor/${userName ? userName : ""}`, {
    headers: {
      "timezone-offset": new Date().getTimezoneOffset(),
    },
  });
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
        const response = await vendorProfileRequest(userName);
        const { profile } = response.data;
        dispatch.vendorModel.updateProfile(profile);
        dispatch.reactionModel.setReactions(profile.feedData);
      } catch (err) {
        throw new Error("Could not get profile");
      }
    },
  }),
};
