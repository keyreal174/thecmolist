import axios from "axios";

const saveComment = (id, comment) => {
  return axios.post(`/api/question/${id}`, comment);
};

const getQuestion = (id) => {
  return axios.get(`/api/question/${id}`);
};

const postComment = (id, comment) => {
  return axios.post(`/api/comment/${id}`, comment);
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
        replies: [...oldState.question.replies, data],
      };
    },
    saveComment(oldState, data) {
      const { comment, replyId } = data;
      const newReplies = oldState.question.replies.map((reply) => {
        if (reply["reply_id"] === replyId) {
          reply.comments.push(comment);
        }
      });
      return {
        ...oldState,
        replies: newReplies,
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
    async saveCommentToReply(data) {
      const {
        comment,
        reply: { reply_id: replyId },
      } = data;
      try {
        await postComment(replyId, comment);
        dispatch.questionModel.saveComment({ replyId, comment });
      } catch (error) {
        console.log("error", error);
        throw new Error("Could not set comment");
      }
    },
  }),
};
