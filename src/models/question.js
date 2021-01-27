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
    saveAnswer: (oldState, data) => {
      const { newAnswer } = data;
      const newState = {
        question: { ...oldState.question },
      };
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
    saveReaction(oldState, data) {
      const { id, callerType, engagement: engagementType } = data;
      const newState = {
        question: { ...oldState.question },
      };
      if (callerType === "question") {
        switch (engagementType) {
          case "thanks":
            newState.question.question.num_thanks++;
            break;
          case "insightful":
            newState.question.question.num_insightful++;
            break;
          default:
            break;
        }
      } else {
        newState.question.replies.map((reply) => {
          if (reply.reply_id === id) {
            switch (engagementType) {
              case "thanks":
                reply.num_thanks++;
                break;
              case "insightful":
                reply.num_insightful++;
                break;
              default:
                break;
            }
          }
          return reply;
        });
      }

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
          const response = await postAnswer(questionId, comment);
          dispatch.questionModel.saveAnswer({
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
          dispatch.questionModel.saveComment({
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
          const { id, callerType, engagementType } = data;
          await postReaction(id, callerType, engagementType);
          dispatch.questionModel.saveReaction(data);
        } else {
          throw new Error("Could not save reaction");
        }
      } catch (err) {
        throw new Error("Could not save the reaction");
      }
    },
  }),
};
