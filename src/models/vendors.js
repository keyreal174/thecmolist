import axios from "axios";

const vendorRequest = (sort, filter, subfilter, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  let url = "/api/vendors?";
  if (sort) {
    url += `sort=${sort.toLowerCase()}`;
  }
  if (filter) {
    if (sort) {
      url += "&";
    }
    url += `filter=${filter}`;
  }
  if (subfilter) {
    if (!filter) {
      throw new Error("Cannot have a subfilter without a filter");
    }
    url += `&subfilter=${subfilter}`;
  }
  if (token) {
    headers.token = token;
  }
  return axios.get(url, { headers });
};

const vendorListRequest = (sort, filter, subfilter, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  let url = "/api/vendor_list?";
  if (sort) {
    url += `sort=${sort.toLowerCase()}`;
  }
  if (filter) {
    if (sort) {
      url += "&";
    }
    url += `filter=${filter}`;
  }
  if (subfilter) {
    if (!filter) {
      throw new Error("Cannot have a subfilter without a filter");
    }
    url += `&subfilter=${subfilter}`;
  }
  if (token) {
    headers.token = token;
  }
  return axios.get(url, { headers });
};

const vendorsDetailRequest = (name, token) => {
  let headers = {
    "timezone-offset": new Date().getTimezoneOffset(),
  };
  let url = `/api/vendor_detail/${name}`;
  if (token) {
    headers.token = token;
  }
  return axios.get(url, { headers });
};

const postNewMember = (data) => {
  axios.post("/api/vendors/invite", data);
};

const getVendorCategoriesRequest = () => {
  return axios.get("/api/vendor_categories");
};

const getSkillCategoriesRequest = () => {
  return axios.get("/api/skill_categories");
};

