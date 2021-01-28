import axios from "axios";

export const getReactions = (contentId) => {
  return axios.get(`/api/change_reaction/${contentId}`);
};

export const setReaction = (contentId, reactions) => {
  return axios.post(`/api/change_reaction/${contentId}`, {
    data: reactions,
  });
};

export default {
  name: "reactionModel",
  state: {
    reactions: [
      {
        contentId: 25,
        reactions: [
          {
            type: "thanks",
            checked: false,
          },
          {
            type: "insigthful",
            checked: true,
          },
        ],
      },
    ],
  },
  reducers: {
    setReactions: (oldState, data) => {
      return {
        ...oldState,
        reactions: data.reactions,
      };
    },
    setReaction: (oldState, data) => {
      const { id } = data;
      const newState = {
        reactions: [...oldState.reactions],
      };

      newState.reactions.map((reaction) => {
        if (reaction.id === id) {
          reaction.checked = !reaction.checked;
        }
      });

      return {
        ...newState,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchReactions(id) {
      try {
        const response = await getReactions(id);
        const data = response.data;
        dispatch.reactionModel.setReactions(data);
      } catch (error) {
        throw new Error(`Could not fetch reactions for content id: ${id}`);
      }
    },
    async changeReaction(id) {
      try {
        if (id) {
          const response = await setReaction(id);
          const data = response.data;
          dispatch.reactionModel.setReaction(data);
        } else {
          throw new Error("Could not change reaction without id");
        }
      } catch (err) {}
    },
  }),
};
