import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { init } from "@rematch/core";
import { render } from "@testing-library/react";
import "jest-canvas-mock";
import App from "./App";
import feedModel from "./models/feed";
import networkModel from "./models/network";
import userModel from "./models/user";

test("renders app without crashing", () => {
  const store = init({
    models: {
      feedModel,
      networkModel,
      userModel,
    },
  });

  const { getAllByText } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const linkElements = getAllByText(/CMO/i);
  linkElements.forEach((linkElement) => {
    expect(linkElement).toBeInTheDocument();
  });
});
