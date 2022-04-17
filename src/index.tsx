import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";

const store = createStore(allReducers);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  // TODO FIGURE OUT WHY useEffect IS CALLED TWICE WHEN StrickMode is on

  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
);
