<template>
  <ScrollView class="page-bg">
    <FlexboxLayout flexDirection="column" justifyContent="center">
        <Label text="Einstellungen" class="h1 p-x-20"/>
        <FlexboxLayout justifyContent="space-between" alignItems="center" class="action-item action-item-first" @tap="goToStreetSelect">
          <Label text="Adresse" class="text-primary" flexGrow="0"/>
          <FlexboxLayout justifyContent="flex-end" alignItems="center" flexGrow="1">
            <Label :text="userStreetName + ' ' + userStreetNumber" class="text-secondary text-right"/>
            <StackLayout>
              <Image src="res://appicons/icon-cheveron-right" stretch="none" class="m-l-10"/>
            </StackLayout>
          </FlexboxLayout>
        </FlexboxLayout>

        <Label text="Mitteilungen" class="section-description"/>
        <FlexboxLayout justifyContent="space-between" alignItems="center" class="action-item action-item-first action-item-switch">
          <Label text="Mitteilungen anzeigen" class="text-primary"/>
          <Switch :checked="userPushNotifications" @tap="switchReady = true" @checkedChange="changePush($event, 'setPushNotifications')"/>
        </FlexboxLayout>
        <FlexboxLayout v-if="userPushNotifications" justifyContent="space-between" alignItems="center" class="action-item action-item-switch">
          <Label text="Mitteilungen für Papier" class="text-primary"/>
          <Switch v-if="userPushNotifications" @tap="switchReady = true" :checked="userPushPaper" @checkedChange="changePush($event, 'setPushPaper')"/>
        </FlexboxLayout>
        <FlexboxLayout v-if="userPushNotifications" justifyContent="space-between" alignItems="center" class="action-item action-item-switch">
          <Label text="Mitteilungen für Karton" class="text-primary"/>
          <Switch v-if="userPushNotifications" @tap="switchReady = true" :checked="userPushCarton" @checkedChange="changePush($event, 'setPushCarton')"/>
        </FlexboxLayout>
        
        <Label text="Zeitpunkt der Mitteilungen" class="section-description"/>
        <FlexboxLayout justifyContent="space-between" alignItems="center" class="action-item action-item-first" @tap="showPushTimeSelect">
          <Label text="Termin" class="text-primary" flexGrow="0"/>
          <FlexboxLayout justifyContent="flex-end" alignItems="center" flexGrow="1">
            <Label :text="pushDayList[pushDay] + ' um ' + pushTime + ' Uhr'" class="text-secondary text-right"/>
            <StackLayout>
              <Image src="res://appicons/icon-cheveron-right" stretch="none" class="m-l-10"/>
            </StackLayout>
          </FlexboxLayout>
        </FlexboxLayout>
        
      </FlexboxLayout>
  </ScrollView>
</template>

<script>
import StreetSelect from "./secondary/StreetSelect";
import PushTimeSelect from "./secondary/PushTimeSelect";
import { pushHandling } from '../mixins/pushHandling';

export default {
  data() {
    return {
      newPushNotifications: null,
      newPushPaper: null,
      newPushCarton: null,
      switchReady: false
    }
  },
  mixins: [pushHandling],
  computed: {
    userStreetName() {
      return this.$store.state.user.streetName;
    },
    userStreetNumber() {
      return this.$store.state.user.streetNumber;
    },
    userPushNotifications() {
      return this.$store.state.user.pushNotifications;
    },
    userPushPaper() {
      return this.$store.state.user.pushPaper;
    },
    userPushCarton() {
      return this.$store.state.user.pushCarton;
    },
    pushDay() {
      return this.$store.state.user.pushDay;
    },
    pushDayList() {
      return this.$store.state.listOfPushDays;
    },
    pushTime() {
      let hour = this.$store.state.user.pushTime.hour.toString();
      let minute = this.$store.state.user.pushTime.minute.toString();
      return hour.padStart(2,0) + ":" + minute.padStart(2,0);
    }
  },
  methods: {
    goToStreetSelect() {
      this.$navigateTo(StreetSelect);
    },
    showPushTimeSelect() {
      this.$navigateTo(PushTimeSelect);
    },
    changePush(event, property) {
      this.$store.commit(property, event.object.checked);
      if (property !== "setPushNotifications" && !this.userPushPaper && !this.userPushCarton) {
        this.$store.commit("setPushNotifications", false);
      }
      if (property === "setPushNotifications" && !this.userPushNotifications) {
        this.$store.commit("setPushPaper", false);
        this.$store.commit("setPushCarton", false);
      }
      if (property === "setPushNotifications" && this.userPushNotifications) {
        this.$store.commit("setPushPaper", true);
        this.$store.commit("setPushCarton", true);
      }
      if (this.switchReady) {
        this.createNotifications();
      }
    }
  }
}
</script>

<style>

</style>