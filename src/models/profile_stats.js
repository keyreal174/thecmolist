import axios from "axios";

export const getProfile = () => {
  return axios.get(`/api/profilestats/`);
};

export default {
  name: "profileStatsModel",
  state: {
    profileStats: {},
  },
  reducers: {
    updateProfileStats: (oldState, data) => {
      return {
        ...oldState,
        profileStats: data,
      };
    },
  },
  effects: (dispatch) => ({
    async getProfileStats() {
      try {
        const response = await getProfile();
        const profileStats = response.data;
        dispatch.profileStatsModel.updateProfileStats(profileStats);
      } catch (err) {
        throw new Error("Could not get profilestats");
      }
    },
  }),
};
