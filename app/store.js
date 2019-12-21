import Vue from "vue";
import Vuex from "vuex";
import * as ApplicationSettings from "application-settings";

import dates from "~/assets/dates.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      streetName: "Adlerweg",
      streetNumber: 4,
      tour: 1,
      pushNotifications: true,
      pushPaper: true,
      pushCarton: true,
      pushDay: "Am Abholtag",
      pushTime: {
        hour: 7,
        minute: 30
      }
    },
    dates: dates.tours
  },
  mutations: {
    load(state) {
      if (ApplicationSettings.getString("store")) {
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(ApplicationSettings.getString("store"))
          )
        );
      }
    },
    setStreetName(state, name) {
      state.user.streetName = name;
    },
    setStreetNumber(state, name) {
      state.user.streetNumber = name;
    },
    setTour(state, name) {
      state.user.tour = name;
    },
    setPushNotifications(state, name) {
      state.user.pushNotifications = name;
    },
    setPushPaper(state, name) {
      state.user.pushPaper = name;
    },
    setPushCarton(state, name) {
      state.user.pushCarton = name;
    },
    setPushDay(state, name) {
      state.user.pushDay = name;
    },
    setPushHour(state, name) {
      state.user.pushTime.hour = name;
    },
    setPushMinute(state, name) {
      state.user.pushTime.minute = name;
    }
  },
  actions: {}
});
