import axios from "axios";

export const fetchSuggestionsRequest = (query) => {
  return !query
    ? axios.get("/api/entity_suggestions")
    : axios.get(`/api/entity_suggestions?q=${query}`);
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
  },
  effects: (dispatch) => ({
    async getSuggestions(query = null) {
      try {
        const response = await fetchSuggestionsRequest(query);
        const { suggestions } = response.data;
        dispatch.suggestionsModel.updateSuggestions(suggestions);
        return suggestions;
      } catch (err) {
        throw new Error("Could not get suggestions");
      }
    },
  }),
};
