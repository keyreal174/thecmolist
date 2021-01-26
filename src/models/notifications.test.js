import { init } from "@rematch/core";
import notificationsModel from "./notifications";
const axios = require("axios");

jest.mock("axios");

describe("notificationsModel model", () => {
  it("reducer: basic notificationsModel reducer", () => {
    const store = init({
      models: { notificationsModel },
    });

    store.dispatch.notificationsModel.setData({
      feedData: [1, 2, 3],
      token: "a",
      sortOrder: "Top",
    });

    const notificationsModelData = store.getState().notificationsModel;
    expect(notificationsModelData.feedData).toEqual([1, 2, 3]);
    expect(notificationsModelData.token).toBe("a");
    expect(notificationsModelData.moreData).toBe(true);
    expect(notificationsModelData.sortOrder).toBe("Top");
  }),
    it("reducer: notificationsModel should set moreData false if no data is passed", () => {
      const store = init({
        models: { notificationsModel },
      });

      store.dispatch.notificationsModel.setData({
        feedData: [],
        token: "a",
        sortOrder: "Top",
      });

      const notificationsModelData = store.getState().notificationsModel;
      expect(notificationsModelData.feedData).toEqual([]);
      expect(notificationsModelData.moreData).toBe(false);
    }),
    it("reducer: notificationsModel should append data if prior data exists", () => {
      const store = init({
        models: { notificationsModel },
      });

      store.dispatch.notificationsModel.setData({
        feedData: [1, 2, 3],
        token: "a",
        sortOrder: "Top",
      });
      store.dispatch.notificationsModel.setData({
        feedData: [4, 5],
        token: "a",
        sortOrder: "Top",
      });

      const notificationsModelData = store.getState().notificationsModel;
      expect(notificationsModelData.feedData).toEqual([1, 2, 3, 4, 5]);
      expect(notificationsModelData.moreData).toBe(true);
    }),
    it("effect: notificationsModel fetch data", async () => {
      const store = init({
        models: { notificationsModel },
      });

      // mock data
      axios.get.mockResolvedValue({
        data: {
          feedData: [1, 2],
          token: "e6a47504c76140880e6466f23eead514",
        },
      });
      await store.dispatch.notificationsModel.fetchNotifications("Top");

      const notificationsModelData = store.getState().notificationsModel;
      expect(notificationsModelData.feedData.length).toEqual(2);
      expect(notificationsModelData.moreData).toBe(true);
      expect(notificationsModelData.token).toBe(
        "e6a47504c76140880e6466f23eead514"
      );
    });
});
