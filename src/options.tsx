import React from "react";
import ReactDOM from "react-dom";
import App from "./options/App";
import "./options/i18n";

const optionsRoot = document.querySelector(".options-root");

if (optionsRoot instanceof HTMLElement) {
  ReactDOM.render(<App />, optionsRoot);
}
