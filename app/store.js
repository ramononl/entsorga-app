import Vue from "vue";
import Vuex from "vuex";
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

// default state for new installations and reset
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

// set initial state
const state = getDefaultState();

// define mutations
const mutations = {
  // load from local settings if present
  load(state) {
    if (ApplicationSettings.getString("store")) {
      this.replaceState(
        Object.assign(state, JSON.parse(ApplicationSettings.getString("store")))
      );
    }
  },
  // reset state to default state
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  // in-app state mutations
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

// create vuex store
export default new Vuex.Store({
  state,
  getters: {},
  actions: {},
  mutations
});
