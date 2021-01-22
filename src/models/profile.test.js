import { init } from "@rematch/core";
import profileModel, {
  profileRequest,
  saveProfileRequest,
  deletePostRequest,
} from "./profile";

const axios = require("axios");

const data = {
  profile: {
    userId: 8,
    firstName: "Julie22",
    lastName: "Herendeen1",
    userName: "julie",
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiZGVmYXVsdC1wcm9maWxlLWltYWdlLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjIwMCwiZml0IjoiY292ZXIifX19",
    title: "(blank)1",
    company: "(blank)1",
    companyLinkedin: "(blank)1",
    companyIndustry: "(blank)1",
    companyStage: "(blank)1",
    revenue: "(blank)1",
    city: "(blank)1",
    state: "(blank)1",
    country: "(blank)1",
    headline: "(blank)1",
    linkedin: "(blank)1",
    website: "(blank)1",
    mail: "mailto:julie@waltherfamily.com",
    about: {
      description:
        "Business leader and CMO with 25+ years of experience launching and scaling enduring technology brands, managing global businesses and building high performance marketing and product team. My passion, across companies big aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      networking: true,
      networkingOpportunities: "Networking Opportunities",
      advising: false,
      advisingOpportunities: "Advising Opportunities",
      areasOfExpertise: [
        "#leadership",
        "#advertising",
        "#public-relations",
        "#branding",
      ],
      areasOfInterest: [
        "#event-marketing",
        "#performance-marketing",
        "#account-based-marketing",
        "#account-based-marketing",
      ],
    },
    feedData: [
      {
        title: "My Agencies",
        enabled: true,
        data: [
          {
            headline: {
              markdown: "[test16](/agency/test16)",
            },
            slug: "test16",
            subheadlines: [
              {
                text:
                  "Unprecedented levels of change and disruption require new thinking and transformative approaches to growth. From purpose to product, brand to experience, customers to operations, we bring the insight, rigor and expertise needed to both uncover and realize transformative opportunities",
              },
              {
                markdown:
                  "Services: [Baidu Advertising](/directory/baidu-advertising), [Packaging Design](/directory/packaging-design), [SEM](/directory/sem), [Public Affairs PR](/directory/public-affairs-pr), [Market Research](/directory/market-research), [TV Advertising](/directory/tv-advertising), [Out of Home Advertising](/directory/out-of-home-advertising), [Snapchat Advertising](/directory/snapchat-advertising), [LinkedIn Advertising](/directory/linkedin-advertising)",
                categorytitles: [
                  "Baidu Advertising",
                  "Packaging Design",
                  "SEM",
                  "Public Affairs PR",
                  "Market Research",
                  "TV Advertising",
                  "Out of Home Advertising",
                  "Snapchat Advertising",
                  "LinkedIn Advertising",
                ],
              },
            ],
            subtitle: "North America",
            articletext: "ngng\nkjki\nhmnhfn\nhjg\nkjh\nzxcgb\ncbcs",
            articletextlines: 4,
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/default-agency-image.png",
            imageDisplay: "square",
            review_scores: [],
            mostRecentReview: "2020-08-20T16:47:13.769Z",
          },
          {
            headline: {
              markdown: "[Naranja AD](/agency/naranja-ad)",
            },
            slug: "naranja-ad",
            subheadlines: [
              {
                markdown:
                  "Services: [Mobile & App Marketing](/directory/mobile-app-marketing)",
                categorytitles: ["Mobile & App Marketing"],
              },
            ],
            subtitle: "North America",
            articletext: "Naranja!",
            articletextlines: 4,
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoibmFyYW5qYS1hZC0tcHJvZmlsZS5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMCwiaGVpZ2h0IjoxMDAsImZpdCI6ImNvdmVyIn19fQ==",
            imageDisplay: "square",
            review_scores: [],
            mostRecentReview: "2020-08-17T00:37:51.122Z",
          },
        ],
      },
      {
        title: "My Technologies",
        enabled: true,
        data: [
          {
            headline: {
              markdown: "[yo-wassup](/technology/yo-wassup)",
            },
            slug: "yo-wassup",
            subheadlines: [
              {
                markdown:
                  "Technologies: [Social Media Analytics](/directory/social-media-analytics), [Web and Content Software](/directory/web-and-content-software), [Account-Based Analytics](/directory/account-based-analytics)",
                categorytitles: [
                  "Social Media Analytics",
                  "Web and Content Software",
                  "Account-Based Analytics",
                ],
              },
            ],
            subtitle: "",
            articletext: "nn\nvv\nzzz",
            articletextlines: 4,
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/default-agency-image.png",
            imageDisplay: "square",
            review_scores: [],
            mostRecentReview: "2020-08-20T16:52:49.031Z",
          },
        ],
      },
      {
        title: "My Contractors",
        enabled: false,
        data: [],
      },
    ],
    isMyProfile: true,
    isNewuser: false,
  },
};

