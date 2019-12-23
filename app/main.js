import Vue from "nativescript-vue";
import App from "./components/App";
import Setup from "./components/Setup";

require("nativescript-local-notifications");
Vue.registerElement(
  "Carousel",
  () => require("nativescript-carousel").Carousel
);
Vue.registerElement(
  "CarouselItem",
  () => require("nativescript-carousel").CarouselItem
);

import store from "./store";

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

new Vue({
  store,
  render: h => h("Frame", [h(App)])
}).$start();
