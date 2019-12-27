<template>
  <Page>
    <ActionBar title="Strasse wählen">
      <NavigationButton text />
      <ActionItem
        @tap="onItemTap"
        ios.systemIcon="3"
        ios.position="right"
        text="Sichern"
        android.position="popup"
      />
    </ActionBar>
    <StackLayout class="page-bg-secondary">
      <Label :text="streetName.name" class="text-center text-lg m-t-30 text-gray-600" />
      <TextField
        class="bg-white border-gray-800 border rounded-sm m-x-20 m-y-10 p-x-20 p-y-30 text-center text-lg"
        v-model="streetNumber"
        @loaded="showKeyboard"
        hint="Hausnummer"
        maxLength="3"
        autocorrect="false"
        returnKeyType="done"
        keyboardType="phone"
      />
      <Label
        v-if="invalid"
        text="Bitte geben Sie eine gültige Hausnummer ein."
        textWrap="true"
        class="text-center text-red-600 font-bold p-x-20 m-t-30"
      />
    </StackLayout>
  </Page>
</template>

<script>
import App from "../App";
import { pushHandling } from "../../mixins/pushHandling";

export default {
  props: ["streetName"],
  data() {
    return {
      streetNumber: "",
      invalid: false
    };
  },
  mixins: [pushHandling],
  methods: {
    showKeyboard({ object }) {
      if (object.android) {
        setTimeout(() => {
          object.focus();
          utils.ad.showSoftInput(object);
        }, 10);
      } else {
        object.focus();
      }
    },
    onItemTap(event) {
      let numbers = this.streetName.numbers;
      let numberOfDivisions = numbers.length;

      // only if valid
      if (this.streetNumber <= numbers[numberOfDivisions - 1].nrBis && this.streetNumber !=="") {
        this.invalid = false;

        let tour;
        for (let i = 0; i < numberOfDivisions; i++) {
          if (
            this.streetNumber >= numbers[i].nrVon &&
            this.streetNumber <= numbers[i].nrBis
          ) {
            tour = numbers[i].tour;
            break;
          }
        }

        this.$store.commit("setStreetName", this.streetName.name);
        this.$store.commit("setStreetNumber", this.streetNumber);
        this.$store.commit("setTour", tour);

        // create push notifications
        this.createNotifications();

        this.$navigateTo(App, {
          clearHistory: true,
          props: {
            selectedIndex: 3
          }
        });
      } else {
        this.invalid = true;
      }
    }
  }
};
</script>

<style>
</style>