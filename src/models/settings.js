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
    settings: {},
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
      try {
        if (data) {
          await saveSettings(data);
          dispatch.settingsModel.updateSettings(data);
        } else {
          throw new Error("Data is empty.");
        }
      } catch (err) {
        throw new Error("Could not save settings");
      }
    },

    async getSetting() {
      try {
        const response = await getAccountInfo();
        const { settings } = response.data;
        dispatch.settingsModel.updateSettings(settings);
      } catch (err) {
        throw new Error("Could not get settings");
      }
    },
  }),
};
