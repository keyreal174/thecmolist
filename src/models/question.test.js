import { init } from "@rematch/core";
import questionModel from "./question";
import { postAnswer, getQuestion, postComment } from "./question";
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

describe("question model", () => {
  /*
    reducer
    setQuestion
    saveAnswer
    saveComment

    effects
    fetchQuestion
    saveCommentToQuestion
    saveCommentToReply

  */
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

  it("reducer: saveComment", () => {
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
});
