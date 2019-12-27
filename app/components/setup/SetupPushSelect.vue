<template>
  <StackLayout class="h-full p-x-20">
    <Label textWrap="true" text="Möchten Sie Benachrichtigungen erhalten?" class="h1 p-x-20" />
    <StackLayout class="m-t-20 bg-white-transparent rounded-sm">
      <FlexboxLayout justifyContent="space-between" alignItems="center" class="p-l-20 p-r-5 p-y-5">
        <Label text="Mitteilungen aktivieren" class="text-primary font-bold"/>
        <Switch class="switch" v-model="allPush"/>
      </FlexboxLayout>
    </StackLayout>
    <Label v-if="allPush" text="Erlauben Sie bitte hierzu die Zustellung von Mitteilungen, wenn Sie dazu aufgefordert werden." textWrap="true" class="text-pink-100 p-x-0 m-x-0 m-t-10 text-sm"/>
    <StackLayout v-if="allPush" class="m-t-20 bg-white-transparent rounded-sm">
      <FlexboxLayout justifyContent="space-between" alignItems="center" class="p-l-20 p-r-5 p-y-5">
        <Label text="Mitteilungen für Papier" class="text-primary font-bold"/>
        <Switch class="switch" v-model="paper"/>
      </FlexboxLayout>
      <FlexboxLayout justifyContent="space-between" alignItems="center" class="p-l-20 p-r-5 p-y-5 border-t border-gray-800">
        <Label text="Mitteilungen für Karton" class="text-primary font-bold"/>
        <Switch class="switch" v-model="carton"/>
      </FlexboxLayout>
    </StackLayout>
    <FlexboxLayout justifyContent="space-between" class="w-full">
      <Button text="Zurück" @tap="goBack" class="m-t-20 m-x-0 p-x-20 action-button"/>
      <Button text="Weiter" @tap="nextStep" class="m-t-20 m-x-0 p-x-20 action-button"/>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import { pushHandling } from '../../mixins/pushHandling';
import { LocalNotifications } from "nativescript-local-notifications";

export default {
  data() {
    return {
      allPush: false,
      paper: false,
      carton: false,
    }
  },
  props: ["streetName"],
  mixins: [pushHandling],
  methods: {
    nextStep() {
      if (this.allPush && !this.paper && !this.carton) {
        this.$emit("storepush", false);
      } else {
        this.$emit("storepush", this.allPush);
      }
      this.$emit("storepaper", this.paper);
      this.$emit("storecarton", this.carton);
      if (this.allPush) {
        this.$emit("nextstep", "SetupPushTimeSelect");
      } else {
        this.$emit("pushday", 0); // default
        this.$emit("pushhour", 7); // default
        this.$emit("pushminute", 30); // default
        this.$emit("setstore");
      }
    },
    goBack() {
      if (this.streetName.numbers) {
        this.$emit("nextstep", "SetupStreetNumberSelect");
      } else {
        this.$emit("nextstep", "SetupStreetSelect");
      }
    }
  }
};
</script>

<style>

</style>