import { init } from "@rematch/core";
import settingsModel from "./settings";
const axios = require("axios");

jest.mock("axios");

describe("settingsModel model", () => {
  it("reducer: updateSettings", () => {
    const store = init({
      models: { settingsModel },
    });

    store.dispatch.settingsModel.updateSettings({
      email: "foo@gmail.com",
      allowDiscussions: true,
      allowActivity: true,
    });
    store.dispatch.settingsModel.updateSettings({
      email: "test@test.com",
      allowDiscussions: false,
      allowActivity: true,
    });

    const settingsModelData = store.getState().settingsModel;
    expect(settingsModelData.settings).toEqual({
      email: "test@test.com",
      allowDiscussions: false,
      allowActivity: true,
    });
  }),
    it("effect: settingsModel saveSetting error catch", async () => {
      const store = init({
        models: { settingsModel },
      });

      const validate = store.dispatch.settingsModel.saveSetting();

      await expect(validate).rejects.toThrow("Could not save settings");
    }),
    it("effect: settingsModel saveSetting", async () => {
      const store = init({
        models: { settingsModel },
      });

      axios.post.mockImplementation((path, data) => {
        Promise.resolve({ data: { success: true } });
      });

      await store.dispatch.settingsModel.saveSetting({
        email: "save@setting.com",
        allowDiscussions: false,
        allowActivity: true,
      });

      const settingsModelData = store.getState().settingsModel;
      expect(settingsModelData.settings).toEqual({
        email: "save@setting.com",
        allowDiscussions: false,
        allowActivity: true,
      });
    });
});
