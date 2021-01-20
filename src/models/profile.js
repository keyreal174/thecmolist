import axios from "axios";

const profileRequest = (userName) => {
  return axios.get(`/api/profile/${userName}`, {
    headers: {
      "timezone-offset": new Date().getTimezoneOffset(),
    },
  });
};

const saveProfileRequest = (profile) => {
  return axios.post("/api/profile/", profile);
};

export default {
  name: "profileModel",
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
        dispatch.profileModel.updateProfile(profile);
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
  }),
};
