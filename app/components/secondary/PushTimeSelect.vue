<template>
  <Page>
    <ActionBar title="Zeitpunkt wählen">
      <ActionItem @tap="onCancel" ios.systemIcon="1" ios.position="left" text="Abbrechen" android.position="popup" />
      <NavigationButton text="" visibility="collapsed"/>
      <ActionItem @tap="onItemTap" ios.systemIcon="3" ios.position="right" text="Sichern" android.position="popup" />
    </ActionBar>
    <StackLayout class="page-bg">
      <Label text="Tag der Benachrichtigung" class="section-description"/>
      <ListPicker :items="listOfPushDays" v-model="pushDay" class="text-primary action-item action-item-first"/>
      <Label text="Uhrzeit der Benachrichtigung" class="section-description"/>
      <TimePicker v-model="pushTime" minuteInterval="5" class="text-primary action-item action-item-first"/>
    </StackLayout>
  </Page>
</template>

<script>
import App from "../App";

export default {
  data() {
    return {
      listOfPushDays: [
        'Am Abholtag',
        '1 Tag vorher',
        '2 Tage vorher',
        '3 Tage vorher',
        '4 Tage vorher',
        '5 Tage vorher',
        '6 Tage vorher',
        '7 Tage vorher'
      ],
      newPushDay: null,
      newPushHour: null,
      newPushMinute: null
    }
  },
  computed: {
    pushDay: {
      get() {
        this.newPushDay = this.$store.state.user.pushDay;
        return this.$store.state.user.pushDay;
      },
      set(value) {
        if (value) {
          this.newPushDay = this.listOfPushDays[value]
        } else {
          this.newPushDay = this.listOfPushDays[0]
        }
        console.log(this.newPushDay);
      }
    },
    pushTime: {
      get() {
        this.newPushHour = this.$store.state.user.pushTime.hour;
        this.newPushMinute = this.$store.state.user.pushTime.minute;
        let d = new Date();
        d.setHours(this.$store.state.user.pushTime.hour);
        d.setMinutes(this.$store.state.user.pushTime.minute);
        return d;
      },
      set(value) {
        this.newPushHour = value.getHours();
        this.newPushMinute = value.getMinutes();
      }
    }
  },
  methods: {
    onItemTap() {
      this.$store.commit('setPushDay', this.newPushDay)
      this.$store.commit("setPushHour", this.newPushHour);
      this.$store.commit("setPushMinute", this.newPushMinute);
      // create push notifications
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