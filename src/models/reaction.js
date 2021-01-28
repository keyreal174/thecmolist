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
      return {
        ...oldState,
        reactions: data.reactions,
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
    async fetchReactions() {
      try {
        const response = await getReactions();
        const data = response.data;
        dispatch.reactionModel.setReactions(data);
      } catch (error) {
        throw new Error("Could not fetch reactions");
      }
    },
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
