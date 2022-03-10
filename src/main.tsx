import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { event } from "@tauri-apps/api";
import { restartBackend, stopBackend } from "./utils/commands";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
