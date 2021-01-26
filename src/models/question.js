import axios from "axios";

export const postAnswer = (id, comment) => {
  return axios.post(`/api/question/${id}`, comment);
};

export const getQuestion = (id) => {
  return axios.get(`/api/question/${id}`);
};

export const postComment = (id, comment) => {
  return axios.post(`/api/comment/${id}`, comment);
};

const getNewAnswerStructure = (comment) => {
  return {
    reply_id: Math.ceil(Math.random() * 1000),
    header: {
      markdown:
        "[Vas Swaminathan, Engineering Leader at Uber](/profile/vas) ![verified](https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg)",
      subtext: "Posted an answer",
      image:
        "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
    },
    headline: {
      markdown: " ",
    },
    articletext: comment,
    comments: [],
  };
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
      const { comment } = data;
      const newAnswer = getNewAnswerStructure(comment);

      return {
        ...oldState,
        question: {
          replies: [...oldState.question.replies, newAnswer],
        },
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
          await postAnswer(questionId, comment);
          dispatch.questionModel.saveAnswer({ questionId, comment });
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
  }),
};
