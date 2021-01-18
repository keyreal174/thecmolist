import axios from "axios";

const saveContent = (data) => {
  return axios.post("/api/content", data);
};

const getContent = () => {
  return axios.get(`/api/content/`);
};

export default {
  name: "contentModel",
  state: {
    content: {},
  },
  reducers: {
    setGroups: (rootState, groups) => {
      return {
        ...rootState,
        content: {
          groups,
        },
      };
    },
  },
  effects: (dispatch) => ({
    async shareContent(content) {
      try {
        if (content) {
          await saveContent(content);
        } else {
          throw new Error("Content is empty.");
        }
      } catch (error) {
        throw new Error("Could not save content.");
      }
    },
    async getContent() {
      try {
        const response = await getContent();
        const { groups } = response.data;
        dispatch.contentModel.setGroups(groups);
      } catch (error) {
        throw new Error("Could not get content");
      }
    },
  }),
};
