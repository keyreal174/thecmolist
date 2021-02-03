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

const getReactionsForContent = (data) => {
  let getReactions = (contentData) => {
    let reactionsForContent = {};
    if (contentData.content) {
      if (contentData.content.num_thanks >= 0) {
        reactionsForContent.num_thanks = contentData.content.num_thanks;
      }
      if (contentData.content.num_insightful >= 0) {
        reactionsForContent.num_insightful = contentData.content.num_insightful;
      }
    }
    if (contentData.reactions) {
      reactionsForContent.reactions = contentData.reactions;
    }
    return reactionsForContent;
  };

  let reactions = {};
  // set reactions data for root content
  let reactionsForContent = getReactions(data);
  if (Object.keys(reactionsForContent).length > 0) {
    reactions[data.content_id] = reactionsForContent;
  }
  // set reactions data for replies
  (data.replies || []).forEach((reply) => {
    let reactionsForReply = getReactions(reply);
    if (Object.keys(reactionsForReply).length > 0) {
      reactions[reply.content_id] = reactionsForReply;
    }
  });
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
        if (id) {
          await setReaction(id, engagement);
          dispatch.reactionModel.setReaction({ id, type: engagement });
        } else {
          throw new Error("Could not change reaction without id");
        }
      } catch (err) {
        throw new Error("Could not change reaction");
      }
    },
  }),
};
