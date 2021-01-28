import axios from "axios";

export const getReactions = () => {
  return axios.get("/api/reactions");
};

export const setReaction = (contentId, reactions) => {
  return axios.post(`/api/change_reaction/${contentId}`, {
    data: reactions,
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
        if (reaction.id === id) {
          reaction.reactions.map((r) => {
            if (r.type === type) {
              r.state = !r.state;
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
    async changeReaction(id, type) {
      try {
        if ((id, type)) {
          const response = await setReaction({ id, type });
          const data = response.data;
          dispatch.reactionModel.setReaction(data);
        } else {
          throw new Error("Could not change reaction without id");
        }
      } catch (err) {}
    },
  }),
};
