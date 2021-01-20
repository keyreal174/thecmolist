import { init } from "@rematch/core";
import profileStatsModel, { getProfile } from "./profile_stats";

const axios = require("axios");

const data = {
  profile: {
    name: "Jennifer Smith",
    headline: "Brand at Modern Media",
    stats: {
      posts: 14,
      views: 2345,
      thanks: 34,
      insightful: 11,
    },
  },
  spaces: [
    {
      title: "#advertising",
      count: 12,
    },
    {
      title: "#social-media-marketing",
    },
  ],
};

jest.mock("axios");

describe("profileStatsModel model", () => {
  it("reducer: updateProfileStats", () => {
    const store = init({
      models: { profileStatsModel },
    });

    store.dispatch.profileStatsModel.updateProfileStats(data);

    const profileStatsModelData = store.getState().profileStatsModel;
    expect(profileStatsModelData.profileStats).toEqual(data);
  }),
    it("fetches successfully data from an API", async () => {
      const store = init({
        models: { profileStatsModel },
      });

      axios.get.mockImplementationOnce(() => Promise.resolve(data));

      await expect(getProfile()).resolves.toEqual(data);
    }),
    it("fetches erroneously data from an API", async () => {
      const errorMessage = "Could not get profilestats";

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(getProfile()).rejects.toThrow(errorMessage);
    });
});
