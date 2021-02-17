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

    removePost: (oldState, id) => {
      return {
        ...oldState,
        profile: {
          ...oldState.profile,
          feedData: oldState.profile.feedData.map((feed) => {
            return {
              ...feed,
              data: feed.data.filter((item) => item.slug !== id),
            };
          }),
        },
      };
    },

    updateProfileStats: (oldState, data) => {
      return {
        ...oldState,
        profileStats: data,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchProfile(userName) {
      try {
        const response = await profileRequest(userName);
        const { profile } = response.data;
        dispatch.vendorModel.updateProfile(profile);
      } catch (err) {
        throw new Error("Could not get profile");
      }
    },

    async saveProfile(profile) {
      try {
        await saveProfileRequest({ profile });
        dispatch.vendorModel.updateProfile(profile);
      } catch (err) {
        throw new Error("Could not save profile");
      }
    },

    async deletePost(id) {
      try {
        await deletePostRequest(id);
        dispatch.vendorModel.removePost(id);
      } catch (err) {
        throw new Error("Could not delete post");
      }
    },

    async getProfileStats() {
      try {
        const response = await getProfileStatsRequest();
        const profileStats = response.data;
        dispatch.vendorModel.updateProfileStats(profileStats);
        return profileStats;
      } catch (err) {
        throw new Error("Could not get profilestats");
      }
    },
  }),
};
