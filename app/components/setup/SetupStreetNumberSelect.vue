<template>
  <StackLayout class="h-full p-x-20">
    <Label textWrap="true" text="Wie lautet Ihre Hausnummer?" class="h1 p-x-20" />
    <StackLayout class="w-full m-t-20 bg-white-transparent rounded-sm">
      <Label :text="streetName.name" class="p-x-20 p-y-10 text-sm text-gray-800 font-bold border-b border-gray-800" />
      <TextField
        v-model="streetNumber"
        hint="Hausnummer"
        editable="true"
        returnKeyType="done"
        keyboardType="phone"
        maxLength="3"
        autocorrect="false"
        class="text-lg m-x-20 m-y-20 border-0 p-y-0"
      />
    </StackLayout>
    <Label
      v-if="invalid"
      text="Bitte geben Sie eine gültige Hausnummer ein."
      textWrap="true"
      class="text-pink-100 p-x-0 m-x-0 m-t-10 text-sm"
    />
    <FlexboxLayout justifyContent="space-between" class="w-full">
      <Button text="Zurück" @tap="goBack" class="m-t-20 m-x-0 p-x-20 action-button"/>
      <Button text="Weiter" @tap="nextStep" class="m-t-20 m-x-0 p-x-20 action-button"/>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {
      streetNumber: "",
      invalid: false
    }
  },
  props: ["streetName"],
  methods: {
    nextStep() {
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
        this.$emit("storenumber", this.streetNumber);
        this.$emit("storetour", tour);
        this.$emit("nextstep", "SetupPushSelect");

      } else {
        this.invalid = true;
      }
    },
    goBack() {
      this.$emit("nextstep", "SetupStreetSelect");
    }
  }
};
</script>

<style>
</style>