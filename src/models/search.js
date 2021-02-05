import axios from "axios";

export const getFullSearchRequest = (query) => {
  return axios.get(query ? "/api/full_search/${query}" : "/api/full_search");
};

export const getRefinedSearchRequest = (filter) => {
  return axios.get(`/api/refined_search?filter=${filter}`);
};

export default {
  name: "searchModel",
  state: {
    searchResult: null,
  },
  reducers: {
    updateSearchResult: (oldState, data) => {
      return {
        ...oldState,
        searchResult: data,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchFullSearch(query) {
      try {
        const response = await getFullSearchRequest(query);
        dispatch.searchModel.updateSearchResult(response.data);
      } catch (err) {
        throw new Error("Could not get search full data" + err.toString());
      }
    },

    async fetchRefinedSearch(filter) {
      try {
        const response = await getRefinedSearchRequest(filter);
        dispatch.searchModel.updateSearchResult(response.data);
      } catch (err) {
        throw new Error("Could not get search refined data" + err.toString());
      }
    },
  }),
};
