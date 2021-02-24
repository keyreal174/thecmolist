import { init } from "@rematch/core";
import searchModel, {
  getFullSearchRequest,
  getRefinedSearchRequest,
} from "./search";
var fullSearch = require("../mocks/api_fullsearch.json");
var refinedSearch = require("../mocks/api_refinedsearch.json");

const axios = require("axios");

jest.mock("axios");

describe("searchModel model", () => {
  it("reducer: updateSearchResult", () => {
    const store = init({
      models: { searchModel },
    });

    store.dispatch.searchModel.updateSearchResult(fullSearch);

    const searchModelData = store.getState().searchModel;
    expect(searchModelData.searchResult).toEqual(fullSearch);
  }),
    it("reducer: setModule", () => {
      const store = init({
        models: { searchModel },
      });

      store.dispatch.searchModel.setModule(refinedSearch);

      const searchModelData = store.getState().searchModel;
      expect(searchModelData.modules).toEqual(refinedSearch.feedData);
    }),
    it("reducer: updateModule", () => {
      const store = init({
        models: { searchModel },
      });

      store.dispatch.searchModel.updateModule(refinedSearch);

      const searchModelData = store.getState().searchModel;
      expect(searchModelData.modules).toEqual(refinedSearch.feedData);
    }),
    it("search successfully full data from an API", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(fullSearch));

      await expect(getFullSearchRequest()).resolves.toEqual(fullSearch);
    }),
    it("search erroneously full data from an API", async () => {
      const errorMessage = "Could not get search full data";

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(getFullSearchRequest()).rejects.toThrow(errorMessage);
    }),
    it("search successfully refined data through an API", async () => {
      axios.get.mockImplementation(() => Promise.resolve(refinedSearch));

      await expect(getRefinedSearchRequest("query", "qa")).resolves.toEqual(
        refinedSearch
      );
    }),
    it("search erroneously refined data through an API", async () => {
      const errorMessage = "Could not get search refined data";

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(getRefinedSearchRequest("query", "qa")).rejects.toThrow(
        errorMessage
      );
    });
});
