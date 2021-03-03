import { init } from "@rematch/core";
import suggestionsModel, {
  fetchSuggestionsRequest,
  fetchTopicSuggestionsRequest,
} from "./suggestions";
const axios = require("axios");

const mentions = [
  {
    name: "Matthew Russell",
    link: "https://twitter.com/mrussell247",
    avatar:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    name: "Julian Krispel-Samsel",
    link: "https://twitter.com/juliandoesstuff",
    avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
  },
  {
    name: "Jyoti Puri",
    link: "https://twitter.com/jyopur",
    avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
  },
  {
    name: "Max Stoiber",
    link: "https://twitter.com/mxstbr",
    avatar: "https://avatars0.githubusercontent.com/u/7525670?s=200&v=4",
  },
  {
    name: "Nik Graf",
    link: "https://twitter.com/nikgraf",
    avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
  },
  {
    name: "Pascal Brandt",
    link: "https://twitter.com/psbrandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
];

jest.mock("axios");

describe("suggestionsModel model", () => {
  it("reducer: updateSuggestions", () => {
    const store = init({
      models: { suggestionsModel },
    });

    store.dispatch.suggestionsModel.updateSuggestions(mentions);

    const suggestionsModelData = store.getState().suggestionsModel;
    expect(suggestionsModelData.suggestions).toEqual(mentions);
  }),
    it("reducer: updateTopicSuggestions", () => {
      const store = init({
        models: { suggestionsModel },
      });

      store.dispatch.suggestionsModel.updateTopicSuggestions(mentions);

      const suggestionsModelData = store.getState().suggestionsModel;
      expect(suggestionsModelData.topicSuggestions).toEqual(mentions);
    }),
    it("fetch successfully full mention data from an API", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(mentions));

      await expect(fetchSuggestionsRequest()).resolves.toEqual(mentions);
    }),
    it("fetch erroneously full mention data from an API", async () => {
      const errorMessage = "Could not get suggestions";

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(fetchSuggestionsRequest()).rejects.toThrow(errorMessage);
    }),
    it("fetch successfully topic mention data from an API", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(mentions));

      await expect(fetchTopicSuggestionsRequest()).resolves.toEqual(mentions);
    }),
    it("fetch erroneously topic mention data from an API", async () => {
      const errorMessage = "Could not get topic suggestions";

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(fetchTopicSuggestionsRequest()).rejects.toThrow(
        errorMessage
      );
    });
});
