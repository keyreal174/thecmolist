import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { init } from "@rematch/core";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
import contentModel from "./models/content";
import feedModel from "./models/feed";
import networkModel from "./models/network";
import userModel from "./models/user";
import settingsModel from "./models/settings";

const store = init({
  models: {
    contentModel,
    feedModel,
    networkModel,
    settingsModel,
    userModel,
  },
});

ReactGA.initialize("UA-175211100-1");

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
