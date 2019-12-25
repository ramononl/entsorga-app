import Vue from "vue";
import Vuex from "vuex";
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    setupDone: false,
    user: {
      streetName: null,
      streetNumber: null,
      tour: null,
      pushNotifications: null,
      pushPaper: null,
      pushCarton: null,
      pushDay: null,
      pushTime: {
        hour: null,
        minute: null
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
  };
};

// initial state
const state = getDefaultState();

const mutations = {
  load(state) {
    if (ApplicationSettings.getString("store")) {
      this.replaceState(
        Object.assign(state, JSON.parse(ApplicationSettings.getString("store")))
      );
    }
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setSetupDone(state, name) {
    state.setupDone = name;
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
};

export default new Vuex.Store({
  state,
  getters: {},
  actions: {},
  mutations
});
