import axios from "axios";

export const getReactions = () => {
  return axios.get("/api/reactions");
};

export const setReaction = (contentId, type) => {
  return axios.post(`/api/change_reaction/${contentId}`, {
    data: {
      type,
    },
  });
};

const initReactionModelForContent = () => {
  return {
    num_thanks: 0,
    num_insightful: 0,
    num_pass: 0,
    reactions: ["pass", "thanks", "insightful"].map((r) => ({
      type: r,
      checked: false,
    })),
  };
};
const getReactionsForContent = (data) => {
  let getReactions = (contentData) => {
    // init to default values (0 for everything)
    let reactionsForContent = initReactionModelForContent();

    // merge in values from contentData
    if (contentData.content) {
      if (contentData.content.num_pass >= 0) {
        reactionsForContent.num_pass = contentData.content.num_pass;
      }
      if (contentData.content.num_thanks >= 0) {
        reactionsForContent.num_thanks = contentData.content.num_thanks;
      }
      if (contentData.content.num_insightful >= 0) {
        reactionsForContent.num_insightful = contentData.content.num_insightful;
      }
    }
    if (contentData.reactions) {
      contentData.reactions.forEach((serverReaction) => {
        let idx = reactionsForContent.reactions.findIndex(
          (r) => r.type === serverReaction.type
        );
        if (idx >= 0) {
          reactionsForContent.reactions[idx] = { ...serverReaction };
        }
      });
    }
    return reactionsForContent;
  };

  let reactions = {};

  // set reactions data for replies
  (data.replies || []).forEach((reply) => {
    if ("content_id" in reply) {
      reactions[reply.content_id] = getReactions(reply);
    }
  });

  if ("content_id" in data) {
    // set reactions data for root content
    reactions[data.content_id] = getReactions(data);
  } else {
    // set reactions data for feed array. Exclude to execute this code in Content
    if (Array.isArray(data)) {
      data.forEach((d) => {
        const iterator = d.data ? d.data : data;
        iterator.forEach(({ content_id, ...rest }) => {
          if (content_id >= 0) {
            reactions[content_id] = getReactions(rest);
          }
        });
      });
    }
  }

  return reactions;
};

export default {
  name: "reactionModel",
  state: {
    reactions: {},
  },
  reducers: {
    setReactions: (oldState, data) => {
      const reactions = getReactionsForContent(data);
      return {
        ...oldState,
        reactions: {
          ...reactions,
        },
      };
    },
    setReaction: (oldState, data) => {
      const { id, type } = data;
      const newState = {
        reactions: { ...oldState.reactions },
      };
      const newReaction = newState.reactions[id];
      if (newReaction) {
        newReaction.reactions.map((r) => {
          if (r.type === type) {
            r.checked = !r.checked;
            if (r.checked) {
              newReaction[`num_${type}`]++;
            } else {
              newReaction[`num_${type}`]--;
            }
          }
        });
      } else {
        newState.reactions[id] = initReactionModelForContent();
        newState.reactions[id][`num_${type}`]++;
        newState.reactions[id].reactions.forEach((reaction) => {
          if (reaction.type === type) {
            reaction.checked = !reaction.checked;
          }
        });
      }

      return newState;
    },
  },
  effects: (dispatch) => ({
    async changeReaction(data) {
      try {
        const { id, engagement } = data;
        let engagementName = engagement;
        if (engagementName === "like") {
          // map 'like' engagement to thanks
          engagementName = "thanks";
        }
        await setReaction(id, engagementName);
        dispatch.reactionModel.setReaction({ id, type: engagementName });
      } catch (err) {
        throw new Error("Could not change reaction: " + err.toString());
      }
    },
  }),
};
