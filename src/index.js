import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

let i = 1;
export function start() {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App key={++i} />
      </BrowserRouter>
    </React.StrictMode>
  );
}

start();
