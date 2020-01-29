import React from "react";
import ReactDOM from "react-dom";
import App from "./main/App";
import "./options/i18n";
import { pageUpdated } from "./main/utils";

async function init(): Promise<boolean> {
  let appNode = document.querySelector(`youtube-autolike-app`);

  if (appNode === null) {
    const menuContainer = document.querySelector("#info #menu-container");

    if (menuContainer) {
      const info = menuContainer.parentNode;

      if (info) {
        appNode = document.createElement(`youtube-autolike-app`);

        info.insertBefore(appNode, menuContainer);

        ReactDOM.render(<App />, appNode);

        pageUpdated();

        return true;
      }
    }
  }

  return false;
}

let checkDataUpdated: number;

init();

window.addEventListener("yt-page-data-updated", async function() {
  pageUpdated();

  if (false === (await init())) {
    checkDataUpdated = setInterval(async () => {
      if (await init()) {
        clearInterval(checkDataUpdated);
      }
    }, 500);
  }
});
