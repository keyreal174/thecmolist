import { init } from "@rematch/core";
import feedModel from "./feed";
const axios = require("axios");

jest.mock("axios");

describe("feedModel model", () => {
  it("reducer: basic feedModel reducer", () => {
    const store = init({
      models: { feedModel },
    });

    store.dispatch.feedModel.initFeedDataForKey("foo");
    const feedModelData = store.getState().feedModel;
    expect(feedModelData.dashboardFeedData["foo"].data).toBeTruthy();
    expect(feedModelData.dashboardFeedData["foo"].data.length).toBe(0);
    expect(feedModelData.dashboardFeedData["foo"].token).toBe("");
    expect(feedModelData.dashboardFeedData["foo"].moreData).toBe(false);
    expect(feedModelData.dashboardFeedData["foo"].enabled).toBe(true);
  }),
    it("reducer: feedModel reducer setData", () => {
      const store = init({
        models: { feedModel },
      });

      store.dispatch.feedModel.initFeedDataForKey("foo2");
      store.dispatch.feedModel.setFeedDataForKey("foo2", {
        feedData: [1, 2, 3],
        token: "bar",
      });
      const feedModelData = store.getState().feedModel;
      expect(feedModelData.dashboardFeedData["foo2"].data).toEqual([1, 2, 3]);
      expect(feedModelData.dashboardFeedData["foo2"].token).toBe("bar");
      expect(feedModelData.dashboardFeedData["foo2"].moreData).toBe(true);
      expect(feedModelData.dashboardFeedData["foo2"].enabled).toBe(true);
    }),
    it("reducer: feedModel reducer setData appends data", () => {
      const store = init({
        models: { feedModel },
      });

      store.dispatch.feedModel.initFeedDataForKey("foo4");
      store.dispatch.feedModel.setFeedDataForKey("foo4", {
        feedData: [1, 2, 3],
        token: "bar4",
      });
      const feedModelData = store.getState().feedModel;
      expect(feedModelData.dashboardFeedData["foo4"].data).toEqual([1, 2, 3]);
      expect(feedModelData.dashboardFeedData["foo4"].moreData).toBe(true);

      // now set no new data with a new token. we expect moreData == false
      store.dispatch.feedModel.setFeedDataForKey("foo4", {
        feedData: [4, 5, 6],
        token: "bar5",
      });
      const feedModelDataNew = store.getState().feedModel;
      expect(feedModelDataNew.dashboardFeedData["foo4"].data).toEqual([
        1,
        2,
        3,
        4,
        5,
        6,
      ]);
      expect(feedModelDataNew.dashboardFeedData["foo4"].moreData).toBe(true);
    }),
    it("reducer: feedModel reducer setData sets moreData to false", () => {
      const store = init({
        models: { feedModel },
      });

      store.dispatch.feedModel.initFeedDataForKey("foo3");
      store.dispatch.feedModel.setFeedDataForKey("foo3", {
        feedData: [1, 2, 3],
        token: "bar",
      });
      const feedModelData = store.getState().feedModel;
      expect(feedModelData.dashboardFeedData["foo3"].data).toEqual([1, 2, 3]);
      expect(feedModelData.dashboardFeedData["foo3"].moreData).toBe(true);

      // now set no new data with a new token. we expect moreData == false
      store.dispatch.feedModel.setFeedDataForKey("foo3", {
        feedData: [],
        token: "bar2",
      });
      const feedModelDataNew = store.getState().feedModel;
      expect(feedModelDataNew.dashboardFeedData["foo3"].data).toEqual([
        1,
        2,
        3,
      ]);
      expect(feedModelDataNew.dashboardFeedData["foo3"].moreData).toBe(false);
    }),
    it("reducer: feedModel reducer throws on non-existant key", () => {
      const store = init({
        models: { feedModel },
      });
      let caught = false;
      try {
        store.dispatch.feedModel.setFeedDataForKey("foo_doesnt_exist", {
          data: [1, 2, 3],
          token: "bar",
        });
      } catch (e) {
        caught = true;
      }
      expect(caught).toBe(true);
    }),
    it("effect: feedModel fetch data, none existing", async () => {
      const store = init({
        models: { feedModel },
      });
      // mock data
      axios.get.mockResolvedValue({
        data: {
          feedData: [1, 2],
          token: "bar22",
        },
      });
      await store.dispatch.feedModel.changeDashboardFilter({
        filter: "a",
        subfilter: "b",
      });

      const feedModelData = store.getState().feedModel;
      expect(feedModelData.dashboardFeedData["a%%b"].data).toEqual([1, 2]);
      expect(feedModelData.dashboardFeedData["a%%b"].token).toBe("bar22");
      expect(feedModelData.dashboardFeedData["a%%b"].moreData).toBe(true);
      expect(feedModelData.dashboardFeedData["a%%b"].enabled).toBe(true);
    }),
    it("effect: feedModel fetch data, existing data", async () => {
      const store = init({
        models: { feedModel },
      });

      store.dispatch.feedModel.initFeedDataForKey("c%%d");
      store.dispatch.feedModel.setFeedDataForKey("c%%d", {
        feedData: [1, 2, 3],
        token: "bar",
      });

      store.dispatch.feedModel.initFeedDataForKey("e%%f");
      store.dispatch.feedModel.setFeedDataForKey("e%%f", {
        feedData: [4, 5],
        token: "bar44",
      });

      let feedModelData = store.getState().feedModel;
      expect(feedModelData.activeFeed).toEqual([4, 5]);
      expect(feedModelData.activeFilter).toEqual("e%%f");

      // change filter effect
      await store.dispatch.feedModel.changeDashboardFilter({
        filter: "c",
        subfilter: "d",
      });

      feedModelData = store.getState().feedModel;
      expect(feedModelData.activeFeed).toEqual([1, 2, 3]);
      expect(feedModelData.activeFilter).toEqual("c%%d");
    });
});
