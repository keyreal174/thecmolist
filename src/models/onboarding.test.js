import { init } from "@rematch/core";
import onboardingModel, {
  postOnboardingStep1,
  postOnboardingTopics,
} from "./onboarding";

const axios = require("axios");
jest.mock("axios");

describe("feedModel model", () => {
  let store;

  beforeEach(() => {
    store = init({
      models: {
        onboardingModel,
      },
    });
  });

  it("reducer: updateCategories ", () => {
    const MOCKED_CATEGORIES = ["leadership", "saas"];

    store.dispatch.onboardingModel.updateCategories({
      categories: MOCKED_CATEGORIES,
    });

    const onboardingModelData = store.getState().onboardingModel;

    expect(onboardingModelData.categories).toEqual(MOCKED_CATEGORIES);
  });

  it("effect: submitOnboardingStep1", async () => {
    const errorMessage = "Could not submit step 1";

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(postOnboardingTopics()).rejects.toThrow(errorMessage);
  });

  it("effect: submitOnboardingTopics", async () => {
    const errorMessage = "Could not submit step 2";

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(postOnboardingTopics()).rejects.toThrow(errorMessage);
  });

  it("effect: getCategories", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          categories: [1, 2],
        },
      })
    );
    await store.dispatch.onboardingModel.getCategories();

    const onboardingModelData = store.getState().onboardingModel;

    expect(onboardingModelData.categories).toStrictEqual([1, 2]);
  });
});
