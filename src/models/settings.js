import axios from "axios";

const saveSettings = (data) => {
  return axios.post("/api/settings", data);
};

const getAccountInfo = () => {
  return axios.get(`/api/settings/`);
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

    async getSetting() {
      const response = await getAccountInfo();
      const { settings } = response.data;
      dispatch.settingsModel.updateSettings(settings);
    },
  }),
};
