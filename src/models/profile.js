import axios from "axios";

export const profileRequest = (userName) => {
  return axios.get(`/api/profile/${userName ? userName : ""}`, {
    headers: {
      "timezone-offset": new Date().getTimezoneOffset(),
    },
  });
};

export const saveProfileRequest = (data) => {
  return axios.post("/api/profile", data);
};

export const deletePostRequest = (id) => {
  return axios.delete(`/api/post/${id}`);
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
        await saveProfileRequest({ profile });
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
  }),
};
