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

export default {
  name: "reactionModel",
  state: {
    reactions: [],
  },
  reducers: {
    setReactions: (oldState, data) => {
      let reactions = [
        {
          content_id: data.question_id,
          reactions: data.reactions,
        },
      ];
      (data.replies || []).forEach((reply) => {
        if (reply && reply.reactions) {
          reactions.push({
            content_id: reply.reply_id,
            reactions: reply.reactions.reactions,
          });
        }
      });
      return {
        ...oldState,
        reactions,
      };
    },
    setReaction: (oldState, data) => {
      const { id, type } = data;
      const newState = {
        reactions: [...oldState.reactions],
      };
      newState.reactions.map((reaction) => {
        if (reaction.content_id === id) {
          reaction.reactions.map((r) => {
            if (r.type === type) {
              r.checked = !r.checked;
            }
          });
        }
      });

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
