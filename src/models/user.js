import axios from "axios";

const followUserRequest = (data) => {
  return axios.post("/api/follow_user", data);
};

const connectUserRequest = (user) => {
  return axios.post("/api/connect_user", user);
};

const disconnectUserRequest = (user) => {
  return axios.post("/api/disconnect_user", user);
};

const saveUserInviteRequest = (data) => {
  return axios.post("/api/userinvite", data);
};

export default {
  name: "userModel",
  state: {
    localConnectedUsers: [], // users we have connected to but not refreshed from server yet
  },
  reducers: {
    addConnectedUser: (oldState, data) => {
      const username = data.user;
      if (!oldState.localConnectedUsers.includes(username)) {
        return {
          ...oldState,
          localConnectedUsers: oldState.localConnectedUsers.concat([username]),
        };
      }
      return oldState;
    },
    removeConnectedUser: (oldState, data) => {
      const username = data.user;
      if (oldState.localConnectedUsers.includes(username)) {
        return {
          ...oldState,
          localConnectedUsers: oldState.localConnectedUsers.filter(
            (lcu) => lcu !== username
          ),
        };
      }
      return oldState;
    },
  },
  effects: (dispatch) => ({
    async saveInvite(data) {
      await saveUserInviteRequest(data);
    },
    async connectUser(data) {
      const userData = { user: data.user };
      await connectUserRequest(data);
      dispatch.userModel.addConnectedUser(userData);
    },
    async disconnectUser(data) {
      const userData = { user: data.username };
      await disconnectUserRequest(userData);
      dispatch.userModel.removeConnectedUser(userData);
    },
    async followUser(data) {
      try {
        await followUserRequest(data);
      } catch (err) {
        throw new Error("Could not follow user");
      }
    },
  }),
};
