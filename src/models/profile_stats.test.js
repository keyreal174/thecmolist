import { init } from "@rematch/core";
import profileStatsModel, { getProfile } from "./profile_stats";

const axios = require("axios");

const data = {
  profile: {
    name: "Jennifer Smith",
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5OTA2NzA1OTQ0NzAxNy1IZWFkc2hvdHMocHBfdzc2OF9oNjE0KS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
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
