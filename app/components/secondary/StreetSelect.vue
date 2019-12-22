<template>
  <Page>
    <ActionBar title="Strasse wählen">
      <NavigationButton text=""/>
    </ActionBar>
    <StackLayout class="page-bg">
      <SearchBar v-model="searchBar" hint="Strasse suchen..."/>
      <StackLayout>
        <ListView for="streetName in filteredNames" @itemTap="onItemTap">
          <v-template>
            <GridLayout height="45">
              <Label :text="streetName.name" class="p-20"/>
            </GridLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import ranges from "~/assets/ranges.json";
import StreetNumberSelect from "./StreetNumberSelect";

export default {
  data() {
    return {
      searchBar: '',
      streetNames: ranges.data
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
    onItemTap(event) {
      if (event.item.numbers.length) {
        this.$navigateTo(StreetNumberSelect, {
          props: {
            streetName: event.item,
          }
        });
      } else {
        this.$store.commit('setStreetName', event.item.name);
        this.$store.commit('setStreetNumber', "");
        this.$store.commit('setTour', event.item.tour);
        // create push notifications
        this.$navigateBack();
      }
    }
  }
}
</script>

<style>

</style>