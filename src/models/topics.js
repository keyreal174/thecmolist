import axios from "axios";

export const getTopicsRequest = () => {
  return axios.get("/api/topics");
};

export const followTopicRequest = (id) => {
  return axios.get(`/api/topics/${id}`);
};

export default {
  name: "topicsModel",
  state: {
    topics: [],
  },
  reducers: {
    updateTopics: (oldState, data) => {
      return {
        ...oldState,
        topics: data,
      };
    },

    updateFollowTopic: (oldState, id) => {
      return {
        ...oldState,
        topics: oldState.topics.map((topic) => {
          if (topic.id === id) {
            return {
              ...topic,
              followed: !topic.followed,
            };
          }
          return topic;
        }),
      };
    },
  },
  effects: (dispatch) => ({
    async fetchTopics() {
      try {
        const response = await getTopicsRequest();
        const { topics } = response.data;
        dispatch.topicsModel.updateTopics(topics);
      } catch (err) {
        throw new Error("Could not get topics");
      }
    },

    async followTopic(id) {
      try {
        const response = await followTopicRequest(id);
        console.log(response);
        dispatch.topicsModel.updateFollowTopic(id);
      } catch (err) {
        throw new Error("Could not follow topic");
      }
    },
  }),
};
