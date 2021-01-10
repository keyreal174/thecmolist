import { init } from "@rematch/core";
import networkModel from "./network";
const axios = require("axios");

jest.mock("axios");

describe("networkModel model", () => {
  it("reducer: basic networkModel reducer", () => {
    const store = init({
      models: { networkModel },
    });

    store.dispatch.networkModel.setData({
      feedData: [1, 2, 3],
      token: "a",
      sortOrder: "Top",
    });

    const networkModelData = store.getState().networkModel;
    expect(networkModelData.feedData).toEqual([1, 2, 3]);
    expect(networkModelData.token).toBe("a");
    expect(networkModelData.moreData).toBe(true);
    expect(networkModelData.sortOrder).toBe("Top");
  }),
    it("reducer: networkModel should set moreData false if no data is passed", () => {
      const store = init({
        models: { networkModel },
      });

      store.dispatch.networkModel.setData({
        feedData: [],
        token: "a",
        sortOrder: "Top",
      });

      const networkModelData = store.getState().networkModel;
      expect(networkModelData.feedData).toEqual([]);
      expect(networkModelData.moreData).toBe(false);
    }),
    it("reducer: networkModel should append data if prior data exists", () => {
      const store = init({
        models: { networkModel },
      });

      store.dispatch.networkModel.setData({
        feedData: [1, 2, 3],
        token: "a",
        sortOrder: "Top",
      });
      store.dispatch.networkModel.setData({
        feedData: [4, 5],
        token: "a",
        sortOrder: "Top",
      });

      const networkModelData = store.getState().networkModel;
      expect(networkModelData.feedData).toEqual([1, 2, 3, 4, 5]);
      expect(networkModelData.moreData).toBe(true);
    }),
    it("effect: networkModel fetch data", async () => {
      const store = init({
        models: { networkModel },
      });

      // mock data
      axios.get.mockResolvedValue({
        data: {
          feedData: [1, 2],
          token: "e6a47504c76140880e6466f23eead514",
        },
      });
      await store.dispatch.networkModel.fetchNetwork("Top");

      const networkModelData = store.getState().networkModel;
      expect(networkModelData.feedData.length).toEqual(2);
      expect(networkModelData.moreData).toBe(true);
      expect(networkModelData.token).toBe("e6a47504c76140880e6466f23eead514");
    });
});
