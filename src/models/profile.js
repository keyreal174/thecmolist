import axios from "axios";

export const profileRequest = (userName, scope) => {
  return axios.get(
    `/api/profile/${userName ? userName : ""}${scope ? "?scope=" + scope : ""}`,
    {
      headers: {
        "timezone-offset": new Date().getTimezoneOffset(),
      },
    }
  );
};

export const saveProfileRequest = (data) => {
  return axios.post("/api/profile", data);
};

export const deletePostRequest = (id) => {
  return axios.delete(`/api/content/${id}`);
};

export const getProfileStatsRequest = () => {
  return axios.get(`/api/profilestats/`);
};

export const updateSpacesRequest = (id) => {
  return axios.post(`/api/profilestats/spaces/${id}`);
};

export default {
  name: "profileModel",
  state: {
    profile: {},
    profileStats: {},
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

    updateSpaces: (oldState, data) => {
      const { profile, buildYourNetwork } = oldState.profileStats;

      return {
        ...oldState,
        profileStats: {
          profile,
          buildYourNetwork,
          spaces: oldState.profileStats.spaces.filter((s) => s.id !== data),
        },
      };
    },
  },
  effects: (dispatch) => ({
    async fetchProfile(payload) {
      try {
        const response = await profileRequest(payload.userName, payload.scope);
        const { profile } = response.data;
        dispatch.profileModel.updateProfile(profile);
        dispatch.reactionModel.setReactions(profile.feedData);
      } catch (err) {
        throw new Error("Could not get profile");
      }
    },

    async saveProfile(profile) {
      try {
        await saveProfileRequest(profile);
        dispatch.profileModel.updateProfile(profile);
      } catch (err) {
        throw new Error("Could not save profile");
      }
    },

    async deletePost(id) {
      try {
        await deletePostRequest(id);
        dispatch.profileModel.removePost(id);
      } catch (err) {
        throw new Error("Could not delete post");
      }
    },

    async getProfileStats() {
      try {
        const response = await getProfileStatsRequest();
        const profileStats = response.data;
        dispatch.profileModel.updateProfileStats(profileStats);
        return profileStats;
      } catch (err) {
        throw new Error("Could not get profilestats");
      }
    },

    async updateSpacesStats(id) {
      try {
        await updateSpacesRequest(id);
        dispatch.profileModel.updateSpaces(id);
      } catch (err) {
        throw new Error("Could not update spaces");
      }
    },
  }),
};
