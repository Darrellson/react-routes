import { preloadComponents } from "components/lazyloader/preload";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

preloadComponents().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
