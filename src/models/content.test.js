import { init } from "@rematch/core";
import contentModel from "./content";
const axios = require("axios");

jest.mock("axios");

describe("contentModel model", () => {
  it("effect: contentModel shareContent error catch", async () => {
    const store = init({
      models: { contentModel },
    });

    const validate = store.dispatch.contentModel.shareContent();

    await expect(validate).rejects.toThrow("Could not save content.");
  });
});
