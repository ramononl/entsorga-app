<template>
  <GridLayout columns="*" rows="60, *">
    <GridLayout class="p-x-20 p-y-15 border-b border-white-transparent">
      <SegmentedBar
        column="0"
        row="0"
        v-model="selectedIndex"
        class="w-full text-sm font-bold text-gray-100"
      >
        <SegmentedBarItem title="Liste" class="m-5" />
        <SegmentedBarItem title="Karte" />
      </SegmentedBar>
    </GridLayout>
    <ScrollView column="0" row="1">
      <StackLayout v-show="selectedIndex === 0" class="p-x-20 p-t-10 p-b-20">
        <StackLayout
          v-for="(place, index) in places"
          :key="index"
          class="bg-white-transparent rounded-sm p-x-20 p-y-10 m-t-10"
        >
          <Label :text="place.title" textWrap="true" class="text-primary font-bold" />
          <Label :text="place.subtitle" textWrap="true" class="text-secondary" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
    <Mapbox
      v-show="selectedIndex === 1"
      column="0"
      row="1"
      accessToken="pk.eyJ1IjoicmFtb25vbmwiLCJhIjoiY2s0OW5lMnpuMDZxcjNocGN5a2RzMGg3dyJ9.NjruGO_39epllmEU2hxmTw"
      mapStyle="streets"
      latitude="46.8537835"
      longitude="9.5255859"
      hideCompass="true"
      zoomLevel="13"
      showUserLocation="true"
      disableZoom="false"
      disableRotation="true"
      disableScroll="false"
      disableTilt="true"
      @mapReady="onMapReady($event)"
    ></Mapbox>
  </GridLayout>
</template>

<script>
import * as utils from "utils/utils";
import places from "~/assets/places.json";

export default {
  data() {
    return {
      places: places.data,
      selectedIndex: 0
    };
  },
  computed: {
    markers() {
      let arr = [];
      for (let i = 0; i < this.places.length; i++) {
        let obj = {
          lat: this.places[i].lat,
          lng: this.places[i].lng,
          title: this.places[i].title,
          subtitle: this.places[i].subtitle,
          icon: "res://marker",
          onCalloutTap: () => {
            utils.openUrl(this.places[i].url);
          }
        };
        arr.push(obj);
      }
      return arr;
    }
  },
  methods: {
    onMapReady(args) {
      args.map.addMarkers(this.markers);
    }
  }
};
</script>

<style>
</style>