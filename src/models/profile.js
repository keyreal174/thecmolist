import axios from "axios";
import ModelUtil from "./modelUtil";

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
      if (this.subscribeList) {
        let statsPromise = new ModelUtil.DeferedPromise();
        this.subscribeList.push((psd) => {
          try {
            statsPromise.resolve(psd);
          } catch (e) {}
        });
        let data = await statsPromise;
        return data;
      } else {
        try {
          this.subscribeList = [];
          const response = await getProfileStatsRequest();
          const profileStats = response.data;
          dispatch.profileModel.updateProfileStats(profileStats);

          // invoke subscribers
          this.subscribeList.forEach((s) => s(profileStats));
          this.subscribeList = null;
          return profileStats;
        } catch (err) {
          this.subscribeList.forEach((s) => s(null));
          this.subscribeList = null;
          throw new Error("Could not get profilestats");
        }
      }
    },
  }),
};
