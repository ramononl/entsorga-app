import Vue from "vue";
import Vuex from "vuex";
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setupDone: false,
    user: {
      streetName: "Adlerweg",
      streetNumber: 4,
      tour: 1,
      pushNotifications: true,
      pushPaper: true,
      pushCarton: true,
      pushDay: 0,
      pushTime: {
        hour: 7,
        minute: 30
      }
    },
    listOfPushDays: [
      "Am Abholtag",
      "1 Tag vorher",
      "2 Tage vorher",
      "3 Tage vorher",
      "4 Tage vorher",
      "5 Tage vorher",
      "6 Tage vorher",
      "7 Tage vorher"
    ]
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
