import { init } from "@rematch/core";
import contentModel from "./content";
const axios = require("axios");

jest.mock("axios");

describe("contentModel model", () => {
  it("reducer: setGroups", () => {
    const store = init({
      models: { contentModel },
    });
    const groups = [{ MOCK_KEY: "MOCK_VALUE" }];

    store.dispatch.contentModel.setGroups({
      groups: groups,
    });

    const contentModelData = store.getState().contentModel;
    expect(contentModelData.content).toEqual({ groups: { groups } });
  });

  it("effect: contentModel shareContent error catch", async () => {
    const store = init({
      models: { contentModel },
    });

    const validate = store.dispatch.contentModel.shareContent();

    await expect(validate).rejects.toThrow("Could not save content.");
  });

  it("effect: contentModel getContent", async () => {
    const store = init({
      models: { contentModel },
    });
    const groups = [{ MOCK_KEY: "MOCK_VALUE" }];

    axios.get.mockResolvedValue({
      data: {
        groups,
      },
    });

    await store.dispatch.contentModel.getContent();

    const contentModelData = store.getState().contentModel;

    expect(contentModelData.content).toEqual({ groups });
  });
});
