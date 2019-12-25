import Vue from "nativescript-vue";
import * as ApplicationSettings from "application-settings";
import routes from "./routes";

require("nativescript-local-notifications");
Vue.registerElement(
  "Carousel",
  () => require("nativescript-carousel").Carousel
);
Vue.registerElement(
  "CarouselItem",
  () => require("nativescript-carousel").CarouselItem
);

let setupDone = false;

if (ApplicationSettings.hasKey("store")) {
  let settingsObj = JSON.parse(ApplicationSettings.getString("store"));
  let checkSetupDone = settingsObj.setupDone;
  if (checkSetupDone) {
    setupDone = true;
  }
}

import store from "./store";

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

new Vue({
  store,
  render: h => h("frame", [h(setupDone ? routes.app : routes.setup)])
}).$start();
