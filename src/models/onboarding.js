import axios from "axios";

export const postOnboardingStep1 = (data) => {
  return axios.post("/api/onboarding/step1", data);
};

export const postOnboardingTopics = (data) => {
  return axios.post("/api/onboarding/topics", data);
};

export const postOnboardingIntro = (data) => {
  return axios.post("/api/onboarding/intro", data);
};

export const getOnboardingCategories = () => {
  return axios.get("/api/onboarding/topics");
};

export default {
  name: "onboardingModel",
  state: {
    categories: [],
  },
  reducers: {
    updateCategories(oldState, data) {
      return {
        ...oldState,
        categories: data.categories,
      };
    },
  },
  effects: (dispatch) => ({
    async submitOnboardingStep1(formData) {
      try {
        await postOnboardingStep1(formData);
      } catch (err) {
        throw new Error("Could not post onboarding step 1");
      }
    },
    async submitOnboardingTopics(formData) {
      try {
        await postOnboardingTopics(formData);
      } catch (err) {
        throw new Error("Could not post onboarding topics");
      }
    },
    async submitOnboardingIntro(formData) {
      try {
        await postOnboardingIntro(formData);
      } catch (err) {
        throw new Error("Could not post onboarding intro");
      }
    },
    async getCategories() {
      try {
        const response = await getOnboardingCategories();
        const data = response && response.data;
        dispatch.onboardingModel.updateCategories(data);
      } catch (err) {
        throw new Error("Could not get categories");
      }
    },
  }),
};