export default {
  name: "vendorsModel",
  state: {
    loadingVendors: false,
    feedData: {},
    activeFeed: [],
    activeFeedHasMoreData: false,
    activeFeedSubFilters: [],
    activeFilter: "",
    activeSubFilter: "",
    sortOrder: "Top",
    vendorCategories: [],
    skillCategories: [],
    vendorList: [],
    vendorsDetail: {},
  },
  reducers: {
    initFeedDataForKey: (oldState, filterKey) => {
      if (!filterKey) {
        throw new Error("Expected filterKey");
      }
      let newState = { ...oldState };
      newState.feedData[filterKey] = {
        title: filterKey,
        token: "",
        data: [],
        moreData: false,
        enabled: true,
      };
      return newState;
    },
    setLoading: (oldState, data) => {
      return {
        ...oldState,
        loadingVendors: data,
      };
    },
    setFeedDataForKey: (oldState, filterKey, data) => {
      if (!(filterKey in oldState.feedData)) {
        throw new Error("No feed data for specified key!");
      }
      let newState = {
        ...oldState,
        activeFilter: filterKey,
        sortOrder: data.sortOrder,
      };
      const feedData = data.feedData;
      const token = data.token;
      const currentFeed = oldState.feedData[filterKey];
      if (feedData != null && feedData.length > 0) {
        currentFeed.moreData = feedData.length > 5;
        currentFeed.token = token;
        currentFeed.data = currentFeed.data.concat(feedData);
        newState.activeFeedHasMoreData = currentFeed.moreData;
      } else {
        currentFeed.moreData = false;
        newState.activeFeedHasMoreData = false;
      }
      if (data.filters != null) {
        currentFeed.filters = data.filters;
        newState.activeFeedSubFilters = currentFeed.filters;
      }
      newState.activeFeed = currentFeed.data.slice();
      return newState;
    },
    clearActiveFeedData: (oldState) => {
      let newState = {
        ...oldState,
      };
      if (oldState.activeFilter in newState.feedData) {
        let k = oldState.activeFilter;
        newState.feedData[k].token = "";
        newState.feedData[k].data = [];
      }
      return newState;
    },
    setActiveFilter: (oldState, filterKey) => {
      if (!(filterKey in oldState.feedData)) {
        throw new Error("No feed data for specified key!");
      }
      return {
        ...oldState,
        activeFilter: filterKey,
        activeSubFilter: "",
        activeFeed: oldState.feedData[filterKey].data,
        activeFeedSubFilters: oldState.feedData[filterKey].filters || [],
      };
    },
    setActiveSubFilter: (oldState, activeSubFilter) => {
      return {
        ...oldState,
        activeSubFilter,
      };
    },
    setActiveSortOrder: (oldState, sortOrder) => {
      return {
        ...oldState,
        sortOrder,
      };
    },
    setVendorCategories: (oldState, data) => {
      return {
        ...oldState,
        vendorCategories: data,
      };
    },
    setSkillCategories: (oldState, data) => {
      return {
        ...oldState,
        skillCategories: data,
      };
    },
    setVendorList: (oldState, data) => {
      return {
        ...oldState,
        vendorList: data,
      };
    },
    setVendorsDetail: (oldState, data) => {
      return {
        ...oldState,
        vendorsDetail: data,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchActiveVendors(_, rootState) {
      try {
        const {
          activeFilter,
          activeSubFilter,
          sortOrder,
          feedData,
        } = rootState.vendorsModel;
        const dataForFilter = feedData[activeFilter];
        dispatch.vendorsModel.setLoading(true);
        const response = await vendorRequest(
          sortOrder,
          activeFilter,
          activeSubFilter,
          dataForFilter.token
        );
        let data = response.data;
        data.sortOrder = sortOrder;
        dispatch.vendorsModel.setFeedDataForKey(activeFilter, response.data);
      } catch (error) {
        console.log(error);
        throw new Error("Can not fetch active network");
      } finally {
        dispatch.vendorsModel.setLoading(false);
      }
    },
    async changeFilter(filterKey, rootState) {
      const { activeFilter, activeSubFilter } = rootState.vendorsModel;
      if (filterKey === activeFilter) {
        // changing to the currently active filter
        return;
      }
      if (activeSubFilter && activeSubFilter.length > 0) {
        // if there's a subfilter active, then invalidate the previous feed
        // the current subfilter will be removed on the new feed
        dispatch.vendorsModel.clearActiveFeedData();
      }
      const filterExists = filterKey in rootState.vendorsModel.feedData;
      if (
        filterExists &&
        rootState.vendorsModel.feedData[filterKey].token &&
        rootState.vendorsModel.feedData[filterKey].token.length > 0
      ) {
        // the filter to change to exists, and has had a fetch attempted
        // switch to it.
        dispatch.vendorsModel.setActiveFilter(filterKey);
      } else {
        dispatch.vendorsModel.initFeedDataForKey(filterKey);
        try {
          dispatch.vendorsModel.setLoading(true);
          const { sortOrder } = rootState.vendorsModel;
          const response = await vendorListRequest(
            sortOrder,
            filterKey.toLowerCase(),
            "",
            null
          );
          dispatch.vendorsModel.setVendorList(response.data.vendorList);
        } finally {
          dispatch.vendorsModel.setLoading(false);
        }
      }
    },
    async changeSubFilter(subfilter, rootState) {
      try {
        const { activeSubFilter } = rootState.vendorsModel;
        let subFilterToChangeTo = subfilter;
        if (activeSubFilter === subfilter) {
          // toggle
          subFilterToChangeTo = "";
        }
        const { activeFilter, sortOrder } = rootState.vendorsModel;
        dispatch.vendorsModel.clearActiveFeedData();
        dispatch.vendorsModel.setActiveSubFilter(subFilterToChangeTo);
        dispatch.vendorsModel.setLoading(true);
        const response = await vendorListRequest(
          sortOrder,
          activeFilter,
          subFilterToChangeTo,
          null
        );
        dispatch.vendorsModel.setVendorList(response.data.vendorList);
      } catch (error) {
        console.log(error);
        throw new Error("Can not change sub filter");
      } finally {
        dispatch.vendorsModel.setLoading(false);
      }
    },
    async inviteNewMember(data) {
      try {
        await postNewMember(data);
      } catch (error) {
        throw new Error("Can not add new member");
      }
    },
    async getVendorCategories() {
      try {
        const response = await getVendorCategoriesRequest();
        dispatch.vendorsModel.setVendorCategories(
          response.data.categories || []
        );
      } catch (error) {
        throw new Error("Can not get vendor categories.");
      }
    },
    async getSkillCategories() {
      try {
        const response = await getSkillCategoriesRequest();
        dispatch.vendorsModel.setSkillCategories(
          response.data.categories || []
        );
      } catch (error) {
        throw new Error("Can not get skill categories.");
      }
    },
    async fetchVendorList(filterKey, rootState) {
      try {
        const { sortOrder } = rootState.vendorsModel;
        dispatch.vendorsModel.setLoading(true);

        const response = await vendorListRequest(sortOrder, filterKey, "", "");
        dispatch.vendorsModel.setVendorList(response.data.vendorList);
      } catch (error) {
        throw new Error("Can not fetch vendor list");
      } finally {
        dispatch.vendorsModel.setLoading(false);
      }
    },
    async fetchVendorsDetail(name) {
      try {
        dispatch.vendorsModel.setLoading(true);
        const response = await vendorsDetailRequest(name);
        dispatch.vendorsModel.setVendorsDetail(response.data);
      } catch (error) {
        throw new Error("Can not fetch vendor detail");
      } finally {
        dispatch.vendorsModel.setLoading(false);
      }
    },
  }),
};