const deletedData = {
  profile: {
    userId: 8,
    firstName: "Julie22",
    lastName: "Herendeen1",
    userName: "julie",
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiZGVmYXVsdC1wcm9maWxlLWltYWdlLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjIwMCwiZml0IjoiY292ZXIifX19",
    title: "(blank)1",
    company: "(blank)1",
    companyLinkedin: "(blank)1",
    companyIndustry: "(blank)1",
    companyStage: "(blank)1",
    revenue: "(blank)1",
    city: "(blank)1",
    state: "(blank)1",
    country: "(blank)1",
    headline: "(blank)1",
    linkedin: "(blank)1",
    website: "(blank)1",
    mail: "mailto:julie@waltherfamily.com",
    about: {
      description:
        "Business leader and CMO with 25+ years of experience launching and scaling enduring technology brands, managing global businesses and building high performance marketing and product team. My passion, across companies big aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      networking: true,
      networkingOpportunities: "Networking Opportunities",
      advising: false,
      advisingOpportunities: "Advising Opportunities",
      areasOfExpertise: [
        "#leadership",
        "#advertising",
        "#public-relations",
        "#branding",
      ],
      areasOfInterest: [
        "#event-marketing",
        "#performance-marketing",
        "#account-based-marketing",
        "#account-based-marketing",
      ],
    },
    feedData: [
      {
        title: "My Agencies",
        enabled: true,
        data: [
          {
            headline: {
              markdown: "[Naranja AD](/agency/naranja-ad)",
            },
            slug: "naranja-ad",
            subheadlines: [
              {
                markdown:
                  "Services: [Mobile & App Marketing](/directory/mobile-app-marketing)",
                categorytitles: ["Mobile & App Marketing"],
              },
            ],
            subtitle: "North America",
            articletext: "Naranja!",
            articletextlines: 4,
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoibmFyYW5qYS1hZC0tcHJvZmlsZS5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMCwiaGVpZ2h0IjoxMDAsImZpdCI6ImNvdmVyIn19fQ==",
            imageDisplay: "square",
            review_scores: [],
            mostRecentReview: "2020-08-17T00:37:51.122Z",
          },
        ],
      },
      {
        title: "My Technologies",
        enabled: true,
        data: [
          {
            headline: {
              markdown: "[yo-wassup](/technology/yo-wassup)",
            },
            slug: "yo-wassup",
            subheadlines: [
              {
                markdown:
                  "Technologies: [Social Media Analytics](/directory/social-media-analytics), [Web and Content Software](/directory/web-and-content-software), [Account-Based Analytics](/directory/account-based-analytics)",
                categorytitles: [
                  "Social Media Analytics",
                  "Web and Content Software",
                  "Account-Based Analytics",
                ],
              },
            ],
            subtitle: "",
            articletext: "nn\nvv\nzzz",
            articletextlines: 4,
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/default-agency-image.png",
            imageDisplay: "square",
            review_scores: [],
            mostRecentReview: "2020-08-20T16:52:49.031Z",
          },
        ],
      },
      {
        title: "My Contractors",
        enabled: false,
        data: [],
      },
    ],
    isMyProfile: true,
    isNewuser: false,
  },
};

jest.mock("axios");

describe("profileModel model", () => {
  it("reducer: updateProfile", () => {
    const store = init({
      models: { profileModel },
    });

    store.dispatch.profileModel.updateProfile(data.profile);

    const profileModelData = store.getState().profileModel;
    expect(profileModelData.profile).toEqual(data.profile);
  }),
    it("reducer: removePost", () => {
      const store = init({
        models: { profileModel },
      });
      store.dispatch.profileModel.updateProfile(data.profile);
      store.dispatch.profileModel.removePost("test16");

      const profileModelData = store.getState().profileModel;
      expect(profileModelData.profile).toEqual(deletedData.profile);
    }),
    it("fetches successfully data from an API", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(data));

      await expect(profileRequest()).resolves.toEqual(data);
    }),
    it("fetches erroneously data from an API", async () => {
      const errorMessage = "Could not get profile";

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(profileRequest()).rejects.toThrow(errorMessage);
    }),
    it("save successfully data through an API", async () => {
      axios.post.mockImplementationOnce(() => Promise.resolve(data));

      await expect(saveProfileRequest()).resolves.toEqual(data);
    }),
    it("save erroneously data through an API", async () => {
      const errorMessage = "Could not get profile";

      axios.post.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(saveProfileRequest()).rejects.toThrow(errorMessage);
    });
  it("delete post successfully through an API", async () => {
    axios.delete.mockImplementationOnce(() => Promise.resolve(data));

    await expect(deletePostRequest()).resolves.toEqual(data);
  }),
    it("delete erroneously post through an API", async () => {
      const errorMessage = "Could not delete post";

      axios.delete.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(deletePostRequest()).rejects.toThrow(errorMessage);
    });
});
