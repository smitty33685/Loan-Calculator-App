import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  // TODO FIGURE OUT WHY useEffect IS CALLED TWICE WHEN StrickMode is on

  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);
