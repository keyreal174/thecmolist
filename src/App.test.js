import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { init } from "@rematch/core";
import { render, screen, act } from "@testing-library/react";
import "jest-canvas-mock";
import App from "./App";
import contentModel from "./models/content";
import feedModel from "./models/feed";
import networkModel from "./models/network";
import userModel from "./models/user";
import settingsModel from "./models/settings";
import profileModel from "./models/profile";
import reactionModel from "./models/reaction";
import suggestionModel from "./models/suggestions";
import topicsModel from "./models/topics";

test("renders app without crashing", async () => {
  const store = init({
    models: {
      contentModel,
      feedModel,
      networkModel,
      settingsModel,
      userModel,
      profileModel,
      reactionModel,
      suggestionModel,
      topicsModel,
    },
  });

  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  });

  const linkElements = await screen.findAllByText(/CMO/i);
  linkElements.forEach((linkElement) => {
    expect(linkElement).toBeInTheDocument();
  });
});
