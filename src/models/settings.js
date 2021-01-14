import axios from "axios";

const saveSettings = (data) => {
  return axios.post("/api/settings", data);
};

export default {
  name: "settingsModel",
  state: {
    settings: {}, // users we have connected to but not refreshed from server yet
  },
  reducers: {
    updateSettings: (oldState, data) => {
      return {
        ...oldState,
        settings: data,
      };
    },
  },
  effects: (dispatch) => ({
    async saveSetting(data) {
      await saveSettings(data);
      dispatch.settingsModel.updateSettings(data);
    },
  }),
};
