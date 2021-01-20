import axios from "axios";

const saveQuestion = (data) => {
  return axios.post("/api/question/id", data);
};

const getQuestion = (id) => {
  return axios.get(`/api/question/id`);
};

export default {
  name: "questionModel",
  state: {
    question: {},
  },
  reducers: {
    setQuestion: (oldState, data) => {
      return {
        ...oldState,
        question: data,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchQuestion(id) {
      try {
        if (id) {
          const response = await getQuestion(id);
          const data = response.data;
          dispatch.settingsModel.setQuestion(data.question);
        } else {
          throw new Error("Id not provided.");
        }
      } catch (err) {
        throw new Error("Could not fetch question.");
      }
    },
  }),
};
