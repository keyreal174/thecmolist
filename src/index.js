import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { init } from "@rematch/core";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
import contentModel from "./models/content";
import feedModel from "./models/feed";
import networkModel from "./models/network";
import notificationsModel from "./models/notifications";
import userModel from "./models/user";
import settingsModel from "./models/settings";
import onboardingModel from "./models/onboarding";
import profileModel from "./models/profile";
import reactionModel from "./models/reaction";
import topicsModel from "./models/topics";
import searchModel from "./models/search";
import vendorModel from "./models/vendor";
import vendorsModel from "./models/vendors";
import fileModel from "./models/file";
import suggestionsModel from "./models/suggestions";
import guidesModel from "./models/guides";
import Util from "./components/util/Util";

const store = init({
  models: {
    contentModel,
    feedModel,
    networkModel,
    settingsModel,
    userModel,
    profileModel,
    onboardingModel,
    topicsModel,
    notificationsModel,
    reactionModel,
    searchModel,
    vendorModel,
    vendorsModel,
    suggestionsModel,
    fileModel,
    guidesModel,
  },
});

if (Util.inProduction()) {
  ReactGA.initialize("UA-xxxxxxxxx-1");
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
