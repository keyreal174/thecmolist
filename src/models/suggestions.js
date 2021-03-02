import axios from "axios";

export const fetchSuggestionsRequest = () => {
  return axios.get("/api/entity_suggestions");
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
    async getSuggestions() {
      try {
        const response = await fetchSuggestionsRequest();
        const { suggestions } = response.data;
        dispatch.suggestionsModel.updateSuggestions(suggestions);
      } catch (err) {
        throw new Error("Could not get suggestions");
      }
    },
  }),
};
