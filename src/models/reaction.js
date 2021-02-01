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

const getReactionsByType = (contentType, data) => {
  let reactions = {};
  switch (contentType) {
    case "content":
      if (data.reactions && data.content) {
        reactions[data.content_id] = {
          reactions: data.reactions,
          num_thanks: data.content.num_thanks,
          num_insightful: data.content.num_insightful,
        };
      }
      break;
    case "reply":
      (data.replies || []).forEach((reply) => {
        if (reply && reply.reactions) {
          reactions[reply.reply_id] = {
            reactions: reply.reactions,
            num_thanks: reply.num_thanks,
            num_insightful: reply.num_insightful,
          };
        }
      });
      break;
    default:
      break;
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
      // TODO: Review this code once new type of content is added.
      const questionReactions = getReactionsByType("content", data);
      const repliesReactions = getReactionsByType("reply", data);

      return {
        ...oldState,
        reactions: {
          ...questionReactions,
          ...repliesReactions,
        },
      };
    },
    setReaction: (oldState, data) => {
      const { id, type } = data;
      const newState = {
        reactions: { ...oldState.reactions },
      };
      const newReaction = newState.reactions[id];
      console.log(newReaction);
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
