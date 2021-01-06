import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { render } from "@testing-library/react";
import "jest-canvas-mock";
import App from "./App";

test("renders app without crashing", () => {
  const store = createStore(
    combineReducers({
      rootReducer,
    }),
    applyMiddleware(thunk)
  );
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
