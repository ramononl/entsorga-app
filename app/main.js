import Vue from "nativescript-vue";
import App from "./components/App";
import Setup from "./components/Setup";

require("nativescript-local-notifications");

import store from "./store";

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

let setupDone = store.state.setupDone;

new Vue({
  store,
  render(h) {
    if (!setupDone) {
      return h("frame", [h(Setup)]);
    } else {
      return h("frame", [h(App)]);
    }
  }
}).$start();
