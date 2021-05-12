import axios from "axios";

export const fetchSuggestionsRequest = (query, filter) => {
  return filter
    ? axios.get(`/api/entity_suggestions?filter=vendor&q=${query || ""}`)
    : axios.get(`/api/entity_suggestions?q=${query || ""}`);
};

export const fetchTopicSuggestionsRequest = (query) => {
  let queryParam = query || "";
  if (queryParam.startsWith("#")) {
    queryParam = queryParam.substr(1);
  }
  return axios.get(`/api/topic_suggestions?q=${queryParam}`);
};

export default {
  name: "suggestionsModel",
  state: {
    suggestions: {},
  },
  reducers: {
    updateSuggestions: (oldState, data) => {
      return {
        ...oldState,
        suggestions: data,
      };
    },
    updateTopicSuggestions: (oldState, data) => {
      return {
        ...oldState,
        topicSuggestions: data,
      };
    },
  },
  effects: (dispatch) => ({
    async getSuggestions(query) {
      try {
        const response = await fetchSuggestionsRequest(query);
        const { suggestions } = response.data;
        dispatch.suggestionsModel.updateSuggestions(suggestions);
        return suggestions;
      } catch (err) {
        throw new Error("Could not get suggestions");
      }
    },
    async getTopicSuggestions(query) {
      try {
        const response = await fetchTopicSuggestionsRequest(query);
        const { suggestions } = response.data;
        dispatch.suggestionsModel.updateTopicSuggestions(suggestions);
        return suggestions;
      } catch (err) {
        throw new Error("Could not get topic suggestions");
      }
    },
  }),
};
