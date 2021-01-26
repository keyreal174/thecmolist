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
  MockedApiQuestion,
  MockedApiTopics;
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
  MockedApiQuestion = require("./api_question.json");
  MockedApiTopics = require("./api_topics.json");
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
    { path: /\/api\/agency.*/, responseCode: 200, response: MockedApiAgency },
    {
      path: /\/api\/settings.*/,
      responseCode: 200,
      response: MockedApiSettings,
    },
    { path: /\/api\/content.*/, responseCode: 200, response: MockedApiContent },
    {
      path: /\/api\/question\/\d+.*/,
      responseCode: 200,
      response: MockedApiQuestion,
    },
    { path: /\/api\/topics.*/, responseCode: 200, response: MockedApiTopics },
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
  mock.onGet("/api/logout").reply((config) => {
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

  mock.onPost("/api/follow_user").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/settings").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/content").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/profile").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(new RegExp("/api/topics/*")).reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost(/\/api\/reply_question\/\d+.*/).reply((postBody) => {
    console.log("data", postBody);
    return [
      200,
      {
        reply_id: Math.ceil(Math.random() * 1000),
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
        comments: [],
      },
    ];
  });

  mock.onPost(/\/api\/reply_comment\/\d+.*/).reply((postBody) => {
    return [
      200,
      {
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
    ];
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
