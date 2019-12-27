import Vue from "nativescript-vue";
// import application-settings
import * as ApplicationSettings from "application-settings";
// import custom routes
import routes from "./routes";
// require loca-notifications plugin
require("nativescript-local-notifications");

// create custom vue elements
Vue.registerElement(
  "Carousel",
  () => require("nativescript-carousel").Carousel
);
Vue.registerElement(
  "CarouselItem",
  () => require("nativescript-carousel").CarouselItem
);
Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

// check if initial app setup is done
let setupDone = false;
if (ApplicationSettings.hasKey("store")) {
  let settingsObj = JSON.parse(ApplicationSettings.getString("store"));
  let checkSetupDone = settingsObj.setupDone;
  if (checkSetupDone) {
    setupDone = true;
  }
}

// import vuex store
import store from "./store";

// print vue logs when --env.production is NOT set while building
Vue.config.silent = TNS_ENV === "production";

// create vue instance, render route based on "setupDone"
new Vue({
  store,
  render: h => h("frame", [h(setupDone ? routes.app : routes.setup)])
}).$start();
