import axios from "axios";

const saveComment = (id, comment) => {
  return axios.post(`/api/question/${id}`, comment);
};

const getQuestion = (id) => {
  return axios.get(`/api/question/${id}`);
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
    updateReplies: (oldState, data) => {
      return {
        ...oldState,
        replies: [...oldState.replies, data],
      };
    },
  },
  effects: (dispatch) => ({
    async fetchQuestion(id) {
      try {
        if (id) {
          const response = await getQuestion(id);
          const data = response.data;
          dispatch.questionModel.setQuestion(data);
        } else {
          throw new Error("Id not provided.");
        }
      } catch (err) {
        throw new Error("Could not fetch question.");
      }
    },
    async saveCommentToQuestion(comment, data) {
      try {
        if (data) {
          const { question_id: questionId } = data.questionModel.question;
          await saveComment(questionId, comment);
          dispatch.questionModel.updateReplies(comment);
        } else {
          throw new Error("Error saving the data");
        }
      } catch (err) {
        console.log("err", err);
        throw new Error("Could not save question.");
      }
    },
  }),
};
