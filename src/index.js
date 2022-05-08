// Packages
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Redux store
import store from "./store";

// Components
import { App } from "./app";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Stylings
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
