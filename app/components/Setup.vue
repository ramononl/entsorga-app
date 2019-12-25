<template>
  <Page class="page-bg" actionBarHidden="true">
    <DockLayout stretchLastChild="true">
      <LogoBar />
      <StackLayout class="p-20">
        <AppInfo @nextstep="nextStep" v-if="step === 'AppInfo'" />
        <SetupStreetSelect
          @nextstep="nextStep"
          @storestreet="storeStreet"
          @storetour="storeTour"
          @storenumber="storeNumber"
          v-if="step === 'SetupStreetSelect'"
        />
        <SetupStreetNumberSelect
          :streetName="streetObj"
          @nextstep="nextStep"
          @storetour="storeTour"
          @storenumber="storeNumber"
          v-if="step === 'SetupStreetNumberSelect'"
        />
        <SetupPushSelect
          :streetName="streetObj"
          @nextstep="nextStep"
          @storepush="storePush"
          @storepaper="storePaper"
          @storecarton="storeCarton"
          @pushday="storeDay"
          @pushhour="storeHour"
          @pushminute="storeMinute"
          @setstore="setStore"
          v-if="step === 'SetupPushSelect'"
        />
        <SetupPushTimeSelect
          @pushday="storeDay"
          @pushhour="storeHour"
          @pushminute="storeMinute"
          @setstore="setStore"
          v-if="step === 'SetupPushTimeSelect'"
        />
      </StackLayout>
    </DockLayout>
  </Page>
</template>

<script>
import * as ApplicationSettings from "application-settings";
import LogoBar from "./common/LogoBar";
import App from "./App";

import { pushHandling } from '../mixins/pushHandling';

import AppInfo from "./setup/AppInfo";
import SetupStreetSelect from "./setup/SetupStreetSelect";
import SetupStreetNumberSelect from "./setup/SetupStreetNumberSelect";
import SetupPushSelect from "./setup/SetupPushSelect";
import SetupPushTimeSelect from "./setup/SetupPushTimeSelect";

export default {
  components: {
    LogoBar,
    AppInfo,
    SetupStreetSelect,
    SetupStreetNumberSelect,
    SetupPushSelect,
    SetupPushTimeSelect
  },
  data() {
    return {
      step: "AppInfo",
      streetName: null,
      streetObj: null,
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
    };
  },
  computed: {
    getApp() {
      return ApplicationSettings.getString("store");
    }
  },
  mixins: [pushHandling],
  methods: {
    nextStep(value) {
      this.step = value;
    },
    storeStreet(value) {
      this.streetObj = value;
      this.streetName = value.name;
    },
    storeNumber(value) {
      this.streetNumber = value;
    },
    storeTour(value) {
      this.tour = value;
    },
    storePush(value) {
      this.pushNotifications = value;
    },
    storePaper(value) {
      this.pushPaper = value;
    },
    storeCarton(value) {
      this.pushCarton = value;
    },
    storeDay(value) {
      this.pushDay = value;
    },
    storeHour(value) {
      this.pushTime.hour = value;
    },
    storeMinute(value) {
      this.pushTime.minute = value;
    },
    setStore() {
      this.$store.commit("setSetupDone", true);
      this.$store.commit("setStreetName", this.streetName);
      this.$store.commit("setStreetNumber", this.streetNumber);
      this.$store.commit("setTour", this.tour);
      this.$store.commit("setPushNotifications", this.pushNotifications);
      this.$store.commit("setPushPaper", this.pushPaper);
      this.$store.commit("setPushCarton", this.pushCarton);
      this.$store.commit("setPushDay", this.pushDay);
      this.$store.commit("setPushHour", this.pushTime.hour);
      this.$store.commit("setPushMinute", this.pushTime.minute);

      ApplicationSettings.setString("store", JSON.stringify(this.$store.state));
      console.log("store set");

      if (this.pushNotifications) {
        this.createNotifications();
      }

      this.$navigateTo(App, {
        clearHistory: true
      });
    }
  }
};
</script>

<style>
</style>
