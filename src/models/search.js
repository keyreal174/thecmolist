import axios from "axios";

export const getFullSearchRequest = (query) => {
  return axios.get(query ? "/api/full_search/${query}" : "/api/full_search");
};

export const getRefinedSearchRequest = (query, filter, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  if (token) {
    headers.token = token;
  }
  return query
    ? axios.get(`/api/refined_search/${query}?filter=${filter}`, { headers })
    : axios.get(`/api/refined_search?filter=${filter}`, { headers });
};

export default {
  name: "searchModel",
  state: {
    searchResult: null,
    token: "",
    moreData: false,
    modules: [],
  },
  reducers: {
    updateSearchResult: (oldState, data) => {
      return {
        ...oldState,
        searchResult: data,
        token: data.token,
      };
    },

    updateModule: (oldState, data) => {
      return {
        ...oldState,
        modules: [...oldState.modules, ...data.feedData],
        moreData: data.feedData && data.feedData.length > 0,
        token: data.token,
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

    async fetchRefinedSearch(query, filter, rootState) {
      try {
        const token = rootState.searchModel.token;
        const response = await getRefinedSearchRequest(query, filter, token);
        dispatch.searchModel.updateModule(response.data);
      } catch (err) {
        throw new Error("Could not get search refined data" + err.toString());
      }
    },
  }),
};
