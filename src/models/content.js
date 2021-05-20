import axios from "axios";

export const replyContent = (id, comment) => {
  return axios.post(`/api/reply_content/${id}`, {
    data: comment,
  });
};

export const getContent = (id) => {
  return axios.get(`/api/content/${id}`);
};

export const replyComment = (id, comment) => {
  return axios.post(`/api/reply_comment/${id}`, {
    data: comment,
  });
};

export const postContent = (content) => {
  return axios.post("/api/content", {
    data: content,
  });
};

export const postEditedContent = (content) => {
  return axios.post("/api/edit_content", {
    data: content,
  });
};

export const postVendors = (vendors) => {
  return axios.post("/api/vendors", {
    data: vendors,
  });
};

export default {
  name: "contentModel",
  state: {
    content: {},
    contentLoading: false,
  },
  reducers: {
    setContent: (oldState, data) => {
      return {
        ...oldState,
        content: data,
      };
    },
    saveReply: (oldState, data) => {
      const { newAnswer } = data;
      const newState = {
        content: { ...oldState.content },
      };
      if (!newState.content.replies) {
        newState.content.replies = [];
      }
      newState.content.replies.push(newAnswer);

      return newState;
    },
    saveComment(oldState, data) {
      const { newReply, replyId } = data;
      const newState = {
        content: { ...oldState.content },
      };
      newState.content.replies.map((reply) => {
        if (reply["content_id"] === replyId) {
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
    setLoading: (oldState, data) => {
      return {
        ...oldState,
        contentLoading: data,
      };
    },
  },
  effects: (dispatch) => ({
    async fetchContent(id) {
      try {
        if (id) {
          dispatch.contentModel.setLoading(true);

          const response = await getContent(id);
          const data = response.data;
          dispatch.contentModel.setContent(data);
          dispatch.reactionModel.setReactions(data);
        } else {
          throw new Error("Id not provided.");
        }
      } catch (err) {
        console.log(err);
        throw new Error("Could not fetch content.");
      } finally {
        dispatch.contentModel.setLoading(false);
      }
    },
    async saveCommentToContent(comment, data) {
      try {
        if (data) {
          const { content_id: contentId } = data.contentModel.content;
          const response = await replyContent(contentId, comment);
          dispatch.contentModel.saveReply({
            newAnswer: response.data,
          });
        } else {
          throw new Error("Data not provided");
        }
      } catch (err) {
        throw new Error("Could not save content.");
      }
    },
    async saveCommentToReply(data) {
      try {
        if (data) {
          let comment = data.comment;
          let replyId = data.reply.content_id;
          const response = await replyComment(replyId, comment);
          const reply = response && response.data;

          dispatch.contentModel.saveComment({
            newReply: reply,
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
          const { id, engagement } = data;
          dispatch.reactionModel.changeReaction({ id, engagement });
        } else {
          throw new Error("Could not save reaction");
        }
      } catch (err) {
        throw new Error("Could not save the reaction");
      }
    },
    async saveContent(data) {
      try {
        if (data) {
          const response = await postContent(data);
          const content = response.data;
          dispatch.contentModel.setContent(content);
          return content.content_id;
        } else {
          throw new Error("Could not save content without data");
        }
      } catch (error) {
        throw new Error("Could not save content");
      }
    },
    async saveEditedContent(data) {
      try {
        if (data) {
          const response = await postEditedContent(data);
          const content = response.data;
          dispatch.contentModel.setContent(content);
          return content.content_id;
        } else {
          throw new Error("Could not save content without data");
        }
      } catch (error) {
        throw new Error("Could not save content");
      }
    },
    async saveVendors(data) {
      try {
        if (data) {
          const response = await postVendors(data);
        } else {
          throw new Error("Could not save vendors without data");
        }
      } catch (error) {
        throw new Error("Could not save vendors");
      }
    },
  }),
};
