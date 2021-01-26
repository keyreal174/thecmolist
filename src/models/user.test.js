import { init } from "@rematch/core";
import userModel from "./user";
const axios = require("axios");

jest.mock("axios");

describe("userModel model", () => {
  it("reducer: addConnectedUser", () => {
    const store = init({
      models: { userModel },
    });

    store.dispatch.userModel.addConnectedUser({
      user: "foo",
    });
    store.dispatch.userModel.addConnectedUser({
      user: "bar",
    });
    store.dispatch.userModel.addConnectedUser({
      user: "foo",
    });

    const userModelData = store.getState().userModel;
    expect(userModelData.localConnectedUsers).toEqual(["foo", "bar"]);
  }),
    it("effect: userModel connectUser", async () => {
      const store = init({
        models: { userModel },
      });

      // mock data
      axios.put.mockResolvedValue({
        data: {
          success: true,
        },
      });
      await store.dispatch.userModel.connectUser({ username: "foo_user" });

      const userModelData = store.getState().userModel;
      expect(userModelData.localConnectedUsers).toEqual(["foo_user"]);
    }),
    it("effect: userModel saveInvite", async () => {
      const store = init({
        models: { userModel },
      });

      let saveInviteData = null;
      axios.post.mockImplementation((path, data) => {
        saveInviteData = data;
        Promise.resolve({ data: { success: true } });
      });

      await store.dispatch.userModel.saveInvite([
        { name: "a", email: "foo@foo.com" },
      ]);
      expect(saveInviteData).not.toBeNull();
      expect(saveInviteData.length).toBe(1);
      expect(saveInviteData[0].name).toBe("a");
      expect(saveInviteData[0].email).toBe("foo@foo.com");
    }),
    it("follow successfully user through an API", async () => {
      const store = init({
        models: { userModel },
      });
      let followUserData = null;
      axios.post.mockImplementation((path, data) => {
        followUserData = data;
        Promise.resolve({ data: { success: true } });
      });

      await store.dispatch.userModel.followUser({
        user: "julie",
        data: [{ name: "agency", value: "agency" }],
      });

      expect(followUserData).not.toBeNull();
      expect(followUserData.user).toBe("julie");
      expect(followUserData.data).not.toBeNull();
      expect(followUserData.data[0].name).toBe("agency");
      expect(followUserData.data[0].value).toBe("agency");
    }),
    it("follow erroneously user through an API", async () => {
      const store = init({
        models: { userModel },
      });
      const errorMessage = "Could not follow user";

      axios.post.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(
        store.dispatch.userModel.followUser([
          { name: "agency", value: "agency" },
        ])
      ).rejects.toThrow(errorMessage);
    });
});
