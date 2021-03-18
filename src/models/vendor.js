import axios from "axios";

export const vendorProfileRequest = (vendorSlug) => {
  return axios.get(`/api/vendor/${vendorSlug ? vendorSlug : ""}`, {
    headers: {
      "timezone-offset": new Date().getTimezoneOffset(),
    },
  });
};

export const saveVendorProfileRequest = (vendorSlug, data) => {
  return axios.post(`/api/vendor/${vendorSlug}`, data);
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
    async fetchVendor(vendorSlug) {
      try {
        const response = await vendorProfileRequest(vendorSlug);
        const { profile } = response.data;
        dispatch.vendorModel.updateProfile(profile);
        dispatch.reactionModel.setReactions(profile.feedData);
      } catch (err) {
        throw new Error("Could not get profile");
      }
    },
    async saveVendor(payload) {
      try {
        let { vendorSlug, profile } = payload;
        await saveVendorProfileRequest(vendorSlug, profile);
        dispatch.vendorModel.updateProfile(profile);
      } catch (err) {
        throw new Error("Could not save vendor profile");
      }
    },
  }),
};
