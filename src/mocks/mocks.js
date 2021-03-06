var axios = require("axios");
var MockAdapter,
  MockedApiNetwork,
  MockedApiFeed,
  MockedApiFeedDashboard,
  MockedApiProfile,
  MockedApiAgency,
  MockedApiSettings,
  MockedApiProfileStats,
  MockedApiContent,
  MockedApiTopics,
  MockedApiFullSearch,
  MockedApiRefinedSearch,
  MockedApiVendorProfile,
  MockedApiVendorsProfile,
  MockedApiVendorsFlatListProfile,
  MockedApiVendorList,
  MockedApiVendorsDetail,
  MockedApiVendorCategories,
  MockedApiSkillCategories,
  MockedApiReactionsByPost,
  MockedApiSuggestions,
  MockedApiFollowersList,
  MockedApiFollowingList,
  MockedApiOnboardingTopics,
  MockedApiGuideList;
if (process.env.NODE_ENV !== "production") {
  MockAdapter = require("axios-mock-adapter");
  MockedApiNetwork = require("./api_network.json");
  MockedApiFeed = require("./api_feed.json");
  MockedApiFeedDashboard = require("./api_feeddashboard.json");
  MockedApiProfile = require("./api_profile.json");
  MockedApiAgency = require("./api_agency.json");
  MockedApiSettings = require("./api_settings.json");
  MockedApiProfileStats = require("./api_profilestats.json");
  MockedApiContent = require("./api_content.json");
  MockedApiTopics = require("./api_topics.json");
  MockedApiFullSearch = require("./api_fullsearch.json");
  MockedApiRefinedSearch = require("./api_refinedsearch.json");
  MockedApiVendorProfile = require("./api_vendor.json");
  MockedApiVendorsProfile = require("./api_vendors.json");
  MockedApiVendorsFlatListProfile = require("./api_vendors_flatlist.json");
  MockedApiVendorList = require("./api_vendorlist.json");
  MockedApiVendorsDetail = require("./api_vendorsdetail.json");
  MockedApiVendorCategories = require("./api_vendorcategories.json");
  MockedApiSkillCategories = require("./api_skillcategories.json");
  MockedApiReactionsByPost = require("./api_reactions_by_post.json");
  MockedApiSuggestions = require("./api_suggestions.json");
  MockedApiOnboardingTopics = require("./api_onboarding_topics.json");
  MockedApiFollowersList = require("./api_followers.json");
  MockedApiFollowingList = require("./api_following.json");
  MockedApiGuideList = require("./api_guides.json");
}
function MockRequests() {
  if (process.env.NODE_ENV === "production") return;
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(axios);
  let GetResponses = [
    { path: /\/api\/network.*/, responseCode: 200, response: MockedApiNetwork },
    {
      path: /\/api\/notifications.*/,
      responseCode: 200,
      response: MockedApiNetwork,
    },
    {
      path: /\/api\/feed_dashboard.*/,
      responseCode: 200,
      response: MockedApiFeedDashboard,
    },
    { path: /\/api\/feed.*/, responseCode: 200, response: MockedApiFeed },
    {
      path: /\/api\/profilestats.*/,
      responseCode: 200,
      response: MockedApiProfileStats,
    },
    { path: /\/api\/profile.*/, responseCode: 200, response: MockedApiProfile },
    {
      path: /\/api\/vendors.*/,
      responseCode: 200,
      response: MockedApiVendorsProfile,
    },
    {
      path: /\/api\/vendors_flatlist.*/,
      responseCode: 200,
      response: MockedApiVendorsFlatListProfile,
    },
    {
      path: /\/api\/vendor_list.*/,
      responseCode: 200,
      response: MockedApiVendorList,
    },
    {
      path: /\/api\/vendor_detail.*/,
      responseCode: 200,
      response: MockedApiVendorsDetail,
    },
    {
      path: /\/api\/vendor_categories/,
      responseCode: 200,
      response: MockedApiVendorCategories,
    },
    {
      path: /\/api\/skill_categories/,
      responseCode: 200,
      response: MockedApiSkillCategories,
    },
    {
      path: /\/api\/vendor/,
      responseCode: 200,
      response: MockedApiVendorProfile,
    },
    { path: /\/api\/agency.*/, responseCode: 200, response: MockedApiAgency },
    {
      path: /\/api\/settings.*/,
      responseCode: 200,
      response: MockedApiSettings,
    },
    { path: /\/api\/content.*/, responseCode: 200, response: MockedApiContent },
    { path: /\/api\/topics.*/, responseCode: 200, response: MockedApiTopics },
    {
      path: /\/api\/full_search.*/,
      responseCode: 200,
      response: MockedApiFullSearch,
    },
    {
      path: /\/api\/refined_search.*/,
      responseCode: 200,
      response: MockedApiRefinedSearch,
    },
    {
      path: /\/api\/entity_suggestions.*/,
      responseCode: 200,
      response: MockedApiSuggestions,
    },
    {
      path: /\/api\/topic_suggestions.*/,
      responseCode: 200,
      response: MockedApiSuggestions,
    },
    {
      path: /\/api\/onboarding\/topics.*/,
      responseCode: 200,
      response: MockedApiOnboardingTopics,
    },
    {
      path: /\/api\/lnkd_auth_url.*/,
      responseCode: 200,
      response: { url: "https://auth_with_linkedIn" },
    },
    {
      path: /\/api\/reactions\/\d+.*/,
      responseCode: 200,
      response: MockedApiReactionsByPost,
    },
    {
      path: /\/api\/followers.*/,
      responseCode: 200,
      response: MockedApiFollowersList,
    },
    {
      path: /\/api\/following.*/,
      responseCode: 200,
      response: MockedApiFollowingList,
    },
    {
      path: /\/api\/guides.*/,
      responseCode: 200,
      response: MockedApiGuideList,
    },
  ];

  // login/logout
  mock.onPost("/api/login").reply((config) => {
    return [
      200,
      { success: true, error: null },
      {
        "Set-Cookie": "ipipeauth=foo",
      },
    ];
  });
  mock.onPost("/api/logout").reply((config) => {
    return [
      200,
      { success: true, error: null },
      {
        Cookie: "ipipeauth=",
      },
    ];
  });

  // user invite
  mock.onPost("/api/connect_user").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/invite_user").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/disconnect_user").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/follow_user").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/settings").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/content").reply(() => {
    return [
      200,
      {
        content_id: 12102948,
        content: {
          header: {
            markdown: "Vas Swaminathan, Engineering Leader at Uber verified ",
            subtext: "Asked a question #inbound #SaaS",
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
          },
          headline: {
            markdown:
              "Do you have any experience with deploying @HubSpot for a SaaS business with both a direct and self-serve model?",
          },
          articletext:
            "We are a series A B2B startup with a custom solution that no have a product defined to use. Any recommendation is more than welcomed",
          num_thanks: 5,
          num_insightful: 10,
        },
        reactions: [
          {
            type: "thanks",
            checked: true,
          },
          {
            type: "insightful",
            checked: false,
          },
        ],
        replies: [],
        related_questions: [],
      },
    ];
  });

  mock.onPost("/api/edit_content").reply(() => {
    return [
      200,
      {
        content_id: 12102948,
        content: {
          header: {
            markdown: "Vas Swaminathan, Engineering Leader at Uber verified ",
            subtext: "Asked a question #inbound #SaaS",
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
          },
          headline: {
            markdown:
              "Do you have any experience with deploying @HubSpot for a SaaS business with both a direct and self-serve model?",
          },
          articletext:
            "We are a series A B2B startup with a custom solution that no have a product defined to use. Any recommendation is more than welcomed",
          num_thanks: 5,
          num_insightful: 10,
        },
        reactions: [
          {
            type: "thanks",
            checked: true,
          },
          {
            type: "insightful",
            checked: false,
          },
        ],
        replies: [],
        related_questions: [],
      },
    ];
  });

  mock.onPost("/api/profile").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/vendor").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(new RegExp("/api/topics/*")).reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(/\/api\/reply_content\/\d+.*/).reply((postBody) => {
    return [
      200,
      {
        content_id: Math.ceil(Math.random() * 1000),
        content: {
          header: {
            markdown:
              "[Vas Swaminathan, Engineering Leader at Uber](/profile/vas) ![verified](https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg)",
            subtext: "Posted an answer",
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
          },
          headline: {
            markdown: " ",
          },
          articletext: JSON.parse(postBody.data).data,
          num_thanks: 0,
          num_insightful: 0,
        },
        comments: [],
        reactions: [
          { type: "thanks", checked: false },
          { type: "insightful", checked: false },
        ],
      },
    ];
  });

  mock.onPost(/\/api\/reply_comment\/\d+.*/).reply((postBody) => {
    return [
      200,
      {
        content: {
          header: {
            markdown:
              "[Vas Swaminathan, Engineering Leader at Uber](/profile/vas) ![verified](https://gist.githubusercontent.com/vas85/c1107d88985d68d48c46d99690f03561/raw/62ca45f5e60ad1c3045943b39ee17e6ed7073178/check-circle1x.svg)",
            subtext: "Posted an answer",
            image:
              "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NTgxMDIzMjMwOWltYWdlLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
          },
          headline: {
            markdown: " ",
          },
          articletext: JSON.parse(postBody.data).data,
        },
      },
    ];
  });

  mock.onPost(/\/api\/post_reaction\/question.*/).reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(/\/api\/post_reaction\/reply.*/).reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(/\/api\/change_reaction\/\d+.*/).reply((data) => {
    return [
      200,
      {
        success: true,
        error: null,
        id: data.contentId,
        type: data.type,
      },
    ];
  });

  mock.onPost(new RegExp("/api/network/invite/*")).reply((data) => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(new RegExp("/api/onboarding/step1")).reply((data) => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(new RegExp("/api/onboarding/topics")).reply((data) => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(new RegExp("/api/onboarding/intro")).reply((data) => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(new RegExp("/api/vendors")).reply((data) => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(new RegExp("/api/skills")).reply((data) => {
    return [200, { success: true, error: null }];
  });

  mock.onDelete(new RegExp("/api/post/*")).reply(() => {
    return [200, { success: true, error: null }];
  });

  GetResponses.forEach((getResponse) => {
    mock.onGet(getResponse.path).reply((config) => {
      return [getResponse.responseCode, getResponse.response];
    });
  });
}

export default MockRequests;
