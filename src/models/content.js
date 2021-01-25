import axios from "axios";

const saveContent = (data) => {
  return axios.post("/api/content", data);
};

export default {
  name: "contentModel",
  state: {},
  reducers: {},
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
  }),
};
