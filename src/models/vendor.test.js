import { init } from "@rematch/core";
import vendorModel from "./vendor";
const axios = require("axios");

const data = {
  profile: {
    userId: 9,
    firstName: "Division",
    lastName: "of Lavor",
    userName: "Division of lavor",
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiZGVmYXVsdC1wcm9maWxlLWltYWdlLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjIwMCwiZml0IjoiY292ZXIifX19",
    title: "",
    company: "",
    followers: "1.4k",
    companyLinkedin: "(blank)1",
    companyIndustry: "(blank)1",
    companyStage: "(blank)1",
    revenue: "(blank)1",
    city: "Sausalito",
    state: "CA",
    country: "(blank)1",
    headline: "(blank)1",
    linkedin: "@division_L",
    website: "(blank)1",
    mail: "mailto:division@contact.com",
    about: {
      description:
        "Division of Labor is an independent, San Francisco advertising agency. We develop strategies and creative campaign to promote brands and sell products across all media platforms.",
      networking: true,
      networkingOpportunities: "Networking Opportunities",
      advising: false,
      advisingOpportunities: "Advising Opportunities",
      areasOfExpertise: [
        "#advertising",
        "#out-of-home-advertising",
        "#branding",
      ],
    },
    feedData: [
      {
        title: "Project",
        enabled: true,
        data: [
          {
            content_id: 12102927,
            content: {
              author: "Jonh Smith",
              header: {
                markdown: "[John Smith, CMO at Mordern Media](/profile/Jhon)",
                subtext:
                  "Shared a project #design #content-marketing #branding",
                image:
                  "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
              },
              headline: {
                markdown: "Launched redesigned homepage",
              },
              slug: "test16",
              subheadlines: [
                {
                  markdown: "",
                  categorytitles: [
                    "All Topics",
                    "Saas",
                    "LatAm",
                    "inbound",
                    "Europe",
                    "performance-marketing",
                    "facebook-advertising",
                  ],
                },
              ],
              articletext:
                "Great article about new ways to write SaaS landing pages. I think we should in particular look at using Template 3 and Template 7 for our system.",
              articletextlines: 4,
              imageDisplay: "square",
              review_scores: [],
              mostRecentReview: "2020-08-20T16:47:13.769Z",
              num_pass: 0,
              num_thanks: 5,
              num_insightful: 10,
            },
            reactions: [
              {
                type: "pass",
                checked: false,
              },
              {
                type: "thanks",
                checked: false,
              },
              {
                type: "insightful",
                checked: false,
              },
            ],
          },
        ],
      },
      {
        title: "Q & A",
        enabled: true,
        data: [
          {
            content_id: 12102926,
            content: {
              headline: {
                markdown: "[yo-wassup](/technology/yo-wassup)",
              },
              slug: "yo-wassup",
              subheadlines: [
                {
                  markdown:
                    "Technologies: [Social Media Analytics](/directory/social-media-analytics), [Web and Content Software](/directory/web-and-content-software), [Account-Based Analytics](/directory/account-based-analytics)",
                  categorytitles: [
                    "All Topics",
                    "Saas",
                    "LatAm",
                    "inbound",
                    "Europe",
                    "performance-marketing",
                    "facebook-advertising",
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
              num_pass: 2,
              num_thanks: 2,
              num_insightful: 2,
            },
            reactions: [
              {
                type: "pass",
                checked: false,
              },
              {
                type: "thanks",
                checked: false,
              },
              {
                type: "insightful",
                checked: false,
              },
            ],
          },
        ],
      },
      {
        title: "Articles",
        enabled: true,
        data: [
          {
            content_id: 12102925,
            content: {
              headline: {
                markdown: "[yo-wassup](/technology/yo-wassup)",
              },
              slug: "yo-wassup",
              subheadlines: [
                {
                  markdown:
                    "Technologies: [Social Media Analytics](/directory/social-media-analytics), [Web and Content Software](/directory/web-and-content-software), [Account-Based Analytics](/directory/account-based-analytics)",
                  categorytitles: [
                    "All Topics",
                    "Saas",
                    "LatAm",
                    "inbound",
                    "Europe",
                    "performance-marketing",
                    "facebook-advertising",
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
              num_pass: 0,
              num_thanks: 0,
              num_insightful: 0,
            },
            reactions: [
              {
                type: "pass",
                checked: false,
              },
              {
                type: "thanks",
                checked: false,
              },
              {
                type: "insightful",
                checked: false,
              },
            ],
          },
        ],
      },
    ],
    isMyProfile: false,
    isNewUser: true,
  },
};

jest.mock("axios");

describe("profileModel model", () => {
  it("reducer: updateProfile", () => {
    const store = init({
      models: { vendorModel },
    });

    store.dispatch.vendorModel.updateProfile(data.profile);

    const vendorModelData = store.getState().vendorModel;
    expect(vendorModelData.profile).toEqual(data.profile);
  });
});
