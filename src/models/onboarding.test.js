import { init } from "@rematch/core";
import onboardingModel from "./onboarding";

jest.mock("axios");

describe("feedModel model", () => {
  it("reducer: updateCategories ", () => {
    const MOCKED_CATEGORIES = ["leadership", "saas"];

    const store = init({
      models: { onboardingModel },
    });

    store.dispatch.onboardingModel.updateCategories({
      categories: MOCKED_CATEGORIES,
    });

    const onboardingModelData = store.getState().onboardingModel;

    expect(onboardingModelData.categories).toEqual(MOCKED_CATEGORIES);
  });
});
