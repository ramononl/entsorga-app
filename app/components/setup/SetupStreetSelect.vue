<template>
  <StackLayout class="h-full">
    <Label textWrap="true" text="An welcher Strasse wohnen Sie?" class="h1 p-x-20"/>
    <TextField v-model="searchBar" hint="Strasse suchen..." returnKeyType="search" editable="true" autocorrect="false" class="bg-white-transparent w-full m-t-20 p-x-20 p-y-10 text-20 rounded-sm"/>
    <StackLayout class="bg-white-transparent rounded-sm m-t-10">
      <ListView for="streetName in filteredNames" @itemTap="onItemTap" separatorColor="gray">
        <v-template>
          <GridLayout height="45">
            <Label :text="streetName.name" class="p-20"/>
          </GridLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </StackLayout>
</template>

<script>
import { filterStreetNames } from '../../mixins/filterStreetNames';

export default {
  mixins: [filterStreetNames],
  methods: {
    onItemTap(event) {
      this.$emit("storestreet", event.item);
      if (event.item.numbers) {
        this.$emit("nextstep", "SetupStreetNumberSelect");
      } else {
        this.$emit("storenumber", "");
        this.$emit("storetour", event.item.tour);
        this.$emit("nextstep", "SetupPushSelect");
      }
    }
  }
}
</script>

<style>

</style>