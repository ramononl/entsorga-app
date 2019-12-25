<template>
  <Page>
    <ActionBar title="Strasse wählen">
      <NavigationButton text=""/>
    </ActionBar>
    <StackLayout class="page-bg-secondary">
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
import StreetNumberSelect from "./StreetNumberSelect";
import { pushHandling } from '../../mixins/pushHandling';
import { filterStreetNames } from '../../mixins/filterStreetNames';

export default {
  mixins: [pushHandling, filterStreetNames],
  methods: {
    onItemTap(event) {
      if (event.item.numbers) {
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
        this.createNotifications();

        this.$navigateBack();
      }
    }
  }
}
</script>

<style>

</style>