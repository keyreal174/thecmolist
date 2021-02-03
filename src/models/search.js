import axios from "axios";

export const getFullSearchRequest = () => {
  return axios.get("/api/full_search");
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
    async fetchFullSearch() {
      try {
        const response = await getFullSearchRequest();
        dispatch.searchModel.updateSearchResult(response.data);
      } catch (err) {
        throw new Error("Could not get topics");
      }
    },

    async fetchRefinedSearch(filter) {
      try {
        const response = await getRefinedSearchRequest(filter);
        dispatch.searchModel.updateSearchResult(response.data);
      } catch (err) {
        throw new Error("Could not get topics");
      }
    },
  }),
};
