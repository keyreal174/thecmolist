import { init } from "@rematch/core";
import questionModel from "./question";
import reactionModel from "./reaction";
import { postAnswer } from "./question";
const axios = require("axios");

jest.mock("axios");

const data = {
  question_id: 12102948,
  question: {
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
      reply_id: 123,
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
      comments: [
        {
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
};

describe("question model", () => {
  it("reducer: setQuestion", () => {
    const store = init({
      models: { questionModel },
    });

    store.dispatch.questionModel.setQuestion(data);
    const questionModelData = store.getState().questionModel;

    expect(questionModelData.question).toEqual(data);
  });

  it("reducer: saveAnswer", () => {
    const store = init({
      models: { questionModel },
    });

    store.dispatch.questionModel.setQuestion(data);
    let questionModelData = store.getState().questionModel;

    expect(questionModelData.question.replies.length).toEqual(1);
    store.dispatch.questionModel.saveAnswer("Comment 2");

    questionModelData = store.getState().questionModel;
    expect(questionModelData.question.replies.length).toEqual(2);
  });

  it.skip("reducer: saveComment", () => {
    const store = init({
      models: { questionModel },
    });

    store.dispatch.questionModel.setQuestion(data);
    let questionModelData = store.getState().questionModel;

    expect(questionModelData.question.replies[0].comments.length).toEqual(1);
    store.dispatch.questionModel.saveComment({
      comment: "Comment 2",
      replyId: 123,
    });

    questionModelData = store.getState().questionModel;
    expect(questionModelData.question.replies[0].comments.length).toEqual(2);
  });

  it("effect: fetchQuestion", async () => {
    const store = init({
      models: { questionModel, reactionModel },
    });

    axios.get.mockResolvedValue({
      data: data,
    });

    await store.dispatch.questionModel.fetchQuestion("123");

    const questionModelData = store.getState().questionModel;
    expect(questionModelData.question).toEqual(data);
  });

  it("effect: fetchQuestion no id", async () => {
    const store = init({
      models: { questionModel },
    });

    const result = store.dispatch.questionModel.fetchQuestion();

    await expect(result).rejects.toThrow("Could not fetch question");
  });

  it.skip("effect: saveCommentToReply", async () => {
    const newData = { ...data };
    const store = init({
      models: { questionModel },
    });

    axios.get.mockResolvedValue({
      data: data,
    });

    await store.dispatch.questionModel.fetchQuestion(123);
    await store.dispatch.questionModel.saveCommentToReply({
      comment: "Comment 2",
      reply: { reply_id: 123 },
    });

    newData.replies[0].comments.push(comment);
    const questionModelData = store.getState().questionModel;

    expect(questionModelData.question.replies).toEqual(newData.replies);
  });

  it("effect: saveCommentToReply no data", async () => {
    const store = init({
      models: { questionModel },
    });

    const result = store.dispatch.questionModel.saveCommentToReply();

    await expect(result).rejects.toThrow("Could not set comment");
  });

  it("effect: fetchQuestion no id", async () => {
    const store = init({
      models: { questionModel },
    });

    const result = store.dispatch.questionModel.fetchQuestion();

    await expect(result).rejects.toThrow("Could not fetch question");
  });

  it("effect: postAnswer", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(postAnswer({ a: "MOCK" })).resolves.toEqual(data);
  });

  it("effect: postAnswer with error", async () => {
    const errorMessage = "Could not post an answer";
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(postAnswer()).rejects.toThrow(errorMessage);
  });

  it("effect: saveReactionToCallerType error", async () => {
    const store = init({
      models: { questionModel },
    });

    const result = store.dispatch.questionModel.saveReactionToCallerType();
    await expect(result).rejects.toThrow("Could not save the reaction");
  });

  it("reducer: saveReaction", async () => {
    const store = init({
      models: { questionModel, reactionModel },
    });

    axios.get.mockResolvedValue({
      data: data,
    });

    await store.dispatch.questionModel.fetchQuestion(123);
    await store.dispatch.questionModel.saveReaction({
      id: 123,
      callerType: "question",
      engagement: "answer",
      checked: true,
    });
    const newData = { ...data };

    newData.question.num_thanks = 5;

    const questionModelData = store.getState().questionModel;
    expect(questionModelData.question).toEqual(newData);
  });
});
