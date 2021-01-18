import { init } from "@rematch/core";
import contentModel from "./content";
const axios = require("axios");

jest.mock("axios");

describe("contentModel model", () => {
  it("reducer: setContent", () => {
    const store = init({
      models: { contentModel },
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
    it("effect: settingsModel shareContent error catch", async () => {
      const store = init({
        models: { settingsModel },
      });

      const validate = store.dispatch.settingsModel.saveSetting();

      await expect(validate).rejects.toThrow("Could not save settings");
    }),
    it("effect: settingsModel shareContent", async () => {
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

  it("effect: settingsModel getContent", async () => {
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
