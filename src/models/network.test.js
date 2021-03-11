import { init } from "@rematch/core";
import networkModel from "./network";
const axios = require("axios");

jest.mock("axios");

describe("networkModel model", () => {
  it("reducer: initFeedDataForKey", () => {
    const store = init({
      models: { networkModel },
    });
    const DATA_KEY = "TEST";
    store.dispatch.networkModel.initFeedDataForKey(DATA_KEY);
    const networkModelData = store.getState().networkModel;

    expect(networkModelData.feedData[DATA_KEY].title).toEqual(DATA_KEY);
    expect(networkModelData.feedData[DATA_KEY].data).toEqual([]);
    expect(networkModelData.feedData[DATA_KEY].enabled).toEqual(true);
  });

  it("reducer: setLoading", () => {
    const store = init({
      models: { networkModel },
    });
    store.dispatch.networkModel.setLoading(true);
    const networkModelData = store.getState().networkModel;

    expect(networkModelData.loadingNetwork).toEqual(true);
  });

  it("reducer: setFeedDataForKey", () => {
    const store = init({
      models: { networkModel },
    });
    const DATA = {
      sortOrder: "recent",
      token: "ab",
      feedData: [1, 2],
    };
    const FILTER_KEY = "FOO";

    store.dispatch.networkModel.initFeedDataForKey(FILTER_KEY);
    store.dispatch.networkModel.setFeedDataForKey(FILTER_KEY, DATA);

    const networkModelData = store.getState().networkModel;

    expect(networkModelData.activeFeed).toEqual(DATA.feedData);
    expect(networkModelData.activeFilter).toEqual(FILTER_KEY);
    expect(networkModelData.sortOrder).toEqual(DATA.sortOrder);
    expect(networkModelData.feedData[FILTER_KEY].token).toEqual(DATA.token);
    expect(networkModelData.feedData[FILTER_KEY].title).toEqual(FILTER_KEY);
    expect(networkModelData.feedData[FILTER_KEY].data).toEqual(DATA.feedData);
    expect(networkModelData.feedData[FILTER_KEY].enabled).toEqual(true);
  });

  it("reducer: setActiveFilter", () => {
    const store = init({
      models: { networkModel },
    });
    const FILTER_KEY = "BAR";

    store.dispatch.networkModel.initFeedDataForKey(FILTER_KEY);
    store.dispatch.networkModel.setActiveFilter(FILTER_KEY);

    const networkModelData = store.getState().networkModel;

    expect(networkModelData.activeFilter).toEqual(FILTER_KEY);
  });

  it("reducer: setActiveSortOrder", () => {
    const store = init({
      models: { networkModel },
    });
    const SORT_ORDER = "FANCY";

    store.dispatch.networkModel.setActiveSortOrder(SORT_ORDER);

    const networkModelData = store.getState().networkModel;

    expect(networkModelData.sortOrder).toEqual(SORT_ORDER);
  });
});
