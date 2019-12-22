<template>
  <Page>
    <ActionBar title="Strasse wählen">
      <NavigationButton text=""/>
      <ActionItem @tap="onItemTap" ios.systemIcon="3" ios.position="right" text="Sichern" android.position="popup" />
    </ActionBar>
    <StackLayout class="page-bg">
      <Label :text="streetName.name" class="text-center text-lg m-t-30"/>
      <TextField class="number-input bg-white border-gray-400 -rounded" v-model="streetNumber" @loaded="showKeyboard" hint="Hausnummer" maxLength="3" autocorrect="false" returnKeyType="done" keyboardType="phone"/>
      <Label v-if="invalid" text="Bitte geben Sie eine gültige Hausnummer an." textWrap="true" class="text-center text-danger p-x-20 m-t-30"/>
    </StackLayout>
  </Page>
</template>

<script>
import App from "../App";

export default {
  props: ['streetName'],
  data() {
    return {
      streetNumber: "",
      invalid: false
    }
  },
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
      if (this.streetNumber <= numbers[numberOfDivisions - 1].nrBis) {
        this.invalid = false;
        
        let tour;  
        for (let i = 0; i < numberOfDivisions; i++) {
          if (this.streetNumber >= numbers[i].nrVon && this.streetNumber <= numbers[i].nrBis) {
            tour = numbers[i].tour;
          }
        }

        console.log(tour);
        
        this.$store.commit('setStreetName', this.streetName.name)
        this.$store.commit('setStreetNumber', this.streetNumber)
        this.$store.commit('setTour', tour);
        
        // create push notifications
        
        this.$navigateTo(App, {
          clearHistory: true,
          props: {
            selectedIndex: 3,
          }
        });
      } else {
        this.invalid = true;
      }
    }
  }
}
</script>

<style scoped>
  .number-input {
    margin: 30 20 0;
    border-width: 1px;
    padding: 20 30;
    border-radius: 8;
    font-size: 20;
    text-align: center;
  }
</style>