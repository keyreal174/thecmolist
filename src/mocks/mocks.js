var axios = require("axios");
var MockAdapter,
  MockedApiNetwork,
  MockedApiFeed,
  MockedApiFeedDashboard,
  MockedApiProfile,
  MockedApiAgency,
  MockedApiSettings,
  MockedApiContent;
if (process.env.NODE_ENV !== "production") {
  MockAdapter = require("axios-mock-adapter");
  MockedApiNetwork = require("./api_network.json");
  MockedApiFeed = require("./api_feed.json");
  MockedApiFeedDashboard = require("./api_feeddashboard.json");
  MockedApiProfile = require("./api_profile.json");
  MockedApiAgency = require("./api_agency.json");
  MockedApiSettings = require("./api_settings.json");
  MockedApiContent = require("./api_content.json");
}
function MockRequests() {
  if (process.env.NODE_ENV === "production") return;
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(axios);
  let GetResponses = [
    { path: /\/api\/network.*/, responseCode: 200, response: MockedApiNetwork },
    {
      path: /\/api\/feed_dashboard.*/,
      responseCode: 200,
      response: MockedApiFeedDashboard,
    },
    { path: /\/api\/feed.*/, responseCode: 200, response: MockedApiFeed },
    { path: /\/api\/profile.*/, responseCode: 200, response: MockedApiProfile },
    { path: /\/api\/agency.*/, responseCode: 200, response: MockedApiAgency },
    {
      path: /\/api\/settings.*/,
      responseCode: 200,
      response: MockedApiSettings,
    },
    { path: /\/api\/content.*/, responseCode: 200, response: MockedApiContent },
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

  mock.onPost("/api/settings").reply(() => {
    return [200, { success: true, error: null }];
  });

  mock.onPost("/api/content").reply(() => {
    return [200, { success: true, error: null }];
  });

  GetResponses.forEach((getResponse) => {
    mock.onGet(getResponse.path).reply((config) => {
      return [getResponse.responseCode, getResponse.response];
    });
  });
}

export default MockRequests;
