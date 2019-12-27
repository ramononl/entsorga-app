<template>
  <StackLayout class="p-x-20">
    <Label textWrap="true" text="Zu welchem Zeitpunkt?" class="h1 p-x-20" />
    <StackLayout class="m-t-20 bg-white-transparent rounded-sm">
      <Label text="Tag der Benachrichtigung" class="p-x-20 p-y-10 text-sm text-gray-800 font-bold border-b border-gray-800"/>
      <ListPicker height="130" :items="listOfPushDays" :selectedIndex="newPushDay" @selectedIndexChange="selectedIndexChanged($event.value)" class=""/>
    </StackLayout>
    <StackLayout class="m-t-20 bg-white-transparent rounded-sm">
      <Label text="Uhrzeit der Benachrichtigung" class="p-x-20 p-y-10 text-sm text-gray-800 font-bold border-b border-gray-800"/>
      <TimePicker height="130" v-model="pushTime" minuteInterval="5" class=""/>
    </StackLayout>
    <FlexboxLayout justifyContent="space-between" class="w-full">
      <Button text="Zurück" @tap="goBack" class="m-t-20 m-x-0 p-x-20 action-button"/>
      <Button text="Fertig" @tap="nextStep" class="m-t-20 m-x-0 p-x-20 action-button"/>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import { pushTime } from '../../mixins/pushTime';

export default {
  mixins: [pushTime],
  methods: {
    nextStep() {
      this.$emit("pushday", this.newPushDay);
      this.$emit("pushhour", this.newPushHour);
      this.$emit("pushminute", this.newPushMinute);
      this.$emit("setstore");
    },
    goBack() {
      console.log("back");
      this.$emit("nextstep", "SetupPushSelect");
    }
  }
}
</script>

<style>

</style>