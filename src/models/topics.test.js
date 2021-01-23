import { init } from "@rematch/core";
import topicsModel, { getTopicsRequest, followTopicRequest } from "./topics";

const axios = require("axios");

const data = {
  topics: [
    {
      name: "#advertising",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: false,
      id: 123,
    },
    {
      name: "#SEO",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: true,
      id: 456,
    },
    {
      name: "#corporate-communication",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: true,
      id: 234,
    },
    {
      name: "#digital-strategy",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: false,
      id: 345,
    },
    {
      name: "#expertise",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: true,
      id: 567,
    },
    {
      name: "#topics",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: false,
      id: 678,
    },
    {
      name: "#commercial-experience",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: true,
      id: 789,
    },
    {
      name: "#basic-understanding",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: true,
      id: 890,
    },
    {
      name: "#strategy",
      description:
        "Category description text -two lines of text and display show more and less",
      followed: false,
      id: 213,
    },
  ],
};

jest.mock("axios");

describe("topicsModel model", () => {
  it("reducer: updateTopics", () => {
    const store = init({
      models: { topicsModel },
    });

    store.dispatch.topicsModel.updateTopics(data.topics);

    const topicsModelData = store.getState().topicsModel;
    expect(topicsModelData.topics).toEqual(data.topics);
  }),
    it("reducer: updateFollowTopic", () => {
      const store = init({
        models: { topicsModel },
      });
      store.dispatch.topicsModel.updateTopics(data.topics);
      store.dispatch.topicsModel.updateFollowTopic("123");
      const newData = data.topics.map((item) => {
        if (item.id === "123") {
          return {
            ...item,
            followed: !item.followed,
          };
        }
        return item;
      });
      const topicsModelData = store.getState().topicsModel;
      expect(topicsModelData.topics).toEqual(newData);
    }),
    it("fetches successfully data from an API", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(data));

      await expect(getTopicsRequest()).resolves.toEqual(data);
    }),
    it("fetches erroneously data from an API", async () => {
      const errorMessage = "Could not get topics";

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(getTopicsRequest()).rejects.toThrow(errorMessage);
    }),
    it("follow successfully data through an API", async () => {
      axios.post.mockImplementation(() => Promise.resolve(data));

      await expect(followTopicRequest("1")).resolves.toEqual(data);
    }),
    it("follow erroneously data through an API", async () => {
      const errorMessage = "Could not follow topic";

      axios.post.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(followTopicRequest("1")).rejects.toThrow(errorMessage);
    });
});
