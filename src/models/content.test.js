import { init } from "@rematch/core";
import contentModel from "./content";
import reactionModel from "./reaction";
import { replyContent } from "./content";
const axios = require("axios");

jest.mock("axios");

const data = {
  content_id: 12102948,
  content: {
    header: {
      markdown:
        "[Vas Swaminathan, Engineering Leader at Uber](/profile/vas) ![verified](https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg) ",
      subtext: "Asked a question #inbound #SaaS",
      image:
        "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
    },
    headline: {
      markdown:
        "Do you have any experience with deploying @HubSpot for a SaaS business with both a direct and self-serve model?",
    },
    articletext:
      "We are a series A B2B startup with a custom solution that no have a product defined to use. Any recommendation is more than welcomed",
    num_thanks: 5,
    num_insightful: 10,
  },
  replies: [
    {
      content_id: 123,
      content: {
        header: {
          markdown:
            "[Vas Swaminathan, Engineering Leader at Uber](/profile/vas) ![verified](https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg) ",
          subtext: "Posted an answer",
          image:
            "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
        },
        headline: {
          markdown: " ",
        },
        articletext:
          "We have used Hubspot extensively for our business, and are generally very happy with them. We started with a custom solution, and it look us a month to swich. The results have been dramatic, and feel free to",
      },
      comments: [
        {
          content: {
            header: {
              markdown:
                "[Vas Swaminathan, Engineering Leader at Uber](/profile/vas) ![verified](https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg) ",
              subtext: "Posted a comment",
              image:
                "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
            },
            headline: {
              markdown: " ",
            },
            articletext: "Comment 1",
          },
        },
      ],
    },
  ],
  related_questions: [
    {
      title: "First question and test text",
      link: "/question/123",
    },
    {
      title: "This is the second question",
      link: "/question/213",
    },
  ],
};

const comment = {
  content: {
    header: {
      markdown:
        "[Vas Swaminathan, Engineering Leader at Uber](/profile/vas) ![verified](https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg) ",
      subtext: "Posted a comment",
      image:
        "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
    },
    headline: {
      markdown: " ",
    },
    articletext: "Comment 2",
  },
};

describe("content model", () => {
  it("reducer: setQuestion", () => {
    const store = init({
      models: { contentModel },
    });

    store.dispatch.contentModel.setContent(data);
    const contentModelData = store.getState().contentModel;

    expect(contentModelData.content).toEqual(data);
  });

  it.skip("reducer: saveComment", () => {
    const store = init({
      models: { contentModel },
    });

    store.dispatch.contentModel.setContent(data);
    let contentModelData = store.getState().contentModel;

    expect(contentModelData.question.replies[0].comments.length).toEqual(1);
    store.dispatch.contentModel.saveComment({
      comment: "Comment 2",
      replyId: 123,
    });

    contentModelData = store.getState().contentModel;
    expect(contentModelData.question.replies[0].comments.length).toEqual(2);
  });

  it("effect: fetchContent", async () => {
    const store = init({
      models: { contentModel, reactionModel },
    });

    axios.get.mockResolvedValue({
      data: data,
    });

    await store.dispatch.contentModel.fetchContent("123");

    const contentModelData = store.getState().contentModel;
    expect(contentModelData.content).toEqual(data);
  });

  it("effect: fetchContent no id", async () => {
    const store = init({
      models: { contentModel },
    });

    const result = store.dispatch.contentModel.fetchContent();

    await expect(result).rejects.toThrow("Could not fetch content");
  });

  it.skip("effect: saveCommentToReply", async () => {
    const newData = { ...data };
    const store = init({
      models: { contentModel },
    });

    axios.get.mockResolvedValue({
      data: data,
    });

    await store.dispatch.contentModel.fetchContent(123);
    await store.dispatch.contentModel.saveCommentToReply({
      comment: "Comment 2",
      reply: { content_id: 123 },
    });

    newData.replies[0].comments.push(comment);
    const contentModelData = store.getState().contentModel;

    expect(contentModelData.question.replies).toEqual(newData.replies);
  });

  it("effect: saveCommentToReply no data", async () => {
    const store = init({
      models: { contentModel },
    });

    const result = store.dispatch.contentModel.saveCommentToReply();

    await expect(result).rejects.toThrow("Could not set comment");
  });

  it("effect: fetchContent no id", async () => {
    const store = init({
      models: { contentModel },
    });

    const result = store.dispatch.contentModel.fetchContent();

    await expect(result).rejects.toThrow("Could not fetch content");
  });

  it("effect: postAnswer", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(replyContent({ a: "MOCK" })).resolves.toEqual(data);
  });

  it("effect: postAnswer with error", async () => {
    const errorMessage = "Could not post an answer";
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(replyContent()).rejects.toThrow(errorMessage);
  });

  it("effect: saveReactionToCallerType error", async () => {
    const store = init({
      models: { contentModel },
    });

    const result = store.dispatch.contentModel.saveReactionToCallerType();
    await expect(result).rejects.toThrow("Could not save the reaction");
  });
});
