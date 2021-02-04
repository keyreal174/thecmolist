import { init } from "@rematch/core";
import reactionModel, { setReaction } from "./reaction";

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
  reactions: [
    {
      type: "thanks",
      checked: true,
    },
    {
      type: "insightful",
      checked: false,
    },
  ],
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
        num_thanks: 2,
        num_insightful: 4,
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
            articletext: "Comment 2",
          },
        },
      ],
      reactions: [
        {
          type: "thanks",
          checked: true,
        },
        {
          type: "insightful",
          checked: true,
        },
      ],
    },
    {
      content_id: 456,
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
          "We have used Hubspot extensively for our businessm and are generally very happy with them. We started with a custom solution, and it took us a month to switch. The results have been dramatic, and feel free to",
        num_thanks: 1,
        num_insightful: 2,
      },
      reactions: [
        {
          type: "thanks",
          checked: false,
        },
        {
          type: "insightful",
          checked: false,
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
    {
      title: "Next question",
      link: "/question/253",
    },
    {
      title: "Next question",
      link: "/question/255",
    },
  ],
};
const reactions = {
  12102948: {
    reactions: [
      {
        type: "thanks",
        checked: true,
      },
      {
        type: "insightful",
        checked: false,
      },
    ],
    num_insightful: 10,
    num_thanks: 5,
  },
  123: {
    reactions: [
      {
        type: "thanks",
        checked: true,
      },
      {
        type: "insightful",
        checked: true,
      },
    ],
    num_insightful: 4,
    num_thanks: 2,
  },
  456: {
    reactions: [
      {
        type: "thanks",
        checked: false,
      },
      {
        type: "insightful",
        checked: false,
      },
    ],
    num_insightful: 2,
    num_thanks: 1,
  },
};

describe("reactionModel model", () => {
  it("reducer: setReactions", () => {
    const store = init({
      models: { reactionModel },
    });

    store.dispatch.reactionModel.setReactions(data);
    const reactionModelData = store.getState().reactionModel;

    expect(reactionModelData.reactions).toEqual(reactions);
  });

  it("reducer: setReactions without any reaction data", () => {
    const store = init({
      models: { reactionModel },
    });

    // clone the data object and remove all references to reactions
    let dataNoReactions = JSON.parse(JSON.stringify(data));
    delete dataNoReactions.content.num_insightful;
    delete dataNoReactions.content.num_thanks;
    delete dataNoReactions.reactions;
    dataNoReactions.replies.forEach((reply) => {
      delete reply.content.num_insightful;
      delete reply.content.num_thanks;
      delete reply.reactions;
    });
    store.dispatch.reactionModel.setReactions(dataNoReactions);

    // we expect reaction model to set all reaction data to 0
    const reactionModelData = store.getState().reactionModel;
    let reactionKeys = Object.keys(reactionModelData.reactions);
    reactionKeys.forEach((key) => {
      let modelReactions = reactionModelData.reactions[key];
      expect(modelReactions.num_insightful).toEqual(0);
      expect(modelReactions.num_thanks).toEqual(0);
      expect(modelReactions.reactions.length).toEqual(2);
      expect(
        modelReactions.reactions.findIndex(
          (r) => r.type === "thanks" && !r.checked
        ) >= 0
      ).toEqual(true);
      expect(
        modelReactions.reactions.findIndex(
          (r) => r.type === "insightful" && !r.checked
        ) >= 0
      ).toEqual(true);
    });
  });

  it("reducer: setReaction", () => {
    const store = init({
      models: { reactionModel },
    });

    const id = 123;
    const engagement = "thanks";
    let reactions2 = { ...reactions };

    store.dispatch.reactionModel.setReactions(data);

    let reactionModelData = store.getState().reactionModel;
    expect(reactionModelData.reactions[id].reactions[0].checked).toEqual(true);
    expect(reactionModelData.reactions[id]["num_thanks"]).toEqual(2);

    store.dispatch.reactionModel.setReaction({ id, type: engagement });
    reactionModelData = store.getState().reactionModel;

    reactions2[id].reactions[0].checked = false;
    reactions2[id]["num_thanks"] = 1;
    expect(reactionModelData.reactions).toEqual(reactions2);
    expect(reactionModelData.reactions[id].reactions[0].checked).toEqual(false);
    expect(reactionModelData.reactions[id]["num_thanks"]).toEqual(1);
  });

  it("effect: change reaction error", async () => {
    const errorMessage = "Could not set reaction";

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(setReaction("123", "thanks")).rejects.toThrow(errorMessage);
  });
});
