import axios from "axios";

export const getReactions = () => {
  return axios.get("/api/reactions");
};

export const setReaction = (contentId, type) => {
  return axios.post(`/api/change_reaction/${contentId}`, {
    data: {
      type,
      contentId,
    },
  });
};

const getReactionsByType = (contentType, data) => {
  let reactions = {};
  switch (contentType) {
    case "question":
      reactions[data.question_id] = {
        reactions: data.reactions,
        num_thanks: data.question.num_thanks,
        num_insightful: data.question.num_insightful,
      };
      break;
    case "reply":
      (data.replies || []).forEach((reply) => {
        if (reply && reply.reactions) {
          reactions[reply.reply_id] = {
            reactions: reply.reactions.reactions,
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
      const questionReactions = getReactionsByType("question", data);
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
      }

      return {
        ...newState,
      };
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
