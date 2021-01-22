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

const getNewReplyStructure = (comment) => {
  return {
    header: {
      markdown:
        "[Vas Swaminathan, Engineering Leader at Uber](/profile/vas) ![verified](https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg) created a new post in [TV Advertising](https://forum.thecmolist.com/t/110)",
      subtext: "Posted an answer",
      image:
        "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
    },
    headline: {
      markdown: " ",
    },
    articletext: comment,
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
    updateReplies: (oldState, data) => {
      return {
        ...oldState,
        replies: [...oldState.question.replies, data],
      };
    },
    saveComment(oldState, data) {
      const { comment, replyId } = data;
      const newReply = getNewReplyStructure(comment);
      const newReplies = oldState.question.replies.map((reply) => {
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
        ...oldState,
        question: {
          replies: newReplies,
        },
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
