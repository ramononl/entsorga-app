<template>
  <Page>
    <ActionBar title="Strasse wählen">
      <NavigationButton text=""/>
      <ActionItem @tap="onItemTap" ios.systemIcon="3" ios.position="right" text="Sichern" android.position="popup" />
    </ActionBar>
    <StackLayout class="page-bg">
      <Label :text="streetName" class="text-center text-lg m-t-30"/>
      <TextField class="number-input bg-white border-gray-400 -rounded" v-model="streetNumber" @loaded="showKeyboard" hint="Hausnummer" maxLength="3" autocorrect="false" returnKeyType="done" keyboardType="phone"/>
    </StackLayout>
  </Page>
</template>

<script>
import App from "../App";

export default {
  props: ['streetName'],
  data() {
    return {
      streetNumber: ""
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
      this.$store.commit('setStreetName', this.streetName)
      this.$store.commit('setStreetNumber', this.streetNumber)
      // create push notifications
      this.$navigateTo(App, {
        clearHistory: true,
        props: {
          selectedIndex: 3,
        }
      });
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