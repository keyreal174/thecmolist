import axios from "axios";

export const postOnboardingStep1 = (data) => {
  return axios.post("/api/onboarding/step1", data);
};

export const postOnboardingStep2 = (data) => {
  return axios.post("/api/onboarding/step2", data);
};

export const getOnboardingCategories = () => {
  return axios.get("/api/onboarding/step2");
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
    async submitOnboardingStep2(formData) {
      try {
        await postOnboardingStep2(formData);
      } catch (err) {
        throw new Error("Could not post onboarding step 2");
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
