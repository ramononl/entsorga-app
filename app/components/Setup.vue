<template>
  <StackLayout class="page-padding h-full">
    <Carousel v-show="step === 1" height="200" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="#ffffff" finite="true" bounce="true" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap" color="white">
      <CarouselItem id="slide1" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://tabicons/startseite" stretch="none" horizontalAlignment="center"/>
        <Label text="Slide 1" class="text-center"/>
      </CarouselItem>
      <CarouselItem id="slide2" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://tabicons/startseite" stretch="none" horizontalAlignment="center"/>
        <Label text="Slide 2" class="text-center"/>
      </CarouselItem>
      <CarouselItem id="slide3" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://tabicons/startseite" stretch="none" horizontalAlignment="center"/>
        <Label text="Slide 3" class="text-center"/>
      </CarouselItem>
      <CarouselItem id="slide4" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://tabicons/startseite" stretch="none" horizontalAlignment="center"/>
        <Label text="Slide 4" class="text-center"/>
      </CarouselItem>
    </Carousel>
    <StackLayout v-show="step === 2" class="w-full" height="70%">
      <Label text="Strasse wählen" class="h1 p-x-20"/>
      <SearchBar v-model="searchBar" hint="Strasse suchen..." class="m-t-10 rounded-sm"/>
      <StackLayout class="rounded-b-sm bg-white-transparent">
        <ListView for="streetName in filteredNames" separatorColor="gray" @itemTap="onItemTap">
          <v-template>
            <GridLayout height="45">
              <Label :text="streetName.name" class="p-20"/>
            </GridLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </StackLayout>
    <StackLayout v-show="step === 3" class="w-full">
      <Label :text="selectedStreet.name" class="text-center text-lg m-t-30 text-pink-100" />
      <TextField
        class="bg-white border-gray-800 border rounded-sm m-x-20 m-y-10 p-x-20 p-y-30 text-center text-20"
        v-model="streetNumber"
        hint="Hausnummer"
        maxlength="3"
        autocorrect="false"
        returnKeyType="done"
        keyboardType="phone"
      />
      <Label
        v-if="invalid"
        text="Bitte geben Sie eine gültige Hausnummer an."
        textWrap="true"
        class="text-center text-danger p-x-20 m-t-30"
      />
    </StackLayout>
    <StackLayout v-show="step === 4" class="w-full">
      <Label text="Benachrichtigungen wählen" class="h1 p-x-20"/>
    </StackLayout>
    <StackLayout v-show="step === 5" class="w-full">
      <Label text="Zeitpunkt wählen" class="h1 p-x-20"/>
    </StackLayout>
    <FlexboxLayout height="50" class="w-full m-t-30">
      <Label v-show="step > 1" @tap="tapBack" text="Zurück" flexGrow="1" class="bg-white-transparent p-x-10 p-y-10 text-center rounded-sm m-x-30"/>
      <Label v-show="step !== 2" @tap="tapContinue" text="Weiter" flexGrow="1" class="bg-white-transparent p-x-10 p-y-10 text-center rounded-sm m-x-30"/>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import App from "./App";
import ranges from "~/assets/ranges.json";

export default {
  data() {
    return {
      step: 1,
      searchBar: '',
      streetNames: ranges.data,
      selectedStreet: {},
      streetNumber: '',
      invalid: false
    }
  },
  computed: {
    filteredNames() {
      let term = this.searchBar.toLowerCase();
      if (term !== '') {
        let filteredNames = this.streetNames.filter(function(value) {
          let name = value.name.toLowerCase();
          if (name.indexOf(term) > -1) return value;
        });
        return filteredNames;
      }
      return this.streetNames;
    }
  },
  methods: {
    // tapContinue() {
    //   this.$store.commit('setSetupDone', true)
    // }
    tapBack() {
      if (this.step > 1) {
        this.step--;
      }
    },
    tapContinue() {
      if (this.step === 3) {
        let numbers = this.selectedStreet.numbers;
        let numberOfDivisions = numbers.length;

        // only if valid
        if (this.streetNumber <= numbers[numberOfDivisions - 1].nrBis) {
          this.invalid = false;
          this.step++;
        } else {
          this.invalid = true;
        }
      } else {
        this.step++;
      }
    },
    onItemTap(event) {
      if (event.item.numbers) {
        this.selectedStreet = event.item;
        this.tapContinue();
      } else {
        this.step = 4;
      }
    }
  }
}
</script>

<style>

</style>
