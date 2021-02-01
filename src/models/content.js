import axios from "axios";

export const postAnswer = (id, comment) => {
  return axios.post(`/api/reply_question/${id}`, {
    data: comment,
  });
};

export const getQuestion = (id) => {
  return axios.get(`/api/question/${id}`);
};

export const postComment = (id, comment) => {
  return axios.post(`/api/reply_comment/${id}`, {
    data: comment,
  });
};

export const postReaction = (id, callerType, engagementType) => {
  return axios.post(`/api/post_reaction/${callerType}`, {
    data: {
      id,
      engagementType,
    },
  });
};

export const postContent = (content) => {
  return axios.post("/api/content", {
    data: content,
  });
};

export default {
  name: "contentModel",
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
    saveAnswer: (oldState, data) => {
      const { newAnswer } = data;
      debugger;
      const newState = {
        question: { ...oldState.question },
      };
      debugger;
      newState.question.replies.push(newAnswer);

      return {
        ...newState,
      };
    },
    saveComment(oldState, data) {
      const { newReply, replyId } = data;
      const newState = {
        question: { ...oldState.question },
      };
      newState.question.replies.map((reply) => {
        if (reply["reply_id"] === replyId) {
          if (reply.comments instanceof Array) {
            reply.comments.push(newReply);
          } else {
            reply.comments = [newReply];
          }
        }
        return reply;
      });
      return {
        ...newState,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchQuestion(id) {
      try {
        if (id) {
          const response = await getQuestion(id);
          const data = response.data;
          dispatch.contentModel.setQuestion(data);
          dispatch.reactionModel.setReactions(data);
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
          const { question_id: questionId } = data.contentModel.question;
          const response = await postAnswer(questionId, comment);
          dispatch.contentModel.saveAnswer({
            questionId,
            newAnswer: response.data,
          });
        } else {
          throw new Error("Error saving the data");
        }
      } catch (err) {
        throw new Error("Could not save question.");
      }
    },
    async saveCommentToReply(data) {
      try {
        if (data) {
          const {
            comment,
            reply: { reply_id: replyId },
          } = data;
          const response = await postComment(replyId, comment);
          dispatch.contentModel.saveComment({
            newReply: response.data,
            replyId,
          });
        } else {
          throw new Error("Could not save comment");
        }
      } catch (error) {
        throw new Error("Could not set comment");
      }
    },
    async saveReactionToCallerType(data) {
      try {
        if (data) {
          const { id, callerType, engagement } = data;
          await postReaction(id, callerType, engagement);
          //dispatch.contentModel.saveReaction(data);
          dispatch.reactionModel.changeReaction({ id, engagement });
        } else {
          throw new Error("Could not save reaction");
        }
      } catch (err) {
        throw new Error("Could not save the reaction");
      }
    },
  }),
};
