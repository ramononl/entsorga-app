<template>
  <Page>
    <ActionBar title="Zeitpunkt wählen">
      <ActionItem @tap="onCancel" ios.systemIcon="1" ios.position="left" text="Abbrechen" android.position="popup" />
      <NavigationButton text="" visibility="collapsed"/>
      <ActionItem @tap="onItemTap" ios.systemIcon="3" ios.position="right" text="Sichern" android.position="popup" />
    </ActionBar>
    <StackLayout class="page-bg-secondary">
      <Label text="Tag der Benachrichtigung" class="section-description"/>
      <ListPicker :items="listOfPushDays" :selectedIndex="pushDay" @selectedIndexChange="selectedIndexChanged($event.value)" class="text-primary action-item action-item-first"/>
      <Label text="Uhrzeit der Benachrichtigung" class="section-description"/>
      <TimePicker v-model="pushTime" minuteInterval="5" class="text-primary action-item action-item-first"/>
    </StackLayout>
  </Page>
</template>

<script>
import App from "../App";
import { pushHandling } from '../../mixins/pushHandling';
import { pushTime } from '../../mixins/pushTime';

export default {

  mixins: [pushHandling, pushTime],
  methods: {
    onItemTap() {
      this.$store.commit('setPushDay', this.newPushDay);
      this.$store.commit("setPushHour", this.newPushHour);
      this.$store.commit("setPushMinute", this.newPushMinute);
      
      // create push notifications
      this.createNotifications();

      this.$navigateTo(App, {
        clearHistory: true,
        props: {
          selectedIndex: 3,
        }
      });
    },
    onCancel() {
      this.$navigateBack();
    }
  }
}
</script>

<style>

</style>